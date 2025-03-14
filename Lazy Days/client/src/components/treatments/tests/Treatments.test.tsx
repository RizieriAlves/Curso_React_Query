import { Tr } from "@chakra-ui/react";
import { screen } from "@testing-library/react";

import { Treatments } from "../Treatments";

import { AllStaff } from "@/components/staff/AllStaff";
import { render } from "@/test-utils/";

test("renders response from query", async () => {
  render(<Treatments />);

  const treatmentsTitles = await screen.findAllByRole("heading", {
    name: /massage|facial|scrub/i,
  });
  expect(treatmentsTitles).toHaveLength(3);
});
