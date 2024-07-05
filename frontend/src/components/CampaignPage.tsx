import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Campaign } from '@/types';
import '../css/CampaignPage.css';
import Button from "@mui/material/Button";
import {usePages} from "../contexts";

const CampaignPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const pages = usePages();

    const openCampaignPage = () => {
        navigate(`/${pages[pages.length - 1]}`);
    };

    useEffect(() => {
        const fetchCampaignData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/campaigns/${id}?populate=*`);
                if (!response.ok) throw new Error('Network response was not ok');
                const campaignData = await response.json();
                if (!campaignData.data) throw new Error('Campaign data not found');

                const attributes = campaignData.data.attributes;

                const formattedCampaign: Campaign = {
                    id: campaignData.data.id,
                    imageUrl: attributes.image.data.attributes.url || '',
                    title: attributes.title,
                    difficulty: attributes.campaign_difficulty.data.attributes.value,
                    date: attributes.datetime ? new Date(attributes.datetime).toLocaleString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : undefined,
                    categories: attributes.campaign_categories.data.map((cat: any) => ({
                        id: cat.id,
                        value: cat.attributes.value,
                    })),
                    description: attributes.description,
                    location: attributes.location,
                    tips: attributes.tips.data
                };

                setCampaign(formattedCampaign);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchCampaignData();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!campaign) {
        return <div>Loading...</div>;
    }

    const categoriesString = campaign.categories.map(category => category.value).join(' • ');

    const dateDisplay = campaign.date && campaign.date.includes(':')
        ? `${campaign.date} Uhr`
        : campaign.date;

    return (
        <div className='campaignPageContent'>
            <p>{categoriesString}</p>
            <h2>{campaign.title}</h2>
            <img
                src={`${process.env.REACT_APP_BACKEND}${campaign.imageUrl}`}
                alt="Thematisch passendes Bild"
            />
            {dateDisplay && <h3>Wann? {dateDisplay}</h3>}
            {campaign.location && <h3>Wo? {campaign.location}</h3>}
            {campaign.description && <p>{campaign.description}</p>}
            {campaign.tips && campaign.tips.length > 0 && (
                <div>
                    <h2>Tipps</h2>
                        {campaign.tips.map((tip) => (
                            <div>
                                <h3 style={{color: '#87966B'}}>{tip.attributes.title}</h3>
                                <p>{tip.attributes.description}</p>
                            </div>
                        ))}
                </div>
            )}
            <Button
                variant="contained"
                onClick={openCampaignPage}
                size="small"
                className='custom-button'
            >
                Zurück zu den Aktionen
            </Button>
        </div>
    );
};

export default CampaignPage;