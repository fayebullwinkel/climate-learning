import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";
import "../../css/container/VideoBanner.css";

interface VideoBannerProps {
    title: string,
    description: string
}

const VideoBanner: React.FC<VideoBannerProps> = ({ title, description }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <div className="video-banner">
            <h2>{title}</h2>
            <iframe
                width={isMobile ? "100%" : "560"}
                height={isMobile ? "200" : "315"}
                src="https://www.youtube.com/embed/k6S_A_K7Y08?si=Yt7OtFwK5xJXD9x6"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            <p>{description}</p>
        </div>
    );
};

export default VideoBanner;