"use client"

import z from 'zod'
import { auctionFormSchema, paymentFormSchema, thirdFormSchema, vehicleFormSchema } from "@/commons/validations/Vehicle";
import Header from "@/components/header";
import { Form } from "@/components/ui/form";
import { defineStepper } from "@/components/ui/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BasicForm } from '@/components/forms/Vehicle/basic-form';
import { Button } from '@/components/ui/button';
import { FaBrazilianRealSign, FaCarOn } from 'react-icons/fa6';
import { PaymentForm } from '@/components/forms/Vehicle/payment-form';

export default function NewVehicle() {
  const unifiedDefaultValues = {
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
    totalPaid: 0
  }

  const { Stepper, useStepper } = defineStepper(
    {
      id: "vehicle",
      icon: <FaCarOn/>,
      title: "Veículo",
      description: "Adicione as informações básicas do veículo",
      schema: vehicleFormSchema,
      defaultValues: {
        licensePlate: '',
        color: '',
        brand: '',
        model: '',
        version: '',
        manufacturingYear: '',
        modelYear: ''
      },
      Component: BasicForm,
    },
    {
      id: "payment",
      icon: <FaBrazilianRealSign />,
      title: "Pagamento",
      description: "Adicione as informações de pagamento e a origem do veículo",
      schema: paymentFormSchema,
      defaultValues: unifiedDefaultValues,
      Component: PaymentForm,
    },
  );

  const methods = useStepper();
  

  const form = useForm<z.infer<typeof methods.current.schema>>({
    mode: "onTouched",
    resolver: zodResolver(methods.current.schema),
    defaultValues: methods.current.defaultValues
  });

  const onSubmit = (values: z.infer<typeof methods.current.schema>) => {
    console.log('bateu aqui')
    console.log(`Form values for step ${methods.current.id}: ${JSON.stringify(values)}`)
    alert(
      `Form values for step ${methods.current.id}: ${JSON.stringify(values)}`
    );
  };

  return (
    <>
      <Header title="Novo Veículo" />
      <main className="flex flex-col max-[374]:p-2 p-6 gap-y-10 h-full">
        <Stepper.Provider className="h-full">
          <Form {...form} key={methods.current.id}>
            <form className="flex flex-col h-full" onSubmit={form.handleSubmit(onSubmit)}>
              <Stepper.Navigation>
                {methods.all.map((step) => (
                  <Stepper.Step
                    key={step.id}
                    of={step.id}
                    icon={step.icon}
                    type={step.id === methods.current.id ? "submit" : "button"}
                    onClick={async () => {
                      const valid = await form.trigger();
                      if (!valid) return;
                      methods.goTo(step.id);
                    }}
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
                  <Button
                    type="button"
                    onClick={() => {
                      if (methods.isLast) {
                        return methods.reset();
                      }
                      methods.beforeNext(async () => {
                        const valid = await form.trigger();
                        if (!valid) return false;
                        return true;
                      });
                    }}
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button type="submit">
                    Salvar
                  </Button>
                )}
              </Stepper.Controls>
            </form>
          </Form>
        </Stepper.Provider>
      </main>
    </>
  )
}