import React from 'react';

interface ColorBannerProps {
    category: string;
    heading: string;
    description: string;
    color: string;
}

const ColorBanner: React.FC<ColorBannerProps> = ({ category, heading, description, color }) => {
    const bannerStyle: React.CSSProperties = {
        backgroundColor: color,
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const textContainerStyle: React.CSSProperties = {
        width: window.innerWidth <= 768 ? '100%' : '50%',
        textAlign: 'center',
    };

    return (
        <div style={bannerStyle}>
            <div style={textContainerStyle}>
                <h3 style={{color: '#76B900'}}>{category}</h3>
                <h2>{heading}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default ColorBanner;
