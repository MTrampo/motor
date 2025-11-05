import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function Faq() {
  const faqs = [
    {
      title: 'O que é o Motor?',
      description: 'O Motor é a sua central de comando para gerenciar a frota. Somos um software que acompanha o ciclo de vida financeiro de cada carro, desde o momento da compra até a venda. Entregamos o diagnóstico de Margem, Lucro e ROI para que você pilote seu negócio com a certeza dos números.'
    },
    {
      title: 'Para quem é o Motor?',
      description: 'O Motor é para você que compra, transforma e vende. Se o seu modelo de negócio é focado em comprar um veículo, investir na reforma (manutenção, estética, etc.) e depois vendê-lo com lucro justo, nossa plataforma é o seu parceiro ideal. Fomos desenhados para rastrear 100% dos custos dessa transformação e garantir que o seu investimento gere o ROI máximo. Por isso, temos limitações para modelos de revenda rápida sem investimento de transformação.'
    },
    {
      title: 'Por que devo migrar para o Motor?',
      description: 'Você migra para deixar o achismo no retrovisor. Chega de planilhas manuais. O Motor automatiza o rastreamento de custos e calibra seu lucro em tempo real. Você ganha eficiência e inteligência para tomar decisões rápidas e lucrativas.'
    },
    {
      title: 'Como funciona o limite de veículos ativos?',
      description: 'É simples e focado no seu giro: O limite refere-se apenas aos veículos que estão ATIVOS no seu estoque, esperando a venda (5 no Arrancada, 15 no Kart). Assim que você marca um carro como VENDIDO, ele libera imediatamente uma vaga no seu limite. O histórico desse veículo vendido é preservado para seu aprendizado, sem ocupar espaço.'
    },
    {
      title: 'Como funciona as simulações de projeções?',
      description: 'A projeção é o seu mapa de negociação na palma da mão. Com base nos seus custos reais e no preço FIPE do veículo, o sistema simula o Lucro e o Valor de Venda em diferentes cenários de desconto (ex: 10%, 15%, 20%). Isso te dá o poder de saber exatamente o limite da sua margem e o lucro em cada oferta. Você fecha o negócio com a certeza dos números, sem arriscar o seu resultado.'
    },
    {
      title: 'Como faço para cancelar?',
      description: 'Cancelar é tão fácil quanto assinar. Você tem total controle: pode cancelar sua assinatura diretamente pelo seu painel a qualquer momento, sem burocracia ou fidelidade. Você pilota 100% o seu contrato.'
    }
  ]

  return(
    <section className="mx-auto px-6 py-12 sm:py-24 max-w-5xl md:max-w-7xl relative z-10">
      <h2 className="text-2xl text-center">
        Perguntas frequentes
      </h2>
      <p className="text-center">
        Respondemos antes de você perguntar
      </p>
      <Accordion
        type="single"
        collapsible
        className="w-full py-10"
        defaultValue="item-1"
      >
        {faqs.map(faq => (
          <AccordionItem key={faq.title} className="bg-header border px-4 my-1" value={faq.title}>
            <AccordionTrigger>
              <h3 className="text-lg">{faq.title}</h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                {faq.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}