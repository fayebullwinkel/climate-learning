import {SliderItem} from "../types/";

export interface AccordionData {
    naturalConsequencesSliderItems: SliderItem[];
    socialConsequencesSliderItems: SliderItem[];
    economicConsequencesSliderItems: SliderItem[];
    [key: string]: SliderItem[];
}