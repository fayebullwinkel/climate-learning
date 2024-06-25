import {Category, Difficulty} from "@/types";

export interface Campaign {
    imageUrl: string;
    title: string;
    difficulty: Difficulty;
    date?: string;
    categories: Category[];
}