import {Image, ImageCard, Mixed, SliderItem} from "./";

export interface ClimateChange {
    id: number;
    bannerTitle: string;
    headerImage: Image;
    quizCategory: string;
    quizHeading: string;
    quizDescription: string;
    category: string;
    heading: string;
    description: string;
    imageCards: {
        data: ImageCard[];
    }
    secondBannerTitle: string;
    secondBannerDescription: string;
    secondImage: Image;
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
    thirdImage: Image;
    category_3: string;
    heading_3: string;
    description_3: string;
    callToActions: {
        data: Mixed[];
    }
}