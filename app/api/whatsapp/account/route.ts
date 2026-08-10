import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getCurrentSupabaseUser } from "@/lib/syncUser";

/**
 * GET /api/whatsapp/account
 * Fetches the currently connected WhatsApp Business account from Supabase DB
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentSupabaseUser();
    const supabase = createServerSupabaseClient();
    let userId = user?.id || "guest_user";

    const { data, error } = await supabase
      .from("whatsapp_accounts")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (data && !error) {
      return NextResponse.json({
        connected: true,
        account: {
          phone: data.phone_number,
          businessName: data.business_name,
          phoneId: data.phone_id,
          qualityScore: data.quality_score || "High",
          connectedAt: data.created_at || "Just now",
          status: "Active",
        },
      });
    }

    return NextResponse.json({ connected: false, account: null });
  } catch (err: any) {
    return NextResponse.json({ connected: false, account: null });
  }
}

/**
 * POST /api/whatsapp/account
 * Connects or updates WhatsApp Business account in Supabase DB
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentSupabaseUser();
    const body = await req.json();
    const { phone, businessName, phoneId, access_token } = body;

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const userId = user?.id || "guest_user";
    const realPhoneId = phoneId || `wa_phone_${Date.now()}`;

    try {
      await supabase.from("whatsapp_accounts").upsert(
        [
          {
            user_id: userId,
            phone_number: phone,
            business_name: businessName || "Flowchat Business",
            phone_id: realPhoneId,
            quality_score: "High",
            access_token: access_token || null,
            status: "active",
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: "user_id" }
      );
    } catch (dbErr) {
      console.error("Supabase WA Account Save Error:", dbErr);
    }

    const savedAccount = {
      phone,
      businessName: businessName || "Flowchat Business",
      phoneId: realPhoneId,
      qualityScore: "High",
      connectedAt: "Just now",
      status: "Active",
    };

    return NextResponse.json({ success: true, account: savedAccount });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * DELETE /api/whatsapp/account
 */
export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentSupabaseUser();
    const supabase = createServerSupabaseClient();
    const userId = user?.id || "guest_user";

    try {
      await supabase
        .from("whatsapp_accounts")
        .update({ status: "disconnected" })
        .eq("user_id", userId);
    } catch (e) {
      console.error(e);
    }

    return NextResponse.json({ success: true, connected: false });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
