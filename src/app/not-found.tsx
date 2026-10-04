import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8">
      <h1 className="text-4xl font-semibold tracking-[-0.04em]">Not on the shelf.</h1>
      <p className="mt-4 text-muted">That page is not in the directory.</p>
      <Link href="/" className="mt-6 inline-block underline">
        Back to the shelf
      </Link>
    </main>
  );
}
