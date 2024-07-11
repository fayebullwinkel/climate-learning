import React, { useEffect, useState } from "react";
import {ClimateAdaptation as ClimateAdaptationType, Question} from "@/types";
import { ColorContainer, ImageContainer, ItemsGrid } from "../components/container";
import {AdaptationSlider, MapSlider, QuizSlider} from "../components/slider";
import { VideoBanner } from "./container";
import {formatQuestions, SectionMenu} from "../components";
import { useMediaQuery } from "react-responsive";
import { usePages } from "../utils";

function ClimateAdaptation() {
    const [data, setData] = useState<ClimateAdaptationType | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [feedbacks, setFeedbacks] = useState<String[]>([]);
    const [error, setError] = useState<string | null>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const pages = usePages();
    const currentPage = pages.find(page => page.route === window.location.pathname);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/climate-adaptations/1?populate=*,grid_items.image, headerImage, secondBannerImage, adaptation_measures, map_slider_items, adaptation_unsealings.image, fourthBannerImage, call_to_actions, quiz_questions`);
                if (!response.ok) throw new Error('Network response was not ok');
                const climateAdaptationData = await response.json();
                if (!climateAdaptationData.data) throw new Error('No climate adaptation data available');
                const formattedData: ClimateAdaptationType = formatClimateAdaptationData(climateAdaptationData.data);
                setData(formattedData);
                setQuestions(formatQuestions(climateAdaptationData.data.attributes.quiz_questions.data));
                setFeedbacks([climateAdaptationData.data.attributes.quizFeedbackGreat, climateAdaptationData.data.attributes.quizFeedbackOk, climateAdaptationData.data.attributes.quizFeedbackBad]);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        const formatClimateAdaptationData = (data: any): ClimateAdaptationType => {
            return {
                id: data.id,
                bannerTitle: data.attributes.bannerTitle,
                headerImageUrl: data.attributes.headerImage.data.attributes.url,
                quizCategory: data.attributes.quizCategory,
                quizHeading: data.attributes.quizHeading,
                quizDescription: data.attributes.quizDescription,
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
                callToActions: data.attributes.call_to_actions,
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

    return (
        <div>
            {!isMobile && (
                <SectionMenu />
            )}
            <ImageContainer title={data.bannerTitle} imageUrl={data.headerImageUrl} showButton={false} />
            <ColorContainer category={data.quizCategory} heading={data.quizHeading} description={data.quizDescription}
                            color={"#F6EDD9"}/>
            <QuizSlider questions={questions} feedbacks={feedbacks}/>
            <div id={currentPage?.pageSections[0].attributes.oneWordHashtag}>
                <ColorContainer category={data.category} heading={data.heading} description={data.description} color={"#F6EDD9"} />
                <VideoBanner title={data.videoTitle} description={data.videoDescription} />
                <ImageContainer title={data.secondBannerTitle} imageUrl={data.secondImageUrl} description={data.secondBannerDescription} bannerItems={data.adaptationMeasures.data} showButton={false} />
            </div>
            <div id={currentPage?.pageSections[1].attributes.oneWordHashtag}>
                <ColorContainer category={data.category_2} heading={data.heading_2} description={data.description_2} color={"#F6EDD9"} />
                <ItemsGrid items={data.gridItems.data} />
                <MapSlider sliderItems={data.mapSliderItems.data} />
            </div>
            <div id={currentPage?.pageSections[2].attributes.oneWordHashtag}>
                <ColorContainer category={data.thirdBannerCategory} heading={data.thirdBannerTitle} description={data.thirdBannerDescription} color={"#F6EDD9"} />
                <AdaptationSlider sliderItems={data.adaptationMeasuresHTW.data} />
                <ImageContainer title={data.fourthBannerTitle} imageUrl={data.fourthImageUrl} description={data.fourthBannerDescription} bannerItems={data.callToActions.data} />
            </div>
        </div>
    )
}

export default ClimateAdaptation;
