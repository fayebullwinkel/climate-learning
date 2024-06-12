import {Consequence, SliderItem} from "./";

export interface ClimateChange {
    id: number;
    bannerTitle: string;
    headerImageUrl: string;
    category: string;
    heading: string;
    description: string;
    secondBannerTitle: string;
    secondBannerDescription: string;
    secondImageUrl: string;
    consequences: {
        data: Consequence[];
    }
    sliderItems: {
        data: SliderItem[];
    }
}
