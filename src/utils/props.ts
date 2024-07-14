export type FundData = {
    id: number;
    name: string;
    description: string;
    avatar: string;
    image: string;
    manager: string;
    risk: string;
    TVL: string;
    performance: string;
};

export type HeroSectionProps = {
    name?: string;
    description?: string;
    avatar?: string;
    image?: string;
    color?: string;
    manager?: string;
    loading?: boolean;
};