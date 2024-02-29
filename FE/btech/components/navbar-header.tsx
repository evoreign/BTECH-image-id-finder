import React from 'react';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator"
import { UserButton } from "@clerk/nextjs";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { theme, setTheme } = useTheme()
  return (
    <header className={`w-full p-4 fixed top-0 left-0 flex justify-between items-center px-4 py-2 ${theme === 'dark' ? 'bg-black' : 'bg-transparent'} text-${theme === 'dark' ? 'white' : 'black'}`}>
      <div className="flex items-center">
        <Link href="/" className={`text-xl font-bold text-${theme === 'dark' ? 'white' : 'black'}`}>
            Your Logo
        </Link>
      </div>
      <div className="flex h-5 items-center space-x-4 text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/" className={`text-${theme === 'dark' ? 'white' : 'black'} hover:text-blue-500`}>
            Search
        </Link>
        <Separator orientation="vertical" />
        <Link href="/doc-upload" className={`text-${theme === 'dark' ? 'white' : 'black'} hover:text-blue-500`}>
            Docs
        </Link>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;