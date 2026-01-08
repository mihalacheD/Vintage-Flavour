// app/global-error.tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Trimitem eroarea către Sentry automat
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* Next.js are o componentă de eroare default care arată bine */}
        <Error statusCode={0} />
      </body>
    </html>
  );
}