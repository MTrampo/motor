"use client";

import Link from "next/link";
import Image from "next/image";
import { useGetAllVehiclesSWR } from "@/hooks/swr/use-vehicle";
import { FaCarOn, FaFilter, FaMagnifyingGlass } from "react-icons/fa6";
import CardVehicles from "./card-vehicle";
import { InputIcon } from "../ui/input-icon";
import { Button } from "../ui/button";
import svgWinch from '@/commons/assets/svgs/winch.svg';

export default function ContainerCardVehicle() {
  const { vehicles, isLoading } = useGetAllVehiclesSWR();

  if (!vehicles) {
    return (
      <div className="flex flex-col gap-10 pt-12">
        <Image src={svgWinch} className="mx-auto w-auto" alt="carro em manutenção" width={600} height={600} priority/>
        <div className="text-center text-muted-foreground">
          <p>
            Ué, guincharam todos os carros? A sua garagem está vazia. Vamos começar a encher o seu pátio.
          </p>
          <p>
            Clique no botão abaixo para adicionar seu primeiro veículo!
          </p>
        </div>
        <Button className="mx-auto" variant='emphasis' asChild>
          <Link href='/dashboard/garage/new'>
            <FaCarOn /> Adicionar Veículo
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <InputIcon
            placeholder="Buscar pela versão..."
            iconLeft={<FaMagnifyingGlass/>}
          />
          <Button variant="outline" size="icon">
            <FaFilter />
          </Button>
        </div>
        <Button variant='default' size="icon" asChild>
          <Link href='/dashboard/garage/new'>
            <FaCarOn />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {vehicles?.map(vehicle => (
          <CardVehicles key={vehicle.id} vehicle={vehicle}/>
        ))}
      </div>
    </>
  );
}