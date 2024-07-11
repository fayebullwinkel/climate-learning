import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import temperatureData from '../../assets/temperatureData.json';

const TemperatureChart = () => {
    return (
        <div>
            <ResponsiveContainer height={400}>
                <LineChart data={temperatureData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year">
                        <Label value="Jahr" offset={-15} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                        <Label value="Temperaturanomalie (°C)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                    </YAxis>
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ marginBottom: 10, marginTop: -10 }}/>
                    <Line type="monotone" dataKey="Ohne Glättung" stroke="#87966B" dot={false}/>
                    <Line type="monotone" dataKey="Lowess Glättung" stroke="#00C8EF" dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TemperatureChart;