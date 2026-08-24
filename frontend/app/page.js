import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Welcome to My App</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        This is a simple Next.js app.
      </p>
      
    </div>
  );
}
