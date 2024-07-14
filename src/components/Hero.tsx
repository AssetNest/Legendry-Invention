import React from 'react';
import { Link2 } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroSectionProps } from '@/utils/props';
import { Reveal, RevealWrapper } from './Reveal';

import { TwitterLogoIcon } from '@radix-ui/react-icons';



const HeroSection: React.FC<HeroSectionProps> = ({ name, description, avatar, image, color, manager, loading } : HeroSectionProps) => {

    const safeColor = color || 'secondary';


    return (
        <>
            {loading ? 
            <div className={`w-full pt-12 px-12 h-30 pb-10 mb-8 text-foreground shadow-xl flex flex-row items-center bg-${safeColor}`}>
                <img src={avatar} alt="" className="w-[60px] h-auto rounded-full"/>
                <div className='ml-8 space-y-2'>
                    <div className="text-3xl font-bold"><Skeleton className="" /></div>
                    <div className="text-sm"><Skeleton className="" /></div>
                </div>
                <div className='flex-1 flex justify-end px-2'>
                    <p className='flex flex-col justify-center mx-1'>Managed by:</p>
                    <div className='px-4 py-2 rounded bg-secondary opacity-90 flex items-center space-x-4'>
                        <p className='w-[400px]'><Skeleton className="" /></p>
                        <TooltipProvider>
                            <Tooltip>
                               
                                <TooltipContent>
                                <p>View on Stellar Expert</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div> 
            :
            <RevealWrapper>
            <Reveal>
            <div className="w-full pt-12 h-36 pb-10 mb-8 text-foreground shadow-xl flex flex-row items-center relative overflow-hidden">
                <img src={image} alt="fund" className="absolute object-cover w-full"/>
                <div className='absolute inset-0 h-[100%] flex flex-row items-center px-12'>
                    <img src={avatar} alt="fund" className="w-[60px] h-auto border-[2px] rounded-full border-primary shadow-primary-glow"/>
                    <div className='ml-8 space-y-2'>
                        <div className="text-3xl font-bold">{name}</div>
                        <div className="text-sm">{description}</div>
                    </div>
                    <div className='flex-1 flex justify-end px-2'>
                        <p className='flex flex-col justify-center mx-1'>Managed by:</p>
                        <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                    <div className='px-4 py-2 rounded bg-secondary opacity-90 flex items-center text-left space-x-4 hover:cursor-pointer'>
                                        <p className='w-[400px]'>{manager}</p>
                                        <Link2 size="25" className='hover:cursor-pointer p-1'/>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>View on Stellar Expert</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div className="flex flex-row justify-center items-center px-4 z-10 w-32 space-x-4">
                            <TwitterLogoIcon className="w-8 h-8 cursor-pointer" onClick={() => window.open('', '_blank')}/>
                        </div>
                    </div>
                </div>
            </div>
            </Reveal>
            </RevealWrapper>
            }
        </>
    );
};

export default HeroSection;