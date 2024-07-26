import React from "react";

const StatistaGraph = () => {
    return (
        <div className="statista-graph">
            <a href="https://de.statista.com/infografik/30203/anzahl-naturkatastrophen-extremwetterereignisse-in-europa/"
               target="_blank"
               rel="noopener noreferrer"
               title="Infografik: Wasser - die größte Naturgefahr des 21. Jahrhunderts? | Statista">
                <img
                    src="https://cdn.statcdn.com/Infographic/images/normal/30203.jpeg"
                    alt="Infografik: Wasser - die größte Naturgefahr des 21. Jahrhunderts? | Statista"
                    style={{
                        width: window.innerWidth <= 768 ? "90%" : "60%",
                        height: "auto",
                        maxWidth: "960px",
                        margin: "0 auto"
                    }}
                />
            </a>
        </div>
    );
};

export default StatistaGraph;