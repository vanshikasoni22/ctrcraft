import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function CreatePage() {

  const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    });

    console.log("session", session)

    if(!session) {
        redirect('/auth/signup');
  }
  return (
    <div className="flex items-center justify-center h-screen text-2xl">
      Welcome, {session.user.name}!
    </div>
  )
}