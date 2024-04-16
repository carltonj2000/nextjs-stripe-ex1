import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-2xl bg-gray-100 mx-auto flex flex-col items-center pb-3 gap-3">
      <h1 className="text-xl text-center bg-gray-200 py-4 w-full">
        Hike And Scramble
      </h1>
      <Link href={"https://buy.stripe.com/4gwg006V23uL5iM8ww"}>
        <Button>Pay Member Ship Fee</Button>
      </Link>
    </main>
  );
}
