import {ImageCard} from "./";

export interface BioDiversity {
    id: number;
    bannerTitle: string;
    headerImageUrl: string;
    category: string;
    heading: string;
    description: string;
    imageCards: {
        data: ImageCard[];
    }
}