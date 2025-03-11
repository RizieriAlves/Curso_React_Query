import type { Staff } from "@shared/types";

export function filterByTreatment(
  staff: Staff[],
  treatmentName: "All" | "Massage" | "Facial" | "Scrub"
): Staff[] {
  if (treatmentName === "All") {
    return staff;
  }
  return staff.filter((person) =>
    person.treatmentNames
      .map((t) => t.toLowerCase())
      .includes(treatmentName.toLowerCase())
  );
}
