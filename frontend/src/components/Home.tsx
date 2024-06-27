import React, { useEffect, useState } from "react";
import {Home as HomeType} from '@/types';
import {Card, ColorContainer, ImageContainer} from "./container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
    const [data, setData] = useState<HomeType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const climateResponse = await fetch(`${process.env.REACT_APP_BACKEND}/api/homes/1?populate=*,headerImage, bannerImage, climate_change_reasons`);
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

        fetchData();
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
            <ColorContainer category={data.category} heading={data.heading} description={data.description} color={'#F7FbF1'}/>
            <ImageContainer title={data.secondBannerTitle} imageUrl={data.bannerImageUrl} description={data.bannerDescription} bannerItems={data.reasons.data} showButton={false}/>
            {/*<div>
                {filteredCampaigns.map((campaign, index) => (
                    <Card
                        key={index}
                        imageUrl={campaign.imageUrl}
                        heading={campaign.title}
                        difficulty={campaign.difficulty}
                        campaignId={campaign.id}
                        date={campaign.date}
                    />
                ))}
            </div>*/}
        </div>
    );
}

export default Home;