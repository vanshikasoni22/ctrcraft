import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST() {
  try {
    await auth.api.signOut({ headers: await headers() });
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
