import {Image} from "@/types";

export interface Page {
    id: number;
    title: string;
    route: string;
    description?: string;
    image: Image;
    pageSections: {
        attributes: {
            menuName: string;
            oneWordHashtag: string;
        }
    }[];
}