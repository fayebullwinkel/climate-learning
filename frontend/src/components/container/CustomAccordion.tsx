import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ConsequencesSlider } from '../slider';
import { SliderItem } from '../../types';
import Box from '@mui/material/Box';
import QuizSlider from "../../components/slider/QuizSlider";

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

    const accordionItems: { title: string; dataKey?: string; component?: JSX.Element }[] = [
        { title: 'Natürliche Folgen', dataKey: 'naturalConsequencesSliderItems' },
        { title: 'Gesellschaftliche Gefahren', dataKey: 'socialConsequencesSliderItems' },
        { title: 'Wirtschaftliche Gefahren', dataKey: 'economicConsequencesSliderItems' },
        { title: 'Teste dein Wissen', component: <QuizSlider /> },
    ];

    return (
        <>
            {accordionItems.map((item, index) => (
                <Box key={item.title} sx={{ marginBottom: index === accordionItems.length - 1 ? 0 : -1, width: '70%', margin: '0 auto'}}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <h3>{item.title}</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            {item.component ? item.component : <ConsequencesSlider sliderItems={data[item.dataKey!]} />}
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ))}
        </>
    );
};

export default CustomAccordion;