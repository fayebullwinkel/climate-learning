import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ConsequencesSlider, QuizSlider } from '../slider';
import { SliderItem } from '../../types';
import Box from '@mui/material/Box';
import '../../css/container/CustomAccordion.css';

interface CustomAccordionProps {
    data: {
        naturalConsequencesSliderItems: SliderItem[],
        socialConsequencesSliderItems: SliderItem[],
        economicConsequencesSliderItems: SliderItem[],
        [key: string]: SliderItem[];
    } | null;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({ data }) => {
    if (!data) {
        throw new Error('CustomAccordion component requires non-null data prop.');
    }

    const accordionItems: { title: string; dataKey?: string; component?: JSX.Element; link: string }[] = [
        { title: 'Natürliche Folgen', dataKey: 'naturalConsequencesSliderItems', link: 'https://climate.ec.europa.eu/climate-change/consequences-climate-change_de#territoriale-bedrohungen' },
        { title: 'Gesellschaftliche Gefahren', dataKey: 'socialConsequencesSliderItems', link: 'https://climate.ec.europa.eu/climate-change/consequences-climate-change_de#territoriale-bedrohungen' },
        { title: 'Wirtschaftliche Gefahren', dataKey: 'economicConsequencesSliderItems', link: 'https://climate.ec.europa.eu/climate-change/consequences-climate-change_de#territoriale-bedrohungen' },
        { title: 'Teste dein Wissen', component: <QuizSlider />, link: 'https://www.geo.de/natur/naturquiz/16518-quiz-quiz-kennen-sie-die-skurrilsten-folgen-des-klimawandels' },
    ];

    return (
        <>
            {accordionItems.map((item, index) => (
                <Box key={item.title} className="accordion-item">
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <h3>{item.title}</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            {index !== accordionItems.length - 1 && (
                                <div>
                                    <img src="./assets/klick.svg" alt="Click icon" className="arrow" />
                                </div>
                            )}
                            {item.component ? item.component : <ConsequencesSlider sliderItems={data[item.dataKey!]} />}
                            <div className="source-link">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">Quelle</a>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ))}
        </>
    );
};

export default CustomAccordion;
