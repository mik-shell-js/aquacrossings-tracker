// FILE: app/page.tsx
import { supabase } from "./utils/supabaseClient";

export default async function Home() {
  const { data: events, error } = await supabase
    .from("events") 
    .select("id, name, status, updated_at");

  if (error) {
    console.error("Error fetching events:", error.message);
    return (
      <main className="p-6">
        <h1 className="text-xl font-bold text-red-500">Failed to load events.</h1>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Event Tracker</h1>
      <ul className="space-y-4 mt-4">
        {events?.map((event) => (
          <li
            key={event.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h2 className="font-semibold">{event.name}</h2>
            <p>Status: {event.status}</p>
            <p>Last Updated: {new Date(event.updated_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}