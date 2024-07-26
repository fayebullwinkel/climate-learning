import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function SampleNextArrow(props: any, changeColor = false) {
    const { style, onClick } = props;
    const arrowStyle: React.CSSProperties = {
        color: changeColor ? "white" : "#76b900",
    };
    return (
        <div className="arrow-right" onClick={onClick} style={style}>
            <IconButton>
                <ArrowForwardIcon style={arrowStyle} />
            </IconButton>
        </div>
    );
}

export function SamplePrevArrow(props: any, changeColor = false) {
    const { style, onClick } = props;
    const arrowStyle: React.CSSProperties = {
        color: changeColor ? "white" : "#76b900",
    };
    return (
        <div className="arrow-left" onClick={onClick} style={style}>
            <IconButton>
                <ArrowBackIcon style={arrowStyle} />
            </IconButton>
        </div>
    );
}