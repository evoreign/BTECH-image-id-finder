"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@/components/navbar-header";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { ToastClose } from '@/components/ui/toast';
import Link from 'next/link'

type ParamsType = {
    ImageId: number;
};

export default function Doc( {params}: {params: ParamsType}) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // track whether component is mounted

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:4000/search/${params.ImageId}`);
                if (isMounted) {
                    const mappedData = response.data.map(item => ({
                        title: item.model, // replace with actual property name from your API data
                        description: `Tab: ${item.data.Tab}, Section: ${item.data.Section}`, // replace 'tab' and 'section' with actual property names from your API data
                        link: `/${item.model}`, // replace 'model' with actual property name from your API data
                        image: item.ImageUrl, // replace with actual property name from your API data
                    }));
                    setData(mappedData);
                    setIsLoading(false);
                    if (mappedData.length === 0) {
                        toast({
                            title: "No results found",
                            description: `No results found for Image ID ${params.ImageId}.`,
                        });
                    }
                }
            } catch (error) {
                if (isMounted) {
                    if (error.response && error.response.status === 400) {
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Bad request.",
                            description: "Try entering a valid Image ID, it only accepts positive numbers.",
                            action: <Link href='/'><ToastAction altText="Try again">Try again</ToastAction></Link>,
                          })
                    } else {
                        console.error(error);
                    }
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false; // cleanup
        };
    }, [params.ImageId]);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-32">
            <Header/>
            <div className="w-full max-w-5xl mx-auto mt-20">
                <h1 className="scroll-m-20 border-b pb-2 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight first:mt-0">
                    Search results for Image ID {params.ImageId}
                </h1>
                {/* Display your data here. This is just an example. */}
                <div className="pb-1  scroll-m-20 pt-2">
                {isLoading ? (
                    <p className="text-sm text-muted-foreground text-left">Loading...</p>
                ) : (
                    <>
                        <p className="text-sm text-muted-foreground text-left">{data.length} model(s) found for Image ID {params.ImageId}.</p>
                        <HoverEffect items={data} />
                    </>
                )}
                </div>
            </div>
        </main>
    );
}