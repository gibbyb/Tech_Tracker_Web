import Sign_In from "~/components/auth/Sign_In";
import TT_Header from "~/components/ui/TT_Header";

export default function No_Session() {
  return (
    <main className="w-full min-h-screen mx-auto text-center pt-10
      bg-gradient-to-b from-[#111111] to-[#212325]">
      <div className="pt-8 pb-4">
        <TT_Header />
      </div>
      < Sign_In />
    </main>
  );
};
