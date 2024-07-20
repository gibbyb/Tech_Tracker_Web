import Image from "next/image";

export default function TT_Header() {
  return (
    <header className="w-full py-5">
      <div className="flex flex-row items-center text-center justify-center p-8">
        <Image src="/images/tech_tracker_logo.png"
          alt="Tech Tracker Logo" width={80} height={80}
        />
        <h1 className="title-text text-6xl font-semibold pl-4">
          Tech Tracker
        </h1>
      </div>
    </header>
  );
};
