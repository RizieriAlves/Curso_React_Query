import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Appointment } from "@shared/types";

import { axiosInstance } from "@/axiosInstance";
import { useCustomToast } from "@/components/app/hooks/useCustomToast";
import { queryKeys } from "@/react-query/constants";

// for when server call is needed
async function removeAppointmentUser(appointment: Appointment): Promise<void> {
  const patchData = [{ op: "remove", path: "/userId" }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}

export function useCancelAppointment() {
  const toast = useCustomToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (appointment: Appointment) =>
      removeAppointmentUser(appointment),
    onError: () => {
      toast({ title: `Erro!`, status: "error" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.appointments] });
      toast({ title: "Reserva cancelada", status: "error" });
    },
  });

  return mutate;
}
