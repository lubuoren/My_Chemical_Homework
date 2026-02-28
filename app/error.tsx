'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white space-y-4">
      <h2 className="text-2xl font-bold text-rose-400">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
