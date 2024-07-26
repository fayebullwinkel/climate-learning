import React, {useEffect, useState} from "react";
import {BioDiversity as BioDiversityType, ImageCard} from "@/types";
import {getImageCardsStyle, SectionMenu} from "./";
import {useMediaQuery} from "react-responsive";
import {usePages} from "../utils";
import {Card, ColorContainer, ImageContainer} from "../components/container";

function BioDiversity() {
    const [data, setData] = useState<BioDiversityType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageCardsStyle, setImageCardsStyle] = useState<React.CSSProperties>(getImageCardsStyle());
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const pages = usePages();
    const currentPage = pages.find(page => page.route === window.location.pathname);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const climateResponse = await fetch(`${process.env.REACT_APP_BACKEND}/api/bio-diversities/1?populate=*,headerImage,image_cards.image`);
                if (!climateResponse.ok) throw new Error("Network response was not ok");
                const climateData = await climateResponse.json();
                if (!climateData.data) throw new Error("No climate change data available");
                const formattedData: BioDiversityType = formatData(climateData.data);
                setData(formattedData);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchData();

        const handleResize = () => {
            setImageCardsStyle(getImageCardsStyle());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const formatData = (data: any): BioDiversityType => {
        return {
            id: data.id,
            bannerTitle: data.attributes.bannerTitle,
            headerImage: data.attributes.headerImage,
            category: data.attributes.category,
            heading: data.attributes.heading,
            description: data.attributes.description,
            imageCards: data.attributes.image_cards,
        };
    };

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
            <ImageContainer title={data.bannerTitle} image={data.headerImage} showButton={false} />
            <div id={currentPage?.pageSections[0].attributes.oneWordHashtag}>
                <ColorContainer category={data.category} heading={data.heading} description={data.description}
                                color={"#F6EDD9"}/>
                <div>
                    <div style={imageCardsStyle}>
                        {
                            data.imageCards.data.map((imageCard: ImageCard) => (
                                <Card key={imageCard.id} image={imageCard.attributes.image}
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
        </div>
    );
}

export default BioDiversity;