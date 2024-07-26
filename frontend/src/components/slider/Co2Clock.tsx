import React from "react";
import "../../css/slider/Co2Clock.css";

const Co2Clock: React.FC = () => {
    return (
        <div>
            <figure id="clockFigure" className="clock-figure">
                <div id="idClockContainer">
                    <iframe
                        id="idClockFrame"
                        src="https://carbonclock.kwikk.info/clock.html"
                        title="CO2 Clock"
                    ></iframe>
                </div>
                <figcaption>
                    Quelle: Mercator Institut Berlin (
                    <a
                        href="https://www.mcc-berlin.net/en/research/co2-budget.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://www.mcc-berlin.net/en/research/co2-budget.html
                    </a>
                    ),<br />
                    Übersetzung: Martin Auer,{" "}
                    <a
                        href="https://at.scientists4future.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Scientists for Future Österreich
                    </a>
                </figcaption>
            </figure>
        </div>
    );
};

export default Co2Clock;