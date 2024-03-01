"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/navbar-header";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export default function Home() {
  const [imageId, setImageId] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await router.push(`/search/${imageId}`);
    } catch (err:any) {
      setError(err.message);
    }
  };

  const handleInputChange = (event:any) => {
    setImageId(event.target.value);
  };

  useEffect(() => {
    if (error) {
      // Display the error message in some way
      alert(error);
      // Reset the error
      setError(null);
    }
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-32">
      <Header/>
      <div className="w-full max-w-3xl">
        <TextGenerateEffect words='BTECH image ID finder' className="text-center" />
        <Separator className="my-4" />
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full items-center space-y-2 sm:space-y-0 sm:space-x-2 justify-center">
          <Input type="search" placeholder="Enter your Image ID here" value={imageId} onChange={handleInputChange} className="w-full sm:w-auto flex-grow" />
          <Button type="submit" className="w-full sm:w-auto">Search</Button>
        </form>
      </div>
    </main>
  );
}