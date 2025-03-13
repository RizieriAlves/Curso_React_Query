import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { Appointment } from "@shared/types";

import { useLoginData } from "@/auth/AuthContext";
import { axiosInstance } from "@/axiosInstance";
import { useCustomToast } from "@/components/app/hooks/useCustomToast";
import { queryKeys } from "@/react-query/constants";

// for when we need functions for useMutation
async function setAppointmentUser(
  appointment: Appointment,
  userId: number | undefined
): Promise<void> {
  if (!userId) return;
  const patchOp = appointment.userId ? "replace" : "add";
  const patchData = [{ op: patchOp, path: "/userId", value: userId }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}

export function useReserveAppointment() {
  const { userId } = useLoginData();
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate, error } = useMutation({
    mutationFn: (appointment: Appointment) =>
      setAppointmentUser(appointment, userId),
    onError: (): void => console.log(error),
    onSuccess: () => {
      toast({
        title: "Reserva realizada com sucesso",
        status: "success",
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.appointments] });
    },
  });
  // TODO: replace with mutate function
  return mutate;
}
