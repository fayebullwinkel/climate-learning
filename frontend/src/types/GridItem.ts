import {Image} from "@/types/Image";

export interface GridItem {
    id: number,
    attributes: {
        title: string,
        description: string,
        image: Image
    }
}