import { useEffect, useState } from 'react';

type ApiStatus = 'checking' | 'ok' | 'unavailable';

const STATUS_TEXT: Record<ApiStatus, string> = {
  checking: 'Checking…',
  ok: 'Connected',
  unavailable: 'Not reachable',
};

// Placeholder page until the generated UI arrives. It also shows whether the
// backend answers, which confirms the dev proxy is wired up.
export function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking');

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/health', { signal: controller.signal })
      .then(async (response) => {
        const body: unknown = response.ok ? await response.json() : null;
        const ok =
          typeof body === 'object' && body !== null && 'status' in body && body.status === 'ok';
        setApiStatus(ok ? 'ok' : 'unavailable');
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          console.error('Health check failed', error);
          setApiStatus('unavailable');
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <main>
      <h1>Kaashi</h1>
      <p>A schema-driven low-code platform. The generated UI will appear here.</p>
      <p>
        API status: <span role="status">{STATUS_TEXT[apiStatus]}</span>
      </p>
    </main>
  );
}
