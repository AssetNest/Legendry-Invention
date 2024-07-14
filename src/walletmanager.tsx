import React, { createContext, useContext, useState } from 'react';
import {
  StellarWalletsKit,
  WalletNetwork,
  xBullModule,
  FreighterModule,
  AlbedoModule,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";
import * as StellarSdk from "@stellar/stellar-sdk";



// Create a context for the wallet management
const WalletContext = createContext<{
  handleConnect: () => Promise<void>;
  handleDisconnect: () => void;
  handleWithdraw: (amtr: string) => Promise<void>;
  handlePayment: (amt: string) => Promise<void>;
  publicKey: string | null;
  balance: string; // Add this line
  fetchBalance: () => Promise<void>;
  connected: boolean; // Add this line
} | null>(null);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connectedWalletId, setConnectedWalletId] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [connected, setConnected] = useState<boolean>(false);

  const kit = new StellarWalletsKit({
    selectedWalletId: connectedWalletId || XBULL_ID,
    network: WalletNetwork.TESTNET,
    modules: [new xBullModule(), new FreighterModule(), new AlbedoModule()],
  });

  const handleConnect = async () => {
    try {
      await kit.openModal({
        onWalletSelected: async (option) => {
          kit.setWallet(option.id);
          setConnectedWalletId(option.id);
          const publicKey = await kit.getPublicKey();
          setPublicKey(publicKey);
          setConnected(true);
        },
      });
    } catch (error) {
      console.error('Error connecting:', error);
    }
     
  };

  const handleDisconnect = () => {
    setPublicKey(null);
    setConnectedWalletId(null);
    setBalance('0');
    setConnected(false); // Update connected state
  };

  const handleWithdraw = async (amtw: string) => {
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const server = new StellarSdk.Horizon.Server(
        "https://horizon-testnet.stellar.org",
      );

      const account = await server.loadAccount(publicKey);

      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
       .addOperation(
          StellarSdk.Operation.payment({
            destination: "GAKK3J2FUPRA7JM3GVZWG7VUZGQ5FERXWXVNWHSZ2OIT57J3IR2B4WH2",
            asset: StellarSdk.Asset.native(),
            amount: amtw,
          }),
        )
       .addMemo(StellarSdk.Memo.text("Withdrawal"))
       .setTimeout(60)
       .build();

      const { result: signedTxnXdr } = await kit.signTx({
        xdr: transaction.toXDR(),
        publicKeys: [publicKey],
        network: WalletNetwork.TESTNET,
      });

      const signedTxn = new StellarSdk.Transaction(
        signedTxnXdr,
        StellarSdk.Networks.TESTNET,
      );

      const txnResult = await server.submitTransaction(signedTxn, {
        skipMemoRequiredCheck: true,
      });

      if (txnResult.successful) {
        alert('Withdrawal successful');
        await fetchBalance();
      } else {
        alert('Withdrawal failed');
      }
    } catch (error: any) {
      console.error(`Error withdrawing funds - ${error?.message}`);
      alert('Withdrawal failed');
    }
  };

  const handlePayment = async (amt: string) => {
    if (!publicKey) {
      console.error("No public key found. Please connect your wallet first.");
      return;
    }

    try {
      const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
      const sourceKeys = StellarSdk.Keypair.fromSecret("SCK2VRDP2LCHPA2DINM5U5VEPJNU7IT7MIBPNWHVNUX24XOZCNLLFANI");
      const destinationId = publicKey; // Use the connected wallet's public key

      await server.loadAccount(destinationId);
      const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

      let transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationId,
            asset: StellarSdk.Asset.native(),
            amount: amt,
          })
        )
        .addMemo(StellarSdk.Memo.text("Test Transaction"))
        .setTimeout(180)
        .build();

      transaction.sign(sourceKeys);
      const result = await server.submitTransaction(transaction);
      console.log("Payment success! Results:", result);
    } catch (error) {
      console.error("Payment failed!", error);
    }
  };

  const fetchBalance = async () => {
    if (!publicKey) return;
    try {
      const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
      const account = await server.loadAccount(publicKey);
      const balance = account.balances.find(b => b.asset_type === 'native');
      setBalance(balance?.balance || '0');
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <WalletContext.Provider value={{ handleDisconnect, handleConnect, handleWithdraw, handlePayment, publicKey,balance,fetchBalance,connected }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext };