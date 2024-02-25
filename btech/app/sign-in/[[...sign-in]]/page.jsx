import { SignIn } from "@clerk/nextjs";
import Taskbar from "@/app/component/taskbar";
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{background: 'linear-gradient(to right, #90E0EF, #0077B6)'}}>
      <Taskbar />
      <SignIn/>
    </div>
  )
}