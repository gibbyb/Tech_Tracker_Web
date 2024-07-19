import { auth } from "~/auth";
import { db } from "~/server/db";
import No_Session from "~/components/auth/No_Session";

export default async function HomePage() {
  const user = await auth();
  const employees = await db.query.users.findMany({
    orderBy: (model, {desc}) => desc(model.id),
  });
  if (!user) {
    return (
    <No_Session />
  );
  } else {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#111111] to-[#111325] text-white">
        <h1 className="text-2xl font-semibold">Welcome!</h1>
      </main>
    );
  }
}
