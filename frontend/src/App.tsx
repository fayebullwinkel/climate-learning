import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home, ClimateAdaptation, CampusCampaign, NavigationMenu, BottomMenu} from "./components";

function App() {
    return (
        <div className="app">
            <Router>
                <NavigationMenu />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/climateAdaptation" element={<ClimateAdaptation />} />
                        <Route path="/campusCampaigns" element={<CampusCampaign />} />
                        {/*<Route path="/campaign" component={Campaign} />*/}
                    </Routes>
                </main>
                <BottomMenu/>
            </Router>
        </div>
    );
}

export default App;