import { useState } from "react";
import '../App.css';

interface Event {
    id: number;
    attributes: {
        item: string;
    };
}

interface EventItemProps {
    event: Event;
    update: () => void;
}

function EventItem({ event, update }: EventItemProps) {

    // Our component uses the "edit" state
    // variable to switch between editing
    // and viewing the event item
    const [edit, setEdit] = useState(false);
    const [newEvent, setNewEvent] = useState("");

    // This function changes the to-do that
    // is rendered in this component.
    // This function is called when the
    // form to change a event is submitted
    function changeEvent(e: { preventDefault: () => void; }) {
        e.preventDefault();
        let item = newEvent;
        let pos = event.id;
        let body = {
            data: {
                item
            }
        };

        fetch(`${process.env.REACT_APP_BACKEND}api/events/${pos}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(() => {
                setEdit(false);
                update();
            })
    }

    // This function deletes the to-do that
    // is rendered in this component.
    // This function is called when the
    // form to delete a event is submitted
    function deleteEvent(e: { preventDefault: () => void; }) {
        e.preventDefault();
        let pos = event.id;

        fetch(`${process.env.REACT_APP_BACKEND}api/events/${pos}`, {
            method: "DELETE"
        })
            .then(() => {
                update();
            })
    }

    return <div className="event">
        {/*
          The below toggles between two components
          depending on the current value of the "edit"
          state variable
        */}
        { !edit
            ? <div className="name">{event.attributes.item}</div>
            : <form onSubmit={changeEvent}>
                <input className="event_input" type="text" placeholder="Enter new event" value={newEvent} onChange={e => setNewEvent(e.currentTarget.value)} />
                <button className="event_button" type="submit">Change event</button>
            </form>
        }
        <div>
            <button className="delete" onClick={deleteEvent}>delete</button>
            <button className="edit" onClick={() => {
                // this button toggles the "edit" state variable
                setEdit(!edit)

                // we add this snippet below to make sure that our "input"
                // for editing is the same as the one for the component when
                // it is toggled. This allows anyone using it to see the current
                // value in the element, so they don't have to write it again
                setNewEvent(event.attributes.item)
            }}>edit</button>
        </div>
    </div>
}

export default EventItem;