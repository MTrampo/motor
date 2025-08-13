import { VehicleFormatted } from "@/commons/models/Vehicle";
import { CarStatusBadge } from "@/components/status/car-status";
import { ChartBarProfitProjection } from "@/components/vehicles/chart-profit-projection-vehicle";
import TableCostsVehicle from "@/components/vehicles/data-table/table-costs-vehicle";
import { FaCartArrowDown, FaMagnifyingGlassDollar, FaMoneyBillTrendUp, FaScrewdriverWrench } from "react-icons/fa6";

type VehicleDetailsProps = {
  vehicle: VehicleFormatted
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  return (
    <main className="p-6 flex gap-6">
      <div className="flex flex-col gap-6">
        <div className="relative flex flex-col flex-2 gap-10 border rounded-xl -mt-16 z-10 bg-white shadow-sm">
          <div className="flex flex-col p-10 gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold gap-1 flex items-center">
                  {vehicle.brand}
                  <span className="text-blue-500">{vehicle.model}</span>
                </h1>
                <h2 className="text-muted-foreground">
                  {vehicle?.version}
                </h2>
              </div>
              <CarStatusBadge status={vehicle.status}/>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <span className="block text-muted-foreground">Pagamento</span>
                <span className="block font-semibold">{vehicle.paymentDateFormatted}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Ano</span>
                <span className="block font-semibold">{vehicle.manufacturingYear}/{vehicle.modelYear}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Km</span>
                <span className="block font-semibold">{vehicle.kilometers}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Cor</span>
                <span className="block font-semibold">{vehicle.color}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Condição</span>
                <span className="block font-semibold">{vehicle.conditionTypeFormatted}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Placa</span>
                <span className="block font-semibold">{vehicle.licensePlate}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Chassi</span>
                <span className="block font-semibold">{vehicle.chassis}</span>
              </div>
            </div>
          </div>
          {vehicle.auction && (
            <div className="flex flex-col p-10 gap-6 border-t">
              <h3 className="text-muted-foreground text-xl font-semibold flex gap-1">
                Leilão
                <span className="block capitalize text-blue-500">{vehicle.auction.name}</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <span className="block text-muted-foreground">Código</span>
                  <span className="block font-semibold">{vehicle.auction.code}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Comitente</span>
                  <span className="block font-semibold">{vehicle.auction.consignor}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Monta</span>
                  <span className="block font-semibold">{vehicle.auction.damageTypeFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Condição</span>
                  <span className="block font-semibold">{vehicle.auction.functionalFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Lance</span>
                  <span className="block font-semibold">{vehicle.auction.bidFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Comissão</span>
                  <span className="block font-semibold">{vehicle.auction.commissionFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">DSAL</span>
                  <span className="block font-semibold">{vehicle.auction.dsalFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Outros</span>
                  <span className="block font-semibold">{vehicle.auction.othersFormatted}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-2 gap-10 border rounded-xl bg-white shadow-sm">
          <div className="p-10">
            <h3 className="text-muted-foreground text-xl font-semibold flex gap-1">
              Custos
              <span className="block capitalize text-blue-500">Gerais</span>
            </h3>
            <TableCostsVehicle plate={vehicle.licensePlate}/>
          </div>
        </div>
      </div>
      <aside className="relative p-10 border rounded-xl -mt-16 z-10 bg-white shadow-sm flex flex-col flex-1 gap-6">
        <h2 className="text-2xl font-bold text-muted-foreground">
          Simulação de Lucro com Desconto FIPE
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3">
          <div>
            <span className="flex items-center gap-1 text-muted-foreground">
              <FaMagnifyingGlassDollar />
              Fipe
            </span>
            <span className="block font-semibold">{vehicle.fipeFormatted}</span>
          </div>
          <div>
            <span className="flex items-center gap-1 text-muted-foreground">
              <FaCartArrowDown />
              Pago
            </span>
            <span className="block font-semibold">{vehicle.paidFormatted}</span>
          </div>
          <div>
            <span className="flex items-center gap-1 text-muted-foreground">
              <FaScrewdriverWrench />
              Manutenção
            </span>
            <span className="block font-semibold">{vehicle.maintenance.totalFormatted}</span>
          </div>
        </div>
        <ChartBarProfitProjection vehicle={vehicle}/>
      </aside>
    </main>
  )
}