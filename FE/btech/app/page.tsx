"use client"
import Header from "@/components/navbar-header";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"



export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Header/>
      <div >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
          BTECH image ID finder
        </h1>
        <Separator className="my-4" />
        <div className="flex w-full max-w-sm items-center space-x-2 justify-center ">
          <Input type="search" placeholder="Enter your Image ID here" />
          <Button type="submit">Search</Button>
        </div>
      </div>
    </main>
  );
}
