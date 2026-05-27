import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="font-serif text-6xl font-bold text-ink-900">404</h1>
      <p className="mt-4 text-lg text-ink-600">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
      >
        Back to homepage
      </Link>
    </div>
  );
}
