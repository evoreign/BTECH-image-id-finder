"use client"
import Header from "@/components/navbar-header";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Header/>
      <div >
        <TextGenerateEffect words='BTECH image ID finder' className=" "/>
        {/* <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
          BTECH image ID finder
        </h1> */}
        <Separator className="my-4" />
        <div className="flex w-full  items-center space-x-2 justify-center ">
          <Input type="search" placeholder="Enter your Image ID here" />
          <Button type="submit">Search</Button>
        </div>
      </div>
    </main>
  );
}
