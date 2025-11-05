
import InstallPrompt from "@/pwa/install-prompt";
import Header from "@/components/header";
import Plataform from "@/components/home/plataform";
import Plans from "@/components/home/plans";
import Footer from "@/components/footer";
import Faq from "@/components/home/faq";


export default function Home() {
  return (
    <>
      <Header/>
      <main>
        <section className="relative overflow-hidden min-h-[600px] md:min-h-[750px] xl:min-h-[830px]">
          <img
            src="/imgs/hero.png"
            alt="Carro acelerando em pista"
            className="absolute inset-0 w-full h-full object-contain md:object-cover -z-10"
          />
          <div className="mx-auto px-6 py-12 sm:py-24 max-w-5xl md:max-w-7xl relative z-10">
            <div className="flex flex-col text-center gap-6 pt-20">
              <h1 className="max-w-3xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl xl:tracking-tighter mx-auto">
                Gestão <b className="text-blue-600">Simplificada</b> para Pequenas Frotas
              </h1>
              <p className="max-w-3xl text-balance mx-auto">
                Rastreie e gerencie o ciclo de vida financeiro de cada veículo, do pátio à venda. Acompanhe a evolução detalhada dos custos de
                transformação e use o diagnóstico de performance para aprender com cada negócio e eliminar perdas monetárias por decisões ruins
              </p>
            </div>
          </div>
        </section>
        <Plataform/>
        <Plans/>
        <Faq/>
      </main>
      <Footer/>
    </>
  );
}
