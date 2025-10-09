import { ApiError } from "@/commons/errors/api"
import { fetcherSWR, mutationSWR } from "@/commons/lib/fetcher/swr"
import { MutatorArgs, ResponseProps } from "@/commons/models/Api"
import { CostFormatted, CostRequestBody, RegisterCostFormInputs } from "@/commons/models/Cost"
import { toast } from "sonner"
import useSWR, { mutate } from "swr"
import useSWRMutation from "swr/mutation"

const revalidateCostList = (plateId: string) => {
    mutate(`/api/financial/cost/${plateId}`);
};

export default function useCostSWR(id: string) {
  const { 
    data: costData, 
    error: costError, 
    isLoading: isCostLoading
  } = useSWR<ResponseProps<CostFormatted>, ApiError>(`/api/financial/cost/${id}`, fetcherSWR,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    });
      
  const { 
      trigger, 
      isMutating, 
      error: errorMutate
  } = useSWRMutation<ResponseProps<string | void>, ApiError, string, MutatorArgs<CostRequestBody>['arg']>(
      '/api/financial/cost', 
      mutationSWR,
      {
        onSuccess: () => {
          revalidateCostList(id);
        }
      }
  );

  const addCost = async (data: RegisterCostFormInputs[]) => {
    const toastId = toast.loading('Adicionando Custos...');

    try {
      const requestBody: CostRequestBody = {
        documentId: id,
        items: data.map(item => ({
          type: item.type,
          value: item.value,
          description: item.description,
          paymentDate: item.paymentDate,
        }))
      };

      const res = await trigger({ method: 'POST', body: requestBody });
      toast.success(res.message || 'Custos adicionados com sucesso!', { id: toastId });

      return res;
    } catch (err) {
      const errorMessage = (err as ApiError)?.message || 'Erro inesperado ao adicionar custos.';
      toast.error(errorMessage, { id: toastId });
      throw err;
    }
  }

  const killCost = async (plate: string, guid: string) => {
    const toastId = toast.loading('Deletando Custo...');

    try {
      const requestBody: CostRequestBody = {
        documentId: plate,
        guidItem: guid
      }

      await trigger({ method: 'DELETE', body: requestBody });
      toast.success('Custos deletado com sucesso!', { id: toastId });
    } catch (err) {
      const errorMessage = (err as ApiError)?.message || 'Erro inesperado ao adicionar custos.';
      toast.error(errorMessage, { id: toastId });
      throw err;
    }
  }


  return {
    // GET
    cost: costData?.data,
    isLoading: isCostLoading,
    costError: costError,
    
    // POST
    addCost,

    // DELETE
    killCost,
    
    isMutating,
    errorMutate,
    revalidate: () => revalidateCostList(id) 
  };
}