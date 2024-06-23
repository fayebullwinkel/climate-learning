import React, { useState, useRef, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import { SliderItem } from '../../types';
import '../../css/container/FlipCard.css'

interface FlipCardProps {
    item: SliderItem;
}

const FlipCard: React.FC<FlipCardProps> = ({ item }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [fontSize, setFontSize] = useState(20);
    const backCardRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        const adjustFontSize = () => {
            if (backCardRef.current) {
                let currentFontSize = fontSize;
                while (backCardRef.current.scrollHeight > backCardRef.current.clientHeight && currentFontSize > 10) {
                    currentFontSize -= 1;
                    setFontSize(currentFontSize);
                }
            }
        };

        adjustFontSize();
    }, [item.attributes.description, fontSize]);

    const frontCardStyle: React.CSSProperties = {
        backgroundImage: `url(${process.env.REACT_APP_BACKEND}${item.attributes.image?.data.attributes.url})`
    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={0.7} flipSpeedFrontToBack={0.7} >
            <div className={`card frontCard ${isFlipped ? 'flipped' : ''}`} style={frontCardStyle} onClick={handleClick}>
                <h2 className="heading">{item.attributes.heading}</h2>
            </div>

            <div className={`card back ${isFlipped ? 'flipped' : ''}`} onClick={handleClick} ref={backCardRef}>
                <p style={{ padding: '10px', fontSize: `${fontSize}px` }}>{item.attributes.description}</p>
            </div>
        </ReactCardFlip>
    );
};

export default FlipCard;