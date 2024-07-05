import {Category, Tip} from "@/types";

export interface Campaign {
    id: number;
    imageUrl: string;
    title: string;
    categories: Category[];
    date?: string;
    shortDescription?: string;
    description?: string;
    location?: string;
    tips?: Tip[];
    link?: string;
}