import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import {Difficulty} from "@/types";
import '../../css/container/Card.css';

interface CardProps {
    imageUrl: string;
    heading: string;
    description?: string;
    difficulty?: Difficulty;
    link?: string;
    campaignId?: number;
    date?: string;
    external?: boolean;
}

const Card: React.FC<CardProps> = ({ imageUrl, heading, description, difficulty, link, campaignId, date, external = false }) => {
    const navigate = useNavigate();
    const openCampaignPage = () => {
        navigate(`/campaign/${String(campaignId)}`);
    };

    const openLink = () => {
        if (external && link) {
            window.open(link, "_blank", "noopener noreferrer");
        } else {
            openCampaignPage();
        }
    };

    const cardStyle: React.CSSProperties = {
        width: window.innerWidth <= 768 ? "100%" : "30%",
    };

    const dateDisplay = date && date.includes(':')
        ? `${date} Uhr`
        : date;

    return (
        <div style={cardStyle} className='customCard' onClick={openCampaignPage}>
            <div className='cardContent'>
                <img
                    src={`${process.env.REACT_APP_BACKEND}${imageUrl}`}
                    alt="Thematisch passendes Bild"
                    className='imageCard'
                />
                <div className='textContent' style={{ textAlign: 'left' }}>
                    <h3>{heading}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                        {difficulty && (
                            <Chip label={difficulty.data.attributes.value} className='difficultyChip' />
                        )}
                        {date && <p>{dateDisplay}</p>}
                    </div>
                    {description && <p>{description}</p>}
                    <Button
                        variant="contained"
                        onClick={openLink}
                        size="small"
                        className='customButton'
                    >
                        {external ? "Mehr erfahren" : "Zur Aktion"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Card;
