"use client";

import { useCallback, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

type RequestFormProps = {
  type: string;
  subtype: string;
  title: string;
  description?: string;
  showPhone?: boolean;
  extraFields?: React.ReactNode;
};

export function RequestForm({
  type,
  subtype,
  title,
  description,
  showPhone = true,
  extraFields,
}: RequestFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const reset = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setCompany("");
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus("submitting");
      setFeedback(null);

      try {
        const res = await fetch("/api/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            type,
            subtype,
            name,
            email,
            phone: showPhone ? phone : undefined,
            message,
            company,
          }),
        });
        const data = (await res.json()) as { success?: boolean; message?: string };

        if (!res.ok || !data.success) {
          setStatus("error");
          setFeedback(
            typeof data.message === "string" && data.message.length > 0
              ? data.message
              : "Something went wrong. Please try again.",
          );
          return;
        }

        setStatus("success");
        setFeedback(
          typeof data.message === "string" && data.message.length > 0
            ? data.message
            : "Thank you. We have received your request.",
        );
        reset();
      } catch {
        setStatus("error");
        setFeedback("We could not reach the server. Check your connection and try again.");
      }
    },
    [company, email, message, name, phone, reset, showPhone, subtype, type],
  );

  const inputClass =
    "mt-1.5 w-full min-h-11 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted focus:border-foreground focus:ring-2 focus:ring-foreground/15";

  const labelClass = "text-sm font-medium text-foreground";

  return (
    <section className="mt-8" aria-labelledby="request-form-heading">
      <h2 id="request-form-heading" className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{description}</p>
      ) : null}

      {status === "success" && feedback ? (
        <output
          className="mb-6 mt-6 block rounded-2xl border border-border bg-brand-soft/50 px-4 py-3 text-sm text-foreground"
          aria-live="polite"
        >
          {feedback}
        </output>
      ) : null}

      {status === "error" && feedback ? (
        <output
          className="mb-6 mt-6 block rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-foreground"
          role="alert"
          aria-live="assertive"
        >
          {feedback}
        </output>
      ) : null}

      <form
        onSubmit={onSubmit}
        className="mt-6 rounded-2xl border border-border bg-surface p-6 sm:rounded-3xl sm:p-8"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label htmlFor="request-name" className={labelClass}>
              Full name
            </label>
            <input
              id="request-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="request-email" className={labelClass}>
              Email
            </label>
            <input
              id="request-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className={inputClass}
            />
          </div>
          {showPhone ? (
            <div className="sm:col-span-2">
              <label htmlFor="request-phone" className={labelClass}>
                Phone number (optional)
              </label>
              <input
                id="request-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                className={inputClass}
              />
            </div>
          ) : null}
          {extraFields}
          <div className="sm:col-span-2">
            <label htmlFor="request-message" className={labelClass}>
              Details
            </label>
            <textarea
              id="request-message"
              name="message"
              required
              rows={5}
              value={message}
              onChange={(ev) => setMessage(ev.target.value)}
              className={`${inputClass} min-h-[8rem] resize-y`}
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
          aria-hidden="true"
        >
          <input
            id="request-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(ev) => setCompany(ev.target.value)}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--cta-bg)] px-6 text-sm font-semibold text-[var(--cta-fg)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit request"}
          </button>
        </div>
      </form>
    </section>
  );
}
