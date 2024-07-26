import Slider from "react-slick";
import React from "react";
import { SliderItem } from '@/types';
import { FlipCard } from "../container";
import '../../css/slider/FlipCardSlider.css';

interface ConsequencesProps {
    sliderItems: SliderItem[];
}

const ConsequencesSlider: React.FC<ConsequencesProps> = ({ sliderItems }) => {
    const slidesToShow = (sliderItems.length < 3)? sliderItems.length : 3;
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
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
        <div className='flipCardContainer'>
            <Slider {...sliderSettings}>
                {sliderItems.map((item, index) => (
                    <div key={index}>
                        <FlipCard item={item}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ConsequencesSlider;