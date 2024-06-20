import React from 'react';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Mixed } from "../../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageBannerProps {
    title: string;
    imageUrl: string;
    description?: string;
    consequences?: Mixed[];
}

const ImageBanner: React.FC<ImageBannerProps> = ({ title, imageUrl, description, consequences }) => {
    const bannerStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: description ? '700px' : '600px',
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
        maxWidth: window.innerWidth <= 768 ? "70%" : "50%",
        textAlign: 'justify',
        transform: 'translateY(-50%)',
    };

    const overlayTextStyle: React.CSSProperties = {
        fontStyle: 'italic'
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

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
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
                    {window.innerWidth <= 768 ? (
                        <Slider {...sliderSettings}>
                            {consequences.map(consequence => (
                                <div key={consequence.id}>
                                    <h2>{consequence.attributes.heading}</h2>
                                    <p>{consequence.attributes.description}</p>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div style={containerStyle}>
                            {consequences.map(consequence => (
                                <div key={consequence.id} style={{ flex: '1', margin: '0 10px' }}>
                                    <h2>{consequence.attributes.heading}</h2>
                                    <p>{consequence.attributes.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageBanner;