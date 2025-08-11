"use client";

import { useGetAllVehicles } from "@/hooks/swr/use-vehicle";
import CardVehicles from "./card-vehicle";

export default function ContainerCardVehicle() {
  const { vehicles, isLoading } = useGetAllVehicles();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {vehicles?.map(vehicle => (
        <CardVehicles key={vehicle.id} vehicle={vehicle}/>
      ))}
    </div>
  );
}