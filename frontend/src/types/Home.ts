import {Image, Mixed} from "./";

export interface Home {
    id: number;
    headerTitle: string;
    headerImage: Image;
    category: string;
    heading: string;
    description: string;
    bannerTitle: string;
    bannerDescription: string;
    bannerImage: Image;
    reasons: {
        data: Mixed[];
    },
    category_2: string;
    heading_2: string;
    description_2: string;
    secondBannerTitle: string;
    secondBannerDescription: string;
    secondBannerImage: Image;
    callToActions: {
        data: Mixed[];
    }
}