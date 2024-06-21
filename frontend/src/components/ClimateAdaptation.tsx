import React, {useEffect, useState} from "react";
import {ClimateAdaptation as ClimateAdaptationType} from "../types";
import {getImageCardsStyle} from "./";
import {ColorContainer, ImageContainer, ItemsGrid} from "../components/container";
import {VideoBanner} from "./container";

function ClimateAdaptation() {
    const [data, setData] = useState<ClimateAdaptationType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageCardsStyle, setImageCardsStyle] = useState<React.CSSProperties>(getImageCardsStyle());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/climate-adaptations/1?populate=*,grid_items.image, headerImage, secondBannerImage, adaptation_measures`);
                if (!response.ok) throw new Error('Network response was not ok');
                const climateAdaptationData = await response.json();
                if (!climateAdaptationData.data) throw new Error('No climate adaptation data available');
                console.log("guckuck hier kommen die Daten ", climateAdaptationData.data);
                const formattedData: ClimateAdaptationType = formatClimateAdaptationData(climateAdaptationData.data);
                setData(formattedData);

            } catch (error) {
                setError((error as Error).message);
            }
        };

        const formatClimateAdaptationData = (data: any): ClimateAdaptationType => {
            return {
                id: data.id,
                bannerTitle: data.attributes.bannerTitle,
                headerImageUrl: data.attributes.headerImage.data.attributes.url,
                category: data.attributes.category,
                heading: data.attributes.heading,
                description: data.attributes.description,
                secondImageUrl: data.attributes.secondBannerImage.data.attributes.url,
                secondBannerTitle: data.attributes.secondBannerTitle,
                secondBannerDescription: data.attributes.secondBannerDescription,
                adaptationMeasures: data.attributes.adaptation_measures,
                videoTitle: data.attributes.videoTitle,
                videoDescription: data.attributes.videoDescription,
                gridHeading: data.attributes.gridHeading,
                gridItems: data.attributes.grid_items
            };
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

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            <ImageContainer title={data.bannerTitle} imageUrl={data.headerImageUrl} showButton={false}/>
            <ColorContainer category={data.category} heading={data.heading} description={data.description}
                            color={"#F6EDD9"}/>
            <ImageContainer title={data.secondBannerTitle} imageUrl={data.secondImageUrl} description={data.secondBannerDescription} bannerItems={data.adaptationMeasures.data} showButton={false}/>
            <VideoBanner title={data.videoTitle} description={data.videoDescription}/>
            <ItemsGrid heading={data.gridHeading} items={data.gridItems.data}/>
        </div>
    )
}

export default ClimateAdaptation;
