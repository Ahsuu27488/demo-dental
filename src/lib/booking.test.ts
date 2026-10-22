import { describe, expect, it } from "vitest";
import { validateBooking, estimateVisit, formatDay } from "./booking";

describe("validateBooking", () => {
  const valid = {
    name: "Jane Doe",
    phone: "(503) 555-0142",
    serviceId: "checkup",
    day: "2026-11-10",
  };
  const today = "2026-10-22";

  it("accepts valid input", () => {
    const result = validateBooking(valid, today);
    expect(result.ok).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it("rejects empty name", () => {
    const result = validateBooking({ ...valid, name: " " }, today);
    expect(result.ok).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("rejects short phone", () => {
    const result = validateBooking({ ...valid, phone: "12345" }, today);
    expect(result.ok).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it("accepts (503) 555-0142 format", () => {
    const result = validateBooking(
      { ...valid, phone: "(503) 555-0142" },
      today,
    );
    expect(result.ok).toBe(true);
  });

  it("accepts +1 503 555 0142 format", () => {
    const result = validateBooking(
      { ...valid, phone: "+1 503 555 0142" },
      today,
    );
    expect(result.ok).toBe(true);
  });

  it("rejects unknown serviceId", () => {
    const result = validateBooking({ ...valid, serviceId: "nope" }, today);
    expect(result.ok).toBe(false);
    expect(result.errors.serviceId).toBeDefined();
  });

  it("rejects a past day", () => {
    const result = validateBooking({ ...valid, day: "2026-10-01" }, today);
    expect(result.ok).toBe(false);
    expect(result.errors.day).toBeDefined();
  });

  it("accepts today as a valid day", () => {
    const result = validateBooking({ ...valid, day: today }, today);
    expect(result.ok).toBe(true);
  });
});

describe("estimateVisit", () => {
  it("returns data for checkup", () => {
    const result = estimateVisit("checkup");
    expect(result).toEqual({ name: "Check-up and cleaning", minutes: 60, from: 120 });
  });

  it("returns null for unknown id", () => {
    expect(estimateVisit("unknown")).toBeNull();
  });
});

describe("formatDay", () => {
  it("formats 2026-10-27 as a readable date", () => {
    const result = formatDay("2026-10-27");
    expect(result).toContain("Tuesday");
    expect(result).toContain("Oct");
    expect(result).toContain("27");
  });
});
