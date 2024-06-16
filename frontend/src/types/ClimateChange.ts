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
    category_2: string;
    heading_2: string;
    description_2: string;
    naturalConsequences: {
        data: SliderItem[];
    }
    socialConsequences: {
        data: SliderItem[];
    }
    economicConsequences: {
        data: SliderItem[];
    }
}
