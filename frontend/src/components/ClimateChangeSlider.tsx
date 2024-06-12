import Slider from "react-slick";
import {TemperatureChart} from "./";
import React from "react";

interface ClimateChangeProps {
    heading: string;
    caption: string;
}

const ClimateChangeSlider: React.FC<ClimateChangeProps> = ({heading, caption}) => {
    const sliderSettings = {
        dots: true,
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

    return (
        <div style={{width: '70%', margin: '0 auto', padding: '1%'}}>
            <Slider {...sliderSettings}>
                <div style={sliderStyle}>
                    <h2 style={{textAlign: 'justify'}}>{heading}</h2>
                    <p style={{textAlign: 'justify'}}>{caption} Quelle: <a
                        href="https://climate.nasa.gov/vital-signs/global-temperature/?intent=121"
                        target="_blank">NASA/GISS</a>.</p>
                </div>
                <div style={sliderStyle}>
                    <TemperatureChart/>
                </div>
                <div style={sliderStyle}>Slider 2 - Left Content</div>
                <div style={sliderStyle}>Slider 2 - Right Content</div>
                <div style={sliderStyle}>Slider 3 - Left Content</div>
                <div style={sliderStyle}>Slider 3 - Right Content</div>
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