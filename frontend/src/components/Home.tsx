import React, {useEffect, useState} from "react";
import {ClimateChangeSlider} from "./";
import {ClimateChange as ClimateChangeType, ImageCardType} from '../types';
import {ColorContainer, ImageContainer, Card} from "./container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        }
    };

    const [imageCardsStyle, setImageCardsStyle] = useState<React.CSSProperties>(getImageCardsStyle());


    useEffect(() => {
        const fetchData = async () => {
            try {
                const climateResponse = await fetch(`${process.env.REACT_APP_BACKEND}/api/climate-changes/1?populate=*`);
                if (!climateResponse.ok) throw new Error('Network response was not ok');
                const climateData = await climateResponse.json();
                if (!climateData.data) throw new Error('No climate change data available');
                const formattedData: ClimateChangeType = formatClimateData(climateData.data);
                setData(formattedData);

                const imageResponse = await fetch(`${process.env.REACT_APP_BACKEND}/api/image-cards?populate=*`);
                if (!imageResponse.ok) throw new Error('Network response was not ok');
                const imageData = await imageResponse.json();
                setImageCards(imageData.data);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchData();

        const handleResize = () => {
            setImageCardsStyle(getImageCardsStyle());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const formatClimateData = (climateData: any): ClimateChangeType => {
        return {
            id: climateData.id,
            bannerTitle: climateData.attributes.bannerTitle,
            headerImageUrl: climateData.attributes.headerImage.data.attributes.url,
            category: climateData.attributes.category,
            heading: climateData.attributes.heading,
            description: climateData.attributes.description,
            secondImageUrl: climateData.attributes.secondBannerImage.data.attributes.url,
            secondBannerTitle: climateData.attributes.secondBannerTitle,
            secondBannerDescription: climateData.attributes.secondBannerDescription,
            consequences: climateData.attributes.consequences,
            sliderItems: climateData.attributes.slider_items
        };
    };


    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-container">
            <ImageContainer title={data.bannerTitle} imageUrl={data.headerImageUrl}/>
            <ColorContainer category={data.category} heading={data.heading} description={data.description}
                            color={"#F6EDD9"}/>
            <div style={{padding: '1%'}}>
                <div style={imageCardsStyle}>
                    {
                        imageCards.map((imageCard: ImageCardType) => (
                            <Card key={imageCard.id} imageUrl={imageCard.attributes.image.data.attributes.url}
                                  heading={imageCard.attributes.heading}
                                  description={imageCard.attributes.description}
                                  link={imageCard.attributes.link}/>
                        ))
                    }
                </div>
            </div>
            <ImageContainer title={data.secondBannerTitle} imageUrl={data.secondImageUrl}
                            description={data.secondBannerDescription} consequences={data.consequences.data}/>
            <ClimateChangeSlider sliderItems={data.sliderItems.data}/>
        </div>
    );
}

export default ClimateChange;