import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Event } from "../types";

export default function EventTracker() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Fetch initial data
    fetchEvents();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("realtime:events")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "events" },
        (payload: { new: Event }) => {
          console.log("Real-time update:", payload);
          setEvents((prev) =>
            prev.map((event) =>
              event.id === payload.new.id ? payload.new : event
            )
          );
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*");
    if (error) {
      console.error("Error fetching events:", error.message);
    } else {
      setEvents(data || []);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Event Tracker</h1>
      <ul className="mt-4 space-y-2">
        {events.map((event) => (
          <li key={event.id} className="p-4 border rounded-lg bg-gray-100">
            <h2>{event.name}</h2>
            <p>Status: {event.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}