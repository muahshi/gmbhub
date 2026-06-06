// app/api/scan/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const supabase = createClient();

  try {
    const body = await req.json();
    const {
      business_id,
      qr_code_id,
      rating,
      outcome,
      source,
      qr_code_label,
      customer_name,
      customer_avatar_color,
      feedback_text,
      feedback_tags,
    } = body;

    if (!business_id) {
      return NextResponse.json({ error: 'Missing business_id' }, { status: 400 });
    }

    // Hash IP for privacy
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0] ?? 'unknown';
    const ip_hash = Buffer.from(ip).toString('base64').slice(0, 16);

    const { data, error } = await supabase
      .from('reviews_analytics')
      .insert({
        business_id,
        qr_code_id: qr_code_id ?? null,
        rating: rating ?? null,
        outcome: outcome ?? null,
        source: source ?? 'Direct Scan',
        qr_code_label: qr_code_label ?? null,
        customer_name: customer_name ?? null,
        customer_avatar_color: customer_avatar_color ?? null,
        feedback_text: feedback_text ?? null,
        feedback_tags: feedback_tags ?? [],
        ip_hash,
        user_agent: req.headers.get('user-agent') ?? null,
        metadata: {},
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('[SCAN API ERROR]', err);
    return NextResponse.json({ error: err.message ?? 'Internal error' }, { status: 500 });
  }
}
