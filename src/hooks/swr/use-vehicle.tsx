"use client"

import useSWR, { mutate } from "swr"
import { fetcherSWR, mutationSWR } from "@/commons/lib/fetcher/swr"
import { MutatorArgs, ResponseProps } from "@/commons/models/Api"
import { VehicleAuctionFormInputs, VehicleFormatted, VehicleMainFormInputs, VehicleRequestBody,
  VehicleStatusFormInputs, VehicleStatusHistoryRequestBody, VehicleSummaryFormatted, VehicleThirdFormInputs } from "@/commons/models/Vehicle"
import { ApiError } from "@/commons/errors/api"
import useSWRMutation from "swr/mutation"
import { toast } from "sonner"
import { CarOrigenEnum } from "@/commons/enums/Car"

export const revalidateVehicles = () => {
  mutate('/api/financial/vehicle');
};

export const revalidateVehicle = (plateId: string) => {
  mutate(`/api/financial/vehicle/${plateId}`);
};

export function useGetAllVehiclesSWR() {
  const { data, error, isLoading } = useSWR<ResponseProps<VehicleSummaryFormatted[]>, ApiError>('/api/financial/vehicle', fetcherSWR)
 
  return {
    error,
    isLoading,
    vehicles: data?.data ?? null,
    revalidate: () => revalidateVehicles(),
  }
}

export function useGetVehicleByIdSWR(id: string) {
  const { data, error, isLoading, mutate } = useSWR<ResponseProps<VehicleFormatted>, ApiError>(`/api/financial/vehicle/${id}`, fetcherSWR)
 
  return {
    error,
    mutate,
    isLoading,
    vehicle: data?.data ?? null,
    revalidate: () => revalidateVehicle(id),
  }
}

export function useAddVehicleSWR() {
  const { trigger, isMutating, error } = useSWRMutation<ResponseProps<string>, ApiError, string, MutatorArgs<VehicleRequestBody>['arg']>('/api/financial/vehicle', 
    mutationSWR,
    {
      onSuccess: () => {
        revalidateVehicles()
      }
    }
  );

  const addVehicle = async (data: VehicleMainFormInputs) => {
    const toastId = toast.loading('Adicionando Veículo...');

    try {
      const origin = Number(data.origin)
      const requestBody: VehicleRequestBody = {
        origin,
        documentId: data.licensePlate,
        vehicleThird: origin === CarOrigenEnum.THIRD ? data as VehicleThirdFormInputs : null,
        VehicleAuction: origin === CarOrigenEnum.AUCTION ? data as VehicleAuctionFormInputs : null,
      }

      const res = await trigger({ method: 'POST', body: requestBody });
      toast.success(res.message || 'Veículo adicionado com sucesso!', { id: toastId });

      return res;
    } catch (err) {
      const errorMessage = (err as ApiError)?.message || 'Erro inesperado ao adicionar veículo.';
      toast.error(errorMessage, { id: toastId });
      throw err;
    }
  }

  return {
    error,
    addVehicle,
    isMutating,
    revalidate: () => revalidateVehicles(),
  };
}

export function useUpdateStatusVehicleSWR(plate: string) {
  const { trigger, isMutating, error } = 
    useSWRMutation<ResponseProps<string>, ApiError, string, MutatorArgs<VehicleStatusHistoryRequestBody>['arg']>('/api/financial/vehicle/status', 
      mutationSWR,
      {
        onSuccess: () => {
          revalidateVehicles()
          revalidateVehicle(plate)
        }
      }
    );

  const updatedStatus = async (lasDocumentId: string | null, data: VehicleStatusFormInputs) => {
    const toastId = toast.loading('Engatando marcha...');

    try {
      const requestBody: VehicleStatusHistoryRequestBody = {
        plate,
        documentId: lasDocumentId,
        endDatePreviousStatus: data.endDatePreviousStatus,
        newStatus: data.newStatus,
        nextStatusStartDate: data.nextStatusStartDate,
        reason: data.reason
      }

      const res = await trigger({ method: 'PUT', body: requestBody });
      toast.success(res.message || 'Marcha engatada com sucesso!', { id: toastId });
    } catch (err) {
      const errorMessage = (err as ApiError)?.message || 'Erro inesperado ao engatar marcha do veículo.';
      toast.error(errorMessage, { id: toastId });
      throw err;
    }
  }

  return {
    error,
    isMutating,
    updatedStatus,
    revalidate: () => {
      revalidateVehicles()
      revalidateVehicle(plate)
    }
  };
}