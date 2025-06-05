"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">PrepWithMe</div>
      <div className="space-x-4">
        <Link href="/" className="hover:text-gray-200">
          Home
        </Link>
        <Link href="/about" className="hover:text-gray-200">
          About
        </Link>
        <Link href="/contact" className="hover:text-gray-200">
          Contact
        </Link>
      </div>
    </nav>
  );
}
