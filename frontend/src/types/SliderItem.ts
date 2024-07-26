import {Image} from "@/types/Image";

export interface SliderItem {
    id: number;
    attributes: {
        heading: string;
        description: string;
        image?: Image;
    };
}