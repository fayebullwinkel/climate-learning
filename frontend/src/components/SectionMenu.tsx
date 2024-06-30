import * as React from 'react';
import {useLocation} from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";
import {useMediaQuery} from 'react-responsive';
import {useState, useEffect} from "react";
import {PageSection} from "@/types";

interface SectionMenuProps {
    page: string;
}

function SectionMenu({page}: SectionMenuProps) {
    const [pageSections, setPageSections] = useState<PageSection[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/page-sections`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                if (!data.data) throw new Error('No page titles data available');
                setPageSections(data.data);
            } catch (error) {
                console.error('Error fetching page sections:', error);
            }
        };

        fetchData();
    }, []);

    const location = useLocation();
    const isMobile = useMediaQuery({maxWidth: 768});

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: "smooth", block: "start"});
        }
    };

    return (
        <Box sx={{flexGrow: 1, marginTop: '100px'}}>
            <Toolbar sx={{minHeight: 100}}>
                <Grid container alignItems="center" justifyContent={isMobile ? "flex-end" : "center"}>
                    {pageSections && !isMobile ? (
                        <>
                            {pageSections.map(section => (
                                <Grid item key={section.id}>
                                    {section.attributes.page === page ? (
                                        location.pathname === section.attributes.link ? (
                                            <Typography variant="h6" sx={{color: 'white'}}>
                                                {section.attributes.title}
                                            </Typography>
                                        ) : (
                                            <Button onClick={() => {
                                                const link = section.attributes.link;
                                                const fragment = link.includes('#') ? link.split('#')[1] : '';
                                                scrollToSection(fragment);
                                            }} color="inherit">
                                                {section.attributes.title}
                                            </Button>
                                        )
                                    ) : null}
                                </Grid>
                            ))}
                        </>
                    ) : null}
                </Grid>
            </Toolbar>
        </Box>
    );
}

export default SectionMenu;