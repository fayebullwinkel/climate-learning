import React, { useEffect, useState } from "react";
import { ClimateChangeSlider } from "./slider";
import { AccordionData, ClimateChange as ClimateChangeType, ImageCardType } from '../types';
import { ColorContainer, ImageContainer, Card, CustomAccordion } from "./container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getImageCardsStyle } from './';

function ClimateChange() {
    const [data, setData] = useState<ClimateChangeType | null>(null);
    const [accordionData, setAccordionData] = useState<AccordionData | null>(null);
    const [imageCards, setImageCards] = useState<ImageCardType[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [imageCardsStyle, setImageCardsStyle] = useState<React.CSSProperties>(getImageCardsStyle());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const climateResponse = await fetch(`${process.env.REACT_APP_BACKEND}/api/climate-changes/1?populate=headerImage,secondBannerImage,consequences, actions,slider_items,consequence_slider_items.image,social_consequences,social_consequences.image,economic_consequences,economic_consequences.image, thirdBannerImage`);
                if (!climateResponse.ok) throw new Error('Network response was not ok');
                const climateData = await climateResponse.json();
                if (!climateData.data) throw new Error('No climate change data available');
                const formattedData: ClimateChangeType = formatClimateData(climateData.data);
                setData(formattedData);
                setAccordionData({
                    naturalConsequencesSliderItems: formattedData.naturalConsequences.data,
                    socialConsequencesSliderItems: formattedData.socialConsequences.data,
                    economicConsequencesSliderItems: formattedData.economicConsequences.data
                });

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
            sliderItems: climateData.attributes.slider_items,
            category_2: climateData.attributes.category_2,
            heading_2: climateData.attributes.heading_2,
            description_2: climateData.attributes.description_2,
            naturalConsequences: climateData.attributes.consequence_slider_items,
            socialConsequences: climateData.attributes.social_consequences,
            economicConsequences: climateData.attributes.economic_consequences,
            thirdImageUrl: climateData.attributes.thirdBannerImage.data.attributes.url,
            category_3: climateData.attributes.category_3,
            heading_3: climateData.attributes.heading_3,
            description_3: climateData.attributes.description_3,
            actions: climateData.attributes.actions
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
            <ImageContainer title={data.bannerTitle} imageUrl={data.headerImageUrl} showButton={false}/>
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
                            description={data.secondBannerDescription} bannerItems={data.consequences.data}/>
            <ClimateChangeSlider sliderItems={data.sliderItems.data}/>
            <ColorContainer category={data.category_2} heading={data.heading_2} description={data.description_2}
                            color={"#F6EDD9"}/>
            <div style={{margin: '20px 0 20px 0'}}>
                <CustomAccordion data={accordionData}/>
            </div>
            <ImageContainer title={data.heading_3} imageUrl={data.thirdImageUrl}
                            description={data.description_3} bannerItems={data.actions.data}/>
        </div>
    );
}

export default ClimateChange;