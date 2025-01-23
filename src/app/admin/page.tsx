// FILE: app/admin/page.tsx
import EventForm from "../components/EventForm";
import EventTracker from "../components/EventTracker";

const AdminPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <EventForm onEventCreated={(newEvent) => console.log(newEvent)} />
      <EventTracker />
    </div>
  );
};

export default AdminPage;

// FILE: types/index.ts
export interface Event {
  id: string;
  name: string;
  status: "pending" | "in_progress" | "completed";
  updated_at: string;
  client_id: string;
}