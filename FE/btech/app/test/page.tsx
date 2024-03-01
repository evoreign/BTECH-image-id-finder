"use client"
import Header from "@/components/navbar-header";

export default function Test() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Header/>
      <div >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
          Test things here
        </h1>
        
      </div>
    </main>
  );
}