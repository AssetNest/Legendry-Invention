import { useEffect, useState } from 'react';
import { Link2 } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast";
import { Reveal, RevealWrapper } from '@/components/Reveal';
import { useParams } from 'react-router-dom';
import image from '@/assets/yellowbg.png';
import avatar from '@/assets/w_avatar2.png';
import { CardFund } from '@/components/CardFund';
import { FundData } from '@/utils/props';
import { fundData } from '@/utils/mock';


export default function DepositorProfile() {

    const params = useParams();
    const user = params.address || '';
    const name = 'GBSN...B34F';

    const handleLink = async () => {
        if (user) {
            const XLMscanUrl = `https://stellar.expert/explorer/public`;
            window.open(XLMscanUrl, '_blank');
        } else {
            toast({
                title: "Error getting data",
                description: "Connect to Stellar" 
            })
        }
    };

    const [loading, setLoading] = useState<boolean>(false);

    const [funds, setFunds] = useState<FundData[]>([]);

    const getCardData = async () => {
        try {
            setLoading(true);
            setFunds(fundData);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCardData();
    })


    return (
        <div className='w-[100vw]'>
            <div className="h-16 bg-background"></div>
            <RevealWrapper>
            <Reveal delay={0.1}>
            <div className="w-full pt-12 h-36 pb-10 mb-8 text-foreground shadow-xl flex flex-row items-center relative overflow-hidden">
                <img src={image} alt="fund" className="absolute object-cover w-full"/>
                <div className='absolute inset-0 h-[100%] flex flex-row items-center px-12'>
                    <img src={avatar} alt="fund" className="w-[60px] h-auto border-[2px] rounded-full border-primary shadow-primary-glow"/>
                    <div className='ml-8 space-y-2'>
                        <div className="text-3xl font-bold">{name}</div>
                    </div>
                    <div className='flex-1 flex justify-end px-2'>
                        <p className='flex flex-col justify-center mx-2'>Check on Stellar Scan:</p>
                        <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                    <div className='px-4 py-2 rounded bg-secondary opacity-90 flex items-center text-left space-x-4 hover:cursor-pointer' onClick={handleLink}>
                                        <p className='w-[400px]'>{user}</p>
                                        <Link2 size="25" className='hover:cursor-pointer p-1'/>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>Viewon Stellar Expert</p>
                                </TooltipContent>
                            </Tooltip>
                            
                        </TooltipProvider>
                    </div>
                </div>
            </div>
            </Reveal>
            </RevealWrapper>


            {/* Funds Part */}


            <div className="mt-8 p-6 w-full md:p-12 lg:p-12 mb-24">
                <p className='mb-12 text-xl font-bold'>My deposited vaults:</p>
                <RevealWrapper>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                    {funds
                        .map((fund, index) => {
                        return (
                            <Reveal delay={index * 0.2}>
                                <CardFund 
                                    key={index} 
                                    id={fund.id}
                                    name={fund.name}
                                    description={fund.description}
                                    avatar={fund.avatar}
                                    image={fund.image}
                                    manager={fund.manager}
                                    risk={fund.risk}
                                    TVL={fund.TVL}
                                    performance={fund.performance}
                                    loading={loading}
                                />
                            </Reveal>
                        )
                    })}
                </div>
                </RevealWrapper>
            </div>
            <div className='fixed bottom-0 right-0 left-0 p-4 bg-background'>
                
            </div>
        </div>
    );
};