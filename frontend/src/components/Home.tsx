import React, { useEffect, useState } from "react";
import { Home as HomeType } from '@/types';
import { Card, ColorContainer, ImageContainer } from "./container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getImageCardsStyle } from "./utils";

function Home() {
    const [data, setData] = useState<HomeType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [pageTitles, setPageTitles] = useState<string[]>([]);
    const [imageCardsStyle] = useState<React.CSSProperties>(getImageCardsStyle());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const climateResponse = await fetch(`${process.env.REACT_APP_BACKEND}/api/homes/1?populate=*,headerImage, bannerImage, climate_change_reasons, page_sections, page_sections.image`);
                if (!climateResponse.ok) throw new Error('Network response was not ok');
                const climateData = await climateResponse.json();
                if (!climateData.data) throw new Error('No climate change data available');
                console.log('home data: ', climateData.data);
                const formattedData: HomeType = formatHomeData(climateData.data);
                setData(formattedData);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        const fetchPageTitles = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/page-titles`);
                if (response.ok) {
                    const data = await response.json();
                    const titles = data.data.map((item: { attributes: { title: string; }; }) => item.attributes.title);
                    setPageTitles(titles);
                } else {
                    console.error('Failed to fetch page titles:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching page titles:', error);
            }
        };

        fetchData();
        fetchPageTitles();
    }, []);

    const formatHomeData = (climateData: any): HomeType => {
        return {
            id: climateData.id,
            bannerTitle: climateData.attributes.bannerTitle,
            secondBannerTitle: climateData.attributes.secondBannerTitle,
            headerImageUrl: climateData.attributes.headerImage.data.attributes.url,
            category: climateData.attributes.category,
            heading: climateData.attributes.heading,
            description: climateData.attributes.description,
            bannerDescription: climateData.attributes.bannerDescription,
            bannerImageUrl: climateData.attributes.bannerImage.data.attributes.url,
            reasons: climateData.attributes.climate_change_reasons,
            pageSections: climateData.attributes.page_sections,
            category_2: climateData.attributes.category_2,
            heading_2: climateData.attributes.heading_2,
            description_2: climateData.attributes.description_2
        };
    };

    const groupSectionsByPageTitle = () => {
        const groupedSections: { [key: string]: any[] } = {};

        if (data && data.pageSections.data.length > 0) {
            data.pageSections.data.forEach((section: any) => {
                const pageTitle = section.attributes.page.toLowerCase();
                if (!groupedSections[pageTitle]) {
                    groupedSections[pageTitle] = [];
                }
                groupedSections[pageTitle].push(section);
            });
        }

        return groupedSections;
    };

    const groupedSections = groupSectionsByPageTitle();

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const filteredPageTitles = pageTitles.filter(title => {
        const lowerCaseTitle = title.toLowerCase();
        return groupedSections[lowerCaseTitle] && groupedSections[lowerCaseTitle].length > 0;
    });

    return (
        <div className="page-container">
            <ImageContainer title={data.bannerTitle} imageUrl={data.headerImageUrl} showButton={false} />
            <ColorContainer category={data.category} heading={data.heading} description={data.description} color={'#F7FbF1'} />
            <ImageContainer title={data.secondBannerTitle} imageUrl={data.bannerImageUrl} description={data.bannerDescription} bannerItems={data.reasons.data} showButton={false} />
            <ColorContainer category={data.category_2} heading={data.heading_2} description={data.description_2} color={'#F7FbF1'} />

            {filteredPageTitles.map((title, index) => {
                const lowerCaseTitle = title.toLowerCase();
                return (
                    <div key={index}>
                        <h2 style={{ textAlign: "center" }}>{title}</h2>
                        <div style={{
                            ...imageCardsStyle,
                            justifyContent: (groupedSections[lowerCaseTitle]?.length ?? 0) === 2
                                ? 'center'
                                : (groupedSections[lowerCaseTitle]?.length ?? 0) < 3
                                    ? 'space-between'
                                    : 'flex-start'
                        }}>
                            {groupedSections[lowerCaseTitle]?.map((section, sectionIndex) => (
                                <Card
                                    key={sectionIndex}
                                    imageUrl={section.attributes.image.data.attributes.url}
                                    heading={section.attributes.title}
                                    description={section.attributes.description}
                                    link={section.attributes.link}
                                    section={true}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;