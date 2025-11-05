"use client"

import { use } from "react";
import Header from "@/components/header/dashboard";
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { useGetVehicleByIdSWR } from "@/hooks/swr/use-vehicle"
import VehicleDetails from "./details";
import { getRandomCarImage } from "@/commons/utils/generate-data";


type VehicleProps = {
  params: Promise<{ id: string }>
}

export default function Page({ params }: VehicleProps) {
  const { id } = use(params)
  const { vehicle } = useGetVehicleByIdSWR(id)
  const imgFallback = getRandomCarImage()

  if (!vehicle) {
    return <div className="p-6">Não encontrado...</div>
  }

  const showCarousel = (vehicle.images?.purchased?.length ?? 0) >= 3

  return (
    <>
      <Header title="Detalhes do Veículo" />
      <section className={showCarousel ? '' : 'relative w-full h-[400px] overflow-hidden'}>
        {showCarousel ? (
          <Carousel className="w-full">
            <CarouselContent className="h-[400px]">
              {vehicle.images.purchased?.map(image => (
                <CarouselItem key={image} className="md:basis-1/2 lg:basis-1/3 ">
                  <Image className="w-full" src={image} alt={vehicle.model} width={400} height={400} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <>
            <Image className="w-fit h-full absolute z-10 left-1/2 -translate-x-1/2" src={vehicle.images.purchased?.[0] || imgFallback} alt={vehicle.model} width={400} height={400} />
            <Image className="w-full object-contain blur-sm" src={vehicle.images.purchased?.[0] || imgFallback} alt={vehicle.model} width={400} height={400} />
          </>
        )}
      </section>
      <VehicleDetails vehicle={vehicle} />
    </>
  );

}