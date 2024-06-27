import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link, useLocation} from 'react-router-dom';
import {Grid} from '@mui/material';
import '../css/NavigationMenu.css';
import {useMediaQuery} from "react-responsive";

function BottomMenu() {
    const [logoUrl, setLogoUrl] = React.useState<string>('');
    const [logoSmallUrl, setLogoSmallUrl] = React.useState<string>('');
    const [pageTitles] = React.useState<string[]>(['Mehr zum Projekt']);

    const routes = ['https://projekte.htw-berlin.de/hochschule/wegweiser-zum-gruenen-und-nachhaltigen-campus/'];

    React.useEffect(() => {
        const fetchLogoUrl = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/uploads/htw_Logo_Weiss_89d599b873.png`);
                if (response.ok) {
                    const url = response.url;
                    setLogoUrl(url);
                } else {
                    console.error('Failed to fetch logo:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching logo:', error);
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/uploads/htw_gruen_b0a56b3fbf.jpg`);
                if (response.ok) {
                    const url = await response.url;
                    setLogoSmallUrl(url);
                } else {
                    console.error('Failed to fetch logo:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching logo:', error);
            }
        };

        fetchLogoUrl();
    }, []);

    const location = useLocation();
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{top: 'auto', bottom: 0}}>
                <Toolbar sx={{minHeight: 100}} className='customBottomMenu'>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        component={Link}
                        to="/"
                        sx={{mr: 2, position: 'absolute', top: isMobile ? "25%": 0, "&:hover": { backgroundColor: "transparent" }}}
                    >
                        {logoUrl ? (
                            <img
                                src={isMobile ? logoSmallUrl : logoUrl}
                                alt="logo"
                                style={{
                                    width: 'auto',
                                    height: isMobile? '25px' : '70px',
                                    objectFit: 'contain'
                                }}
                            />
                        ) : (
                            <Typography variant="h6" component="div">
                                Loading...
                            </Typography>
                        )}
                    </IconButton>
                    <Grid container alignItems="center">
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item>
                                {pageTitles.map((title, index) => (
                                    <Button
                                        key={index}
                                        color="inherit"
                                        component="a"
                                        href={routes[index]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            mx: 1,
                                            fontWeight: location.pathname === routes[index] ? 'bold' : 'normal'
                                        }}
                                    >
                                        {title}
                                    </Button>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default BottomMenu;