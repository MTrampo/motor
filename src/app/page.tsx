import Link from "next/link";
import { Button } from "@/components/ui/button";
import InstallPrompt from "@/pwa/install-prompt";

export default function Home() {
  return (
    <main className="mx-auto px-6 py-12 sm:py-24 max-w-5xl md:max-w-7xl">

      <div className="flex items-center justify-between mb-10">
        <Button variant="ghost" asChild className="mb-10">
          <Link prefetch href='/dashboard' className="bg-blue-500 p-2 text-primary-foreground shadow-xs hover:bg-blue-500/90 ">
            NOVA VERSÃO
          </Link>
        </Button>
        {/* <InstallPrompt/> */}
      </div>
    </main>
  );
}
