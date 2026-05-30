import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms and conditions governing your use of Bigelow Designs. Please read these carefully before using the site.',
  alternates: { canonical: `${siteConfig.url}/terms` },
  robots: { index: true, follow: true },
};

// Static page — no revalidation needed.
export const dynamic = 'force-static';

const LAST_UPDATED = 'May 28, 2026';
const CONTACT_EMAIL = 'hello@bigelowdesigns.com';
const SITE_URL = 'https://www.bigelowdesigns.com';

export default function TermsPage() {
  return (
    <div className="bg-canvas">
      {/* ── Page header ───────────────────────────────────── */}
      <div className="border-b border-ink-100 bg-surface">
        <div className="mx-auto max-w-prose px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-accent-600">
            Legal
          </p>
          <h1 className="mt-3 font-serif text-h1 text-ink-900">
            Terms of Service
          </h1>
          <p className="mt-3 text-body-sm text-ink-500">
            Last updated: <time dateTime="2026-05-28">{LAST_UPDATED}</time>
          </p>
        </div>
      </div>

      {/* ── Prose content ─────────────────────────────────── */}
      <main className="mx-auto max-w-prose px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
        <div className="prose prose-headings:font-serif prose-a:text-accent-600 prose-a:no-underline hover:prose-a:underline max-w-none text-ink-800">

          <p>
            Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully
            before using the website located at{' '}
            <a href={SITE_URL}>{SITE_URL}</a> (the &ldquo;Site&rdquo;) operated
            by {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;).
          </p>
          <p>
            By accessing or using the Site, you agree to be bound by these Terms.
            If you do not agree to all of the Terms, you may not access or use the
            Site.
          </p>

          {/* ── 1 ── */}
          <h2>1. Use of the Site</h2>
          <p>
            The Site provides editorial content on interior design, home décor,
            furniture reviews, and related topics for informational and
            entertainment purposes only. You may use the Site only for lawful
            purposes and in accordance with these Terms.
          </p>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use the Site in any way that violates applicable local, national, or
              international law or regulation.
            </li>
            <li>
              Reproduce, duplicate, copy, sell, or exploit any portion of the Site
              for commercial purposes without our express written consent.
            </li>
            <li>
              Transmit any unsolicited or unauthorised advertising or promotional
              material (&ldquo;spam&rdquo;).
            </li>
            <li>
              Attempt to gain unauthorised access to any part of the Site, the
              server on which the Site is stored, or any server, computer, or
              database connected to the Site.
            </li>
            <li>
              Engage in any conduct that restricts or inhibits anyone&rsquo;s use
              or enjoyment of the Site.
            </li>
          </ul>

          {/* ── 2 ── */}
          <h2>2. Informational Purpose — Not Professional Advice</h2>
          <p>
            All content published on the Site, including articles, room guides,
            furniture reviews, and design trend coverage, is provided for general
            informational and inspirational purposes only. It does not constitute
            professional interior design, architectural, structural, legal,
            financial, or any other form of professional advice.
          </p>
          <p>
            You should always consult a qualified professional before undertaking
            any home renovation, construction, or significant purchasing decision.
            We accept no liability for any loss or damage arising from your reliance
            on content published on the Site.
          </p>

          {/* ── 3 ── */}
          <h2>3. Intellectual Property</h2>
          <p>
            The Site and all of its original content, features, and functionality
            — including but not limited to text, articles, photographs,
            illustrations, graphics, logos, and software — are owned by or licensed
            to {siteConfig.name} and are protected by copyright, trademark, and
            other intellectual property laws.
          </p>
          <p>
            You may share links to articles and quote brief excerpts (up to 100
            words) for non-commercial purposes, provided you clearly attribute the
            content to {siteConfig.name} and include a link back to the original
            article. Any other use, including reproduction of full articles or
            images, requires our prior written consent.
          </p>

          {/* ── 4 ── */}
          <h2>4. Affiliate Links and Advertising</h2>
          <p>
            The Site contains affiliate links. When you click an affiliate link and
            make a qualifying purchase, we may receive a small commission at no
            additional cost to you. As an Amazon Associate, we earn from qualifying
            purchases.
          </p>
          <p>
            The Site also displays advertisements served by Google AdSense and
            potentially other advertising networks. The presence of an advertisement
            does not constitute endorsement of the advertised product or service by
            {siteConfig.name}.
          </p>
          <p>
            Affiliate relationships and advertising revenue never influence our
            editorial content or product recommendations. For more details, see our{' '}
            <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
          </p>

          {/* ── 5 ── */}
          <h2>5. User-Submitted Content</h2>
          <p>
            If you submit any content to us (for example, via a contact form,
            comment section, or social media engagement), you grant us a
            non-exclusive, royalty-free, perpetual, irrevocable licence to use,
            reproduce, modify, and publish that content in connection with the Site
            and our business. You represent that you own or have the necessary
            rights to grant this licence.
          </p>

          {/* ── 6 ── */}
          <h2>6. Third-Party Links</h2>
          <p>
            The Site may contain links to external websites operated by third
            parties. These links are provided for convenience only. We have no
            control over the content of those sites and accept no responsibility for
            them or for any loss or damage that may arise from your use of them.
          </p>

          {/* ── 7 ── */}
          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis, without any warranties of any kind, either
            express or implied, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          <p>
            We do not warrant that the Site will be uninterrupted, error-free,
            secure, or free of viruses or other harmful components; nor do we
            warrant the accuracy, completeness, or currency of any content on the
            Site.
          </p>

          {/* ── 8 ── */}
          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, {siteConfig.name},
            its officers, directors, employees, and agents shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages
            — including but not limited to loss of profits, data, goodwill, or
            other intangible losses — arising out of or in connection with your use
            of (or inability to use) the Site or its content.
          </p>
          <p>
            In no event shall our total liability to you for all claims relating
            to the Site exceed one hundred United States dollars (USD $100).
          </p>

          {/* ── 9 ── */}
          <h2>9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless {siteConfig.name} and
            its affiliates from and against any claims, liabilities, damages,
            judgements, awards, losses, costs, expenses, or fees (including
            reasonable legal fees) arising out of or relating to your violation of
            these Terms or your use of the Site.
          </p>

          {/* ── 10 ── */}
          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the
            laws of the State of New York, United States, without regard to its
            conflict-of-law provisions. Any disputes arising under these Terms
            shall be subject to the exclusive jurisdiction of the courts located
            in New York County, New York.
          </p>

          {/* ── 11 ── */}
          <h2>11. Privacy</h2>
          <p>
            Your use of the Site is also governed by our{' '}
            <Link href="/privacy">Privacy Policy</Link>, which is incorporated into
            these Terms by reference. Please review our Privacy Policy to
            understand our practices regarding your personal information.
          </p>

          {/* ── 12 ── */}
          <h2>12. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. When we do, we
            will update the &ldquo;Last updated&rdquo; date at the top of this page.
            Your continued use of the Site following the posting of revised Terms
            constitutes your acceptance of those changes. We encourage you to review
            these Terms periodically.
          </p>

          {/* ── 13 ── */}
          <h2>13. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <p>
            <strong>{siteConfig.name}</strong>
            <br />
            Email:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <br />
            Website: <a href={SITE_URL}>{SITE_URL}</a>
          </p>

        </div>

        {/* Back link */}
        <div className="mt-12 border-t border-ink-100 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-body-sm font-semibold text-accent-600 transition-colors duration-quick hover:text-accent-500"
          >
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
