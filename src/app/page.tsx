"use server";
import { auth } from "~/auth";
import No_Session from "~/components/ui/No_Session";
import Header from "~/components/ui/Header";
import { getEmployees } from "~/server/functions";
import Tech_Table from "~/components/ui/Tech_Table";

export default async function HomePage() {
  const session = await auth();
  if (!session) {
    return <No_Session />
  } else {
    const employees = await getEmployees();
    return (
      <main className="min-h-screen
        bg-gradient-to-b from-[#111111] to-[#212325]">
          <Header />
          <Tech_Table employees={employees}/>
      </main>
    );
  }
}
