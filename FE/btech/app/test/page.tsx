"use client"
import { useTheme } from 'next-themes'
import Header from "@/components/navbar-header";
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export default function Doc() {

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">

        <Header/>
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
            TEST UI HERE
          </h1>
          <TextGenerateEffect words='test'/>
        </div>

    </main>
  );
}