import { BarChart2, Gauge } from "lucide-react";
import { useNavigate } from "react-router-dom";
import xlmIcon from "@/assets/XLM-icon.png";


export function CardFund ({id, name, description, avatar, image, manager, risk, TVL, performance, loading}: 
    {id: number, name: string, description: string, avatar: string, image: string, manager: string, risk: string, TVL: string, performance: string, loading: boolean}) {

    const navigator = useNavigate();

    const perfColor = performance.includes('+') ? 'text-green-600' : 'text-red-600';
    const riskBkgColor = risk === 'Low' ? 'from-green-400' : risk === 'Medium' ? 'from-400' : 'from-red-400';
    const riskColor = risk === 'Low' ? 'text-green-400' : risk === 'Medium' ? 'text-400' : 'text-red-400';

    return (
        <div className="fancy aspect-square bg-background rounded-xl shadow-xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 group border-secondary border-[1px]"
             onClick={() => navigator(`/funds/${id}`)}
        >
            {loading ? <div className="animate-pulse bg-secondary w-full h-full"></div>
            :
            <div className="w-full h-full bg-transparent absolute inset-0 z-10">
                <div className="relative aspect-[2/1] w-full rounded-t-xl overflow-hidden border-secondary border-[1px]">
                    <img src={image} alt="fund" className="absolute aspect-[2/1] object-cover opacity-75 group-hover:brightness-90 top-0 left-0 w-full"/>
                    <div className="absolute flex flex-row top-4 left-4 w-full">
                        <img src={avatar} alt="" className="w-[15%] border-[2px] rounded-full border-primary shadow-primary-glow"/>
                        <div className="px-4">
                            <p className="text-foreground font-bold text-lg">{name}</p>
                            <p className="text-foreground font-thin text-sm">{manager}</p>
                        </div>
                    </div>
                    <div className="absolute flex flex-col items-end top-4 right-4 w-full">
                        <div className={`w-20 flex flex-row justify-center items-center bg-secondary rounded-full shadow-primary-glow p-2`}>
                            <BarChart2 className={`h-4 ${perfColor}`}/>
                            <p className={`text-sm ${perfColor}`}>{performance}</p>
                        </div>
                    </div>
                    <div className="absolute flex flex-row bottom-4 left-4 w-full">
                        
                    </div>
                    <div className={`absolute w-full -bottom-10 h-24 opacity-50 bg-gradient-to-t ${riskBkgColor} to-transparent`}/>
                </div>
                <div className="aspect-[2/1] p-4 space-y-4 py-6 relative">
                    <div className="flex flex-row items-center space-x-2">
                        <Gauge className={`${riskColor} w-6 h-6`} />
                        <p className={`${riskColor}`}>{risk}</p>
                    </div>
                    <div className="flex flex-row items-end space-x-2">
                        <p>TVL</p>
                        <p className="font-bold text-xl">${TVL}</p>
                    </div>
                    <div className="flex flex-row items-end space-x-2">
                        <img src={xlmIcon} alt="" className="w-[10%] border-[2px] rounded-full border-primary shadow-primary-glow"/>
                    </div>
                    
                </div>
            </div>
            }
        </div>
    );
}