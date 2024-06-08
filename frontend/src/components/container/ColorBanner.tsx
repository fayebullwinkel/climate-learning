import React from 'react';

interface ColorBannerProps {
    heading: string;
    description: string;
    color: string;
}

const ColorBanner: React.FC<ColorBannerProps> = ({ heading, description, color }) => {
    const bannerStyle: React.CSSProperties = {
        backgroundColor: color,
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const textContainerStyle: React.CSSProperties = {
        width: '50%',
        textAlign: 'center',
    };

    return (
        <div style={bannerStyle}>
            <h2 style={textContainerStyle}>{heading}</h2>
            <p style={textContainerStyle}>{description}</p>
        </div>
    );
};

export default ColorBanner;
