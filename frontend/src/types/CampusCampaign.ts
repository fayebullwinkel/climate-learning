import {Campaign} from "./";

export interface CampusCampaign {
    id: number;
    bannerTitle: string;
    headerImageUrl: string;
    category: string;
    heading: string;
    description: string;
    currentCampaigns: Campaign[];
    campaigns: Campaign[];
    filterText: string;
    category2: string;
    heading2: string;
    description2: string;
}
