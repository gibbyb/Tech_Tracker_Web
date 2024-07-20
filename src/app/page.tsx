import { auth } from "~/auth";
import No_Session from "~/components/auth/No_Session";
import TT_Header from "~/components/ui/TT_Header";
import Techs from "~/components/ui/Techs";

export default async function HomePage() {
  const session = await auth();
  if (!session) {
    return <No_Session />
  } else {
    return (
      <main className="min-h-screen bg-gradient-to-b
        from-[#111111] to-[#212325]">
        <TT_Header />
        <Techs />
      </main>
    );
  }
}
