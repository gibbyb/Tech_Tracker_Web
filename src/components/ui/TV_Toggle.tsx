"use client";
import { Switch } from "~/components/ui/shadcn/switch";
import { useTVMode } from "~/components/context/TVModeContext";
import { useSession } from "next-auth/react";

export default function TV_Toggle() {
  const { tvMode, toggleTVMode } = useTVMode();
  const { data: session } = useSession();
  if (!session) return <div/>;
  return (
    <Switch
      checked={tvMode}
      onCheckedChange={toggleTVMode}
      className="bg-gradient-to-br from-[#595959] to-[#444444]
        hover:bg-gradient-to-bl hover:from-[#484848] hover:to-[#333333]
        mx-4 mt-2"
    />
  );
}
