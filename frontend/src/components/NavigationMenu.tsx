import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import {Grid} from "@mui/material";

function NavigationMenu() {
    const menuStyle: React.CSSProperties = {
        backgroundColor: '#F7FBF1',
        color: "black"
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', height: 100 }}
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
                                <img
                                    src="https://www.svgrepo.com/show/270536/earth-day-ecology.svg"
                                    alt="logo"
                                    width="80"
                                    height="80"
                                />
                            </IconButton>
                        </Grid>

                        {/* Spacer to push the next items to the center */}
                        <Grid item xs />

                        <Grid item>
                            <Typography variant="h6" component="div">
                                <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
                                    Klimaschutz
                                </Button>
                                <Button color="inherit" component={Link} to="/climateAdaptation" sx={{ mx: 1 }}>
                                    Klimaanpassung
                                </Button>
                                <Button color="inherit" component={Link} to="/eventList" sx={{ mx: 1 }}>
                                    Aktuelles am Campus
                                </Button>
                            </Typography>
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