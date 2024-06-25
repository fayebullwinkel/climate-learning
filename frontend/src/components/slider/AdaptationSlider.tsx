import Slider from "react-slick";
import React from "react";
import { SliderItem } from '@/types';
import { FlipCard } from "../container";
import '../../css/slider/FlipCardSlider.css';

interface AdaptationProps {
    sliderItems: SliderItem[];
}

const AdaptationSlider: React.FC<AdaptationProps> = ({ sliderItems }) => {
    const sliderSettings = {
        dots: true,
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
        <div className='flipCardContainer adaptationHTWContent'>
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

export default AdaptationSlider;