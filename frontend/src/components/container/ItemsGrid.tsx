import React from 'react';
import { Grid } from '@mui/material';
import { GridItem } from "../../types";

interface ItemsGridProps {
    heading: string;
    items: GridItem[];
}

const ItemsGrid: React.FC<ItemsGridProps> = ({ heading, items }) => {
    const itemContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
    };

    const imageStyle = {
        height: 'auto',
        maxHeight: '500px',
        borderRadius: '10px'
    };

    return (
        <Grid container spacing={2} style={{backgroundColor: '#E9F3F4', paddingBottom: '20px'}}>
            <Grid item xs={12} style={{ textAlign: 'center', backgroundColor: '#E9F3F4' }}>
                <h1>{heading}</h1>
            </Grid>
            {items.map((item, index) => (
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
                        <h2>{item.attributes.title}</h2>
                        <p>{item.attributes.description}</p>
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ display: 'flex', justifyContent: index % 2 === 0 ? 'right' : 'left' }}>
                        <img
                            src={`${process.env.REACT_APP_BACKEND}${item.attributes.image.data.attributes.url}`}
                            alt={item.attributes.title}
                            style={imageStyle}
                        />
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default ItemsGrid;