import { NextResponse } from "next/server";

const MAX_NAME = 120;
const MAX_EMAIL = 255;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

function trimField(value: unknown, max: number): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, max);
}

function isValidEmail(email: string): boolean {
  if (email.length === 0 || email.length > MAX_EMAIL) {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const raw = body as Record<string, unknown>;
  const payload: ContactPayload = {
    name: trimField(raw.name, MAX_NAME),
    email: trimField(raw.email, MAX_EMAIL).toLowerCase(),
    subject: trimField(raw.subject, MAX_SUBJECT),
    message: trimField(raw.message, MAX_MESSAGE),
    company: typeof raw.company === "string" ? raw.company : "",
  };

  if (payload.company.length > 0) {
    return NextResponse.json(
      { success: false, message: "Invalid submission." },
      { status: 400 },
    );
  }

  if (!payload.name || !isValidEmail(payload.email) || !payload.message) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter your name, a valid email, and a message.",
      },
      { status: 422 },
    );
  }

  const baseUrl = process.env.SEER_BACKEND_URL?.replace(/\/+$/, "");
  const serverKey = process.env.LANDING_CONTACT_SERVER_KEY;

  if (!baseUrl || !serverKey) {
    return NextResponse.json(
      { success: false, message: "Contact is temporarily unavailable." },
      { status: 503 },
    );
  }

  const backendRes = await fetch(`${baseUrl}/api/public/contact`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Seer-Landing-Contact-Key": serverKey,
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      subject: payload.subject || null,
      message: payload.message,
      company: "",
    }),
  });

  const text = await backendRes.text();
  let data: { success?: boolean; message?: string } = {};
  try {
    data = JSON.parse(text) as typeof data;
  } catch {
    /* ignore */
  }

  if (!backendRes.ok) {
    const message =
      typeof data.message === "string" && data.message.length > 0
        ? data.message
        : "Something went wrong. Please try again.";
    return NextResponse.json(
      { success: false, message },
      { status: backendRes.status >= 400 && backendRes.status < 600 ? backendRes.status : 502 },
    );
  }

  return NextResponse.json({
    success: true,
    message:
      typeof data.message === "string" && data.message.length > 0
        ? data.message
        : "Thank you. We have received your message.",
  });
}
