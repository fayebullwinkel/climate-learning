import React, {useEffect, useState} from "react";
import {ClimateAdaptation as ClimateAdaptationType} from "@/types";
import {ColorContainer, ImageContainer, ItemsGrid} from "../components/container";
import { AdaptationSlider, MapSlider} from "../components/slider";
import {VideoBanner} from "./container";
import {SectionMenu} from "../components";
import {useMediaQuery} from "react-responsive";

function ClimateAdaptation() {
    const [data, setData] = useState<ClimateAdaptationType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/climate-adaptations/1?populate=*,grid_items.image, headerImage, secondBannerImage, adaptation_measures, map_slider_items, adaptation_unsealings.image, fourthBannerImage, adaptation_call_to_actions`);
                if (!response.ok) throw new Error('Network response was not ok');
                const climateAdaptationData = await response.json();
                if (!climateAdaptationData.data) throw new Error('No climate adaptation data available');
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
                gridItems: data.attributes.grid_items,
                mapSliderItems: data.attributes.map_slider_items,
                thirdBannerCategory: data.attributes.thirdBannerCategory,
                thirdBannerTitle: data.attributes.thirdBannerTitle,
                thirdBannerDescription: data.attributes.thirdBannerDescription,
                adaptationMeasuresHTW: data.attributes.adaptation_unsealings,
                fourthBannerTitle: data.attributes.fourthBannerTitle,
                fourthBannerDescription: data.attributes.fourthBannerDescription,
                fourthImageUrl: data.attributes.fourthBannerImage.data.attributes.url,
                callToActions: data.attributes.adaptation_call_to_actions,
                category_2: data.attributes.category_2,
                heading_2: data.attributes.heading_2,
                description_2: data.attributes.description_2
            };
        };

        fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            {!isMobile && (
                <SectionMenu page='Klimaanpassung'/>
            )}
            <div id='definition'>
                <ImageContainer title={data.bannerTitle} imageUrl={data.headerImageUrl} showButton={false}/>
                <ColorContainer category={data.category} heading={data.heading} description={data.description}
                                color={"#F6EDD9"}/>
                <VideoBanner title={data.videoTitle} description={data.videoDescription}/>
                <ImageContainer title={data.secondBannerTitle} imageUrl={data.secondImageUrl} description={data.secondBannerDescription} bannerItems={data.adaptationMeasures.data} showButton={false}/>
            </div>
            <div id='hitzeinsel'>
                <ColorContainer category={data.category_2} heading={data.heading_2} description={data.description_2}
                                color={"#F6EDD9"}/>
                <ItemsGrid items={data.gridItems.data}/>
                <MapSlider sliderItems={data.mapSliderItems.data}/>
            </div>

            <div id='htw'>
                <ColorContainer category={data.thirdBannerCategory} heading={data.thirdBannerTitle} description={data.thirdBannerDescription}
                                color={"#F6EDD9"}/>
                <AdaptationSlider sliderItems={data.adaptationMeasuresHTW.data} />
                <ImageContainer title={data.fourthBannerTitle} imageUrl={data.fourthImageUrl} description={data.fourthBannerDescription} bannerItems={data.callToActions.data}/>
            </div>
        </div>
    )
}

export default ClimateAdaptation;
