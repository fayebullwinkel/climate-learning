import { useEffect, useState } from "react";
import { ClimateChange as ClimateChangeType } from '../types';
import {ColorContainer, ImageContainer} from "./container";

function ClimateChange() {
    const [data, setData] = useState<ClimateChangeType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const update = () => {
            fetch(`${process.env.REACT_APP_BACKEND}/api/climate-changes/1?populate=*`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data.data) {
                        throw new Error('No climate change data available');
                    }

                    const climateChangeData = data.data;
                    const formattedData: ClimateChangeType = {
                        id: climateChangeData.id,
                        bannerTitle: climateChangeData.attributes.bannerTitle,
                        image: {
                            url: climateChangeData.attributes.image.data.attributes.url,
                        },
                        heading: climateChangeData.attributes.heading,
                        description: climateChangeData.attributes.description
                    };
                    setData(formattedData);
                })
                .catch(error => {
                    setError(error.message);
                });
        };

        update();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-container">
            <ImageContainer title={data.bannerTitle} imageUrl={data.image.url}/>
            <ColorContainer heading={data.heading} description={data.description} color={"#F6EDD9"} />
        </div>
    );
}

export default ClimateChange;
