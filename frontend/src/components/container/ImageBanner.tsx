import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Button, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useMediaQuery } from 'react-responsive';
import { usePages } from "../../contexts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/container/ImageBanner.css";
import '../../css/Shared.css';
import {Mixed} from "@/types";

interface ImageBannerProps {
    title: string;
    imageUrl: string;
    description?: string;
    bannerItems?: Mixed[];
    showButton?: boolean;
}

const ImageBanner: React.FC<ImageBannerProps> = ({ title, imageUrl, description, bannerItems, showButton = true }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const pages = usePages();
    const sliderRef = useRef<Slider>(null);

    const bannerStyle: React.CSSProperties = {
        height: description ? '700px' : '500px',
        backgroundImage: `url(${process.env.REACT_APP_BACKEND}${imageUrl})`,
    };

    const contentStyle: React.CSSProperties = {
        top: description ? '30%' : '50%',
        maxWidth: "80%",
    };

    function SampleNextArrow(props: any) {
        const { style, onClick } = props;
        return (
            <div className="arrow-right" onClick={onClick} style={style}>
                <IconButton style={{ color: '#87966B', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <ArrowForwardIcon />
                </IconButton>
            </div>
        );
    }

    function SamplePrevArrow(props: any) {
        const { style, onClick } = props;
        return (
            <div className="arrow-left" onClick={onClick} style={style}>
                <IconButton style={{ color: '#87966B', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <ArrowBackIcon />
                </IconButton>
            </div>
        );
    }

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className='image-banner' style={bannerStyle}>
            <div className='image-banner-content' style={contentStyle}>
                <h1 className='image-banner-title'>{title}</h1>
                {description && <p>{description}</p>}
                {showButton && (
                    <Button
                        variant="outlined"
                        component={Link}
                        to={pages[pages.length - 1].route}
                        style={{ color: 'white', borderColor: 'white' }}
                    >
                        Erkunde die Aktionen
                    </Button>
                )}
            </div>
            {bannerItems && (
                <div className='optional-div'>
                    {isMobile ? (
                        <div className="slider-container">
                            <Slider {...sliderSettings} ref={sliderRef}>
                                {bannerItems.map((bannerItem) => (
                                    <div key={bannerItem.id}>
                                        <h3>{bannerItem.attributes.heading}</h3>
                                        <p>{bannerItem.attributes.description}</p>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        <div className='image-banner-container'>
                            {bannerItems.map(bannerItem => (
                                <div key={bannerItem.id} style={{ flex: '1' }}>
                                    <h2>{bannerItem.attributes.heading}</h2>
                                    <p>{bannerItem.attributes.description}</p>
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