import { useState } from 'react';
import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowDownUp } from 'lucide-react';
import { toast } from './ui/use-toast';
import { allowedTokens } from '../utils/adresses';
import { Separator } from "@/components/ui/separator"
import XLMIcon from "../assets/XLM-icon.png";
import USDCIcon from "../assets/USDC-icon.png";

const SwapComponent = () => {

    const Icons = {
        "XLM": XLMIcon,
        "USD": USDCIcon
    } as {
        [key: string]: string;
    }

    const [tokenA, setTokenA] = useState("ASSETNEST");
    const [tokenABalance, setTokenABalance] = useState(0);
    const [tokenB, setTokenB] = useState("WBTC");
    const [tokenBBalance, setTokenBBalance] = useState(0);

    const [amountSwap, setAmountSwap] = useState(0);

    const [msgSwap, setMsgSwap] = useState("Swap");

    const [loading, setLoading] = useState<boolean>(false);

    function performeChangeSwap(){
        setTokenA(tokenB);
        setTokenABalance(tokenBBalance);
        setTokenB(tokenA);
        setTokenBBalance(tokenABalance);
    }

    async function makeSwap(){
        if(tokenA === tokenB){
            toast({
                title: "Same tokens not allowed",
                description: "Please select different tokens"
            })
            return;
        }

        try{
            setLoading(false);
            if (msgSwap === "Swapping..."){
                setMsgSwap("Swap");
            }
            if (msgSwap === "Swap"){
                setMsgSwap("Swapping...");
            }
            console.log(`Swapping ${amountSwap} ${tokenA} for ${tokenB}`);

        } catch(err){
            toast({
                title: "Swapping Error",
                description: "Error during swap"
            })
            console.log(err);
        } finally{
            setLoading(false);
        }
    }

    return (
        <Card className='shadow-lg p-6 rounded-xl border-secondary border-[1px] w-[40%]'>
            <CardContent className="space-y-4 flex justify-center">
                <div className="w-full flex flex-col space-y-4">
                    <Label className="text-sm text-primary indent-2">You're paying</Label>
                    <div className="flex-1 flex flex-row space-x-1">
                        <Input 
                            id="tokenA" 
                            type="number" 
                            placeholder={`Amount of ${tokenA}`}
                            className="flex-1"
                            value={amountSwap}
                            onChange={(e) => setAmountSwap(parseFloat(e.target.value))} 
                        />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button 
                                    onClick={() => setAmountSwap(tokenABalance)}
                                    className="underline text-primary px-2" variant="outline">Max</Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>Use everything in the balance</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Select
                            value={tokenA}
                            onValueChange={(value) => setTokenA(value)}
                        >
                            <SelectTrigger className="bg-secondary w-[150px]">
                                <SelectValue placeholder="Select a token" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Tokens</SelectLabel>
                                {Object.keys(allowedTokens).map((key) => { 
                                    return (
                                        <SelectItem
                                            key={key}
                                            value={key}
                                        >
                                            <div className='flex flex-row'>
                                                <img src={Icons[key]} alt={key} className="w-5 h-5 mr-4"/>
                                                <p>{key}</p>
                                            </div>
                                        </SelectItem>
                                    )
                                })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full flex justify-end">
                        <Label className="flex flex-row w-[150px] text-sm indent-3">
                            Balance:
                            <p className="text-md font-bold">{Number(tokenABalance).toFixed(3)}</p>
                        </Label>
                    </div>
                    <div className='w-full flex flex-row space-x-4 items-center px-1'>
                        <Separator className='flex-1 bg-primary'/>
                        <Button className="self-center rounded-full w-8 h-8 p-2 hover:shadow-primary-glow" onClick={() => performeChangeSwap()}><ArrowDownUp size={40}/></Button>
                        <Separator className='flex-1 bg-primary'/>
                    </div>
                    <Label className="text-sm text-primary indent-2">To receive</Label>
                    <div className="flex-1 flex flex-row space-x-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger
                                    className="flex-1 text-sm flex flex-row items-center space-x-4 bg-primarylighter border-primarylighter shadow-sm px-4"
                                >
                                    <p>{`Amount of ${tokenB} :`}</p>
                                    <p className="text-md font-bold">{Number(0).toFixed(3)}</p>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                <p>This is the amount you will receive of the choosen token (in the right) making the swap</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Select
                            value={tokenB}
                            onValueChange={(value) => setTokenB(value)}
                        >
                            <SelectTrigger className="bg-secondary w-[150px]">
                                <SelectValue placeholder="Select a token" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Tokens</SelectLabel>
                                {Object.keys(allowedTokens).map((key) => { 
                                    return (
                                        <SelectItem
                                            key={key}
                                            value={key}
                                        >
                                            <div className='flex flex-row'>
                                                <img src={Icons[key]} alt={key} className="w-5 h-5 mr-4"/>
                                                <p>{key}</p>
                                            </div>
                                        </SelectItem>
                                    )
                                })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full flex justify-end">
                        <Label className="flex flex-row w-[150px] text-sm indent-3">
                            Balance:
                            <p className="text-md font-bold">{Number(tokenBBalance).toFixed(3)}</p>
                        </Label>
                    </div>
                    {loading ?
                        <Button disabled className="w-[200px] self-center rounded">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                        :
                        <Button onClick={makeSwap} className="w-[200px] font-bold self-center rounded">{msgSwap}</Button>
                    }
                </div>
            </CardContent>
        </Card>
    );
};

export default SwapComponent;