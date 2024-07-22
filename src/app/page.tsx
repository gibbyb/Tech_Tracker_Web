"use server";
import { auth } from "~/auth";
import No_Session from "~/components/auth/No_Session";
import Header from "~/components/ui/Header";
import { getEmployees } from "~/server/functions";
import TechTable from "~/components/ui/TechTable";

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
        <TechTable employees={employees}/>
      </main>
    );
  }
}
