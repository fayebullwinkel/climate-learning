import React from 'react';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

interface ImageBannerProps {
    title: string;
    imageUrl: string;
    description?: string;
    showButton?: boolean;
}

const ImageBanner: React.FC<ImageBannerProps> = ({ title, imageUrl, description, showButton }) => {
    const bannerStyle: React.CSSProperties = {
        width: '100%',
        height: '40vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center 55%',
        boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.5)',
        backgroundImage: `url(${process.env.REACT_APP_BACKEND}${imageUrl})`,
        padding: '20px',
    };

    const contentStyle: React.CSSProperties = {
        position: 'relative',
        top: '50%',
        left: '5%',
        color: 'white',
        maxWidth: '50%',
        textAlign: 'justify',
        transform: 'translateY(-50%)'
    };

    const overlayTextStyle: React.CSSProperties = {
        fontStyle: 'italic',
        transform: 'translateX(-1.2%)'
    };

    return (
        <div style={bannerStyle}>
            <div style={contentStyle}>
                <h1 style={overlayTextStyle}>{title}</h1>
                <p>{description}</p>
                {showButton && (
                    <Button variant="outlined" component={Link} to="/eventList" style={{color: 'white', borderColor: 'white'}}>
                        Zu den Aktionen
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ImageBanner;