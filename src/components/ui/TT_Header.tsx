import Image from "next/image";

export default function TT_Header() {
  return (
    <header className="w-full">
      <div className="flex flex-row items-center text-center justify-center p-8">
        <Image src="/images/tech_tracker_logo.png"
          alt="Tech Tracker Logo" width={100} height={100}
        />
        <h1 className="text-6xl font-semibold pl-4">
          Tech Tracker
        </h1>
      </div>
    </header>
  );
};
