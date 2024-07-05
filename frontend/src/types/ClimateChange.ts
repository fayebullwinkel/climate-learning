import {ImageCard, Mixed, SliderItem} from "./";

export interface ClimateChange {
    id: number;
    bannerTitle: string;
    headerImageUrl: string;
    quizCategory: string;
    quizHeading: string;
    quizDescription: string;
    quizSource: string;
    category: string;
    heading: string;
    description: string;
    imageCards: {
        data: ImageCard[];
    }
    secondBannerTitle: string;
    secondBannerDescription: string;
    secondImageUrl: string;
    consequences: {
        data: Mixed[];
    }
    sliderHeading: string;
    sliderDescription: string;
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
    callToActions: {
        data: Mixed[];
    }
}