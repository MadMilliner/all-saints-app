'use client';

import React, { useEffect, useState } from 'react';
import { JSX } from 'react';
import '../ui/calendar.css'

interface Event {
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

export default function Page() {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    // Sample events
    useEffect(() => {
        const sampleEvents: Event[] = [
            { title: "Fall Community Groups", time: "7pm-9pm", eventDate: "2025-10-15", description: "We will be reading and discussing Inspired: Slaying Giants", image: "img/events/fall2025groups.jpg", id: crypto.randomUUID(), active: true },
            { title: "All Saints LA Service", time: "5pm", eventDate: "2025-10-26", description: "Join us for worship", image: "img/events/servicePhoto.jpg", id: crypto.randomUUID(), active: true },
            // Add more events as needed
        ];

        setEvents(sampleEvents);
    }, []);

    const renderCalendar = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const monthName = date.toLocaleString("default", { month: "long" });
        const days: JSX.Element[] = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= lastDate; day++) {
            const currentDay = new Date(year, month, day).toLocaleDateString();
            const dayEvents = events.filter(ev => ev.eventDate === currentDay);

            if (dayEvents.length > 0) {
                const targetId = `${dayEvents[0].id}-box`;
                days.push(
                    <div key={day} className={`day event`}>
                        <a href="#" data-event-id={targetId} onClick={(e) => {
                            e.preventDefault();
                            const target = document.getElementById(targetId);
                            if (target) {
                                target.scrollIntoView({ behavior: 'smooth' });
                                target.classList.add('highlight');
                                setTimeout(() => target.classList.remove('highlight'), 1500);
                            }
                        }}>
                            {day}
                        </a>
                    </div>
                );
            } else {
                days.push(<div key={day} className="day">{day}</div>);
            }
        }

        return (
            <div className="calendar-grid">
                <div className="calendar-header">
                    <button onClick={() => setCurrentDate(new Date(year, month - 1))}>&lt;</button>
                    <span>{`${monthName} ${year}`}</span>
                    <button onClick={() => setCurrentDate(new Date(year, month + 1))}>&gt;</button>
                </div>
                {days}
            </div>
        );
    };

    return (
        <div id="eventsPage">
            <h2>All Saints LA Events</h2>
            {renderCalendar(currentDate)}
            <div id="eventsList">
                {events.map(event => (
                    <EventComponent key={event.id} event={event} />
                ))}
            </div>
            <div id="signup"></div>
        </div>
    );
}
