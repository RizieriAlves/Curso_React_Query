import { User } from "@shared/types";

import { queryKeys } from "./constants";

import { useLoginData } from "@/auth/AuthContext";

function generateUserKey(id: number, token: string) {
  return [queryKeys.user, id, token];
}
export default generateUserKey;
