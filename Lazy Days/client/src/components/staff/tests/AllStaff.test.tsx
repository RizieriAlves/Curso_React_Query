import { screen } from "@testing-library/react";

import { AllStaff } from "../AllStaff";

import { mockStaff } from "@/mocks/mockData";
import { render } from "@/test-utils";
// import { render, screen } from "@/test-utils";

test("All Staff", async () => {
  render(<AllStaff />);
  const mocknames = mockStaff.map((staff) => {
    return staff.name;
  });

  const cards = await screen.findAllByRole("heading", {
    name: (name) => mocknames.includes(name),
  });

  expect(cards).toHaveLength(4);
});
