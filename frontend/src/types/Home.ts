import {Mixed} from "./";

export interface Home {
    id: number;
    bannerTitle: string;
    secondBannerTitle: string;
    headerImageUrl: string;
    category: string;
    heading: string;
    description: string;
    bannerDescription: string;
    bannerImageUrl: string;
    reasons: {
        data: Mixed[];
    }
}