import {Mixed, SliderItem} from "./";

export interface ClimateChange {
    id: number;
    bannerTitle: string;
    headerImageUrl: string;
    introductionCategory: string;
    introductionHeading: string;
    introductionDescription: string;
    introductionBannerTitle: string;
    introductionBannerDescription: string;
    introductionBannerImageUrl: string;
    reasons: {
        data: Mixed[];
    }
    category: string;
    heading: string;
    description: string;
    secondBannerTitle: string;
    secondBannerDescription: string;
    secondImageUrl: string;
    consequences: {
        data: Mixed[];
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
    thirdImageUrl: string;
    category_3: string;
    heading_3: string;
    description_3: string;
    actions: {
        data: Mixed[];
    }
}