// FILE: components/EventForm.tsx
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

interface EventFormProps {
  onEventCreated: (event: never) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onEventCreated }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.from("events").insert({
      name,
      client_id: "example-client-id",
      status: "pending",
    });

    if (error) {
      console.error(error);
    } else {
      onEventCreated(data![0]);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Event Name"
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Event
      </button>
    </form>
  );
};

export default EventForm;