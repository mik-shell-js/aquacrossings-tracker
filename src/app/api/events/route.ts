// FILE: app/api/events/route.ts
import { supabase } from "../../utils/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, client_id } = await req.json();
    const { data, error } = await supabase.from("events").insert({
        name,
        client_id,
        status: "pending",
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
}

export async function PATCH(req: NextRequest) {
    const { id, status } = await req.json();
    const { data, error } = await supabase
        .from("events")
        .update({ status })
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
}