import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface VideoBannerProps {
    title: string,
    description: string
}

const VideoBanner: React.FC<VideoBannerProps> = ({ title, description }) => {
    const [iframeWidth, setIframeWidth] = useState<string>("900px");

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth <= 768 ? '80%' : '50%';
            setIframeWidth(newWidth);
        };

        // Initial width calculation
        handleResize();

        // Listen to window resize events
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <h2>{title}</h2>
            <p style={{ width: iframeWidth, margin: '0 auto', textAlign: 'justify' }}>{description}</p>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/k6S_A_K7Y08?si=Yt7OtFwK5xJXD9x6"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ margin: '20px', border: "0px", maxWidth: '100%'}}
            ></iframe>
        </div>
    );
};

export default VideoBanner;
