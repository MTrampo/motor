"use client"

import { use, useMemo } from "react";
import Header from "@/components/header";
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useGetVehicleById } from "@/hooks/swr/use-vehicle"
import VehicleDetails from "./details";


type VehicleProps = {
  params: Promise<{ id: string }>
}

export default function Page({ params }: VehicleProps) {
  const { id } = use(params)
  const { vehicle } = useGetVehicleById(id)

  if (!vehicle) {
    return <div className="p-6">Não encontrado...</div>
  }

  return (
    <>
      <Header title="Detalhes do Veículo" />
      <section>
        <Carousel className="w-full">
          <CarouselContent className="">
            {vehicle?.images.map(image => (
              <CarouselItem key={image} className="w-full md:basis-1/2 lg:basis-1/3">
                <Image className="w-full" src={image} alt={vehicle.model} width={400} height={400} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </section>
      <VehicleDetails vehicle={vehicle} />
    </>
  );

}