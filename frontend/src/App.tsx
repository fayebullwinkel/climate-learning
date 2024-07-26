import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    ClimateChange,
    ClimateAdaptation,
    CampusCampaign,
    Home,
    NavigationMenu,
    BottomMenu,
    CampaignPage,
    BioDiversity
} from "./components";
import { PagesProvider, usePages } from "./utils";

const App: React.FC = () => {
    const componentsArray = [
        Home, ClimateChange, ClimateAdaptation, BioDiversity, CampusCampaign
    ];

    const pages = usePages();

    if (pages.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app">
            <Router>
                <NavigationMenu />
                <main className="content">
                    <Routes>
                        {pages.map((page, index) => {
                            const Component = componentsArray[index] || Home;
                            return <Route key={page.id} path={page.route} element={<Component />} />;
                        })}
                         <Route path={`${pages[pages.length - 1].route}/:id`} element={<CampaignPage />} />
                    </Routes>
                </main>
                <BottomMenu />
            </Router>
        </div>
    );
};

const AppWithPagesProvider: React.FC = () => {
    return (
        <PagesProvider>
            <App />
        </PagesProvider>
    );
};

export default AppWithPagesProvider;