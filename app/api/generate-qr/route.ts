// app/api/generate-qr/route.ts
import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { url, businessSlug, label } = await req.json();

    if (!url && !businessSlug) {
      return NextResponse.json({ error: 'Provide url or businessSlug' }, { status: 400 });
    }

    const targetUrl = url ?? `${process.env.NEXT_PUBLIC_APP_URL}/review/${businessSlug}`;

    // Generate SVG QR
    const svgString = await QRCode.toString(targetUrl, {
      type: 'svg',
      margin: 2,
      width: 300,
      color: {
        dark: '#FFFFFF',
        light: '#00000000', // transparent background
      },
    });

    // Also generate a data URL PNG for download
    const dataUrl = await QRCode.toDataURL(targetUrl, {
      type: 'image/png',
      width: 512,
      margin: 2,
      color: {
        dark: '#FFFFFF',
        light: '#0A0A0C',
      },
    });

    return NextResponse.json({
      success: true,
      qr_url: targetUrl,
      svg: svgString,
      png_data_url: dataUrl,
      label: label ?? 'Custom QR',
    });
  } catch (err: any) {
    console.error('[QR GEN ERROR]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
