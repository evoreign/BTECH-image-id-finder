"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@/components/navbar-header";

type ParamsType = {
    ImageId: number;
};

export default function Doc( {params}: {params: ParamsType}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // track whether component is mounted

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:4000/search/${params.ImageId}`);
                if (isMounted) {
                    setData(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error);
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false; // cleanup
        };
    }, [params.ImageId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <Header/>
            <div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Search results for Image ID {params.ImageId}
                </h1>
                {/* Display your data here. This is just an example. */}
                {data && <div>{JSON.stringify(data)}</div>}
            </div>
        </main>
    );
}