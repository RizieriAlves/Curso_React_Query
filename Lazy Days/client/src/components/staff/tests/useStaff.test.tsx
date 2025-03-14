import { act, renderHook, waitFor } from "@testing-library/react";

import { Staff } from "@shared/types";

import { useStaff } from "../hooks/useStaff";

import { createQueryClientWrapper } from "@/test-utils";
test("filter staff", async () => {
  const { result } = renderHook(useStaff, {
    wrapper: createQueryClientWrapper(),
  });

  //Aguarda a busca
  await waitFor(() => expect(result.current.staff.length).toBeGreaterThan(0));

  expect(result.current.staff.length).toEqual(4);

  act(() => result.current.setFilter("Facial"));
  expect(result.current.staff.length).toEqual(3);

  act(() => result.current.setFilter("Massage"));
  expect(result.current.staff.length).toEqual(3);

  act(() => result.current.setFilter("Scrub"));
  expect(result.current.staff.length).toEqual(2);
});
