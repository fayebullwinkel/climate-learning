import {GridItem} from "../types";
import {Mixed} from './';
export interface ClimateAdaptation {
    id: number;
    bannerTitle: string;
    headerImageUrl: string;
    category: string;
    heading: string;
    description: string;
    secondImageUrl: string;
    secondBannerTitle: string;
    secondBannerDescription: string;
    adaptationMeasures: {
        data: Mixed[];
    }
    videoTitle: string;
    videoDescription: string;
    gridHeading: string;
    gridItems: {
        data:  GridItem[];
    }
    mapSliderItems: {
        data: Mixed[];
    }
}
