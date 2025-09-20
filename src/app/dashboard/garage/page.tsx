import Header from "@/components/header";
import ContainerCardVehicle from "@/components/vehicles/container-card-vehicle";

export default async function Vehicles() {
  return (
    <>
      <Header title="Veículos" />
      <main className="flex flex-col max-[374]:p-2 p-6 gap-y-10">
        <ContainerCardVehicle/>
      </main>
    </>
  )
}