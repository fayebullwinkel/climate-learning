import {Mixed} from "./";

export interface Home {
    id: number;
    headerTitle: string;
    headerImageUrl: string;
    category: string;
    heading: string;
    description: string;
    bannerTitle: string;
    bannerDescription: string;
    bannerImageUrl: string;
    reasons: {
        data: Mixed[];
    },
    category_2: string;
    heading_2: string;
    description_2: string;
    secondBannerTitle: string;
    secondBannerDescription: string;
    secondBannerImageUrl: string;
    callToActions: {
        data: Mixed[];
    }
}