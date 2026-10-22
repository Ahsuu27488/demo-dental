"use client";

import { useState, useRef, useEffect } from "react";
import {
  booking,
  prices,
  contact,
} from "@/content/clinic";
import {
  validateBooking,
  estimateVisit,
  formatDay,
} from "@/lib/booking";
import type { BookingErrors } from "@/lib/booking";

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function getToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function BookingCard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [day, setDay] = useState("");
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const successRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);

  // "today" depends on the visitor's clock, so set it after hydration (a DOM
  // write, not state) to keep the static HTML identical on server and client.
  useEffect(() => {
    if (dayRef.current) dayRef.current.min = getToday();
  }, []);

  // Move focus to the confirmation once it is on screen.
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const estimate = estimateVisit(serviceId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = validateBooking({ name, phone, serviceId, day }, getToday());
    setErrors(result.errors);

    if (!result.ok) {
      if (result.errors.name) nameRef.current?.focus();
      else if (result.errors.phone) phoneRef.current?.focus();
      else if (result.errors.serviceId) serviceRef.current?.focus();
      else if (result.errors.day) dayRef.current?.focus();
      return;
    }

    setSubmitted(true);
  }

  function handleReset() {
    setName("");
    setPhone("");
    setServiceId("");
    setDay("");
    setErrors({});
    setSubmitted(false);
  }

  const fieldBg = "color-mix(in oklch, var(--field-moss) 55%, var(--bg))";

  return (
    <section id="book" className="section-gap" aria-labelledby="book-heading">
      <div className="page-container">
        {/* Card */}
        <div
          className="leaf-xl"
          style={{
            background: "var(--field-moss)",
            color: "var(--field-moss-ink)",
            maxWidth: "calc(10 / 12 * 100%)",
            marginInline: "auto",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              minHeight: "clamp(360px, 30vw, 480px)",
            }}
            className="booking-card-layout"
          >
            {/* LEFT STUB */}
            <div
              style={{
                flex: "0 0 42%",
                padding: "clamp(24px, 3vw, 40px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              className="booking-left"
            >
              <h2
                id="book-heading"
                className="display-head"
                style={{ fontSize: "var(--step-head)", maxWidth: "12ch" }}
              >
                {booking.heading}
              </h2>
              <p style={{ marginTop: "12px", fontSize: "var(--step-body)" }}>
                {booking.sub}
              </p>

              {/* Live summary */}
              <div
                style={{
                  marginTop: "24px",
                  fontSize: "var(--step-body)",
                }}
              >
                {estimate && (
                  <>
                    <p style={{ fontWeight: 700 }}>{estimate.name}</p>
                    <p>About {estimate.minutes} minutes</p>
                    <p>
                      {estimate.from === 0 ? "Free" : `From ${fmt.format(estimate.from)}`}
                    </p>
                  </>
                )}
                <p style={{ marginTop: "8px" }}>
                  {day ? formatDay(day) : "Pick a day"}
                </p>
              </div>

              <p
                style={{
                  marginTop: "auto",
                  paddingTop: "24px",
                  fontSize: "var(--step-small)",
                }}
              >
                {booking.demoNotice}
              </p>
            </div>

            {/* PERFORATION */}
            <div
              style={{
                position: "relative",
                width: 0,
                flexShrink: 0,
              }}
              className="perforation-vertical"
              aria-hidden="true"
            >
              {/* Top notch */}
              <span
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--bg)",
                }}
              />
              {/* Dots */}
              <span
                style={{
                  position: "absolute",
                  top: "28px",
                  bottom: "28px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--bg)",
                    }}
                  />
                ))}
              </span>
              {/* Bottom notch */}
              <span
                style={{
                  position: "absolute",
                  bottom: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--bg)",
                }}
              />
            </div>

            {/* RIGHT SIDE: form or success */}
            <div
              style={{
                flex: 1,
                padding: "clamp(24px, 3vw, 40px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              className="booking-right"
            >
              {submitted ? (
                <div>
                  <h3
                    ref={successRef}
                    tabIndex={-1}
                    className="display-head"
                    style={{
                      fontSize: "var(--step-head)",
                    }}
                  >
                    {booking.success.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--step-body)",
                      marginTop: "16px",
                      maxWidth: "50ch",
                    }}
                  >
                    {booking.success.text}
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-leaf"
                    style={{
                      background: "var(--ink)",
                      color: "var(--bg)",
                      marginTop: "24px",
                    }}
                  >
                    {booking.success.again}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {/* Name */}
                    <div>
                      <label htmlFor="book-name" className="sr-only">
                        {booking.fields.name}
                      </label>
                      <input
                        ref={nameRef}
                        id="book-name"
                        type="text"
                        placeholder={booking.fields.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "err-name" : undefined}
                        style={{
                          width: "100%",
                          height: "54px",
                          padding: "0 16px",
                          fontSize: "16px",
                          background: fieldBg,
                          color: "var(--ink)",
                          border: "none",
                          borderRadius: "var(--leaf-s) 0",
                        }}
                      />
                      {errors.name && (
                        <p
                          id="err-name"
                          role="alert"
                          style={{
                            color: "var(--ink)",
                            fontSize: "var(--step-small)",
                            marginTop: "4px",
                          }}
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="book-phone" className="sr-only">
                        {booking.fields.phone}
                      </label>
                      <input
                        ref={phoneRef}
                        id="book-phone"
                        type="tel"
                        placeholder={booking.fields.phone}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "err-phone" : undefined
                        }
                        style={{
                          width: "100%",
                          height: "54px",
                          padding: "0 16px",
                          fontSize: "16px",
                          background: fieldBg,
                          color: "var(--ink)",
                          border: "none",
                          borderRadius: "var(--leaf-s) 0",
                        }}
                      />
                      {errors.phone && (
                        <p
                          id="err-phone"
                          role="alert"
                          style={{
                            color: "var(--ink)",
                            fontSize: "var(--step-small)",
                            marginTop: "4px",
                          }}
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="book-service" className="sr-only">
                        {booking.fields.service}
                      </label>
                      <select
                        ref={serviceRef}
                        id="book-service"
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        aria-invalid={!!errors.serviceId}
                        aria-describedby={
                          errors.serviceId ? "err-service" : undefined
                        }
                        style={{
                          width: "100%",
                          height: "54px",
                          padding: "0 16px",
                          fontSize: "16px",
                          background: fieldBg,
                          color: serviceId ? "var(--ink)" : "var(--muted)",
                          border: "none",
                          borderRadius: "var(--leaf-s) 0",
                          appearance: "none",
                        }}
                      >
                        <option value="" disabled>
                          {booking.fields.service}
                        </option>
                        {prices.groups.map((group) => (
                          <optgroup key={group.id} label={group.name}>
                            {group.services.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      {errors.serviceId && (
                        <p
                          id="err-service"
                          role="alert"
                          style={{
                            color: "var(--ink)",
                            fontSize: "var(--step-small)",
                            marginTop: "4px",
                          }}
                        >
                          {errors.serviceId}
                        </p>
                      )}
                    </div>

                    {/* Day */}
                    <div>
                      <label htmlFor="book-day" className="sr-only">
                        {booking.fields.day}
                      </label>
                      <input
                        ref={dayRef}
                        id="book-day"
                        type="date"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        aria-invalid={!!errors.day}
                        aria-describedby={errors.day ? "err-day" : undefined}
                        placeholder={booking.fields.day}
                        style={{
                          width: "100%",
                          height: "54px",
                          padding: "0 16px",
                          fontSize: "16px",
                          background: fieldBg,
                          color: day ? "var(--ink)" : "var(--muted)",
                          border: "none",
                          borderRadius: "var(--leaf-s) 0",
                        }}
                      />
                      {errors.day && (
                        <p
                          id="err-day"
                          role="alert"
                          style={{
                            color: "var(--ink)",
                            fontSize: "var(--step-small)",
                            marginTop: "4px",
                          }}
                        >
                          {errors.day}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      height: "56px",
                      marginTop: "12px",
                      background: "var(--ink)",
                      color: "var(--bg)",
                      fontSize: "var(--step-body)",
                      fontWeight: 500,
                      border: "none",
                      borderRadius: "var(--leaf-s) 0",
                      cursor: "pointer",
                      transition:
                        "transform 200ms var(--ease-out)",
                    }}
                  >
                    {booking.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons below card */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginTop: "32px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={contact.phoneHref}
            className="btn-leaf"
            style={{
              background: "var(--accent)",
              color: "var(--accent-ink)",
            }}
          >
            Call {contact.phoneDisplay}
          </a>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-leaf"
            style={{
              background: "var(--accent)",
              color: "var(--accent-ink)",
            }}
          >
            WhatsApp us
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .booking-card-layout {
            flex-direction: column !important;
          }
          .booking-left {
            flex: none !important;
          }
          .booking-right {
            flex: none !important;
          }
          .perforation-vertical {
            width: 100% !important;
            height: 0 !important;
            flex-direction: row !important;
          }
          .perforation-vertical > span:first-child {
            top: 50% !important;
            left: -14px !important;
            transform: translateY(-50%) !important;
          }
          .perforation-vertical > span:nth-child(2) {
            flex-direction: row !important;
            top: 50% !important;
            left: 28px !important;
            right: 28px !important;
            bottom: auto !important;
            transform: translateY(-50%) !important;
          }
          .perforation-vertical > span:last-child {
            top: 50% !important;
            left: auto !important;
            right: -14px !important;
            bottom: auto !important;
            transform: translateY(-50%) !important;
          }
          #book .leaf-xl {
            max-width: 100% !important;
            border-radius: var(--leaf-l) 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
