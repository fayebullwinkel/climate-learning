import React from 'react';
import Button from "@mui/material/Button";
import '../../css/container/Card.css';

interface CardProps {
    imageUrl: string;
    heading: string;
    description: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, heading, description, link }) => {
    const cardStyle: React.CSSProperties = {
        width: window.innerWidth <= 768 ? "100%" : "30%",
    };

    return (
        <div style={cardStyle} className='customCard'>
            <img
                src={`${process.env.REACT_APP_BACKEND}${imageUrl}`}
                alt="Thematisch passendes Bild"
                className='imageCard'
            />
            <h2>{heading}</h2>
            <p>{description}</p>
            <Button variant="contained" href={link} size="small" target="_blank" rel="noopener noreferrer" className='customButton'>Mehr erfahren</Button>
        </div>
    );
}

export default Card;
