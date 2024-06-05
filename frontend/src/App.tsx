import './App.css';
import NavigationMenu from "./components/NavigationMenu";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClimateChange from "./components/ClimateChange";
import ClimateAdaptation from "./components/ClimateAdaptation";
import EventList from "./components/EventList";

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