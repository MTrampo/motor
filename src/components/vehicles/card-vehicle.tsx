import { VehicleFormatted } from "@/commons/models/Vehicle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
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
      <Card className="p-0 overflow-hidden gap-0 hover:shadow-md">
        <CardHeader className="p-0 relative">
          <div className="absolute top-2 right-2 z-10">
            <CarStatusBadge status={vehicle.status}/>
          </div>
          <Image
            src={vehicle.images[0]}
            alt={`${vehicle.brand} ${vehicle.model}`}
            width={150}
            height={150}
            className="object-cover w-full rounded-t-xl"
            loading="lazy"
          />
        </CardHeader>
        <CardContent className="px-3 py-3 mb-1">
          <h6 className="font-semibold">
            {vehicle.brand} {vehicle.model}
          </h6>
          <div className="flex flex-col text-muted-foreground gap-y-1">
            <CardDescription>
              {vehicle.version}
            </CardDescription>

            <div className="flex justify-between items-center mt-2">
              <span className="flex items-center gap-2 text-sm">
                <FaScrewdriverWrench /> 
                {vehicle.conditionTypeFormatted}
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaCalendar /> 
                {vehicle.manufacturingYear}/{vehicle.modelYear}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-sm">
                <FaCar />
                {vehicle.licensePlate}
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
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