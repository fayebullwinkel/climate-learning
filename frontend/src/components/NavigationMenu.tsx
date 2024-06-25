import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Grid } from "@mui/material";
import { useMediaQuery } from 'react-responsive';
import '../css/NavigationMenu.css';

function NavigationMenu() {
    const [logoUrl, setLogoUrl] = React.useState<string>('');
    const [pageTitles, setPageTitles] = React.useState<string[]>([]);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const routes = ['/', '/climateAdaptation', '/campusCampaigns'];

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

        const fetchPageTitles = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/page-titles`);
                if (response.ok) {
                    const data = await response.json();
                    const titles = data.data.map((item: { attributes: { title: string; }; }) => item.attributes.title);
                    setPageTitles(titles);
                } else {
                    console.error('Failed to fetch page titles:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching page titles:', error);
            }
        };

        fetchLogoUrl();
        fetchPageTitles();
    }, []);

    const location = useLocation();
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const renderMenuItems = () => (
        pageTitles.map((title, index) => (
            <Button
                key={index}
                color="inherit"
                component={Link}
                to={routes[index]}
                sx={{
                    mx: 1,
                    fontWeight: location.pathname === routes[index] ? 'bold' : 'normal'
                }}
            >
                {title}
            </Button>
        ))
    );

    const renderDrawerItems = () => (
        <List>
            {pageTitles.map((title, index) => (
                <ListItem button key={index} component={Link} to={routes[index]} onClick={toggleDrawer(false)}>
                    <ListItemText primary={title} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
            >
                <Toolbar sx={{ minHeight: 100 }} className='customMainMenu'>
                    <Grid container alignItems="center" justifyContent="space-between">
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

                        {isMobile ? (
                            <>
                                <Grid item>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        color="inherit"
                                        aria-label="menu"
                                        onClick={toggleDrawer(true)}
                                        sx={{ ml: 1 }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Drawer
                                        anchor="right"
                                        open={drawerOpen}
                                        onClose={toggleDrawer(false)}
                                    >
                                        {renderDrawerItems()}
                                    </Drawer>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs />
                                <Grid item>
                                    {renderMenuItems()}
                                </Grid>
                                <Grid item xs />
                            </>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavigationMenu;