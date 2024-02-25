"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input"
import Taskbar from './component/taskbar';
import { ClerkProvider } from '@clerk/nextjs'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  }

  return (

    <div className="flex flex-col items-center justify-center min-h-screen" style={{background: 'linear-gradient(to right, #90E0EF, #0077B6)'}}>
      <Taskbar />
        <h1 className="text-4xl mb-4 font-bold mt-16" style={{color: '#03045E'}}>Image ID finder</h1>
        <div className="flex w-1/2">
          <Input className="p-4 text-2xl flex-grow" type="text" placeholder="Enter ID to find" style={{backgroundColor: '#CAF0F8'}} onChange={handleInputChange} />
          <Link legacyBehavior href={`/search/${searchQuery}`}>
            <a target="_blank" rel="noopener noreferrer" className="transform transition duration-500 ease-in-out hover:scale-125">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </a>
          </Link>
        </div>
      
    </div>
  )
}