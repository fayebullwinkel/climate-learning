import React from 'react';

interface ImageContainerProps {
    title: string;
    imageUrl: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ title, imageUrl }) => {
    const containerStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '40vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center 55%',
        boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.5)',
        backgroundImage: `url(${process.env.REACT_APP_BACKEND}${imageUrl})`,
        padding: '20px',
    };

    const overlayTextStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50px',
        transform: 'translateY(-50%)',
        color: 'white',
        maxWidth: '50%',
    }

    return (
        <div className="image-container" style={containerStyle}>
            <h1 style={overlayTextStyle}>{title}</h1>
        </div>
    );
};

export default ImageContainer;
