import OverviewCarsFinances from "@/components/finances/data-table/overview-cars-finances";
import OverviewFinances from "@/components/finances/overview-finances";
import Header from "@/components/header";

export default async function Dashboard () {
  return (
    <>
      <Header title="Painel"/>
      <div className="flex flex-col p-6 gap-y-10">
        <OverviewFinances/>
        <OverviewCarsFinances/>
      </div>
    </>
  )
}