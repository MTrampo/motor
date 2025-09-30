import { VehicleSummaryFormatted } from "@/commons/models/Vehicle";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import Image from "next/image";
import { FaCalendar, FaCar, FaGaugeSimpleHigh, FaScrewdriverWrench } from "react-icons/fa6";
import { CarStatusBadge } from "../status/car-status";
import Link from "next/link";
import { getRandomCarImage } from "@/commons/utils/generate-data";
import { Skeleton } from "../ui/skeleton";

type CardVehicleProps = {
  vehicle: VehicleSummaryFormatted;
}

export default function CardVehicle({ vehicle }: CardVehicleProps) {
  const imgFallback = getRandomCarImage()
  
  return (
    <Link href={`/dashboard/garage/${vehicle.id}`} className="hover:scale-[1.02] transition-transform duration-200 ease-in-out">
      <Card className="sm:h-full grid grid-cols-2 sm:flex sm:grid-cols-none p-0 overflow-hidden gap-0 hover:shadow-md">
        <CardHeader className="gap-0 p-0 relative">
          <div className="relative sm:absolute sm:top-2 sm:right-2 sm:z-10">
            <CarStatusBadge className="w-full sm:w-fit py-2 sm:py-0.5 rounded-none sm:rounded-md" status={vehicle.status}/>
          </div>
          <Image
            src={vehicle.hero || imgFallback}
            alt={`${vehicle.brand} ${vehicle.model}`}
            placeholder="blur"
            blurDataURL={vehicle.hero ?? undefined}
            width={150}
            height={150}
            loading="lazy"
            className="object-cover w-full rounded-bl-lg sm:rounded-b-none sm:rounded-t-xl"
          />
        </CardHeader>
        <CardContent className="p-3 sm:mb-1">
          <h6 className="font-semibold uppercase">
            {vehicle.brand} <span className="text-blue-500">{vehicle.model}</span>
          </h6>
          <div className="flex flex-col text-muted-foreground gap-y-1">
            <CardDescription className="max-[400]:hidden block uppercase">
              {vehicle.version}
            </CardDescription>

            <div className="flex max-[400]:flex-col flex-row justify-between sm:items-center gap-1 sm:gap-0 min-[410]:mt-10 min-[585]:mt-20 sm:mt-2">
              <span className="flex items-center gap-1 sm:gap-2 max-[469]:text-xs text-sm">
                <FaScrewdriverWrench /> 
                {vehicle.conditionTypeFormatted}
              </span>
              <span className="flex items-center gap-1 sm:gap-2 max-[469]:text-xs text-sm">
                <FaCalendar /> 
                {vehicle.years}
              </span>
            </div>
            <div className="flex max-[400]:flex-col flex-row justify-between sm:items-center gap-1 sm:gap-0">
              <span className="flex items-center gap-1 sm:gap-2 max-[469]:text-xs text-sm">
                <FaCar />
                {vehicle.id}
              </span>
              <span className="flex items-center gap-1 sm:gap-2 max-[469]:text-xs text-sm">
                <FaGaugeSimpleHigh /> 
                {vehicle.kilometers}
              </span>
            </div>          
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function CardVehicleLoading() {  
  return (
    <Card className="sm:h-full grid grid-cols-2 sm:flex sm:grid-cols-none p-0 overflow-hidden gap-0 hover:shadow-md">
      <CardHeader className="gap-0 p-0">
        <Skeleton className="h-[250px] w-auto rounded-none" />
      </CardHeader>
      <CardContent className="p-3 sm:mb-1">
        <Skeleton className="h-4 w-[100px]" />
        <div className="flex flex-col gap-y-2 mt-2">
          <CardDescription className="max-[400]:hidden block">
            <Skeleton className="h-2 w-[200px]" />
          </CardDescription>

          <div className="flex max-[400]:flex-col flex-row justify-between sm:items-center gap-2 sm:gap-0 min-[410]:mt-10 min-[585]:mt-20 sm:mt-4">
            <Skeleton className="h-2 w-[100px]" />
            <Skeleton className="h-2 w-[100px]" />
          </div>
          <div className="flex max-[400]:flex-col flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <Skeleton className="h-2 w-[100px]" />
            <Skeleton className="h-2 w-[100px]" />
          </div>          
        </div>
      </CardContent>
    </Card>
  )
}