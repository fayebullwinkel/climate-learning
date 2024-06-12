import React from "react";

const Co2Clock: React.FC = () => {
    return (
        <div>
            <figure>
                <div
                    id="idClockContainer"
                    style={{ paddingBottom: '66%', position: 'relative', display: 'block', width: '100%' }}
                >
                    <iframe
                        id="idClockFrame"
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                        src="https://carbonclock.kwikk.info/clock.html"
                        title="CO2 Clock"
                    ></iframe>
                </div>
                <figcaption
                    style={{
                        fontStyle: 'italic',
                        fontSize: '13px',
                        marginTop: 0,
                        marginBottom: '1.5em',
                        color: '#333',
                    }}
                >
                    Quelle: Mercator Institut Berlin (
                    <a
                        href="https://www.mcc-berlin.net/en/research/co2-budget.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://www.mcc-berlin.net/en/research/co2-budget.html
                    </a>
                    ),<br />
                    Übersetzung: Martin Auer,{' '}
                    <a href="https://at.scientists4future.org" target="_blank" rel="noopener noreferrer">
                        Scientists for Future Österreich
                    </a>
                </figcaption>
            </figure>
        </div>
    );
};

export default Co2Clock;
