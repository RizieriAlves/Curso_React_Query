import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { Appointment } from "@shared/types";

import { axiosInstance, getJWTHeader } from "../../../axiosInstance";

import { useLoginData } from "@/auth/AuthContext";
import { queryKeys } from "@/react-query/constants";

// for when we need a query function for useQuery
async function getUserAppointments(
  userId: number,
  userToken: string
): Promise<Appointment[] | null> {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  return data.appointments;
}
export function generateKeyAppointment(userId: number, userToken: string) {
  return [queryKeys.appointments, queryKeys.user, userId, userToken];
}
export function useUserAppointments(): Appointment[] {
  const { userId, userToken } = useLoginData();
  const { data: appointments } = useQuery({
    enabled: !!userId,
    queryKey: generateKeyAppointment(userId, userToken),
    queryFn: () => getUserAppointments(userId, userToken),
  });

  return appointments;
}
