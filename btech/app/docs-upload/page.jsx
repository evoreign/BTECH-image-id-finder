import { Input } from "@/components/ui/input"
import Taskbar from "../component/taskbar"
import { ClerkProvider } from '@clerk/nextjs'
export default function docs_upload() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{background: 'linear-gradient(to right, #90E0EF, #0077B6)'}}>
      <Taskbar />
      
    </div>
  )
}