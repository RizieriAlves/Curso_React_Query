import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState<"All" | "Massage" | "Facial" | "Scrub">(
    "All"
  );

  const filterStaff = useCallback(
    (data: Staff[], filter: "All" | "Massage" | "Facial" | "Scrub") => {
      return filterByTreatment(data, filter);
    },
    []
  );

  const fallback: Staff[] = [];
  // TODO: get data from server via useQuery
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: (data) => filterStaff(data, filter),
  });

  const staff: Staff[] = data;

  return { staff, filter, setFilter };
}
