import React from "react";
import Slider from "react-slick";
import { Mixed } from "@/types";
import { useMediaQuery } from "react-responsive";
import "../../css/slider/MapSlider.css";

interface MapSliderProps {
    sliderItems: Mixed[];
}

const MapSlider: React.FC<MapSliderProps> = ({ sliderItems }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const containerStyle = {
        width: isMobile ? "85%" : "75%",
        margin: "0 auto",
        padding: "1%"
    };

    const sliderSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const renderContent = (item: Mixed, index: number) => (
        <div key={index} className="slideContent">
            <div style={{ marginBottom: "20px" }}>
                <h2>{item.attributes.heading}</h2>
                <p>{item.attributes.description}</p>
            </div>
            <div>
                {index === 1 ? (
                    <div>
                        <iframe
                            src="https://gdi.berlin.de/viewer/umweltatlas/wmsk_04107_klimanalysek2015/"
                            className="iframe"
                            title="Klimaanalysekarte"
                        >
                            <a href="https://gdi.berlin.de/viewer/umweltatlas/wmsk_04107_klimanalysek2015/">
                                Inhalt konnte nicht angezeigt werden, bitte folgen Sie diesem Link:
                                https://gdi.berlin.de/viewer/umweltatlas/wmsk_04107_klimanalysek2015/
                            </a>
                        </iframe>
                        <div className="source-link">
                            <a href="https://www.berlin.de/umweltatlas/klima/klimaanalyse/2014/karten/artikel.1024091.php" target="_blank" rel="noopener noreferrer">Quelle</a>
                        </div>
                    </div>
                ) : (
                    <div>
                        <iframe
                            src="https://gdi.berlin.de/viewer/umweltatlas/ua_versiegelung_2021/?lng=de"
                            className="iframe"
                            title="01.02 Versiegelung"
                        >
                            <a href="https://gdi.berlin.de/viewer/umweltatlas/ua_versiegelung_2021/?lng=de">
                                Inhalt konnte nicht angezeigt werden, bitte folgen Sie diesem Link:
                                https://gdi.berlin.de/viewer/umweltatlas/ua_versiegelung_2021/?lng=de
                            </a>
                        </iframe>
                        <div className="source-link">
                            <a href="https://www.berlin.de/umweltatlas/boden/versiegelung/2021/karten/artikel.1253292.php" target="_blank" rel="noopener noreferrer">Quelle</a>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );

    return (
        <div style={containerStyle}>
            {isMobile ? (
                <div>
                    {sliderItems.map((item, index) => renderContent(item, index))}
                </div>
            ) : (
                <Slider {...sliderSettings} className="slider">
                    {sliderItems.map((item, index) => (
                        <div key={index}>
                            {renderContent(item, index)}
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default MapSlider;