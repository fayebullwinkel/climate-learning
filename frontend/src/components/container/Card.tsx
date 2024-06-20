import React from 'react';
import Button from "@mui/material/Button";

interface CardProps {
    imageUrl: string;
    heading: string;
    description: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, heading, description, link }) => {
    const cardStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        textAlign: 'justify',
        width: window.innerWidth <= 768 ? "100%" : "30%",
        alignItems: 'flex-start',
        padding: '10px'
    };

    const cardImageStyle: React.CSSProperties = {
        width: "100%",
        height: "auto",
        maxHeight: "60%",
        objectFit: "cover",
        borderRadius: '10px'
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
            <Button variant="contained" href={link} size="small" target="_blank" rel="noopener noreferrer" style={{backgroundColor: '#76B900'}}>Mehr erfahren</Button>
        </div>
    );
}

export default Card;
