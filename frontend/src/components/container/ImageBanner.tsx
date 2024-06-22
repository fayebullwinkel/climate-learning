import React from 'react';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Mixed } from "../../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/container/ImageBanner.css";

interface ImageBannerProps {
    title: string;
    imageUrl: string;
    description?: string;
    bannerItems?: Mixed[];
    showButton?: boolean;
}

const ImageBanner: React.FC<ImageBannerProps> = ({ title, imageUrl, description, bannerItems, showButton = true }) => {
    const bannerStyle: React.CSSProperties = {
        height: description ? '700px' : '600px',
        backgroundImage: `url(${process.env.REACT_APP_BACKEND}${imageUrl})`,
    };

    const contentStyle: React.CSSProperties = {
        top: description ? '30%' : '50%',
        maxWidth: window.innerWidth <= 768 ? "70%" : "50%",
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
        <div className='imageBanner' style={bannerStyle}>
            <div className='imageBannerContent' style={contentStyle}>
                <h1 className='imageBannerTitle'>{title}</h1>
                <p>{description}</p>
                {showButton && (
                    <Button variant="outlined" component={Link} to="/eventList" style={{ color: 'white', borderColor: 'white' }}>
                        Zu den Aktionen
                    </Button>
                )}
            </div>
            {bannerItems && (
                <div className='optionalDiv'>
                    {window.innerWidth <= 768 ? (
                        <Slider {...sliderSettings}>
                            {bannerItems.map(consequence => (
                                <div key={consequence.id}>
                                    <h2>{consequence.attributes.heading}</h2>
                                    <p>{consequence.attributes.description}</p>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className='imageBannerContainer'>
                            {bannerItems.map(consequence => (
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