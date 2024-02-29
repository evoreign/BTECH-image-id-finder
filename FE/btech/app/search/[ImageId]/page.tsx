"use client"
import Header from "@/components/navbar-header";
type ParamsType = {
    ImageId: number;
};
export default function Doc( {params}: {params: ParamsType}) {

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
        <Header/>
        <div >
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
            Search results for {params.ImageId}
            </h1>
            
        </div>
        </main>
    );
}