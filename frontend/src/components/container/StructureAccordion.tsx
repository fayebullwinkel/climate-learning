import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card } from './';
import '../../css/container/CustomAccordion.css';
import Box from "@mui/material/Box";

interface StructureAccordionProps {
    titles: string[];
    groupedSections: { [p: string]: any[] };
}

const StructureAccordion: React.FC<StructureAccordionProps> = ({ titles, groupedSections }) => {
    return (
        <div className="accordion-container">
            {titles.map((title, index) => (
                <Box key={title} className="accordion-item">
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />} // Icon for expand/collapse
                            aria-controls={`panel-${index}-content`}
                            id={`panel-${index}-header`}
                        >
                            <h3>{title}</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            {groupedSections[title.toLowerCase()]?.map((section, sectionIndex) => (
                                <Card
                                    key={sectionIndex}
                                    imageUrl={section.attributes.image.data.attributes.url}
                                    heading={section.attributes.title}
                                    description={section.attributes.description}
                                    link={section.attributes.link}
                                    section={true}
                                />
                            ))}
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ))}
        </div>
    );
};

export default StructureAccordion;
