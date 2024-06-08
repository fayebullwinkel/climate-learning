import React from 'react';

interface ColorContainerProps {
    heading: string;
    description: string;
    color: string;
}

const ColorContainer: React.FC<ColorContainerProps> = ({ heading, description, color }) => {
    const containerStyle: React.CSSProperties = {
        backgroundColor: color,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const textContainerStyle: React.CSSProperties = {
        width: '50%',
        textAlign: 'center',
    };

    return (
        <div className="color-container" style={containerStyle}>
            <h2 style={textContainerStyle}>{heading}</h2>
            <p style={textContainerStyle}>{description}</p>
        </div>
    );
};

export default ColorContainer;
