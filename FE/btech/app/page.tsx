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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await router.push(`/search/${imageId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (event) => {
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
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Header/>
      <div>
        <TextGenerateEffect words='BTECH image ID finder' className=" "/>
        <Separator className="my-4" />
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2 justify-center">
          <Input type="search" placeholder="Enter your Image ID here" value={imageId} onChange={handleInputChange} />
          <Button type="submit">Search</Button>
        </form>
      </div>
    </main>
  );
}