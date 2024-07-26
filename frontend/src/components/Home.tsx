import React, {useEffect, useState} from "react";
import {Home as HomeType} from "@/types";
import {Card, ColorContainer, ImageContainer} from "./container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getImageCardsStyle} from "./";
import {usePages} from "../utils";

function Home() {
    const [data, setData] = useState<HomeType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageCardsStyle] = useState<React.CSSProperties>(getImageCardsStyle());
    const pages = usePages();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const climateResponse = await fetch(`${process.env.REACT_APP_BACKEND}/api/homes/1?populate=*,headerImage, bannerImage, secondBannerImage, climate_change_reasons, page_sections, page_sections.image, call_to_actions`);
                if (!climateResponse.ok) throw new Error("Network response was not ok");
                const climateData = await climateResponse.json();
                if (!climateData.data) throw new Error("No climate change data available");
                const formattedData: HomeType = formatHomeData(climateData.data);
                setData(formattedData);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchData();
    }, []);

    const formatHomeData = (climateData: any): HomeType => {
        return {
            id: climateData.id,
            headerTitle: climateData.attributes.headerTitle,
            headerImage: climateData.attributes.headerImage,
            category: climateData.attributes.category,
            heading: climateData.attributes.heading,
            description: climateData.attributes.description,
            bannerTitle: climateData.attributes.bannerTitle,
            bannerDescription: climateData.attributes.bannerDescription,
            bannerImage: climateData.attributes.bannerImage,
            reasons: climateData.attributes.climate_change_reasons,
            category_2: climateData.attributes.category_2,
            heading_2: climateData.attributes.heading_2,
            description_2: climateData.attributes.description_2,
            secondBannerTitle: climateData.attributes.secondBannerTitle,
            secondBannerDescription: climateData.attributes.secondBannerDescription,
            secondBannerImage: climateData.attributes.secondBannerImage,
            callToActions: climateData.attributes.call_to_actions
        };
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const dynamicImageCardsStyle: React.CSSProperties = {
        ...imageCardsStyle,
        justifyContent: "center",
        gap: "20px"
    };

    return (
        <div className="page-container">
            <ImageContainer title={data.headerTitle} image={data.headerImage} showButton={false} />
            <ColorContainer category={data.category} heading={data.heading} description={data.description}
                            color={"#F7FbF1"}/>
            <ImageContainer title={data.bannerTitle} image={data.bannerImage}
                            description={data.bannerDescription} bannerItems={data.reasons.data} showButton={false}/>
            <div style={{backgroundColor: "#F7FbF1"}}>
                <ColorContainer category={data.category_2} heading={data.heading_2} description={data.description_2}
                                color={"#F7FbF1"}/>
                <div>
                    <div style={dynamicImageCardsStyle}>
                        {pages
                            .filter(page => page.title !== "Biodiversität")
                            .map((page, index) =>
                                page.image.data && (
                                    <Card
                                        key={index}
                                        image={page.image}
                                        heading={page.title}
                                        description={page.description}
                                        link={page.route}
                                        section={true}
                                    />
                                )
                        )}
                    </div>
                </div>
            </div>
            <ImageContainer title={data.secondBannerTitle} image={data.secondBannerImage}
                            description={data.secondBannerDescription} bannerItems={data.callToActions.data} />
        </div>
    );
}

export default Home;