import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

function BottomMenu() {
    const [logoUrl, setLogoUrl] = React.useState<string>('');
    const [pageTitles] = React.useState<string[]>(['Mehr zum Projekt']);

    const routes = ['https://projekte.htw-berlin.de/hochschule/wegweiser-zum-gruenen-und-nachhaltigen-campus/'];

    React.useEffect(() => {
        const fetchLogoUrl = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/uploads/htw_gruen_2bd9f9687e.jpg`);
                if (response.ok) {
                    const url = response.url;
                    setLogoUrl(url);
                } else {
                    console.error('Failed to fetch logo:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching logo:', error);
            }
        };

        fetchLogoUrl();
    }, []);

    const menuStyle: React.CSSProperties = {
        backgroundColor: '#87966B',
        color: "white",
        padding: '1%'
    };

    const location = useLocation();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ minHeight: 100 }} style={menuStyle}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                component={Link}
                                to="/"
                                sx={{ mr: 2 }}
                            >
                                {logoUrl ? (
                                    <img
                                        src={logoUrl}
                                        alt="logo"
                                        style={{
                                            width: 'auto',
                                            height: '40px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                ) : (
                                    <Typography variant="h6" component="div">
                                        Loading...
                                    </Typography>
                                )}
                            </IconButton>
                        </Grid>

                        {/* Spacer to push the next items to the center */}
                        <Grid item xs />

                        <Grid item>
                            <Grid container direction="column" alignItems="center">
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

                        {/* Spacer to push the next items to the right */}
                        <Grid item xs />
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default BottomMenu;