import React from 'react';

interface ImgHeadingTextProps {
    imageUrl: string;
    heading: string;
    description: string;
}

const ImgHeadingText: React.FC<ImgHeadingTextProps> = ({ imageUrl, heading, description }) => {
    return (
        <div className="img-heading-text">
            <img src={imageUrl} alt="Description" />
            <h2>{heading}</h2>
            <p>{description}</p>
        </div>
    );
}

export default ImgHeadingText;
