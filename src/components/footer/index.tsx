import Image from "next/image";
import { FaInstagram } from "react-icons/fa6";
import { Separator } from "../ui/separator";

export default function Footer() {

  return (
    <footer className="border-t mt-12 sm:mt-24 bg-header">
      <div className="mx-auto px-6 max-w-5xl py-6 sm:py-12 md:max-w-7xl">
        <div className="flex justify-between items-center">
          <nav className="text-xs">
            <ul className="flex gap-4">
              <li>Seja Nosso Parceiro</li>
              <li>Política de Privacidade</li>
              <li>Termos de Serviço</li>
            </ul>
          </nav>
          <div className="flex gap-5 text-2xl text-gray-500 dark:text-gray-300">
            <a className="hover:text-foreground dark:hover:text-white" href="https://www.instagram.com/meutrampo.dev/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="flex py-4">
          <div className="mx-auto flex items-center gap-2">
            <Image
              src="/svgs/logo-beta.svg"
              alt="Motor Beta Logo"
              width={200}
              height={200}
              className="w-32 h-auto"
            />
            <Separator className="bg-gray-400" orientation="vertical"/>
            <Image
              src="/svgs/logo-mt.svg"
              alt="Meu Trampo Logo"
              width={200}
              height={200}
              className="w-16 h-auto"
            />
          </div>
        </div>
        <span className="block text-center text-sm dark:text-gray-500">© 2025 Meu Trampo. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}