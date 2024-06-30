import {Mixed, PageSection} from "./";

export interface Home {
    id: number;
    bannerTitle: string;
    secondBannerTitle: string;
    headerImageUrl: string;
    category: string;
    heading: string;
    description: string;
    bannerDescription: string;
    bannerImageUrl: string;
    reasons: {
        data: Mixed[];
    },
    pageSections: {
        data: PageSection[];
    },
    category_2: string;
    heading_2: string;
    description_2: string;
}