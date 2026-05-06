export default function Home() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-2 md:items-center md:py-20">
        <article className="min-w-0 space-y-5 sm:space-y-6">
          <p className="inline-flex w-fit max-w-full items-center rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-foreground">
            Built for fast, secure communication
          </p>
          <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl md:leading-tight">
            Secure messaging and everyday services, in one place.
          </h1>
          <p className="max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Seer helps you stay connected with end-to-end secure conversations,
            plus quick access to airtime and essential services—without the
            clutter.
          </p>

          <div
            id="download"
            className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row"
          >
            <a
              href="#"
              aria-disabled="true"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-foreground px-5 py-3 text-center text-sm font-semibold text-background opacity-70 sm:w-auto"
            >
              Download on the App Store
            </a>
            <a
              href="#"
              aria-disabled="true"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-border px-5 py-3 text-center text-sm font-semibold opacity-70 sm:w-auto"
            >
              Get it on Google Play
            </a>
          </div>

          <p className="text-xs text-muted">
            Store links will be added after launch.
          </p>
        </article>

        <aside className="min-w-0 rounded-2xl border border-border bg-surface p-4 sm:rounded-3xl sm:p-6">
          <div className="rounded-xl bg-gradient-to-br from-brand-soft to-background p-4 sm:rounded-2xl sm:p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight">
                What you can do with Seer
              </h2>
              <ul className="space-y-3 text-sm text-muted">
                <li>
                  <span className="font-medium text-foreground">
                    Private chats
                  </span>{" "}
                  with a clean, modern experience.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Status updates
                  </span>{" "}
                  and presence that respects privacy.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Airtime top-ups
                  </span>{" "}
                  and essential services inside the app.
                </li>
              </ul>
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs text-muted">
                  Tip: For the best experience, enable automatic theme—Seer
                  matches your device.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-surface p-5 sm:rounded-3xl sm:p-6">
            <h3 className="font-semibold tracking-tight">Fast</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Designed to feel instant, with thoughtful loading and smooth
              interactions.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-surface p-5 sm:rounded-3xl sm:p-6">
            <h3 className="font-semibold tracking-tight">Secure</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Built with privacy in mind—keep your conversations under your
              control.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-surface p-5 sm:rounded-3xl sm:p-6">
            <h3 className="font-semibold tracking-tight">Practical</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Everyday services are a tap away, so you spend less time switching
              apps.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
