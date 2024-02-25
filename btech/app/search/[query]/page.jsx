"use client"
import { Input } from "@/components/ui/input"
import Taskbar from "@/app/component/taskbar"
import { useRouter } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'
export default function query({params}) {
    const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{background: 'linear-gradient(to right, #90E0EF, #0077B6)'}}>
      <Taskbar />
      <h1>search result for {params.query}</h1>
    </div>
  )
}