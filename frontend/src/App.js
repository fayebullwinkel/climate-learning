import {useState, useEffect} from 'react';
import EventItem from './EventItem';
import './App.css';

function App() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState("");

    useEffect(() => {
        // update the list of events
        // when the component is rendered for the first time
        update();
    }, []);

    // This function updates the component with the
    // current event data stored in the server
    function update() {
        fetch(`${process.env.REACT_APP_BACKEND}api/events`, {
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
            }
        })
            .then(res => res.json())
            .then(event => {
                setEvents(event.data);
            })
    }

    // This function sends a new event to the server
    // and then call the update method to update the
    // component
    function addEvent(e) {
        e.preventDefault();
        let item = newEvent;
        let body = {
            data: {
                item
            }
        };

        fetch(`${process.env.REACT_APP_BACKEND}api/events`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
            },
            body: JSON.stringify(body)
        })
            .then(() => {
                setNewEvent("");
                update();
            })
    }

    return (
        <div className="app">
            <main>

                {/* This form collects the item we want to add to our event, and sends it to the server */}
                <form className="form" onSubmit={addEvent}>
                    <input type="text" className="event_input" placeholder="Enter new event" value={newEvent}
                           onChange={e => setNewEvent(e.currentTarget.value)}/>
                    <button type="submit" className="event_button">Add event</button>
                </form>

                <div>
                    {
                        events.map((event, i) => {
                            return <EventItem event={event} key={i} update={update}/>
                        })
                    }
                </div>

            </main>
        </div>
    )
}

export default App;