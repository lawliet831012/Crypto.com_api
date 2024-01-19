/* Core */
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  res: Response
): Promise<
  NextResponse<{
    data: any;
  }>
> {
  const body = await req.json();
  const { amount = 1 } = body;

  // simulate IO latency
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json({ data: amount });
}
