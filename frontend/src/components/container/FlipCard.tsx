import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { SliderItem } from '../../types';
import '../../css/FlipCard.css'

interface FlipCardProps {
    item: SliderItem;
}

const FlipCard: React.FC<FlipCardProps> = ({ item }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const frontCardStyle: React.CSSProperties = {
        backgroundImage: `url(${process.env.REACT_APP_BACKEND}${item.attributes.image?.data.attributes.url})`
    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={1.5} flipSpeedFrontToBack={1.5} >
            <div className={`card frontCard ${isFlipped ? 'flipped' : ''}`} style={frontCardStyle} onClick={handleClick}>
                <h2 className="heading">{item.attributes.heading}</h2>
            </div>

            <div className={`card back ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
                <p style={{ padding: '10px' }}>{item.attributes.description}</p>
            </div>
        </ReactCardFlip>
    );
};

export default FlipCard;