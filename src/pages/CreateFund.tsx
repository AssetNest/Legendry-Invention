import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import React, { useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { PopoverClose } from "@radix-ui/react-popover"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Reveal, RevealWrapper } from "@/components/Reveal"
import { allowedTokens } from "@/utils/adresses"
import '@farcaster/auth-kit/styles.css';
import { SignInButton } from '@farcaster/auth-kit';
import { useProfile } from '@farcaster/auth-kit';
import { AnchorWallet, Wallet, useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"

import {
    Program,
    Idl,
    AnchorProvider,
    setProvider,
    web3,
  } from "@coral-xyz/anchor"
import * as anchor from "@coral-xyz/anchor"; 
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { VaultMinterIdl } from "@/programs/VaultMinter"

export default function CreateFund() {

    const navigator = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const [openInvestment, setOpenInvestment] = React.useState<Date>();
    const [closeInvestment, setCloseInvestment] = React.useState<Date>();
    const [maturationTime, setMaturationtime] = React.useState<Date>();

    const [name, setName] = React.useState('');
    const [ticker, setTicker] = React.useState('');
    const [admFee, setAdmFee] = React.useState(0.5);
    const [perfFee, setPerfFee] = React.useState(10);
    const [twitterhandle, setTwitterhandle] = React.useState('');

    const {
        isAuthenticated,
        profile: { username, fid },
    } = useProfile();

    function toMaskStyle(str: string) {
        const visiblePart = str.slice(-3);
        const maskedPart = visiblePart.padStart(str.length, '*');
        return maskedPart;
    }

    const [tokens, setTokens] = React.useState<string[]>([]);

    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const wallet = useAnchorWallet();

    // function handleDateTimestamp(date: Date | undefined) {
    //     const safeDate = date || new Date();
    //     const timestamp = safeDate.getTime().toString();
    //     return Number(timestamp);
    // }

    const handleCheckboxChange = (tokenName: string, checked: boolean) => {
        setTokens(prevTokens => {
            const updatedTokens = new Set(prevTokens);
            const tokenValue = allowedTokens[tokenName];
    
            if (checked) {
                updatedTokens.add(tokenValue);
            } else {
                updatedTokens.delete(tokenValue);
            }
    
            return Array.from(updatedTokens);
        });
    };

    async function handleSubmit() {
        if (!openInvestment || !(openInvestment instanceof Date) || 
            !closeInvestment || !(closeInvestment instanceof Date) || 
            !maturationTime || !(maturationTime instanceof Date)) {
            alert("Please fill all the fields");
            return;
        }
        // if(!signer){
        //     alert("Please connect your wallet");
        //     return;
        // }
        if(tokens.length === 0){
            alert("Please add at least one token");
            return;
        }
        setLoading(true);

        // const openInvestmentTimestamp = handleDateTimestamp(openInvestment)/1000;
        // const closeInvestmentTimestamp = handleDateTimestamp(closeInvestment);
        // const maturationTimeTimestamp = handleDateTimestamp(maturationTime);

        // const admFeeBps = admFee * 100;
        // const perfFeeBps = perfFee * 100;

        try{
            
            const provider = new AnchorProvider(connection, wallet as AnchorWallet, {});
            const program = new Program(VaultMinterIdl as Idl, "program address", provider);

            console.log(VaultMinterIdl)

            console.log("Teste"+ wallet);

            const mintToken = anchor.web3.Keypair.generate();
            const associateTokenProgram = new anchor.web3.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
            

            const tokenAccount = anchor.utils.token.associatedAddress({
                mint: mintToken.publicKey,
                owner: publicKey as web3.PublicKey
            });

            
            
            const context = {
                mintToken: mintToken.publicKey,
                tokenAccount: tokenAccount,
                associateTokenProgram: associateTokenProgram,
                signer: publicKey as web3.PublicKey,
                // rent: web3.SYSVAR_RENT_PUBKEY,
                // systemProgram: web3.SystemProgram.programId,
                // tokenProgram: TOKEN_PROGRAM_ID,

            }

            const txHash = await program.methods.createVault().
                    accounts(context).signers([mintToken]).rpc()


            navigator('/success');

        } catch(err){
            console.log(err);
            alert("Something went wrong! Try again");
            

        }finally{
            setLoading(false);
        }   
    }

    function onSave() {
        toast({
          title: "You saved",
          description: "Vault data information",
        })
        console.log(name);
        console.log(ticker);
        console.log(admFee);
        console.log(perfFee);
    }

    function onVerification() {
        toast({
          title: "You are verified",
          description: "Farcaster and Twitter verified",
        })
    }

    const onSubmit = async () => {
        await handleSubmit();
        toast({
          title: "You submitted",
          description: "your Fund Creation",
        })
        console.log(openInvestment);
        console.log(closeInvestment);
        console.log(maturationTime);
        console.log(tokens);
    }

    return (
        <div className='w-[100vw] my-36'>
            <RevealWrapper>
            <div className="p-12">
                <Tabs defaultValue="fund_data" className="w-full">
                    <Reveal delay={0.4}>
                    <TabsList className="mb-8 grid-cols-2">
                        <TabsTrigger className="px-6" value="fund_data">Vault Data</TabsTrigger>
                        <TabsTrigger className="px-6" value="social">Social Verification</TabsTrigger>
                        <TabsTrigger className="px-6" value="fund_regulation">Vault Regulation</TabsTrigger>
                    </TabsList>
                    </Reveal>


                    {/* Fund Data */}


                    <Reveal delay={0.6}>
                    <TabsContent value="fund_data">
                        <Card>
                        <CardHeader>
                            <CardTitle>Vault Data</CardTitle>
                            <CardDescription>
                            Make changes to your fund information here. Click save when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="space-y-1">
                                    <Label>Vault Name</Label>
                                    <Input 
                                        id="name" 
                                        type="text" 
                                        placeholder="ex. Falcon Fund" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    </div>
                                    <div className="space-y-1">
                                    <Label>Ticker</Label>
                                    <Input 
                                        id="ticker" 
                                        type="text" 
                                        placeholder="ex. FLCN"
                                        value={ticker}
                                        onChange={(e) => setTicker(e.target.value)}
                                    />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="space-y-1">
                                    <Label>Administration Fee</Label>
                                    <Input 
                                        id="admfee" 
                                        type="number" 
                                        placeholder="ex. 1%" 
                                        value={admFee}
                                        onChange={(e) => setAdmFee(parseFloat(e.target.value))}
                                    />
                                    </div>
                                    <div className="space-y-1">
                                    <Label>Performace Fee</Label>
                                    <Input 
                                        id="perfee" 
                                        type="number" 
                                        placeholder="ex. 10%" 
                                        value={perfFee}
                                        onChange={(e) => setPerfFee(parseFloat(e.target.value))}
                                    />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            {loading ?
                            <Button disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                            :
                            <Button onClick={onSave}>Save Changes</Button>
                            }
                        </CardFooter>
                        </Card>
                    </TabsContent>
                    </Reveal>


                    {/* Social */}


                    <Reveal delay={0.6}>
                    <TabsContent value="social">
                    <Card>
                        <CardHeader>
                            <CardTitle>Social Verification</CardTitle>
                            <CardDescription>
                                Sign-in with Stellar Auth and provide your twitter handle
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex flex-col space-y-4">
                                <div className="space-y-1 w-[50%]">
                                    <Label>Twitter Handle</Label>
                                    <Input 
                                        id="twitter" 
                                        type="text" 
                                        placeholder="ex. @Asset_Nest" 
                                        value={twitterhandle}
                                        onChange={(e) => setTwitterhandle(e.target.value)}
                                    />
                                </div>
                                
                                <div className="px-1">
                                {isAuthenticated ? (
                                    <p>
                                    Hello, {username}! Your fid is: {toMaskStyle(fid?.toString() ?? '')}
                                    </p>
                                ) : (
                                    <p>You're not signed in.</p>
                                )}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            {loading ?
                            <Button disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                            :
                            isAuthenticated 
                            ? 
                            <Button onClick={onVerification}>Verify user</Button>
                            : 
                            <Button disabled>Verify On-chain</Button>
                            }
                        </CardFooter>
                        </Card>
                    </TabsContent>
                    </Reveal>


                    {/* Last Part */}


                    <Reveal delay={0.6}>
                    <TabsContent value="fund_regulation">
                        <Card>
                        <CardHeader>
                            <CardTitle>Fund Regulation</CardTitle>
                            <CardDescription>
                            Change your fund regulation here. After this step, your vault will be created.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-2 space-y-2">
                                    <div className="space-y-1">
                                    <Label>Start time for investments</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !openInvestment && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {openInvestment ? format(openInvestment, "PPP") : <span>Pick a time to open investments</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <PopoverClose>
                                                <Calendar
                                                mode="single"
                                                selected={openInvestment}
                                                onSelect={setOpenInvestment}
                                                initialFocus
                                                />
                                            </PopoverClose> 
                                        </PopoverContent>
                                    </Popover>
                                    </div>
                                    <div className="space-y-1">
                                    <Label>End time for investments</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !closeInvestment && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {closeInvestment ? format(closeInvestment, "PPP") : <span>Pick a time to close investments</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <PopoverClose>
                                                <Calendar
                                                mode="single"
                                                selected={closeInvestment}
                                                onSelect={setCloseInvestment}
                                                initialFocus
                                                />
                                            </PopoverClose> 
                                        </PopoverContent>
                                    </Popover>
                                    </div>
                                    <div className="space-y-1">
                                    <Label>Maturation Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !maturationTime && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {maturationTime ? format(maturationTime, "PPP") : <span>Pick a maturation date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <PopoverClose>
                                                <Calendar
                                                mode="single"
                                                selected={maturationTime}
                                                onSelect={setMaturationtime}
                                                initialFocus
                                                />
                                            </PopoverClose>
                                        </PopoverContent>
                                    </Popover>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="space-y-1">
                                        <Label>Accepted Tokens</Label>
                                        <div className="flex items-center space-x-2">
                                            <ScrollArea className="h-[18vh] w-full rounded-md border">
                                            <div className="p-4 space-y-4">
                                                {Object.keys(allowedTokens).map((tokenName: string, idx: number) => {
                                                    return(
                                                    <div key={idx} className="flex items-center space-x-4">                                                
                                                        <Checkbox 
                                                            onCheckedChange={(checked) => {
                                                                const isChecked = typeof checked === 'boolean' && checked;
                                                                handleCheckboxChange(tokenName, isChecked)
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor="token"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {tokenName}
                                                        </label>
                                                    </div>
                                                    );
                                                })}
                                            </div>
                                            </ScrollArea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            {loading ?
                            <Button disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                            :
                            <Button onClick={onSubmit}>Create Vault</Button>
                            }
                        </CardFooter>
                        </Card>
                    </TabsContent>
                    </Reveal>
                </Tabs>
                <div className="w-full bg-red-600"></div>
            </div>
            </RevealWrapper>
        </div>
    )
}