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
import {usePages} from "../contexts";

function NavigationMenu() {
    const [logoUrl, setLogoUrl] = React.useState<string>('');
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const pages = usePages();

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

    const location = useLocation();
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const renderMenuItems = () => (
        pages.map((page, index) => (
            <Button
                key={index}
                color="inherit"
                component={Link}
                to={page.route}
                sx={{
                    mx: 1,
                    fontWeight: location.pathname === page.route ? 'bold' : 'normal'
                }}
            >
                {page.title}
            </Button>
        ))
    );

    const renderDrawerItems = () => (
        <List>
            {pages.map((page, index) => (
                <ListItem button key={index} component={Link} to={page.route} onClick={toggleDrawer(false)}>
                    <ListItemText primary={page.title} />
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
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        component={Link}
                        to="/"
                        sx={{ mr: 2, position: 'absolute',  "&:hover": { backgroundColor: "transparent" }}}
                    >
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt="logo"
                                style={{
                                    width: 'auto',
                                    height: isMobile? '50px' : '70px',
                                    objectFit: 'contain'
                                }}
                            />
                        ) : (
                            <Typography variant="h6" component="div">
                                Loading...
                            </Typography>
                        )}
                    </IconButton>
                    <Grid container alignItems="center" justifyContent={isMobile ? "flex-end" : "center"}>
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
                                <Grid item>
                                    {renderMenuItems()}
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavigationMenu;