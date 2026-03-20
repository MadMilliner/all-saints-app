// src/components/Calendar.tsx

'use client';

import React, { useEffect, useState } from 'react';
import type { Event } from './EventList'; // Import Event type if needed
import type { JSX } from 'react';

const Calendar: React.FC<{ events: Event[] }> = ({ events }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const renderCalendar = (date: Date) => {
        // Calendar rendering logic goes here, similar to before

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
                const targetId = `${dayEvents[0]?.id}-box`;
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
        <div>
            {renderCalendar(currentDate)}
        </div>
    );
};

export default Calendar;
