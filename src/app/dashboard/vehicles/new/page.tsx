"use client"

import Header from "@/components/header";
import { defineStepper } from "@/components/ui/stepper";
import { useEffect, useState } from 'react';
import z from 'zod'
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BasicForm } from '@/components/forms/Vehicle/basic-form';
import { Button } from '@/components/ui/button';
import { FaBrazilianRealSign, FaCarOn, FaFileLines } from 'react-icons/fa6';
import { PaymentForm } from '@/components/forms/Vehicle/payment-form';
import { paymentFormSchema, vehicleFormSchema, vehicleMainFormSchema } from "@/commons/validations/Vehicle";
import { SummaryForm } from "@/components/forms/Vehicle/summary-form";
import { CarOrigenEnum } from "@/commons/enums/Car";
import { PaymentFormInputs, VehicleFormInputs, VehicleMainFormInputs } from "@/commons/models/Vehicle";

const unifiedDefaultValues = {
  origin: String(CarOrigenEnum.THIRD),
  // defaultValues third
  cpfCnpj: '',
  name: '',
  paid: 0,
  paymentDate: new Date(),
  refPlate: '',
  notes: '',

  // defaultValues auction
  code: '',
  auctionName: '',
  consignor: '',
  functional: 0,
  damageType: 0,
  bid: 0,
  commission: 0,
  administrative: 0,
  others: 0,
  totalPaid: 0,
}

const VEHICLE = "vehicle" as const
const PAYMENT = "payment" as const
const SUMMARY = "summary" as const

const { Stepper, useStepper } = defineStepper(
  {
    id: VEHICLE,
    icon: <FaCarOn/>,
    title: "Veículo",
    description: "Adicione as informações básicas do veículo.",
    schema: vehicleFormSchema,
    defaultValues: {
      licensePlate: '',
      color: '',
      brand: '',
      model: '',
      version: '',
      manufacturingYear: '',
      modelYear: '',
      kilometers: '',
      conditionType: 0,
      chassis: '',
      fipe: 0
    },
    Component: BasicForm,
  },
  {
    id: PAYMENT,
    icon: <FaBrazilianRealSign />,
    title: "Pagamento",
    description: "Adicione as informações de pagamento e a origem do veículo.",
    schema: paymentFormSchema,
    defaultValues: unifiedDefaultValues,
    Component: PaymentForm,
  },
  {
    id: SUMMARY,
    icon: <FaFileLines />,
    title: "Resumo",
    description: "Revise as informações adicionadas.",
    schema: vehicleMainFormSchema,
    defaultValues: unifiedDefaultValues,
    Component: SummaryForm,
  },
);

export default function NewVehicle() {
  return (
    <>
      <Header title="Novo Veículo" />
      <main className="flex flex-col max-[374]:p-2 p-6 gap-y-10 h-full">
        <Stepper.Provider className="h-full">
          <StepperForm/>
        </Stepper.Provider>
      </main>
    </>
  )
}

export function StepperForm() {
  const methods = useStepper()
  const [summaryData, setSummaryData] = useState<VehicleMainFormInputs | null>(null)

  const form = useForm<z.infer<typeof methods.current.schema>>({
    mode: "onTouched",
    resolver: zodResolver(methods.current.schema),
    defaultValues: methods.current.defaultValues
  })

  const loadAndResetForm = () => {
    const defaults = methods.current.defaultValues
    const saved = localStorage.getItem(methods.current.id)

    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        form.reset({ ...defaults, ...parsed }, { keepDefaultValues: true })
      } catch (e) {
        console.error("Falha ao carregar dados:", e)
        form.reset(defaults, { keepDefaultValues: true })
      }
    } else {
      form.reset(defaults, { keepDefaultValues: true })
    }
  }

  const loadSummaryData = () => {
    const savedVehicle = JSON.parse(localStorage.getItem(VEHICLE) || 'null')
    const savedPayment = JSON.parse(localStorage.getItem(PAYMENT) || 'null')

    if (savedVehicle && savedPayment) {
      setSummaryData({ ...savedVehicle, ...savedPayment })
    } else {
      setSummaryData(null)
    }
  }

  useEffect(() => {
    loadAndResetForm()

    if (methods.current.id === 'summary') loadSummaryData()
  }, [methods.current.id])

  const handleNextStep = async() => {
    const valid = await form.trigger();
    if (!valid) return
    
    console.log(methods.current.id)
    console.log('dados estão aquyi: ', form.getValues())
    
    const currentData = form.getValues()
    localStorage.setItem(methods.current.id, JSON.stringify(currentData));

    methods.next()
  }

  const resetDataForm = () => {
    localStorage.removeItem(VEHICLE)
    localStorage.removeItem(PAYMENT)
    
    const defaults = methods.current.defaultValues
    form.reset(defaults, { keepDefaultValues: true })
    methods.reset()
  }

  const onSubmit = (values: z.infer<typeof methods.current.schema>) => {
    console.log('bateu aqui')
    console.log(`Form values for step ${methods.current.id}: ${JSON.stringify(values)}`)
    alert(
      `Form values for step ${methods.current.id}: ${JSON.stringify(values)}`
    );
    if (methods.isLast) return methods.reset()
  };

  return (
    <Form {...form} key={methods.current.id}>
      <form className="flex flex-col h-full" onSubmit={form.handleSubmit(onSubmit)}>
        <Stepper.Navigation>
          {methods.all.map((step) => (
            <Stepper.Step
              key={step.id}
              of={step.id}
              icon={step.icon}
            >
              <Stepper.Title>{step.title}</Stepper.Title>
              <Stepper.Description>{step.description}</Stepper.Description>
            </Stepper.Step>
          ))}
        </Stepper.Navigation>
        <Stepper.Panel className="border rounded-xl bg-white shadow-sm my-auto px-10 py-20">
          {methods.switch({
            vehicle: ({ Component }) => <Component />,
            payment: ({ Component }) => <Component />,
            summary: ({ Component }) => <Component summary={summaryData} />,
          })}
        </Stepper.Panel>
        <Stepper.Controls>
          <Button
            variant="secondary"
            onClick={methods.prev}
            disabled={methods.isFirst}
          >
            Anterior
          </Button>
          {!methods.isLast ? (
            <Button type="button" onClick={handleNextStep}>
              Próximo
            </Button>
          ) : (
            <Button variant="emphasis" type="submit">
              Salvar
            </Button>
          )}
        </Stepper.Controls>
      </form>
    </Form>
  )
}