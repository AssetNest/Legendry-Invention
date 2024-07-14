import HeroSection from "@/components/Hero";
import { Reveal, RevealWrapper } from "@/components/Reveal";
import SwapComponent from "@/components/Swap";
import { fundData } from "@/utils/mock";

export default function Test() {

    const loading = false;

    const fund = fundData[0];

    return (
        <div className='w-[100vw]'>
            <div className="h-16 bg-background"></div>
            <HeroSection name={fund.name} description={fund.description} avatar={fund.avatar} image={fund.image} color="primary" manager={fund.manager} loading={loading}/>
            <RevealWrapper>
            <Reveal delay={0.6}>
            <div className="px-12 py-14 flex flex-col items-center">
                <SwapComponent/>
            </div>
            </Reveal>
            </RevealWrapper>
        </div>
    );
};