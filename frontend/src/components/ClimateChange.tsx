import React, {useEffect, useState} from "react";
import {ClimateChange as ClimateChangeType} from '../types';
import {ColorContainer, ImageContainer, Card} from "./container";
import {ImageCardType} from "@/types/ImageCardType";

function ClimateChange() {
    const [data, setData] = useState<ClimateChangeType | null>(null);
    const [imageCards, setImageCards] = useState<ImageCardType[]>([]);
    const [error, setError] = useState<string | null>(null);

    const overlayTextStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50%',
        margin: '0 auto'
    }

    useEffect(() => {
        const update = () => {
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
                            url: climateChangeData.attributes.image.data.attributes.url,
                        },
                        heading: climateChangeData.attributes.heading,
                        description: climateChangeData.attributes.description
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
                    setImageCards(imageCard.data)
                });
        };

        update();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-container">
            <ImageContainer title={data.bannerTitle} imageUrl={data.image.url}/>
            <ColorContainer heading={data.heading} description={data.description} color={"#F6EDD9"}/>

            <div style={overlayTextStyle}>
                {
                    imageCards.map((imageCard) => {
                        console.log(imageCard.attributes.image.data)
                        return <Card imageUrl={imageCard.attributes.image.data.attributes.url} heading={imageCard.attributes.heading} description={imageCard.attributes.description}/>
                    })
                }
            </div>
        </div>
    );
}

export default ClimateChange;
