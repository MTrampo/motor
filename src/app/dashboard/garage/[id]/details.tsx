"use client"

import { useRef } from "react";
import Image from "next/image";
import svgCarRepair from "@/commons/assets/svgs/car-repair.svg";
import { VehicleFormatted, VehicleStatusFormInputs } from "@/commons/models/Vehicle";
import { RegisterCostForm } from "@/components/forms/Cost/cost-form";
import { SheetForm, SheetFormRef } from "@/components/forms/sheet-form";
import { CarStatusBadge } from "@/components/status/car-status";
import { Button } from "@/components/ui/button";
import { ChartBarProfitProjection } from "@/components/vehicles/chart/chart-profit-projection-vehicle";
import TableCostsVehicle from "@/components/vehicles/data-table/table-costs-vehicle";
import { FaCartArrowDown, FaFileCirclePlus, FaMagnifyingGlassDollar, FaSackDollar } from "react-icons/fa6";
import { RegisterCostFormInputs } from "@/commons/models/Cost";
import { addCost, updatedStatus } from "./action";
import { ChartCostAnalysis } from "@/components/vehicles/chart/chart-cost-analysis";
import { useGetCostByPlateSWR } from '@/hooks/swr/use-cost'
import { TimelineStatus } from "@/components/status/timeline-status";
import { DialogForm, DialogFormRef } from "@/components/forms/dialog-form";
import { GiGearStick, GiGearStickPattern } from "react-icons/gi";
import { StatusForm } from "@/components/forms/Vehicle/status-form";

type VehicleDetailsProps = {
  vehicle: VehicleFormatted
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  const { mutate, cost, isLoading } = useGetCostByPlateSWR(vehicle.id)

  const costFormRef = useRef<SheetFormRef>(null)
  const statusFormRef = useRef<DialogFormRef>(null)

  const handleAddCost = async (data: RegisterCostFormInputs[]) => {
    await addCost(vehicle.id, data)
    //await mutate()
  }

  const handleUpdateStatus = async (data: VehicleStatusFormInputs) => {
    const history = vehicle.status.history
    const lastDocumentId = history && history.length > 0 ? history[history.length - 1].id : null

    await updatedStatus(lastDocumentId, vehicle.id, data)
  }

  return (
    <main className="flex flex-col p-6 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-3 md:col-span-2 flex flex-col gap-10 border rounded-xl bg-white shadow-sm">
          <div className="flex flex-col max-[374]:p-5 p-10 gap-6">
            <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold gap-1 flex items-center">
                  {vehicle.brand}
                  <span className="text-blue-500">{vehicle.model}</span>
                </h1>
                <h2 className="text-muted-foreground">
                  {vehicle?.version}
                </h2>
              </div>
              <div className="flex justify-between pb-6 lg:block lg:space-x-10">
                <CarStatusBadge status={vehicle.status.current}/>
                {/* <ActionMenu currentStatus={vehicle.status.current}/> */}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <span className="block text-muted-foreground">Pagamento</span>
                <span className="block font-semibold">{vehicle.payment.paymentDateFormatted}</span>
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
                <span className="block font-semibold">{vehicle.id}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Chassi</span>
                <span className="block font-semibold">{vehicle.chassis}</span>
              </div>
            </div>
          </div>
          {vehicle.payment.auction && (
            <div className="flex flex-col max-[374]:p-5 p-10 gap-6 border-t">
              <h3 className="text-muted-foreground text-xl font-semibold flex gap-1">
                Leilão
                <span className="block capitalize text-blue-500">{vehicle.payment.auction.name}</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <span className="block text-muted-foreground">Código</span>
                  <span className="block font-semibold">{vehicle.payment.auction.code}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Comitente</span>
                  <span className="block font-semibold">{vehicle.payment.auction.consignor}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Monta</span>
                  <span className="block font-semibold">{vehicle.payment.auction.damageTypeFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Condição</span>
                  <span className="block font-semibold">{vehicle.payment.auction.functionalFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Lance</span>
                  <span className="block font-semibold">{vehicle.payment.auction.bidFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Comissão</span>
                  <span className="block font-semibold">{vehicle.payment.auction.commissionFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Administração</span>
                  <span className="block font-semibold">{vehicle.payment.auction.administrativeFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Outros</span>
                  <span className="block font-semibold">{vehicle.payment.auction.othersFormatted}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {vehicle.status.history && (
          <div className="col-span-3 md:col-span-1 border rounded-xl p-10 bg-white shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-muted-foreground text-xl font-semibold flex gap-1 mb-6">
                Histórico de 
                <span className="block capitalize text-blue-500">Marchas</span>
              </h3>
              <div>
                <DialogForm
                  formRef={statusFormRef}
                  triggerComponent={(
                    <Button variant="outline" size="icon">
                      <GiGearStickPattern />
                    </Button>
                  )}
                  title={(<><GiGearStickPattern /> Mudar Marcha</>)}
                  description="Cada marcha representa uma etapa da jornada do seu veículo, do pátio à venda ou aluguel. Mude a marcha para acompanhar o processo e manter tudo atualizado."
                  formComponent={(
                    <StatusForm ref={statusFormRef} currentStatus={vehicle.status.current} onHandleSubmit={handleUpdateStatus} />
                  )}
                  buttonText={(<>MUDAR <GiGearStick /></>)}
                />
              </div>
            </div>
            {vehicle.status.history.map(history => (
              <TimelineStatus key={history.id} history={history}/>
            ))}
          </div>
        )}
        <div className={`${cost ? 'col-span-2' : 'col-span-3'} flex flex-col gap-10 border rounded-xl bg-white shadow-sm`}>
          <div className="max-[374]:p-5 p-10">
            <div className="flex justify-between items-center">
              <h3 className="text-muted-foreground text-xl font-semibold flex gap-1">
                Custos
                <span className="block capitalize text-blue-500">Gerais</span>
              </h3>
              <div>
                <SheetForm
                  formRef={costFormRef}
                  triggerComponent={(
                    <Button variant="outline" size="icon">
                      <FaFileCirclePlus />
                    </Button>
                  )}
                  title="Adicionar Custos"
                  description='Informe qualquer despesa relacionada ao seu veículo, desde manutenções e reparos a gastos com peças, inspeções ou documentação.'
                  formComponent={(
                    <RegisterCostForm ref={costFormRef} onHandleSubmit={handleAddCost} />
                  )}
                />
              </div>
            </div>
            {cost ? (
              <TableCostsVehicle plate={vehicle.id} cost={cost}/>
            ) : (
              <div className="flex flex-col gap-5 pt-12">
                <Image src={svgCarRepair} className="mx-auto" alt="carro em manutenção" width={200} height={200}/>
                <div className="text-center text-muted-foreground">
                  <p>
                    Parece que o nosso mecânico está de folga!
                  </p>
                  <p>
                    Lance o primeiro gasto para dar a ele um motivo para entrar em ação
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {cost && (
          <div className="border rounded-xl p-10 bg-white shadow-sm">
            <div className="flex flex-col gap-6">
              <h3 className="text-muted-foreground text-xl font-semibold flex gap-1 mb-6">
                Análise de 
                <span className="block capitalize text-blue-500">Gastos por Categoria</span>
              </h3>
              <p>
                Entenda como o capital investido se distribuiu para as diferentes categorias de custos.
              </p>
              <ChartCostAnalysis cost={cost}/>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicle.fipe > 0 && (
          <div className="col-span-2 border rounded-xl p-10 bg-white shadow-sm">
            <div className="flex flex-col gap-6">
              <h3 className="text-muted-foreground text-xl font-semibold flex gap-1 mb-6">
                Simulação de 
                <span className="block capitalize text-blue-500">Lucro com Desconto FIPE</span>
              </h3>
              <div className="grid grid-cols-2 gap-y-2 sm:grid-cols-3 md:gap-y-0">
                <div className="col-span-2 sm:col-span-1">
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
                  <span className="block font-semibold">{vehicle.payment.totalFormatted}</span>
                </div>
                <div>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <FaSackDollar />
                    Gasto Total
                  </span>
                  <span className="block font-semibold">
                    {cost?.totalFormatted ?? 'R$ 0,00'}
                  </span>
                </div>
              </div>
              <ChartBarProfitProjection vehicle={vehicle} cost={cost}/>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}