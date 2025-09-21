// export async function POST(req: Request) {
//   try {
//     const subscription = await req.json();

//     if (!subscription || !subscription.endpoint) {
//       return Response.json({ message: 'Dados de inscrição inválidos.' }, { status: 400 });
//     }

//     // Adiciona a inscrição como um novo documento na coleção 'subscriptions'
//     const docRef = await db.collection('subscriptions').add(subscription);
//     console.log("Inscrição salva com sucesso, ID:", docRef.id);
    
//     return Response.json({ success: true, message: 'Inscrição salva com sucesso.' }, { status: 200 });
//   } catch (error) {
//     console.error("Erro ao salvar a inscrição:", error);
//     return Response.json({ message: 'Erro interno do servidor.' }, { status: 500 });
//   }
// }