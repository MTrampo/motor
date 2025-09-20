"use client"

import Header from "@/components/header";
import { Stepper, StepperForm } from "@/components/forms/Vehicle/stepper-form";

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