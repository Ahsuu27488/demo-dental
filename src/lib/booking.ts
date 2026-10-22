import { allServices } from "@/content/clinic";

export type BookingInput = {
  name: string;
  phone: string;
  serviceId: string;
  day: string;
};

export type BookingErrors = Partial<Record<keyof BookingInput, string>>;

export function validateBooking(
  input: BookingInput,
  today: string,
): { ok: boolean; errors: BookingErrors } {
  const errors: BookingErrors = {};

  const trimmedName = input.name.trim();
  if (trimmedName.length < 2 || trimmedName.length > 80) {
    errors.name = "Please enter your name.";
  }

  const digits = input.phone.replace(/[\s\-.()+]/g, "");
  if (!/^\d{10,15}$/.test(digits)) {
    errors.phone =
      "Please enter a phone number we can call, like (503) 555-0142.";
  }

  if (!allServices.find((s) => s.id === input.serviceId)) {
    errors.serviceId = "Please choose a service.";
  }

  if (!input.day) {
    errors.day = "Please pick a day from today on.";
  } else {
    const parts = input.day.split("-");
    const y = Number(parts[0]);
    const m = Number(parts[1]) - 1;
    const d = Number(parts[2]);
    const date = new Date(y, m, d);
    if (
      isNaN(date.getTime()) ||
      date.getFullYear() !== y ||
      date.getMonth() !== m ||
      date.getDate() !== d
    ) {
      errors.day = "Please pick a day from today on.";
    } else if (input.day < today) {
      errors.day = "Please pick a day from today on.";
    }
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export function estimateVisit(
  serviceId: string,
): { name: string; minutes: number; from: number } | null {
  const service = allServices.find((s) => s.id === serviceId);
  if (!service) return null;
  return { name: service.name, minutes: service.minutes, from: service.from };
}

export function formatDay(day: string): string {
  const parts = day.split("-");
  const y = Number(parts[0]);
  const m = Number(parts[1]) - 1;
  const d = Number(parts[2]);
  const date = new Date(y, m, d);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}
