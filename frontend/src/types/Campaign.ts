import {Category, Image, Tip} from "@/types";

export interface Campaign {
    id: number;
    image: Image;
    title: string;
    categories: Category[];
    date?: string;
    shortDescription?: string;
    description?: string;
    location?: string;
    tips?: Tip[];
    link?: string;
}