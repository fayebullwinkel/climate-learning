import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { SliderItem } from '../../types';

interface FlipCardProps {
    item: SliderItem;
}

const FlipCard: React.FC<FlipCardProps> = ({ item }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const imageStyle: React.CSSProperties = {
        width: "100%",
        height: "auto",
        maxHeight: "400px",
        objectFit: 'cover',
        borderRadius: '10px',
    };

    const cardStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'justify',
        padding: '20px',
        boxSizing: 'border-box',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
    };

    const headingStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        zIndex: 1,
    };

    const imageUrl: string | undefined = item.attributes.image?.data.attributes.url;

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div className="card front" style={cardStyle} onClick={handleClick}>
                <h2 style={headingStyle}>{item.attributes.heading}</h2>
                <img
                    src={`${process.env.REACT_APP_BACKEND}${imageUrl}`}
                    alt="Image of consequence of climate change"
                    style={imageStyle}
                />
            </div>

            <div className="card back" style={cardStyle} onClick={handleClick}>
                <p>{item.attributes.description}</p>
            </div>
        </ReactCardFlip>
    );
};

export default FlipCard;