import {Image} from "@/types";

export interface ImageCard {
    id: number;
    attributes: {
        id: number;
        image: Image;
        heading: string;
        description: string;
        link: string;
        date?: string;
    }
}
