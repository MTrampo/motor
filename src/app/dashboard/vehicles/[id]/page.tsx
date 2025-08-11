import Header from "@/components/header";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <>
      <Header title="Veículo Detalhes" />
      <main className="flex flex-col p-6 gap-y-10">
        
      </main>
    </>
  );

}