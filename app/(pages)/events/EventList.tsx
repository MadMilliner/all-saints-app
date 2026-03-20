// src/components/EventList.tsx

import React from 'react';

export interface Event {
    title: string;
    time: string;
    eventDate: string;
    description: string;
    image: string;
    id: string;
    active: boolean;
}

const EventComponent: React.FC<{ event: Event }> = ({ event }) => {
    return (
        <div className="eventBox" id={`${event.id}-box`}>
            <img src={event.image} alt={event.title} />
            <div className="eventBoxRight">
                <h3>{event.title}</h3>
                <p>{event.eventDate} at {event.time}</p>
                <p>{event.description}</p>
            </div>
        </div>
    );
};

const EventList: React.FC<{ events: Event[] }> = ({ events }) => {
    return (
        <div id="eventsList" className='block'>
            {events.map(event => (
                <EventComponent key={event.id} event={event} />
            ))}
        </div>
    );
};

export default EventList;
