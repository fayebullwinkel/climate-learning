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

    const cardStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        margin: '20px',
        boxSizing: 'border-box',
        height: '450px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '10px',
        border: isFlipped ? '1px solid lightgrey' : 'none'
    };

    const frontCardStyle: React.CSSProperties = {
        ...cardStyle,
        backgroundImage: `url(${process.env.REACT_APP_BACKEND}${item.attributes.image?.data.attributes.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.5)'
    };

    const headingStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        zIndex: 1,
        width: '80%',
        textAlign: 'center',
    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div className="card front" style={frontCardStyle} onClick={handleClick}>
                <h2 style={headingStyle}>{item.attributes.heading}</h2>
            </div>

            <div className="card back" style={cardStyle} onClick={handleClick}>
                <p style={{padding: '10px'}}>{item.attributes.description}</p>
            </div>
        </ReactCardFlip>
    );
};

export default FlipCard;