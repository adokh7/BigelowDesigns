interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({
  items,
  heading = 'Frequently Asked Questions',
}: {
  items: FAQItem[];
  heading?: string;
}) {
  if (!items?.length) return null;
  return (
    <section className="my-12" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="font-serif text-2xl font-semibold text-ink-900"
      >
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-ink-100 border-y border-ink-100">
        {items.map((item) => (
          <details
            key={item.question}
            className="group py-4 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <h3 className="text-base font-semibold text-ink-900">
                {item.question}
              </h3>
              <span
                className="mt-1 shrink-0 text-ink-400 transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <div className="mt-3 text-ink-600">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
