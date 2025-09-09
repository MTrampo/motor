"use client";

import { useGetAllVehicles } from "@/hooks/swr/use-vehicle";
import CardVehicles from "./card-vehicle";
import { FaCarOn, FaFilter, FaMagnifyingGlass } from "react-icons/fa6";
import { InputIcon } from "../ui/input-icon";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ContainerCardVehicle() {
  const { vehicles, isLoading } = useGetAllVehicles();

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
          <Link href='/dashboard/vehicles/new'>
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