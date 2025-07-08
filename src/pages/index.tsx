import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex flex-col justify-between items-center min-h-screen px-6 py-12 bg-white dark:bg-black text-black dark:text-white`}
    >
      <main className="flex flex-col items-center text-center max-w-xl gap-8">
        <h1 className="text-3xl sm:text-4xl font-semibold">
          Welcome to StudyBudy! 🎓
        </h1>
        <p className="text-base sm:text-lg leading-relaxed">
          Your personalized study companion. Explore the community, track your progress, and achieve your academic goals with ease and motivation.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link
            href="/community"
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
          >
            Join the Community
          </Link>
          <Link
            href="/profile"
            className="border border-black dark:border-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            View Your Profile
          </Link>
        </div>
      </main>
      <footer className="mt-16 text-sm opacity-60">
        © 2025 StudyBudy. All rights reserved.
      </footer>
    </div>
  );
}
