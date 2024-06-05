import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClimateChange, ClimateAdaptation, EventList, NavigationMenu } from "./components";

function App() {
    return (
        <div className="app">
            <Router>
                <NavigationMenu />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<ClimateChange />} />
                        <Route path="/climateAdaptation" element={<ClimateAdaptation />} />
                        <Route path="/eventList" element={<EventList />} />
                    </Routes>
                </main>
            </Router>
        </div>
    );
}

export default App;