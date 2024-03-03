"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@/components/navbar-header";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton"
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

type ParamsType = {
    ImageId: number;
};

export default function Doc( {params}: {params: ParamsType}) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // track whether component is mounted

        const fetchData = async () => {
            setIsLoading(true); // set loading state to true before fetching data
            try {
                const response = await axios.get(`http://127.0.0.1:4000/search/${params.ImageId}`);
                // setTimeout(() => { // artificial delay
                    if (isMounted) {
                        const mappedData = response.data.map((item:any) => ({
                            title: item.model, // replace with actual property name from your API data
                            description: `Tab: ${item.data.Tab}, Section: ${item.data.Section}`, // replace 'tab' and 'section' with actual property names from your API data
                            link: `/search/${params.ImageId}/${item.model}`, // replace 'model' with actual property name from your API data
                            image: item.ImageUrl, // replace with actual property name from your API data
                        }));
                        setData(mappedData);
                        setIsLoading(false);
                        if (mappedData.length === 0) {
                            toast({
                                title: "No results found",
                                description: `No results found for Image ID ${params.ImageId}.`,
                                action: <Link href='/'><ToastAction altText="Try again">Try again</ToastAction></Link>,
                            });
                        }
                    }
                // }, 2000); // artificial delay of 2 seconds
            } catch (error) {
                // setTimeout(() => { // artificial delay
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
                // }, 2000); // artificial delay of 2 seconds
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array(10).fill(0).map((_, index) => (
                            <Skeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center">
                            <Breadcrumbs>
                                <BreadcrumbItem href="/"> <MagnifyingGlassIcon />Search</BreadcrumbItem>
                                <BreadcrumbItem href={`/search/${params.ImageId}`}>{params.ImageId}</BreadcrumbItem>
                            </Breadcrumbs>
                            <p className="text-sm text-muted-foreground">{data.length} model(s) found for Image ID {params.ImageId}.</p>
                        </div>
                        <HoverEffect items={data} />
                    </>
                )}
                </div>
            </div>
        </main>
    );
}