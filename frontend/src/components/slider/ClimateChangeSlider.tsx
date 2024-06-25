import Slider from "react-slick";
import { Co2Clock, StatistaGraph, TemperatureChart } from "./";
import React from "react";
import { SliderItem } from '@/types';
import '../../css/slider/ClimateChangeSlider.css';

interface ClimateChangeProps {
    sliderItems: SliderItem[];
}

const ClimateChangeSlider: React.FC<ClimateChangeProps> = ({ sliderItems }) => {

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
        width: window.innerWidth <= 768 ? '95%' : 'auto'
    }

    return (
        <div style={{ width: '70%', margin: '0 auto', padding: '1%' }}>
            <Slider {...sliderSettings}>
                <div className='customSlider'>
                    <h2 style={{ textAlign: 'justify' }}>{sliderItems[0].attributes.heading}</h2>
                    <p style={paragraphStyle}>{sliderItems[0].attributes.description} Quelle: <a
                        href="https://climate.nasa.gov/vital-signs/global-temperature/?intent=121"
                        target="_blank"
                        rel="noopener noreferrer">NASA/GISS</a>.</p>
                </div>
                <div className='customSlider'>
                    <TemperatureChart />
                </div>
                <div className='customSlider'>
                    <h2 style={{ textAlign: 'justify' }}>{sliderItems[1].attributes.heading}</h2>
                    <p style={paragraphStyle}>{sliderItems[1].attributes.description}</p>
                </div>
                <div className='customSlider'><StatistaGraph /></div>
                <div className='customSlider'>
                    <h2 style={{ textAlign: 'justify' }}>{sliderItems[2].attributes.heading}</h2>
                    <p style={paragraphStyle}>{sliderItems[2].attributes.description}</p>
                </div>
                <div className='customSlider'><Co2Clock /></div>
            </Slider>
        </div>
    );
}

export default ClimateChangeSlider;