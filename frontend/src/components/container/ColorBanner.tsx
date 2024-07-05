import React from 'react';
import '../../css/container/ColorBanner.css';
import '../../css/container/Banner.css';
import {useMediaQuery} from "react-responsive";

interface ColorBannerProps {
    category: string;
    heading: string;
    description: string;
    color: string;
}

const ColorBanner: React.FC<ColorBannerProps> = ({ category, heading, description, color }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <div className="color-banner" style={{ backgroundColor: color }}>
            <div className={isMobile ? 'text-container-mobile' : 'text-container'}>
                <h3 className="category-heading">{category}</h3>
                <h2>{heading}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default ColorBanner;