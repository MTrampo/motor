import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaHouseMedical } from "react-icons/fa6";
import svgSummary from "@/commons/assets/svgs/summary-dashboard.svg"
import svgGarage from "@/commons/assets/svgs/garage-dashboard.svg"
import svgAnalysis from "@/commons/assets/svgs/analysis-vehicle.svg"
import svgPerformance from "@/commons/assets/svgs/performance-vehicle.svg"

export default function Plataform() {
  const tabs = [
    {
      value: "summary",
      title: "Financeiro",
      description: "Acompanhe se o seu investimento está acelerando na pista ou derrapando na curva.",
      content: svgSummary,
    },
    {
      value: "garage",
      title: "Garagem",
      description: "Aqui é onde seus veículos ficam alinhados no pátio. Cada um com o seu detalhe de forma única.",
      content: svgGarage,
    },
    {
      value: "analysis",
      title: "Análise",
      description: "Analise os custos e simule o lucro com base na FIPE. Evite derrapar na pista com decisões ruins.",
      content: svgAnalysis,
    },
    {
      value: "performance ",
      title: "Performance",
      description: "Aqui é onde você analisa o desempenho da corrida, com informações sobre o desempenho do veículo.",
      content: svgPerformance,
    },
  ];

  return(
    <section className="bg-linear-to-b from-blue-950 to-blue-600">
      <div className="mx-auto px-6 py-12 sm:py-24 max-w-5xl md:max-w-7xl">
        <div className="pb-16">
          <h2 className="text-white text-2xl text-center">
            Tudo o que você precisa para gerenciar sua frota
          </h2>
          <p className="text-gray-200 text-center">
            Controle a garagem, ajuste os custos, analise a performance e pilote o negócio com precisão
          </p>
        </div>
        <Tabs
          orientation="vertical"
          defaultValue={tabs[0].value}
          className="w-full flex flex-row gap-0"
        >
          <TabsList className="mt-16 shrink-0 grid grid-cols-1 gap-1 p-0 bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-full lg:rounded-l-xl lg:rounded-r-none lg:p-6 data-[state=active]:bg-white data-[state=active]:lg:bg-white/10 lg:ring-1 data-[state=active]:lg:ring-white/10 lg:ring-inset bg-transparent ring-transparent"
              >
                <div className="px-6 py-2">
                  <h3 className="text-white flex items-center gap-1 text-lg">
                    {tab.title}
                  </h3>
                  <p className="max-w-sm mt-2 hidden text-sm lg:block text-white text-balance text-left">
                    {tab.description}
                  </p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="fade-content mt-10 relative min-h-[75vh] overflow-hidden rounded-tl-xl rounded-bl-xl bg-linear-to-r from-blue-50 to-blue-100 shadow-xl shadow-blue-100/20 flex items-center justify-center sm:w-auto lg:mt-0 lg:w-271.25"
              >
                  <Image
                    src={tab.content}
                    alt={tab.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain"
                  />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  )
}