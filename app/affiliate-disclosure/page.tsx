import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description:
    'Bigelow Designs participates in affiliate marketing programs. Learn how we earn commissions, which programs we use, and how our editorial integrity is maintained.',
  alternates: { canonical: `${siteConfig.url}/affiliate-disclosure` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'June 1, 2026';
const LAST_UPDATED_ISO = '2026-06-01';
const CONTACT_EMAIL = 'hello@bigelowdesigns.com';

export default function AffiliateDisclosurePage() {
  return (
    <div className="bg-canvas">

      {/* ── Page header ───────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-prose px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
            Legal
          </p>
          <h1 className="mt-3 font-serif text-h1 text-ink-900">
            Affiliate Disclosure
          </h1>
          <p className="mt-3 text-body-sm text-ink-500">
            Last updated:{' '}
            <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
          </p>
        </div>
      </div>

      {/* ── Prose content ─────────────────────────────────── */}
      <main className="mx-auto max-w-prose px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
        <div className="prose prose-headings:font-serif prose-a:text-accent-600 prose-a:no-underline hover:prose-a:underline max-w-none text-ink-800">

          <p>
            Transparency is a core editorial value at {siteConfig.name}. This
            page explains clearly and completely how we earn revenue from the
            content on this site, and how that relationship affects — or,
            more precisely, does <em>not</em> affect — what we recommend.
          </p>

          <h2>What Is an Affiliate Link?</h2>
          <p>
            Some of the links on {siteConfig.name} are &ldquo;affiliate
            links.&rdquo; This means that if you click on the link and then
            make a purchase on the retailer&rsquo;s website, we may receive a
            small commission. The commission is paid by the retailer — it does
            not add any cost to your purchase, and you pay the same price you
            would pay if you had navigated directly to the retailer&rsquo;s
            site.
          </p>
          <p>
            These commissions help support the independent editorial work we
            produce: the testing time, the research, the writing, and the
            maintenance of the site. Without them, we could not continue to
            publish free, honest content.
          </p>

          <h2>Programs We Participate In</h2>
          <p>
            {siteConfig.name} participates in several affiliate marketing
            programs, including but not limited to:
          </p>
          <ul>
            <li>
              <strong>Amazon Services LLC Associates Program</strong> — an
              affiliate advertising program operated by Amazon.com, Inc.
              designed to provide a means for sites to earn advertising fees
              by advertising and linking to Amazon.com and affiliated Amazon
              marketplaces.
            </li>
            <li>
              <strong>Other retailer and brand affiliate programs</strong> —
              including programmes run by furniture retailers, home goods
              brands, and interior design product suppliers. We may partner
              directly with individual brands or work through affiliate
              networks such as Rakuten Advertising, Awin, Impact, and
              ShareASale.
            </li>
          </ul>
          <p>
            Where we earn an affiliate commission from a product link, we aim
            to make this clear in context — either through an inline disclosure
            note or a disclosure banner at the top of the relevant section.
          </p>

          <h2>Our Editorial Independence</h2>
          <p>
            Affiliate relationships do not influence our editorial coverage in
            any way. Specifically:
          </p>
          <ul>
            <li>
              <strong>We do not accept payment for reviews.</strong> No brand
              or retailer has ever paid us to write a positive review, and
              none ever will. Products are assessed on their own merits: build
              quality, design, value, and real-world performance.
            </li>
            <li>
              <strong>We do not let affiliate availability determine recommendations.</strong>{' '}
              If the best product in a category has no affiliate programme, we
              recommend it anyway. Our goal is always to point you toward the
              right choice, not the most commercially convenient one.
            </li>
            <li>
              <strong>We do not accept gifted products in exchange for coverage.</strong>{' '}
              When brands offer products for review, we either purchase them at
              full price, borrow them with no obligation attached, or decline.
              Any exception to this policy is disclosed explicitly in the
              relevant article.
            </li>
            <li>
              <strong>Negative reviews stay negative.</strong> If a product
              underperforms, we say so — regardless of whether it carries an
              affiliate link. We believe readers are best served by honest
              assessments, not curated positivity.
            </li>
          </ul>

          <h2>How to Spot an Affiliate Link</h2>
          <p>
            We use several methods to signal affiliate relationships to readers:
          </p>
          <ul>
            <li>
              Articles containing affiliate product links display an
              &ldquo;Editor&rsquo;s Note&rdquo; disclosure banner near the
              first affiliate link.
            </li>
            <li>
              Product cards and &ldquo;Shop Now&rdquo; or &ldquo;View
              Price&rdquo; buttons typically link to affiliate programmes.
            </li>
            <li>
              This disclosure page is linked from the footer of every page on
              the site.
            </li>
          </ul>
          <p>
            If you are ever unsure whether a link is an affiliate link, please{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>contact us</a> and we will
            tell you directly.
          </p>

          <h2>FTC Compliance</h2>
          <p>
            This disclosure is provided in accordance with the United States
            Federal Trade Commission&rsquo;s guidelines on endorsements and
            testimonials in advertising, as set out in 16 CFR Part 255. It is
            also consistent with the requirements of the UK&rsquo;s Competition
            and Markets Authority (CMA) guidelines on online endorsements.
          </p>
          <p>
            We are committed to full transparency with our readers and with
            the regulatory bodies that govern online publishing.
          </p>

          <h2>Prices and Availability</h2>
          <p>
            Product prices and availability listed on {siteConfig.name} are
            accurate as of the date of publication but are subject to change
            without notice. Always verify the current price and availability
            directly on the retailer&rsquo;s website before making a purchase
            decision. We are not responsible for pricing errors or changes
            that occur after an article is published.
          </p>

          <h2>Questions</h2>
          <p>
            If you have any questions about our affiliate relationships, our
            editorial policies, or how we earn money, please do not hesitate
            to reach out. We believe in radical transparency and are happy to
            answer any question openly.
          </p>
          <p>
            Email:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <br />
            Or use our{' '}
            <Link href="/contact">contact form</Link>.
          </p>

        </div>
      </main>

    </div>
  );
}
