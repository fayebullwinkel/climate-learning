import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation } from 'react-router-dom';
import { Grid } from "@mui/material";

function NavigationMenu() {
    const [logoUrl, setLogoUrl] = React.useState<string>('');

    React.useEffect(() => {
        const fetchLogoUrl = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/uploads/htw_logo_bg_292f5a4372.jpg`);
                if (response.ok) {
                    const url = await response.url;
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
        backgroundColor: '#F7FBF1',
        color: "black",
        padding: '1%'
    };

    const location = useLocation();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
            >
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
                            <Button
                                color="inherit"
                                component={Link}
                                to="/"
                                sx={{
                                    mx: 1,
                                    fontWeight: location.pathname === '/' ? 'bold' : 'normal'
                                }}
                            >
                                Klimaschutz
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/climateAdaptation"
                                sx={{
                                    mx: 1,
                                    fontWeight: location.pathname === '/climateAdaptation' ? 'bold' : 'normal'
                                }}
                            >
                                Klimaanpassung
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/eventList"
                                sx={{
                                    mx: 1,
                                    fontWeight: location.pathname === '/eventList' ? 'bold' : 'normal'
                                }}
                            >
                                Aktuelles am Campus
                            </Button>
                        </Grid>

                        {/* Spacer to push the next items to the right */}
                        <Grid item xs />

                        <Grid item>
                            <Button color="inherit">Login</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavigationMenu;
