import { VehicleFormatted } from "@/commons/models/Vehicle";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import Image from "next/image";
import { FaCalendar, FaCar, FaCarSide, FaGaugeSimpleHigh, FaScrewdriverWrench } from "react-icons/fa6";
import { CarStatusBadge } from "../status/car-status";
import Link from "next/link";

type CardVehiclesProps = {
  vehicle: VehicleFormatted;
}

export default function CardVehicles({ vehicle }: CardVehiclesProps) {
  
  return (
    <Link href={`/dashboard/vehicles/${vehicle.id}`} className="hover:scale-[1.02] transition-transform duration-200 ease-in-out">
      <Card className="sm:h-full grid grid-cols-2 sm:flex sm:grid-cols-none p-0 overflow-hidden gap-0 hover:shadow-md">
        <CardHeader className="gap-0 p-0 relative">
          <div className="relative sm:absolute sm:top-2 sm:right-2 sm:z-10">
            <CarStatusBadge className="w-full sm:w-fit py-2 sm:py-0.5 rounded-none sm:rounded-md" status={vehicle.status}/>
          </div>
          <Image
            src={vehicle.images[0]}
            alt={`${vehicle.brand} ${vehicle.model}`}
            width={150}
            height={150}
            className="object-cover w-full rounded-bl-lg sm:rounded-b-none sm:rounded-t-xl"
            loading="lazy"
          />
        </CardHeader>
        <CardContent className="p-3 sm:mb-1">
          <h6 className="font-semibold">
            {vehicle.brand} <span className="text-blue-500">{vehicle.model}</span>
          </h6>
          <div className="flex flex-col text-muted-foreground gap-y-1">
            <CardDescription className="max-[400]:hidden block">
              {vehicle.version}
            </CardDescription>

            <div className="flex max-[400]:flex-col flex-row justify-between sm:items-center gap-1 sm:gap-0 min-[410]:mt-10 min-[585]:mt-20 sm:mt-2">
              <span className="flex items-center gap-1 sm:gap-2 max-[469]:text-xs text-sm">
                <FaScrewdriverWrench /> 
                {vehicle.conditionTypeFormatted}
              </span>
              <span className="flex items-center gap-1 sm:gap-2 max-[469]:text-xs text-sm">
                <FaCalendar /> 
                {vehicle.manufacturingYear}/{vehicle.modelYear}
              </span>
            </div>
            <div className="flex max-[400]:flex-col flex-row justify-between sm:items-center gap-1 sm:gap-0">
              <span className="flex items-center gap-1 sm:gap-2 max-[469]:text-xs text-sm">
                <FaCar />
                {vehicle.licensePlate}
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