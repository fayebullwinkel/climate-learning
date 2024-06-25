import {Category, Difficulty, Tip} from "@/types";

export interface Campaign {
    id: number;
    imageUrl: string;
    title: string;
    difficulty: Difficulty;
    categories: Category[];
    date?: string;
    description?: string;
    location?: string;
    tips?: Tip[];
}