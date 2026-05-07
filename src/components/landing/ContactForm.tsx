"use client";

import { useCallback, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const reset = useCallback(() => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setCompany("");
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus("submitting");
      setFeedback(null);

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name,
            email,
            subject,
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
            : "Thank you. We have received your message.",
        );
        reset();
      } catch {
        setStatus("error");
        setFeedback("We could not reach the server. Check your connection and try again.");
      }
    },
    [company, email, message, name, reset, subject],
  );

  const inputClass =
    "mt-1.5 w-full min-h-11 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/25";

  const labelClass = "text-sm font-medium text-foreground";

  return (
    <section className="mt-10" aria-labelledby="contact-form-heading">
      <h2 id="contact-form-heading" className="sr-only">
        Send a message
      </h2>

      {status === "success" && feedback ? (
        <output
          className="mb-6 block rounded-2xl border border-border bg-brand-soft/50 px-4 py-3 text-sm text-foreground"
          aria-live="polite"
        >
          {feedback}
        </output>
      ) : null}

      {status === "error" && feedback ? (
        <output
          className="mb-6 block rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-foreground"
          role="alert"
          aria-live="assertive"
        >
          {feedback}
        </output>
      ) : null}

      <form
        onSubmit={onSubmit}
        className="relative rounded-2xl border border-border bg-surface p-6 sm:p-8"
        noValidate
      >
        <p className="text-sm text-muted">
          Messages are delivered securely from this site to our team. We usually reply within{" "}
          <span className="font-medium text-foreground">24–48 hours</span>.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <p className="sm:col-span-2">
            <label htmlFor="contact-name" className={labelClass}>
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={120}
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className={inputClass}
            />
          </p>
          <p className="sm:col-span-2">
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={255}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className={inputClass}
            />
          </p>
          <p className="sm:col-span-2">
            <label htmlFor="contact-subject" className={labelClass}>
              Subject <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              maxLength={200}
              value={subject}
              onChange={(ev) => setSubject(ev.target.value)}
              className={inputClass}
            />
          </p>
          <p className="sm:col-span-2">
            <label htmlFor="contact-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              maxLength={5000}
              value={message}
              onChange={(ev) => setMessage(ev.target.value)}
              className={`${inputClass} min-h-32 resize-none`}
            />
          </p>
        </div>

        <div
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
          aria-hidden="true"
        >
          <input
            id="contact-company"
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
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>
        </div>
      </form>

      <p className="mt-3 max-w-prose text-xs text-muted sm:mt-4">
        By sending, you agree we may email you about this request. See our{" "}
        <a href="/privacy" className="font-medium text-brand underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
    </section>
  );
}
