import { useMutation, useQueryClient } from "@tanstack/react-query";
import jsonpatch from "fast-json-patch";

import type { User } from "@shared/types";

import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
import { useUser } from "./useUser";
import { generateKeyAppointment } from "./useUserAppointments";

import { toast } from "@/components/app/toast";
import { queryKeys } from "@/react-query/constants";

// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData.token),
    }
  );
  return data.user;
}

export const MUTATION_KEY = "patch-user";

export function usePatchUser() {
  const queryClient = useQueryClient();
  const { user, updateUser } = useUser();
  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: (newUser: User) => patchUserOnServer(newUser, user),
    onSuccess: () => {
      toast({ title: "Dados modificados com sucesso", status: "success" });
    },
    onSettled: () => {
      //return promise para manter status "pending" até a invalidação completar.
      console.log("ONSETTLED");
      return queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
    },
  });
  // TODO: replace with mutate function

  return mutate;
}
