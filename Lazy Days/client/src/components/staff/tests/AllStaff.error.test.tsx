import { screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { AllStaff } from "../AllStaff";

import { server } from "@/mocks/server";
import { queryClient } from "@/react-query/queryClient";
import { render } from "@/test-utils";

test("handles query error", async () => {
  // (re)set handler to return a 500 error for staff and treatments
  server.use(
    http.get("http://localhost:3030/staff", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/treatments", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<AllStaff />);

  const errortoast = await screen.findByRole("status");
  expect(errortoast).toHaveTextContent(/could not fetch data/i);
});
