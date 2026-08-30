import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getCurrentSupabaseUser } from "@/lib/syncUser";

/**
 * PATCH /api/automations/[id] — toggle on/off or edit a rule
 * DELETE /api/automations/[id] — delete a rule
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();

  // verify ownership
  const { data: existing } = await supabase
    .from("automations")
    .select("id, user_id")
    .eq("id", id)
    .single();

  if (!existing || existing.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updates: Record<string, any> = { updated_at: new Date().toISOString() };
  if (typeof body.status === "string" && ["active", "paused"].includes(body.status)) {
    updates.status = body.status;
  }
  if (typeof body.reply_message === "string" && body.reply_message.trim().length <= 500) {
    updates.reply_message = body.reply_message.trim();
  }
  if (body.reply_type === "dm" || body.reply_type === "comment") {
    updates.reply_type = body.reply_type;
  }

  const { data, error } = await supabase
    .from("automations")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ automation: data });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = createServerSupabaseClient();

  const { data: existing } = await supabase
    .from("automations")
    .select("id, user_id")
    .eq("id", id)
    .single();

  if (!existing || existing.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await supabase.from("automations").delete().eq("id", id);

  return NextResponse.json({ success: true });
}
