import React from 'react';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator"
import { UserButton } from "@clerk/nextjs";

// import { Separator } from './ui/separator';
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="w-full  p-4 fixed top-0 left-0  flex justify-between items-center px-4 py-2 bg-transparent text-black">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold text-black">
            Your Logo
        </Link>
      </div>
      <div className="flex h-5 items-center space-x-4 text-sm">
        <Link href="/" className="text-black hover:text-blue-500">
            Search
        </Link>
        <Separator orientation="vertical" />
        <Link href="/doc-upload" className="text-black hover:text-blue-500">
            Docs
        </Link>

            <UserButton />
      </div>
    </header>
  );
};

export default Header;
