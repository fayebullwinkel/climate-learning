import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ClimateChange, ClimateAdaptation, CampusCampaign, NavigationMenu, BottomMenu, CampaignPage} from "./components";

function App() {
    return (
        <div className="app">
            <Router>
                <NavigationMenu />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<ClimateChange />} />
                        <Route path="/climateAdaptation" element={<ClimateAdaptation />} />
                        <Route path="/campusCampaigns" element={<CampusCampaign />} />
                        <Route path="/campaign/:id" element={<CampaignPage />} />
                    </Routes>
                </main>
                <BottomMenu/>
            </Router>
        </div>
    );
}

export default App;