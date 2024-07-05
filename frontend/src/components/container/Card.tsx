import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import '../../css/container/Card.css';
import {usePages} from '../../contexts';

interface CardProps {
    imageUrl: string;
    heading: string;
    description?: string;
    link?: string;
    campaignId?: number;
    date?: string;
    location?: string;
    external?: boolean;
    section?: boolean;
}

const Card: React.FC<CardProps> = ({
                                       imageUrl,
                                       heading,
                                       description,
                                       link,
                                       campaignId,
                                       date,
                                       location,
                                       external = false,
                                       section = false
                                   }) => {
    const navigate = useNavigate();
    const pages = usePages();
    const openCampaignPage = () => {
        navigate(`${pages[pages.length - 1].route}/${String(campaignId)}`);
    };

    const openLink = () => {
        if (external && link) {
            window.open(link, "_blank", "noopener noreferrer");
        } else if (section && link) {
            window.location.href = link;
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
        <div style={cardStyle} className='custom-card' onClick={() => {
            if (!external && !section) openCampaignPage();
        }}>
            <img
                src={`${process.env.REACT_APP_BACKEND}${imageUrl}`}
                alt="Thematisch passendes Bild"
                className='image-card'
            />
            <h3>{heading}</h3>
            {date && <p>{dateDisplay}</p>}
            {location && <p>{location}</p>}
            {description && <p className='card-description'>{description}</p>}
            <Button
                variant="contained"
                onClick={openLink}
                size="small"
                className='custom-button'
            >
                {external || section ? "Mehr erfahren" : "Zur Aktion"}
            </Button>
        </div>
    );
}

export default Card;
