import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-4 font-bold transform transition duration-500 ease-in-out hover:scale-110">Image ID finder</h1>
      <div className="flex w-1/2">
        <Input className="p-4 text-2xl flex-grow" type="text" placeholder="Enter ID to find" />
        <a href="http://example.com" target="_blank" rel="noopener noreferrer" className="transform transition duration-500 ease-in-out hover:scale-125">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </a>
      </div>
    </div>
  )
}