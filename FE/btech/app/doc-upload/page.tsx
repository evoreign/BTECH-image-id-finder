"use client"
import Header from "@/components/navbar-header";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Doc() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Header/>
      <div >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
          DOC uploader here
        </h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input id="file" type="file" />
        </div>
      </div>
    </main>
  );
}
