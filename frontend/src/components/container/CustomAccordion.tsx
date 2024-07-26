import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ConsequencesSlider } from "../slider";
import { AccordionItem, SliderItem } from "@/types";
import Box from "@mui/material/Box";
import "../../css/container/CustomAccordion.css";

interface CustomAccordionProps {
    data: {
        naturalConsequencesSliderItems: SliderItem[],
        socialConsequencesSliderItems: SliderItem[],
        economicConsequencesSliderItems: SliderItem[]
    } | null;
    accordionItems: AccordionItem[];
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({ data, accordionItems }) => {
    if (!data) {
        return <div>Error: CustomAccordion component requires non-null data prop.</div>;
    }

    const getSliderItems = (index: number) => {
        switch (index) {
            case 0:
                return data.naturalConsequencesSliderItems;
            case 1:
                return data.socialConsequencesSliderItems;
            case 2:
                return data.economicConsequencesSliderItems;
            default:
                return [];
        }
    };

    return (
        <div className="accordion-container">
            {accordionItems.map((item, index) => (
                <Box key={item.title} className="accordion-item">
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <h3>{item.title}</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            <>
                                <div>
                                    <img src="./assets/klick.svg" alt="Click icon" className="arrow" />
                                </div>
                                <ConsequencesSlider sliderItems={getSliderItems(index)} />
                                <div className="source-link">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">Quelle</a>
                                </div>
                            </>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ))}
        </div>
    );
};

export default CustomAccordion;