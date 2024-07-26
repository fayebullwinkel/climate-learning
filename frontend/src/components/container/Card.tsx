import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import '../../css/container/Card.css';
import {usePages} from '../../utils';
import useHover from "../utils";
import {Image} from "@/types";

interface CardProps {
    image: Image;
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
                                       image,
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
    const {showCredits, mousePosition, onMouseEnter, onMouseLeave, onMouseMove} = useHover(1500);

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
            <div>
                <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}>
                    {showCredits && (
                        <div style={{
                            position: 'fixed',
                            top: `${mousePosition.y + 10}px`,
                            left: `${mousePosition.x + 10}px`,
                            backgroundColor: '#F7FbF1',
                            color: 'grey',
                            padding: '5px',
                            borderRadius: '3px',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                            zIndex: 3,
                            fontSize: '12px'
                        }}>
                            ©{image.data.attributes.caption}
                        </div>
                    )}
                    <img
                        src={`${process.env.REACT_APP_BACKEND}${image.data.attributes.url}`}
                        alt="Thematisch passendes Bild"
                        className='image-card'
                    />
                </div>
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
        </div>
    );
}

export default Card;
