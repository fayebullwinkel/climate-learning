import React from 'react';
import { UseHover } from "../../utils";

interface HoverImageProps {
    src: string;
    alt: string;
    credits: string;
}

const HoverImage: React.FC<HoverImageProps> = ({ src, alt, credits }) => {
    const { showCredits, onMouseEnter, onMouseLeave } = UseHover(300);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
                src={src}
                alt={alt}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{ display: 'block' }}
            />
            {showCredits && (
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '5px',
                    borderRadius: '3px',
                }}>
                    {credits}
                </div>
            )}
        </div>
    );
};

export default HoverImage;