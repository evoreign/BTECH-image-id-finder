import Link from 'next/link';
import { Separator } from "@/components/ui/separator"

import { UserButton } from "@clerk/nextjs";

export default function Taskbar() {
  return (
    <div className="w-full bg-transparent p-4 fixed top-0 left-0 flex justify-between items-center">
      <Link legacyBehavior href="/">
        <a className="text-2xl text-white">Logo</a>
      </Link>
      
      <div className="flex h-5 items-center space-x-4 text-sm text-white">
        <Link legacyBehavior href="/">
          <a className="hover:text-blue-200 transition duration-200">Search</a>
        </Link>
        <Separator orientation="vertical" />
        <Link legacyBehavior href="/docs-upload">
          <a className="hover:text-blue-200 transition duration-200">Docs upload</a>
        </Link>
        <div className="mr-2">
          <UserButton />
        </div>
      </div>
    </div>
  )
}