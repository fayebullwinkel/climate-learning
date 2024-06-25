import React, { useRef } from 'react';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Mixed } from "@/types";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/container/ImageBanner.css";
import { useMediaQuery } from 'react-responsive';

interface ImageBannerProps {
    title: string;
    imageUrl: string;
    description?: string;
    bannerItems?: Mixed[];
    showButton?: boolean;
}

const ImageBanner: React.FC<ImageBannerProps> = ({ title, imageUrl, description, bannerItems, showButton = true }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const sliderRef = useRef<Slider>(null); // Ref for the Slider component

    const bannerStyle: React.CSSProperties = {
        height: description ? '700px' : '600px',
        backgroundImage: `url(${process.env.REACT_APP_BACKEND}${imageUrl})`,
    };

    const contentStyle: React.CSSProperties = {
        top: description ? '30%' : '50%',
        maxWidth: isMobile ? "80%" : "50%",
    };

    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false
    };

    return (
        <div className='imageBanner' style={bannerStyle}>
            <div className='imageBannerContent' style={contentStyle}>
                <h1 className='imageBannerTitle'>{title}</h1>
                <p>{description}</p>
                {showButton && (
                    <Button variant="outlined" component={Link} to="/campusCampaigns" style={{ color: 'white', borderColor: 'white' }}>
                        Zu den Aktionen
                    </Button>
                )}
            </div>
            {bannerItems && (
                <div className='optionalDiv'>
                    {isMobile ? (
                        <div>
                            <Slider {...sliderSettings} ref={sliderRef}>
                                {bannerItems.map((consequence) => (
                                    <div key={consequence.id}>
                                        <h3>{consequence.attributes.heading}</h3>
                                        <p style={{ maxWidth: "65%", margin: '0 auto' }}>{consequence.attributes.description}</p>
                                    </div>
                                ))}
                            </Slider>
                            <div className="custom-arrows">
                                <IconButton onClick={() => sliderRef.current?.slickPrev()} style={{ color: '#87966B' }}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <IconButton onClick={() => sliderRef.current?.slickNext()} style={{ color: '#87966B' }}>
                                    <ArrowForwardIcon />
                                </IconButton>
                            </div>
                        </div>
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