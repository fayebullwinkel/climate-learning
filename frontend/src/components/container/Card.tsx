import React from 'react';

interface CardProps {
    imageUrl: string;
    heading: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, heading, description }) => {
    const cardStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "250px",
        marginTop: '40px'
    };

    const cardImageStyle: React.CSSProperties = {
        width: "100%", // Ensures the image takes up the full width of its container
        height: "auto", // Automatically adjusts height to maintain aspect ratio
        maxHeight: "200px", // Adjust as needed to maintain consistent height
        objectFit: "cover", // Ensures the image covers the entire space, maintaining aspect ratio
    };

    return (
        <div style={cardStyle}>
            <img
                src={`${process.env.REACT_APP_BACKEND}${imageUrl}`}
                alt="Description"
                style={cardImageStyle}
            />
            <h2>{heading}</h2>
            <p>{description}</p>
        </div>
    );
}

export default Card;
