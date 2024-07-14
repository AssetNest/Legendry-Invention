import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import NavButton from "./NavButton";
import { ModeToggle } from "./mode-toggle";
import LogoApp from '../assets/assetnest.png';
import { useEffect, useState } from 'react';
import './bottomGlow.css';
import { useTheme } from "@/components/theme-provider";
import { menuOptions } from "@/utils/menu";
import { useWallet, WalletContext } from '@/walletmanager';


export function Header() {
   const { theme } = useTheme();

   const navigator = useNavigate();
   const wallet = useWallet();
   const handleConnect = wallet ? wallet.handleConnect : () => { console.warn("Wallet not initialized"); };
   const handleDisconnect = wallet ? wallet.handleDisconnect : () => { console.warn("Wallet not initialized"); };
   const publicKey = wallet ? wallet.publicKey : null;
   const connected = wallet ? wallet.connected : false;



    return (
        <div className={`duration-600 sticky w-full top-0 z-20 shadow-2xl backdrop-blur-md bg-background/15`}>
            <div className="w-full bg-transparent flex flex-row justify-center items-center px-12 h-14">
                <div className="flex-1 flex flex-row h-[100%] justify-center items-center">
                    <Button variant="ghost" className="h-[100%] w-24 relative glow-bottom-border hover:bg-transparent group" onClick={() => navigator('/')}><p className="group-hover:text-400 group-hover:text-shadow-primary-glow">Home</p></Button>
                    {menuOptions.map((option, index) => (
                        <NavButton key={index} to={option.to}>{option.name}</NavButton>
                    ))}
                </div>
                <div className="h-[100%] flex flex-row justify-center items-center">
                    <div className="flex flex-col items-center mx-6 h-[100%]">
                        <ModeToggle/>
                    </div> 
                    <div>
                        <div className="flex justify-end my-2 mx-10">
                        <button className={`flex flex-col items-center ${theme == "light" ? '' : ''} `} onClick={connected ? handleDisconnect : handleConnect}>
          {connected ? 'Disconnect' : 'Connect'}
        </button>
        {publicKey && (
  <div className="flex items-center justify-center mx-2 border border-white rounded px-2">
    <span className="text-white text-sm">
      {publicKey.substring(0, 6)}...
    </span>
  </div>
)}
                            
                        </div>
                    </div>
                </div>           
            </div>
        </div>
    )
}