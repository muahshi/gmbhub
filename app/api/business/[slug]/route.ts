// app/api/business/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('businesses')
    .select(`
      id, name, slug, google_review_url, category,
      brand_config, whatsapp_number, is_active,
      subscription_plan, scan_limit, scans_used
    `)
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 });
  }

  // Check scan limit
  if (data.scans_used >= data.scan_limit) {
    return NextResponse.json({ error: 'Scan limit reached', limitReached: true }, { status: 402 });
  }

  return NextResponse.json({ business: data });
}
