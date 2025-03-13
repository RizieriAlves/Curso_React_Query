import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import type { User } from "@shared/types";

import { generateKeyAppointment } from "./useUserAppointments";

import { useLoginData } from "@/auth/AuthContext";
import { axiosInstance, getJWTHeader } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import generateUserKey from "@/react-query/generateUserKey";
// query function
async function getUser(userId: number, userToken: string) {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${userId}`,
    {
      headers: getJWTHeader(userToken),
    }
  );

  return data.user;
}

export function useUser() {
  const { userId, userToken } = useLoginData();
  const { data: user } = useQuery({
    enabled: !!userId,
    queryKey: generateUserKey(userId, userToken),
    queryFn: () => getUser(userId, userToken),
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    //Pega os dados atualizados retornados e coloca no cache
    queryClient.setQueryData(
      generateUserKey(newUser.id, newUser.token),
      newUser
    );
  }
  // meant to be called from useAuth
  function clearUser() {
    queryClient.removeQueries({
      queryKey: [queryKeys.user],
    });
  }

  function clearData() {
    queryClient.removeQueries({
      queryKey: generateKeyAppointment(userId, userToken),
    });
  }
  return { user, updateUser, clearUser, clearData };
}
