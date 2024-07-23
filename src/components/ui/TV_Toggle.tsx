"use client";
import Image from "next/image";
import { useTVMode } from "~/components/context/TVModeContext";
import { useSession } from "next-auth/react";

export default function TV_Toggle() {
  const { tvMode, toggleTVMode } = useTVMode();
  const { data: session } = useSession();
  if (!session) return <div/>;
  return (
    <button onClick={toggleTVMode} className="mr-4 mt-1">
      {tvMode ? (
        <Image src="/images/exit_fullscreen.svg" alt="Exit TV Mode"
          width={25} height={25}
        />
      ) : (
        <Image src="/images/fullscreen.svg" alt="Enter TV Mode"
          width={25} height={25}
        />
      )}
    </button>
  );
}
