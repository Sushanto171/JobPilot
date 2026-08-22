import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { url } = (await request.json()) as { url?: string };
  if (!url || !/^https?:\/\//.test(url.trim())) {
    return NextResponse.json(
      { error: "A valid URL is required." },
      { status: 400 },
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (/linkedin\.com|indeed\.com/i.test(url)) {
    return NextResponse.json(
      { error: "Unable to read this page." },
      { status: 422 },
    );
  }

  return NextResponse.json({
    text: `ACME LABS is hiring a Senior Backend Engineer. Remote role. Required skills include Node.js, PostgreSQL, Docker, Redis, and TypeScript. Send your resume to hr@acmelabs.example.com. Build reliable services and collaborate with product and infrastructure teams.`,
  });
}
