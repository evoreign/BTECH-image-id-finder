"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@/components/navbar-header";
import { HoverEffect } from "@/components/ui/card-hover-effect";

type ParamsType = {
    ImageId: number;
};

export default function Doc( {params}: {params: ParamsType}) {
    const [data, setData] = useState([]);

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
                }
            } catch (error) {
                if (isMounted) {
                    console.error(error);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false; // cleanup
        };
    }, [params.ImageId]);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <Header/>
            <div>
                <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Search results for Image ID {params.ImageId}
                </h1>
                {/* Display your data here. This is just an example. */}
                <div className="max-w-5xl mx-auto px-8">
                    <HoverEffect items={data} />
                </div>
            </div>
        </main>
    );
}