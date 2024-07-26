import {GridItem, Image, SliderItem} from "@/types";
import {Mixed} from "./";
export interface ClimateAdaptation {
    id: number;
    bannerTitle: string;
    headerImage: Image;
    quizCategory: string;
    quizHeading: string;
    quizDescription: string;
    category: string;
    heading: string;
    description: string;
    secondImage: Image;
    secondBannerTitle: string;
    secondBannerDescription: string;
    adaptationMeasures: {
        data: Mixed[];
    }
    videoTitle: string;
    videoDescription: string;
    gridItems: {
        data:  GridItem[];
    }
    mapSliderItems: {
        data: Mixed[];
    }
    thirdBannerCategory: string;
    thirdBannerTitle: string;
    thirdBannerDescription: string;
    adaptationMeasuresHTW: {
        data: SliderItem[];
    }
    fourthBannerTitle: string;
    fourthBannerDescription: string;
    fourthImage: Image;
    callToActions: {
        data: Mixed[];
    }
    category_2: string;
    heading_2: string;
    description_2: string;
}
