import React, { useEffect, useState } from "react";
import { ClimateChange as ClimateChangeType, ImageCardType } from '../types';
import { ColorContainer, ImageContainer, Card } from "./container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ClimateChangeSlider} from "./";

function ClimateChange() {
    const [data, setData] = useState<ClimateChangeType | null>(null);
    const [imageCards, setImageCards] = useState<ImageCardType[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getImageCardsStyle = (): React.CSSProperties => {
        return {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            width: '70%',
            margin: '0 auto'
        };
    };

    const [imageCardsStyle, setImageCardsStyle] = useState<React.CSSProperties>(getImageCardsStyle());

    useEffect(() => {
        const update = async () => {
            fetch(`${process.env.REACT_APP_BACKEND}/api/climate-changes/1?populate=*`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data.data) {
                        throw new Error('No climate change data available');
                    }

                    const climateChangeData = data.data;
                    const formattedData: ClimateChangeType = {
                        id: climateChangeData.id,
                        bannerTitle: climateChangeData.attributes.bannerTitle,
                        image: {
                            url: climateChangeData.attributes.headerImage.data.attributes.url,
                        },
                        category: climateChangeData.attributes.category,
                        heading: climateChangeData.attributes.heading,
                        description: climateChangeData.attributes.description,
                        secondImage: {
                            url: climateChangeData.attributes.secondBannerImage.data.attributes.url
                        },
                        secondBannerTitle: climateChangeData.attributes.secondBannerTitle,
                        secondBannerDescription: climateChangeData.attributes.secondBannerDescription,
                        consequences: {
                            consequence_1: {
                                heading: climateChangeData.attributes.consequence_1_heading,
                                description: climateChangeData.attributes.consequence_1_description,
                            },
                            consequence_2: {
                                heading: climateChangeData.attributes.consequence_2_heading,
                                description: climateChangeData.attributes.consequence_2_description,
                            },
                            consequence_3: {
                                heading: climateChangeData.attributes.consequence_3_heading,
                                description: climateChangeData.attributes.consequence_3_description,
                            },
                        },
                        graphHeading: climateChangeData.attributes.graphHeading,
                        graphCaption: climateChangeData.attributes.graphCaption
                    };
                    setData(formattedData);
                })
                .catch(error => {
                    setError(error.message);
                });

            fetch(`${process.env.REACT_APP_BACKEND}/api/image-cards?populate=*`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(imageCard => {
                    setImageCards(imageCard.data);
                });
        };

        update();

        const handleResize = () => {
            setImageCardsStyle(getImageCardsStyle());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-container">
            <ImageContainer title={data.bannerTitle} imageUrl={data.image.url} />
            <ColorContainer category={data.category} heading={data.heading} description={data.description}
                            color={"#F6EDD9"} />
            <div style={{ padding: '1%' }}>
                <div style={imageCardsStyle}>
                    {
                        imageCards.map((imageCard: ImageCardType) => {
                            return <Card key={imageCard.id} imageUrl={imageCard.attributes.image.data.attributes.url}
                                         heading={imageCard.attributes.heading}
                                         description={imageCard.attributes.description}
                                         link={imageCard.attributes.link} />
                        })
                    }
                </div>
            </div>
            <ImageContainer title={data.secondBannerTitle} imageUrl={data.secondImage.url}
                            description={data.secondBannerDescription} consequences={data.consequences} />
            <ClimateChangeSlider heading={data.graphHeading} caption={data.graphCaption}/>
        </div>
    );
}

export default ClimateChange;