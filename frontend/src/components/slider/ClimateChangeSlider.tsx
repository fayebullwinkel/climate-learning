import Slider from "react-slick";
import { Co2Clock, StatistaGraph, TemperatureChart } from "./";
import React from "react";
import { SliderItem } from '@/types';
import '../../css/slider/ClimateChangeSlider.css';
import '../../css/container/Banner.css';

interface ClimateChangeProps {
    sliderItems: SliderItem[];
    heading: string;
    description: string;
}

const ClimateChangeSlider: React.FC<ClimateChangeProps> = ({ sliderItems, heading, description }) => {

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

    const isMobile = window.innerWidth <= 768;

    return (
        <div>
            <div className={isMobile ? 'text-container-mobile centered-container' : 'text-container centered-container'}>
                <h2>{heading}</h2>
                <p>{description}</p>
            </div>
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