import React, { useEffect, useState } from "react";
import { Campaign, CampusCampaign as CampusCampaignType, Category } from "@/types";
import { Card, ColorContainer, ImageContainer } from "../components/container";
import {CategoryCheckboxGroup, getImageCardsStyle} from './';

const formatCampaignData = (campaign: any): Campaign => ({
    id: campaign.id,
    imageUrl: campaign.attributes.image.data.attributes.url || '',
    title: campaign.attributes.title,
    difficulty: campaign.attributes.campaign_difficulty,
    date: campaign.attributes.datetime ? new Date(campaign.attributes.datetime).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }) : undefined,
    categories: campaign.attributes.campaign_categories.data.map((cat: any) => ({
        id: cat.id,
        value: cat.attributes.value,
    })),
});

const formatCampusCampaignData = (campusCampaign: any, campaigns: Campaign[]): CampusCampaignType => ({
    id: campusCampaign.id,
    bannerTitle: campusCampaign.attributes.bannerTitle,
    headerImageUrl: campusCampaign.attributes.headerImage.data.attributes.url,
    category: campusCampaign.attributes.category,
    heading: campusCampaign.attributes.heading,
    description: campusCampaign.attributes.description,
    campaigns: campaigns,
});

function CampusCampaign() {
    const [data, setData] = useState<CampusCampaignType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [imageCardsStyle, setImageCardsStyle] = useState<React.CSSProperties>(getImageCardsStyle());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/campus-campaigns/1?populate=*,headerImage,campaigns.image,campaigns.campaign_categories,campaigns.campaign_difficulty`);
                if (!response.ok) throw new Error('Network response was not ok');
                const campusCampaignData = await response.json();
                if (!campusCampaignData.data) throw new Error('No climate adaptation data available');

                const formattedCampaigns: Campaign[] = campusCampaignData.data.attributes.campaigns.data.map(formatCampaignData);

                const uniqueCategories: Category[] = [];
                formattedCampaigns.forEach(campaign => {
                    campaign.categories.forEach(category => {
                        if (!uniqueCategories.some(cat => cat.id === category.id)) {
                            uniqueCategories.push(category);
                        }
                    });
                });

                setCategories(uniqueCategories);

                const formattedData: CampusCampaignType = formatCampusCampaignData(campusCampaignData.data, formattedCampaigns);
                setData(formattedData);

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

    const handleCategoryChange = (newCheckedCategories: Category[]) => {
        setSelectedCategories(newCheckedCategories);
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const filteredCampaigns = selectedCategories.length === 0
        ? data.campaigns
        : data.campaigns.filter(campaign =>
            campaign.categories.some(cat => selectedCategories.some(selCat => selCat.id === cat.id))
        );

    const dynamicImageCardsStyle: React.CSSProperties = {
        ...imageCardsStyle,
        justifyContent: filteredCampaigns.length == 2
            ? 'center'
            : filteredCampaigns.length < 3
                ? 'space-between'
                : 'flex-start'
    };

    return (
        <div id='aktionen'>
            <ImageContainer title={data.bannerTitle} imageUrl={data.headerImageUrl} showButton={false} />
            <ColorContainer category={data.category} heading={data.heading} description={data.description} color={"#F6EDD9"} />
            <CategoryCheckboxGroup categories={categories} onCategoryChange={handleCategoryChange} />
            <div style={dynamicImageCardsStyle}>
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
            </div>
        </div>
    );
}

export default CampusCampaign;