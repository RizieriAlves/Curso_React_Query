import { act, renderHook, waitFor } from "@testing-library/react";

import { useAppointments } from "../hooks/useAppointments";
import { AppointmentDateMap } from "../types";

import { createQueryClientWrapper } from "@/test-utils";

//Soma a qntd de objetos
const getAppointmentCount = (appointmens: AppointmentDateMap) =>
  Object.values(appointmens).reduce(
    (value, appointment) => value + appointment.length,
    0
  );

test("filter appointments by availability", async () => {
  const { result } = renderHook(() => useAppointments(), {
    wrapper: createQueryClientWrapper(),
  });

  //Aguarda a função de contagem ser maior que zero
  //ou seja a query ser concluida e função executada.
  await waitFor(() =>
    expect(getAppointmentCount(result.current.appointments)).toBeGreaterThan(0)
  );

  const notAll = getAppointmentCount(result.current.appointments);
  console.log(notAll);
  act(() => result.current.setShowAll(true));

  //Agora podemos verificar os valores
  const All = getAppointmentCount(result.current.appointments);
  console.log(All);
  expect(All).toBeGreaterThan(notAll);
});
