import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Button } from "@mui/material";
import { useMediaQuery } from 'react-responsive';
import { SampleNextArrow, SamplePrevArrow, usePages } from "../../utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/container/ImageBanner.css";
import '../../css/Shared.css';
import { Image, Mixed } from "@/types";
import useHover from "../utils";
interface ImageBannerProps {
    title: string;
    image: Image;
    description?: string;
    bannerItems?: Mixed[];
    showButton?: boolean;
}

const ImageBanner: React.FC<ImageBannerProps> = ({ title, image, description, bannerItems, showButton = true }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const pages = usePages();
    const sliderRef = useRef<Slider>(null);
    const { showCredits, mousePosition, onMouseEnter, onMouseLeave, onMouseMove } = useHover(1500);

    const bannerStyle: React.CSSProperties = {
        height: description ? '700px' : '500px',
        backgroundImage: `url(${process.env.REACT_APP_BACKEND}${image.data.attributes.url})`,
    };

    const contentStyle: React.CSSProperties = {
        top: description ? '30%' : '50%',
        maxWidth: "85%",
    };

    const h3Style: React.CSSProperties = {
        textAlign: isMobile ? 'center' : 'left',
    }

    const TitleTag = description ? 'h2' : 'h1';

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
        <div className='image-banner' style={bannerStyle} onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}>
            {showCredits && image.data.attributes.caption && (
                <div style={{
                    position: 'fixed',
                    top: `${mousePosition.y + 10}px`,
                    left: `${mousePosition.x + 10}px`,
                    backgroundColor: '#F7FbF1',
                    color: 'grey',
                    padding: '5px',
                    borderRadius: '3px',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                    zIndex: 3,
                    fontSize: '12px'
                }}>
                    ©{image.data.attributes.caption}
                </div>
            )}
            <div className={isMobile ? 'image-banner-content-mobile' : 'image-banner-content'} style={contentStyle}>
                <TitleTag>{title}</TitleTag>
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
                                        <h3 style={h3Style}>{bannerItem.attributes.heading}</h3>
                                        <p>{bannerItem.attributes.description}</p>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        <div className='image-banner-container'>
                            {bannerItems.map(bannerItem => (
                                <div key={bannerItem.id} style={{ flex: '1' }}>
                                    <h3 style={h3Style}>{bannerItem.attributes.heading}</h3>
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