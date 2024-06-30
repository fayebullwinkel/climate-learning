import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ConsequencesSlider } from '../slider';
import { AccordionItem, SliderItem } from '@/types';
import Box from '@mui/material/Box';
import '../../css/container/CustomAccordion.css';

interface CustomAccordionProps {
    data: {
        naturalConsequencesSliderItems: SliderItem[],
        socialConsequencesSliderItems: SliderItem[],
        economicConsequencesSliderItems: SliderItem[],
        [key: string]: SliderItem[];
    } | null;
    accordionItems: AccordionItem[];
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({ data, accordionItems }) => {
    if (!data) {
        throw new Error('CustomAccordion component requires non-null data prop.');
    }

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
                                {index !== accordionItems.length - 1 && (
                                    <div>
                                        <img src="./assets/klick.svg" alt="Click icon" className="arrow" />
                                    </div>
                                )}
                                {item.component ? item.component : <ConsequencesSlider sliderItems={data[item.dataKey!]} />}
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
