import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
     <UserButton
      afterSignOutUrl="/"
     />
     <ModeToggle />
    </div>
  );
}
