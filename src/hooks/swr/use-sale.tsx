import useSWR, { mutate } from "swr"
import useSWRMutation from "swr/mutation"
import { MutatorArgs, ResponseProps } from "@/commons/models/Api";
import { ApiError } from "@/commons/errors/api";
import { SellVehicleRequestBody, VehicleSellFormInputs, VehicleSoldFormatted } from "@/commons/models/Sale";
import { revalidateVehicle, revalidateVehicles } from "./use-vehicle";
import { fetcherSWR, mutationSWR } from "@/commons/lib/fetcher/swr";
import { toast } from "sonner";

const revalidateVehicleSold = (plateId: string) => {
  mutate(`/api/financial/sale/${plateId}`);
};

export function useGetVehicleSoldByIdSWR(plateId: string) {
  const { data: vehicleSold, error, isLoading } = useSWR<ResponseProps<VehicleSoldFormatted>, ApiError>(`/api/financial/sale/${plateId}`,
    fetcherSWR,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  )

  return {
    soldError: error,
    soldIsLoading: isLoading,
    sold: vehicleSold?.data ?? null,
    revalidate: () => revalidateVehicleSold(plateId) 
  };
}

export function useSellVehicleSWR() {
  const { trigger, isMutating, error } = useSWRMutation<ResponseProps<string>, ApiError, string, MutatorArgs<SellVehicleRequestBody>['arg']>('/api/financial/sale', 
    mutationSWR,
    {
      onSuccess: (success) => {
        revalidateVehicles()
        if (success.data) {
          revalidateVehicle(success.data)
        }
      }
    }
  );

  const sellVehicle = async (plate: string, data: VehicleSellFormInputs, purchase: number, cost: number, userId: string, previousStatusDocumentId: string) => {
    const toastId = toast.loading('Saindo dos Boxes...');

    try {
      const requestBody: SellVehicleRequestBody = {
        plate,
        purchase,
        cost: cost,
        notes: data.note,
        sellerId: userId,
        saleDate: data.sell,
        salePrice: data.price,
        previousStatusDocumentId,
        paymentMethod: data.paymentMethod,
      }

      const res = await trigger({ method: 'POST', body: requestBody });
      toast.success(res.message || 'Sucesso, vículo na pista!', { id: toastId });

      return res;
    } catch (err) {
      const errorMessage = (err as ApiError)?.message || 'Erro inesperado na saída dos boxes.';
      toast.error(errorMessage, { id: toastId });
      throw err;
    }
  }

  return {
    error,
    sellVehicle,
    isMutating,
    revalidate: () => revalidateVehicles(),
  };
}