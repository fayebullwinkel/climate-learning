import Slider from "react-slick";
import React from "react";
import { SliderItem } from '../../types';
import { FlipCard } from "../container";

interface ConsequencesProps {
    sliderItems: SliderItem[];
}

const ConsequencesSlider: React.FC<ConsequencesProps> = ({ sliderItems }) => {

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div style={{padding: '1%'}}>
            <p style={{textAlign: 'left'}}>Klicke auf die einzelnen Karten, um mehr zu erfahren: </p>
            <Slider {...sliderSettings}>
                {sliderItems.map((item, index) => (
                    <div key={index}>
                        <FlipCard item={item} />
                    </div>
                ))}
            </Slider>
            <style>{`
                .slick-prev:before, .slick-next:before {
                    color: #76b900;
                }
                .slick-track {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                }
            `}</style>
        </div>
    );
}

export default ConsequencesSlider;