import React, { useEffect, useState } from "react";
import {ClimateChangeSlider, QuizSlider} from "./slider";
import {AccordionData, AccordionItem, ClimateChange as ClimateChangeType, ImageCard, Question} from '@/types';
import { ColorContainer, ImageContainer, Card, CustomAccordion } from "./container";
import {formatQuestions, SectionMenu} from "./";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getImageCardsStyle } from './';
import {useMediaQuery} from "react-responsive";
import {usePages} from "../utils";

function ClimateChange() {
    const [data, setData] = useState<ClimateChangeType | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [accordionData, setAccordionData] = useState<AccordionData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [imageCardsStyle, setImageCardsStyle] = useState<React.CSSProperties>(getImageCardsStyle());
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const pages = usePages();
    const currentPage = pages.find(page => page.route === window.location.pathname);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const climateResponse = await fetch(`${process.env.REACT_APP_BACKEND}/api/climate-changes/1?populate=*,headerImage, introductionBannerImage, secondBannerImage, climate_change_reasons, consequences, call_to_actions, slider_items,consequence_slider_items.image,social_consequences,social_consequences.image,economic_consequences,economic_consequences.image, thirdBannerImage, image_cards.image, quiz_questions`);
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
                setQuestions(formatQuestions(climateData.data.attributes.quiz_questions.data));
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
            quizCategory: climateData.attributes.quizCategory,
            quizHeading: climateData.attributes.quizHeading,
            quizDescription: climateData.attributes.quizDescription,
            category: climateData.attributes.category,
            heading: climateData.attributes.heading,
            description: climateData.attributes.description,
            imageCards: climateData.attributes.image_cards,
            secondImageUrl: climateData.attributes.secondBannerImage.data.attributes.url,
            secondBannerTitle: climateData.attributes.secondBannerTitle,
            secondBannerDescription: climateData.attributes.secondBannerDescription,
            consequences: climateData.attributes.consequences,
            sliderHeading: climateData.attributes.sliderHeading,
            sliderDescription: climateData.attributes.sliderDescription,
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
            callToActions: climateData.attributes.call_to_actions
        };
    };

    const accordionItems: AccordionItem[] = [
        { title: 'Natürliche Folgen', dataKey: 'naturalConsequencesSliderItems', link: 'https://climate.ec.europa.eu/climate-change/consequences-climate-change_de#territoriale-bedrohungen' },
        { title: 'Gesellschaftliche Gefahren', dataKey: 'socialConsequencesSliderItems', link: 'https://climate.ec.europa.eu/climate-change/consequences-climate-change_de#territoriale-bedrohungen' },
        { title: 'Wirtschaftliche Gefahren', dataKey: 'economicConsequencesSliderItems', link: 'https://climate.ec.europa.eu/climate-change/consequences-climate-change_de#territoriale-bedrohungen' },
    ];

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
            <ImageContainer title={data.bannerTitle} imageUrl={data.headerImageUrl} showButton={false}/>
            <ColorContainer category={data.quizCategory} heading={data.quizHeading} description={data.quizDescription}
                            color={"#F6EDD9"}/>
            <QuizSlider questions={questions}/>

            <div id={currentPage?.pageSections[0].attributes.oneWordHashtag}>
                <ColorContainer category={data.category} heading={data.heading} description={data.description}
                                color={"#F6EDD9"}/>
                <div>
                    <div style={imageCardsStyle}>
                        {
                            data.imageCards.data.map((imageCard: ImageCard) => (
                                <Card key={imageCard.id} imageUrl={imageCard.attributes.image.data.attributes.url}
                                      heading={imageCard.attributes.heading}
                                      description={imageCard.attributes.description}
                                      link={imageCard.attributes.link}
                                      external={true}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            <div id={currentPage?.pageSections[1].attributes.oneWordHashtag}>
                <ColorContainer category={data.category_2} heading={data.heading_2} description={data.description_2}
                                color={"#F6EDD9"}/>
                <CustomAccordion data={accordionData} accordionItems={accordionItems}/>
                <ImageContainer title={data.secondBannerTitle} imageUrl={data.secondImageUrl}
                                description={data.secondBannerDescription} bannerItems={data.consequences.data}/>
            </div>

            <div id={currentPage?.pageSections[2].attributes.oneWordHashtag}>
                <ColorContainer category={data.category_3} heading={data.sliderHeading} description={data.sliderDescription}
                                color={"#F6EDD9"}/>
                <ClimateChangeSlider sliderItems={data.sliderItems.data} />

                <ImageContainer title={data.heading_3} imageUrl={data.thirdImageUrl}
                                description={data.description_3} bannerItems={data.callToActions.data}/>
            </div>
        </div>
    );
}

export default ClimateChange;