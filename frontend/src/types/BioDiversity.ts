import {Image, ImageCard} from "./";

export interface BioDiversity {
    id: number;
    bannerTitle: string;
    headerImage: Image;
    category: string;
    heading: string;
    description: string;
    imageCards: {
        data: ImageCard[];
    }
}