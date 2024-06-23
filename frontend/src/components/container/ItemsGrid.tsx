import React from 'react';
import { Grid } from '@mui/material';
import { GridItem } from "../../types";
import { useMediaQuery } from "react-responsive";

interface ItemsGridProps {
    heading: string;
    items: GridItem[];
}

const ItemsGrid: React.FC<ItemsGridProps> = ({ heading, items }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const itemContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
    };

    const imageStyle = (index: number) => ({
        height: 'auto',
        maxHeight: index === 0 ? '450px' : '500px',
        borderRadius: '10px'
    });

    return (
        <Grid container spacing={2} style={{ backgroundColor: '#E9F3F4', paddingBottom: '20px' }}>
            <Grid item xs={12} style={{ textAlign: 'center', backgroundColor: '#E9F3F4' }}>
                <h1>{heading}</h1>
            </Grid>
            {isMobile ? (
                items.map((item, index) => (
                    <Grid container item xs={12} key={index} style={{ ...itemContainerStyle }}>
                        <Grid item xs={12} style={{ textAlign: 'justify' }}>
                            <h2 style={{ textAlign: 'center' }}>{item.attributes.title}</h2>
                            <p style={{ textAlign: 'justify', maxWidth: '85%', margin: '0 auto' }}>{item.attributes.description}</p>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <img
                                src={`${process.env.REACT_APP_BACKEND}${item.attributes.image.data.attributes.url}`}
                                alt={item.attributes.title}
                                style={imageStyle(index)}
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
                        direction={index % 2 === 0 ? 'row' : 'row-reverse'}
                        style={{
                            ...itemContainerStyle
                        }}
                    >
                        <Grid item xs={12} sm={3} style={{ textAlign: 'justify' }}>
                            <h2 style={{ textAlign: 'center' }}>{item.attributes.title}</h2>
                            <p style={{ textAlign: 'justify' }}>{item.attributes.description}</p>
                        </Grid>
                        <Grid item xs={12} sm={3} style={{ display: 'flex', justifyContent: index % 2 === 0 ? 'right' : 'left' }}>
                            <img
                                src={`${process.env.REACT_APP_BACKEND}${item.attributes.image.data.attributes.url}`}
                                alt={item.attributes.title}
                                style={imageStyle(index)}
                            />
                        </Grid>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default ItemsGrid;