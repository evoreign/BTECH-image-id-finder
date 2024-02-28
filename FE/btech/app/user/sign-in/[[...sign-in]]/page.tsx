import { SignIn } from "@clerk/nextjs";
import Header from "@/components/navbar-header";
export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
        <Header/>
        <SignIn />
    </main>
  );
}