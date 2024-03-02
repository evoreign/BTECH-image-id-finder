"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

import darkLogo from '../public/logo-dark.png';
import lightLogo from '../public/logo-light.png';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [error, setError] = useState(null);

  const handleThemeChange = (newTheme) => {
    try {
      setTheme(newTheme);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <header className={`w-full p-2 sm:p-4 fixed top-0 left-0 flex justify-between items-center px-2 sm:px-4 py-1 sm:py-2 bg-transparent text-${theme === 'dark' ? 'white' : 'black'} z-50`}>
      <div className="flex items-center">
        <Link href="/">
            <Image src={theme === 'dark' ? lightLogo : darkLogo} alt="Logo" width={100} height={100} className="sm:w-125 sm:h-125" />
        </Link>
      </div>
      <div className="flex h-5 items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[0.8rem] w-[0.8rem] sm:h-[1.2rem] sm:w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[0.8rem] w-[0.8rem] sm:h-[1.2rem] sm:w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleThemeChange("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
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