import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the Bigelow Designs editorial team. For reader questions, story pitches, corrections, or partnership enquiries.',
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/contact`,
    title: 'Contact Bigelow Designs',
    description:
      'Get in touch with the Bigelow Designs editorial team for reader questions, story pitches, corrections, or partnership enquiries.',
  },
};

const CONTACT_TOPICS = [
  {
    label: 'Reader questions',
    email: 'hello@bigelowdesigns.com',
    description:
      "Have a question about a piece of furniture, a room layout challenge, or want a second opinion on a design decision? We answer every email we can.",
  },
  {
    label: 'Editorial pitches',
    email: 'editorial@bigelowdesigns.com',
    description:
      'Are you an interior designer, architect, or writer with a story worth telling? We welcome well-considered pitches from practitioners working in the field.',
  },
  {
    label: 'Corrections & feedback',
    email: 'corrections@bigelowdesigns.com',
    description:
      'Spotted an error in one of our articles, or have substantive feedback on our coverage? We take accuracy seriously and will update articles promptly.',
  },
  {
    label: 'Privacy & data',
    email: 'privacy@bigelowdesigns.com',
    description:
      'Questions about how we handle your personal information, requests to delete your data, or concerns about our privacy practices.',
  },
];

export default function ContactPage() {
  return (
    <div className="bg-canvas">

      {/* ── Page header ────────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
              Contact
            </p>
            <h1 className="mt-3 text-balance font-serif text-display-lg leading-tight text-ink-900">
              We&apos;d love to hear from you.
            </h1>
            <p className="mt-6 text-pretty text-body-lg leading-relaxed text-ink-500">
              We are a small editorial team. We read every message and reply to as many as
              we can. The right email address goes a long way toward a faster response.
            </p>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ──────────────────────────────── */}
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_400px] lg:gap-20 xl:gap-28">

          {/* ── Contact form ─────────────────────────────── */}
          <section aria-labelledby="form-heading">
            <h2
              id="form-heading"
              className="font-serif text-h2 text-ink-900"
            >
              Send us a message.
            </h2>
            <p className="mt-2 text-body-sm text-ink-500">
              We aim to respond within two business days.
            </p>

            <form
              action="https://formspree.io/f/placeholder"
              method="POST"
              className="mt-8 space-y-6"
            >
              {/* Name + Email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-body-sm font-medium text-ink-700"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Olivia Bennett"
                    className="mt-2 block w-full rounded-xl border border-ink-200 bg-surface px-4 py-3 text-body text-ink-900 placeholder-ink-300 transition-colors duration-quick focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-body-sm font-medium text-ink-700"
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="olivia@example.com"
                    className="mt-2 block w-full rounded-xl border border-ink-200 bg-surface px-4 py-3 text-body text-ink-900 placeholder-ink-300 transition-colors duration-quick focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-body-sm font-medium text-ink-700"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Reader question about Japandi bedroom design"
                  className="mt-2 block w-full rounded-xl border border-ink-200 bg-surface px-4 py-3 text-body text-ink-900 placeholder-ink-300 transition-colors duration-quick focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {/* Topic */}
              <div>
                <label
                  htmlFor="contact-topic"
                  className="block text-body-sm font-medium text-ink-700"
                >
                  Topic
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  className="mt-2 block w-full rounded-xl border border-ink-200 bg-surface px-4 py-3 text-body text-ink-900 transition-colors duration-quick focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <option value="">Select a topic</option>
                  <option value="reader-question">Reader question</option>
                  <option value="editorial-pitch">Editorial pitch</option>
                  <option value="correction">Correction or feedback</option>
                  <option value="privacy">Privacy or data request</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-body-sm font-medium text-ink-700"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us what you&#39;re thinking..."
                  className="mt-2 block w-full resize-none rounded-xl border border-ink-200 bg-surface px-4 py-3 text-body text-ink-900 placeholder-ink-300 transition-colors duration-quick focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-8 py-3.5 text-body font-semibold text-white shadow-md transition-all duration-quick hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg"
              >
                Send message
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>

              <p className="text-[12px] text-ink-400">
                We will never share your email address or use it for anything
                other than responding to your message.
              </p>
            </form>
          </section>

          {/* ── Sidebar: direct email contacts ───────────── */}
          <aside aria-label="Direct contact options">

            <div className="sticky top-24 space-y-6">

              <div>
                <h2 className="font-serif text-h2 text-ink-900">
                  Direct contacts.
                </h2>
                <p className="mt-2 text-body-sm text-ink-500">
                  Prefer email? Use the address that matches your enquiry.
                </p>
              </div>

              <div aria-hidden="true" className="h-px bg-ink-100" />

              <ul className="space-y-5">
                {CONTACT_TOPICS.map((topic) => (
                  <li key={topic.email} className="space-y-1">
                    <p className="text-eyebrow uppercase tracking-[0.14em] text-accent-600">
                      {topic.label}
                    </p>
                    <a
                      href={`mailto:${topic.email}`}
                      className="block font-semibold text-ink-900 transition-colors duration-quick hover:text-accent-600"
                    >
                      {topic.email}
                    </a>
                    <p className="text-body-sm leading-relaxed text-ink-500">
                      {topic.description}
                    </p>
                  </li>
                ))}
              </ul>

              <div aria-hidden="true" className="h-px bg-ink-100" />

              {/* Response time note */}
              <div className="rounded-2xl border border-ink-100 bg-elevated/40 p-5">
                <p className="text-eyebrow uppercase tracking-[0.14em] text-ink-400">
                  Response times
                </p>
                <p className="mt-3 text-body-sm leading-relaxed text-ink-600">
                  We are a small editorial team and we read every message
                  personally. We aim to respond to all enquiries within{' '}
                  <strong className="text-ink-900">two business days</strong>.
                  During high-volume periods it may take a little longer —
                  we appreciate your patience.
                </p>
              </div>

              {/* About link */}
              <p className="text-body-sm text-ink-500">
                Want to learn more about who we are and how we work?{' '}
                <Link
                  href="/about"
                  className="font-medium text-accent-600 transition-colors duration-quick hover:text-accent-500"
                >
                  Read our About page →
                </Link>
              </p>

            </div>
          </aside>

        </div>
      </div>

    </div>
  );
}
