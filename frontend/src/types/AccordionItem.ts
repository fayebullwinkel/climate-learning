import {ReactElement} from "react";

export interface AccordionItem {
    title: string;
    dataKey?: string;
    component?: ReactElement;
    link: string;
}