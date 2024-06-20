import Slider from "react-slick";
import {Co2Clock, StatistaGraph, TemperatureChart} from "./";
import React from "react";
import { SliderItem } from '../../types';

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

    const sliderStyle: React.CSSProperties = {
        width: '50%',
        height: '100%',
        display: 'inline-block',
    };

    const paragraphStyle: React.CSSProperties = {
        textAlign: 'justify',
        width: window.innerWidth <= 768 ? '95%' : 'auto'
    }

    return (
        <div style={{width: '70%', margin: '0 auto', padding: '1%'}}>
            <Slider {...sliderSettings}>
                <div style={sliderStyle}>
                    <h2 style={{textAlign: 'justify'}}>{sliderItems[0].attributes.heading}</h2>
                    <p style={paragraphStyle}>{sliderItems[0].attributes.description} Quelle: <a
                        href="https://climate.nasa.gov/vital-signs/global-temperature/?intent=121"
                        target="_blank"
                        rel="noopener noreferrer">NASA/GISS</a>.</p>
                </div>
                <div style={sliderStyle}>
                    <TemperatureChart/>
                </div>
                <div style={sliderStyle}>
                    <h2 style={{textAlign: 'justify'}}>{sliderItems[1].attributes.heading}</h2>
                    <p style={paragraphStyle}>{sliderItems[1].attributes.description}</p>
                </div>
                <div style={sliderStyle}><StatistaGraph/></div>
                <div style={sliderStyle}>
                    <h2 style={{textAlign: 'justify'}}>{sliderItems[2].attributes.heading}</h2>
                    <p style={paragraphStyle}>{sliderItems[2].attributes.description}</p>
                </div>
                <div style={sliderStyle}><Co2Clock /></div>
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

export default ClimateChangeSlider;