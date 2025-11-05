import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FaBrain, FaFlagCheckered, FaHandHoldingDollar, FaLightbulb, FaMobile } from "react-icons/fa6";

export default function Plans() {
  const reasonsToSign = [
    {
      title: "Multiplataforma",
      description: "Sua gestão acompanha você em todas as pistas. Baixe ou acesse do seu computador, tablet ou celular.",
      icon: FaMobile,
    },
    {
      title: "Simplicidade",
      description: "Chega de planilhas confusas. Entregamos um diagnóstico financeiro direto e visual, para que você tome decisões rápidas sem ser um profissional.",
      icon: FaLightbulb,
    },
    {
      title: "Facilidade",
      description: "Acompanhe o computador de bordo em tempo real. Tenha as projeções de custos e venda calibradas a cada novo custo lançado na palma da mão.",
      icon: FaHandHoldingDollar
    },
    {
      title: "Aprendizado",
      description: "Deixe o achismo no retrovisor e pilote com a certeza dos números. Com dados concretos, você tem a confiança para repetir a performance em cada corrida.",
      icon: FaBrain
    }
  ]
  
  return(
    <section className="mx-auto px-6 py-12 sm:py-24 max-w-5xl md:max-w-7xl relative z-10">
      <h2 className="text-2xl text-center">
        Preços que cabem no seu bolso
      </h2>
      <p className="text-center">
        Escolha um plano acessível que ofereça os melhores recursos para sua frota
      </p>
      <div className="relative grid grid-cols-1 md:grid-cols-3 py-44">
        <div className="
          absolute
          top-1/3 md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[150px] h-[150px] md:w-[800px] md:h-[550px]
          bg-linear-to-br from-blue-500 to-blue-200
          rounded-full blur-3xl filter opacity-80 pointer-events-none z-0"
        />
        <Card className="p-6 lg:scale-105 translate-y-10">
          <CardHeader className="gap-5 py-3">
            <div className="flex text-sm items-end">
              <h3 className="text-3xl">R$ 64,90</h3>/mês
            </div>
            <div>
              <h4>Arrancada</h4>
              <p className="text-gray-600">
                Excelente para quem trabalha por conta própria ou está começando agora
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant='emphasis' className="w-full">
              ACELERAR
            </Button>
          </CardContent>
          <CardFooter>
            <ul className="text-gray-500 space-y-1">
              <li className="flex items-center gap-2"><FaFlagCheckered /> 2 membros</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> 5 veículos ativos em preparação</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Rastreio completo do ciclo de custo</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Análise base do ciclo de custo</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Análise base de venda e lucro</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Análise profunda de pós-venda</li>
            </ul>
          </CardFooter>
        </Card>
        <Card className="p-6 lg:scale-105 z-10 row-span-2">
          <CardHeader className="gap-5 py-3">
            <div className="flex text-sm items-end">
              <h3 className="text-3xl">R$ 149,90</h3>/mês
            </div>
            <div>
              <h4>Kart</h4>
              <p className="text-gray-600">
                Perfeito para quem já tem experiência no negócio ou pequenas empresas
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant='emphasis' className="w-full">
              ACELERAR
            </Button>
          </CardContent>
          <CardFooter>
            <ul className="text-gray-500 space-y-1">
              <li className="flex items-center gap-2"><FaFlagCheckered /> 5 membros</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> 15 veículos ativos em preparação</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Rastreio profundo do ciclo de custo</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Análise completa do ciclo de custo</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Análise completa de venda e lucro</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Análise profunda de pós-venda</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Histórico de vendas ilimitado</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Simulação pré-venda</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Gestão de clientes</li>
            </ul>
          </CardFooter>
        </Card>
        <Card className="p-6 lg:scale-105 translate-y-10">
          <CardHeader className="gap-5 py-3">
            <div className="flex text-sm items-end">
              <h3 className="text-3xl">EM BREVE</h3>
            </div>
            <div>
              <h4>Fórmula</h4>
              <p className="text-gray-600">
                Ideal para médias empresas em constante crescimento e evolução
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant='emphasis' className="w-full">
              ACELERAR
            </Button>
          </CardContent>
          <CardFooter>
            <ul className="text-gray-500 space-y-1">
              <li className="flex items-center gap-2"><FaFlagCheckered /> 10 membros</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> 30 veículos ativos em preparação</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> Tudo dos planos Arrancada e Kart</li>
              <li className="flex items-center gap-2"><FaFlagCheckered /> EM BREVE</li>
            </ul>
          </CardFooter>
        </Card>
      </div>
      <h3 className="text-2xl">
        Mais motivos para acelerar com a gente
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 py-10 gap-6">
        {reasonsToSign.map(reason => (
          <Card key={reason.title} className="bg-linear-to-br from-blue-950 to-cyan-900">
            <CardHeader>
              <h4 className="text-xl text-white">{reason.title}</h4>
            </CardHeader>
            <CardContent>
              <p className="text-balance text-gray-50">
                {reason.description}
              </p>
            </CardContent>
            <CardFooter className="pt-10 mt-auto">
              <reason.icon className="ml-auto text-5xl text-white" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}