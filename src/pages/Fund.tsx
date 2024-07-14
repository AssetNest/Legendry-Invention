import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label";
import HeroSection from "@/components/Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { Coins, TrendingUp, Wallet } from "lucide-react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { fundData } from "@/utils/mock"
import { Reveal, RevealWrapper } from "@/components/Reveal"
import { useWallet, WalletContext } from '@/walletmanager';
import CryptoChart from '@/components/CryptoChart.tsx'; // Import the CryptoChart component

export default function Fund() {

    const params = useParams();
    const fundId = params.id || '';
    const [fund, setFund] = useState<any>({});

    const wallet = useWallet();
    const handleWithdraw = wallet ? wallet.handleWithdraw : () => { console.warn("Wallet not initialized"); };
    const { handlePayment } = useWallet() || { handlePayment: async () => console.warn("Wallet not initialized") };
    const [claimAmount, setClaimAmount] = useState('');
    const [investAmount, setInvestAmount] = useState('');
    const { fetchBalance, balance } = useWallet() || { fetchBalance: async () => {}, balance: '0' };

    const onClaim = async () => {
        if (!claimAmount) {
            alert("Please enter an amount to claim");
            return;
        }
        setLoading(true);
        try {
            await handlePayment(claimAmount);
            alert("Claim successful");
            await fetchBalance(); 
        } catch (error) {
            console.error("Error during claim:", error);
            alert("Claim failed");
        } finally {
            setLoading(false);
        }
    };

    const getFundData = async () => {
        try {
            setLoading(true);
            setFund(fundData[Number(fundId) - 1]);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getFundData();
    }, []);

    useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className='w-[100vw]'>
            <div className="h-16 bg-background"></div>
            <HeroSection name={fund.name} description={fund.description} avatar={fund.avatar} image={fund.image} color="primary" manager={fund.manager} loading={loading}/>
            <RevealWrapper>
                <div className="px-12 pb-12">
                    <Tabs defaultValue="invest" className="w-full">
                        <Reveal delay={0.6}>
                            <TabsList className="mb-8 grid-cols-2">
                                <TabsTrigger className="px-6" value="invest">Overview</TabsTrigger>
                                <TabsTrigger className="px-6" value="fund_information">Portfolio Info</TabsTrigger>
                            </TabsList>
                        </Reveal>
                        <TabsContent className="space-y-4" value="invest">
                            <Reveal delay={0.8}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Invest</CardTitle>
                                        <CardDescription>You can choose the amount of XLM to invest in this fund</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex space-x-4">
                                            <div className="flex-1 space-y-1">
                                                <Label className="text-sm ml-2">Amount of XLM</Label>
                                                <div className="flex flex-row space-x-1">
                                                    <Input 
                                                        id="invest" 
                                                        type="number" 
                                                        placeholder="ex. 129"
                                                        value={investAmount}
                                                        onChange={(e) => setInvestAmount(e.target.value)} // Update state on change
                                                    />
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                className="underline text-primary px-2" variant="outline">Max</Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Invest all your money in the wallet</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col items-start space-y-1 bg-primarylighter rounded px-4 py-2">
                                                <Label className="text-sm">XLM Balance in your wallet</Label>
                                                <div className="text-lg font-bold">{balance} XLM</div>
                                                <div className="flex flex-col items-center justify-center">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger className="text-2xl font-bold">
                                                                <div>
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Check in your wallet</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>
                                            </div>
                                        </div>
                                        {loading ?
                                        <Button disabled>
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait
                                        </Button>
                                        :
                                        <Button onClick={() => handleWithdraw(investAmount)}>Approve Deposit</Button>
                                        }
                                    </CardContent>
                                </Card>
                            </Reveal>
                            <Reveal delay={1}>
                                <div className="grid grid-cols-1 gap-4 justify-center my-6 md:grid-cols-5 lg:grid-cols-5">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Price</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-xl flex flex-row space-x-2">
                                            <Wallet />
                                            <p>quota</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Assets Under Management (TVL)</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-xl flex flex-row space-x-2">
                                            <Coins />
                                            <p>tokensHolding</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Fund Performance (APY)</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-xl flex flex-row space-x-2">
                                            <TrendingUp />
                                            <p>+25%</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-[1px] border-primary">
                                        <CardHeader>
                                            <CardTitle>My Value Deposited</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-xl flex flex-row space-x-2">
                                            <Coins />
                                            <p>quotaBalance</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-[1px] border-primary">
                                        <CardHeader>
                                            <CardTitle>My Total Return</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-xl flex flex-row space-x-2">
                                            <TrendingUp />
                                            <p>0%</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Performance</CardTitle>
                                        <CardDescription>Price</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <CryptoChart /> {/* Add CryptoChart component here */}
                                    </CardContent>
                                </Card>
                            </Reveal>
                        </TabsContent>
                        <Reveal delay={0.8}>
                            <TabsContent className="space-y-4" value="fund_information">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Tokens Allocation</CardTitle>
                                    </CardHeader>
                                    <div className="flex flex-row space-x-1">
                                        <Input 
                                            id="claimAmount" 
                                            type="number" 
                                            placeholder="Enter Amount to claim"
                                            value={claimAmount}
                                            onChange={(e) => setClaimAmount(e.target.value)}
                                        />
                                        <Button onClick={onClaim} disabled={loading}>
                                            {loading ? "Processing..." : "Claim"}
                                        </Button>
                                    </div>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                <TableHead className="">Asset</TableHead>
                                                <TableHead className="text-right">Price</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Reveal>
                    </Tabs>
                </div>
            </RevealWrapper>
        </div>
    );
}
