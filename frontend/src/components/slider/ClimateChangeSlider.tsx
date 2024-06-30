import Slider from "react-slick";
import { Co2Clock, StatistaGraph, TemperatureChart } from "./";
import React from "react";
import { SliderItem } from '@/types';
import '../../css/slider/ClimateChangeSlider.css';

interface ClimateChangeProps {
    sliderItems: SliderItem[];
}

const ClimateChangeSlider: React.FC<ClimateChangeProps> = ({ sliderItems}) => {

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

    const paragraphStyle: React.CSSProperties = {
        width: window.innerWidth <= 768 ? '95%' : 'auto',
    }

    return (
        <div className='slider-container'>
            <div className='custom-slider'>
                <Slider {...sliderSettings}>
                    <div>
                        <h2>{sliderItems[0].attributes.heading}</h2>
                        <p style={paragraphStyle}>{sliderItems[0].attributes.description} Quelle: <a
                            href="https://climate.nasa.gov/vital-signs/global-temperature/?intent=121"
                            target="_blank"
                            rel="noopener noreferrer">NASA/GISS</a>.</p>
                    </div>
                    <div>
                        <TemperatureChart />
                    </div>
                    <div>
                        <h2>{sliderItems[1].attributes.heading}</h2>
                        <p style={paragraphStyle}>{sliderItems[1].attributes.description}</p>
                    </div>
                    <div><StatistaGraph /></div>
                    <div>
                        <h2>{sliderItems[2].attributes.heading}</h2>
                        <p style={paragraphStyle}>{sliderItems[2].attributes.description}</p>
                    </div>
                    <div><Co2Clock /></div>
                </Slider>
            </div>
        </div>

    );
}

export default ClimateChangeSlider;