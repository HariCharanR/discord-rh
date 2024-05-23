import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-red-500">
     <UserButton
      afterSignOutUrl="/"
     />
    </div>
  );
}
