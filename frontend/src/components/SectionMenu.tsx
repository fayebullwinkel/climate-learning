import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import { useMediaQuery } from 'react-responsive';
import { usePages } from "../contexts";

function SectionMenu() {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const pages = usePages();
    const location = useLocation();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <Box sx={{ flexGrow: 1, marginTop: '100px' }}>
            <Toolbar sx={{ minHeight: 100 }}>
                <Grid container alignItems="center" justifyContent={isMobile ? "flex-end" : "center"}>
                    {!isMobile && pages.map(page => (
                        page.pageSections.map((section, index) => (
                            location.pathname === page.route ? (
                                <Grid item key={index}>
                                    <Button
                                        onClick={() => scrollToSection(`${section.attributes.oneWordHashtag}`)}
                                        color="inherit"
                                    >
                                        {section.attributes.menuName}
                                    </Button>
                                </Grid>
                            ) : null
                        ))
                    ))}
                </Grid>
            </Toolbar>
        </Box>
    );
}

export default SectionMenu;