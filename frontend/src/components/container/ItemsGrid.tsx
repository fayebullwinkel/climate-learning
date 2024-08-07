import React from "react";
import {Grid} from "@mui/material";
import {GridItem} from "@/types";
import {useMediaQuery} from "react-responsive";
import "../../css/container/ItemsGrid.css";
import useHover from "../utils";

interface ItemsGridProps {
    items: GridItem[];
}

const ItemsGrid: React.FC<ItemsGridProps> = ({items}) => {
    const isMobile = useMediaQuery({maxWidth: 768});
    const containerWidth = isMobile ? "85%" : "70%";
    const {showCredits, mousePosition, onMouseEnter, onMouseLeave, onMouseMove} = useHover(1500);

    const itemContainerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 200,
        margin: "20px 0 20px 0"
    };
    const imageStyle = () => ({
        height: "auto",
        maxHeight: "400px",
        borderRadius: "10px",
        marginTop: isMobile ? "20px" : ""
    });


    return (
        <Grid container style={{ width: containerWidth, margin: "0 auto"}}>
            {isMobile ? (
                items.map((item, index) => (
                    <Grid container item xs={12} key={index} style={{...itemContainerStyle}}>
                        <Grid item xs={12} style={{textAlign: "justify"}}>
                            <h2 style={{textAlign: "center"}}>{item.attributes.title}</h2>
                            <p style={{
                                textAlign: "justify",
                                maxWidth: isMobile ? "100%" : "85%",
                                margin: "0 auto"
                            }}>{item.attributes.description}</p>
                        </Grid>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <img
                                src={`${process.env.REACT_APP_BACKEND}${item.attributes.image.data.attributes.url}`}
                                alt={item.attributes.title}
                                style={imageStyle()}
                            />
                        </Grid>
                    </Grid>
                ))
            ) : (
                items.map((item, index) => (
                    <Grid
                        container
                        item
                        xs={12}
                        key={index}
                        direction={index % 2 === 0 ? "row" : "row-reverse"}
                        style={{
                            ...itemContainerStyle
                        }}
                    >
                        <Grid item xs={12} sm={7} style={{textAlign: "justify"}}>
                            <h2 style={{textAlign: "center"}}>{item.attributes.title}</h2>
                            <p style={{textAlign: "justify"}}>{item.attributes.description}</p>
                        </Grid>
                        <Grid item xs={12} sm={5} style={{ display: "flex", justifyContent: index % 2 === 0 ? "flex-end" : "flex-start" }}>
                            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}>
                                {showCredits && (
                                    <div style={{
                                        position: "fixed",
                                        top: `${mousePosition.y + 10}px`,
                                        left: `${mousePosition.x + 10}px`,
                                        backgroundColor: "#F7FbF1",
                                        color: "grey",
                                        padding: "5px",
                                        borderRadius: "3px",
                                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                                        zIndex: 3,
                                        fontSize: "12px"
                                    }}>
                                        ©{item.attributes.image.data.attributes.caption}
                                    </div>
                                )}
                                <img
                                    src={`${process.env.REACT_APP_BACKEND}${item.attributes.image.data.attributes.url}`}
                                    alt={item.attributes.title}
                                    style={imageStyle()}
                                />
                            </div>
                        </Grid>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default ItemsGrid;