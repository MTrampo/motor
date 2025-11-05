
import Link from "next/link"
import Image from "next/image";
import { Navigation } from "@/components/header/nav";
import { Button } from "../ui/button";

export default function Header() {

  return (
    <header className="sticky top-0 z-50 bg-header">
      <nav className="mx-auto p-6 max-w-5xl md:max-w-7xl ">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/svgs/logo-beta.svg"
              alt="Motor Logo"
              width={50}
              height={50}
              className="w-48 h-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Navigation />
            <Button variant="emphasis" asChild>
              <Link href="/signin">
                FROTA
              </Link>
            </Button>
            {/* <ModeToggle /> */}
          </div>
        </div>
      </nav>
    </header>
  )
}