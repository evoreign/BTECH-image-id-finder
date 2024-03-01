"use client"
import Image from 'next/image';
import React from 'react';
import Header from "@/components/navbar-header";

export default function NotFound() {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <Header/>
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Oops! Page Not Found
          </h1>
          <p className="text-xl font-medium">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center mt-4">
            <Image 
              src="/404-cats.png" 
              alt="Cute image" 
              width={200} 
              height={200}
            />
          </div>
        </div>
      </main>
    );
  }