// 'use client';
import '../ui/calendar.css'
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return{title: 'Events',}
}
// src/app/events/page.tsx

import React from 'react';
import Calendar from './Calendar';
import EventList from './EventList';
import { Event } from './EventList';

interface EventsPageProps {
    events: Event[];
}

// Async function to fetch event data on server-side
const fetchEvents = async (): Promise<Event[]> => {
    // Replace with actual fetching logic, e.g., from an API or database
    return [
        {
            title: "Fall Community Groups",
            time: "7pm-9pm",
            eventDate: "2025-10-15",
            description: "Discussing Inspired: Slaying Giants",
            image: "img/events/fall2025groups.jpg",
            id: crypto.randomUUID(),
            active: true,
        },
        {
            title: "All Saints LA Service",
            time: "5pm",
            eventDate: "2025-10-26",
            description: "Join us for worship",
            image: "img/events/servicePhoto.jpg",
            id: crypto.randomUUID(),
            active: true,
        },
        // Add more events as needed
    ];
};

// EventsPage component, now async to fetch events
const EventsPage = async () => {
    const events: Event[] = await fetchEvents(); // Fetch events data

    return (
        <div id="eventsPage">
            <h2>All Saints LA Events</h2>
            <Calendar events={events} />
            <EventList events={events} />
        </div>
    );
};

export default EventsPage;
