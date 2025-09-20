"use client"

import z from 'zod';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Header from "@/components/header";
import { defineStepper } from "@/components/ui/stepper";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BasicForm } from '@/components/forms/Vehicle/basic-form';
import { Button } from '@/components/ui/button';
import { 
  FaArrowLeft, FaArrowRight, FaBrazilianRealSign, FaCarOn, FaFileLines, FaFloppyDisk, FaTrash
} from 'react-icons/fa6';
import { PaymentForm } from '@/components/forms/Vehicle/payment-form';
import { 
  PAYMENT, paymentDefaultValues, paymentFormSchema, SUMMARY, VEHICLE, vehicleDefaultValues, vehicleFormSchema, vehicleMainFormSchema
} from "@/commons/validations/Vehicle";
import { SummaryForm } from "@/components/forms/Vehicle/summary-form";
import { VehicleMainFormInputs } from "@/commons/models/Vehicle";
import { toast } from "sonner";
import { addVehicle } from '@/app/dashboard/garage/new/action';

export const { Stepper, useStepper } = defineStepper(
  {
    id: VEHICLE,
    icon: <FaCarOn/>,
    title: "Veículo",
    description: "Adicione informações do veículo.",
    schema: vehicleFormSchema,
    defaultValues: vehicleDefaultValues,
    Component: BasicForm,
  },
  {
    id: PAYMENT,
    icon: <FaBrazilianRealSign />,
    title: "Pagamento",
    description: "Adicione informações de pagamento e origem do veículo.",
    schema: paymentFormSchema,
    defaultValues: paymentDefaultValues,
    Component: PaymentForm,
  },
  {
    id: SUMMARY,
    icon: <FaFileLines />,
    title: "Resumo",
    description: "Revise as informações adicionadas.",
    schema: vehicleMainFormSchema,
    defaultValues: paymentDefaultValues,
    Component: SummaryForm,
  },
);

export function StepperForm() {
  const route = useRouter()
  const methods = useStepper()

  const [disableReset, setDisableReset] = useState(true)
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
        setDisableReset(false)
      } catch (e) {
        console.error("Falha ao carregar dados:", e)
        form.reset(defaults, { keepDefaultValues: true })
        setDisableReset(true)
      }
    } else {
      form.reset(defaults, { keepDefaultValues: true })
      setDisableReset(true)
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

  const saveDataForm = async() => {
    if (!summaryData) {
      toast.error('Dados incompletos. Verifique as informações do veículo e pagamento.')
      return
    }

    await addVehicle(summaryData)
    resetDataForm()
    route.push('/dashboard/garage')
  }

  const resetDataForm = () => {
    localStorage.removeItem(VEHICLE)
    localStorage.removeItem(PAYMENT)
    
    const defaults = methods.current.defaultValues
    form.reset(defaults, { keepDefaultValues: true })
    setDisableReset(true)
    methods.reset()
  }

  const handleNextStep = (values: z.infer<typeof methods.current.schema>) => {
    localStorage.setItem(methods.current.id, JSON.stringify(values))
    setDisableReset(false)
    methods.next()
  }

  return (
    <Form {...form} key={methods.current.id}>
      <form className="flex flex-col h-full" onSubmit={form.handleSubmit(handleNextStep)}>
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
        <Stepper.Controls className="justify-between">
          <Button
            type="button"
            variant="destructive"
            disabled={disableReset}
            onClick={resetDataForm}
          >
            <FaTrash /> Excluir
          </Button>
          <div className="flex gap-6">
            <Button
              type="button"
              variant="secondary"
              onClick={methods.prev}
              disabled={methods.isFirst}
            >
              <FaArrowLeft /> Voltar
            </Button>
            {!methods.isLast ? (
              <Button type="submit">
                Continuar <FaArrowRight />
              </Button>
            ) : (
              <Button variant="emphasis" type="button" onClick={saveDataForm}>
                <FaFloppyDisk /> Salvar
              </Button>
            )}
          </div>
        </Stepper.Controls>
      </form>
    </Form>
  )
}