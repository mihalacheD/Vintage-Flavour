"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
          <h1 className="text-2xl font-bold text-gray-900">Something went wrong!</h1>
          <p className="text-gray-600 mb-4">We&apos;ve been notified and are working on it.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#79c141] text-white px-4 py-2 rounded-lg"
          >
            Try again
          </button>
        </div>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}