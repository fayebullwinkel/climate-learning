import React from 'react';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

interface Consequence {
    heading: string;
    description: string;
}

interface ImageBannerProps {
    title: string;
    imageUrl: string;
    description?: string;
    consequences?: {
        consequence_1: Consequence;
        consequence_2: Consequence;
        consequence_3: Consequence;
    };
}

const ImageBanner: React.FC<ImageBannerProps> = ({ title, imageUrl, description, consequences }) => {
    const bannerStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: description ? '70vh' : '60vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center 55%',
        boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.5)',
        backgroundImage: `url(${process.env.REACT_APP_BACKEND}${imageUrl})`,
        paddingTop: '2%'
    };

    const contentStyle: React.CSSProperties = {
        position: 'relative',
        top: description ? '30%' : '50%',
        left: '10%',
        color: 'white',
        maxWidth: '50%',
        textAlign: 'justify',
        transform: 'translateY(-50%)',
    };

    const overlayTextStyle: React.CSSProperties = {
        fontStyle: 'italic',
        transform: 'translateX(-1.2%)'
    };

    const optionalDivStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#76B900',
        color: 'white'
    };

    const containerStyle: React.CSSProperties = {
        width: '70%',
        display: 'flex',
        justifyContent: 'space-between',
        margin: 'auto',
        textAlign: 'justify'
    };

    return (
        <div style={bannerStyle}>
            <div style={contentStyle}>
                <h1 style={overlayTextStyle}>{title}</h1>
                <p>{description}</p>
                {description && (
                    <Button variant="outlined" component={Link} to="/eventList" style={{ color: 'white', borderColor: 'white' }}>
                        Zu den Aktionen
                    </Button>
                )}
            </div>
            {consequences && (
                <div style={optionalDivStyle}>
                    <div style={containerStyle}>
                        <div style={{ flex: '1', margin: '0 10px' }}>
                            <h2>{consequences.consequence_1.heading}</h2>
                            <p>{consequences.consequence_1.description}</p>
                        </div>
                        <div style={{ flex: '1', margin: '0 10px' }}>
                            <h2>{consequences.consequence_2.heading}</h2>
                            <p>{consequences.consequence_2.description}</p>
                        </div>
                        <div style={{ flex: '1', margin: '0 10px' }}>
                            <h2>{consequences.consequence_3.heading}</h2>
                            <p>{consequences.consequence_3.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageBanner;
