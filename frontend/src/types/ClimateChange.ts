export interface ClimateChange {
    id: number;
    bannerTitle: string;
    image: {
        url: string;
    };
    category: string;
    heading: string;
    description: string;
    secondImage: {
        url: string;
    }
    secondBannerTitle: string;
    secondBannerDescription: string;
    consequences: {
        consequence_1: {
            heading: string;
            description: string;
        };
        consequence_2: {
            heading: string;
            description: string;
        };
        consequence_3: {
            heading: string;
            description: string;
        };
    };
}
