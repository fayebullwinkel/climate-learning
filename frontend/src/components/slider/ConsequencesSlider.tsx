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
        slidesToShow: 2,
        slidesToScroll: 2,
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
        <div style={{width: '70%', margin: '0 auto', padding: '1%'}}>
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