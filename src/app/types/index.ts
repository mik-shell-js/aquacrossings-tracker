// FILE: types/index.ts
export interface Event {
    id: string;
    name: string;
    status: "pending" | "in_progress" | "completed";
    updated_at: string;
    client_id: string;
}