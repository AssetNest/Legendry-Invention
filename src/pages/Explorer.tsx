import { Reveal, RevealWrapper } from '@/components/Reveal';
import './glowClass.css';
import { useEffect, useState } from 'react';
import { FundData } from '@/utils/props';
import { fundData } from '@/utils/mock';
import { CardFund } from '@/components/CardFund';



export default function Explorer() {

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
        <div className='w-[100vw] relative'>
            <div className="mt-16 p-6 w-full md:p-12 lg:p-12 mb-24">  
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
        </div>
    );
};