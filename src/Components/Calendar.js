import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:9500/event/getEvents"
        );

        if (response.status && Array.isArray(response.events)) {
          // Map `date` to `start` for FullCalendar compatibility
          const formattedEvents = response.events.map((event) => ({
            title: event.title,
            start: event.date,
          }));
          setEvents(formattedEvents);
        } else {
          console.warn("Unexpected response format:", response);
        }
      } catch (error) {
        console.error(
          "Error fetching events:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="w-100 border rounded-3 p-5 shadow bg-white">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            className='w-100'
          />
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
