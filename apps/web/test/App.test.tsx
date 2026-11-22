import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from '../src/App';

function stubFetch(implementation: () => Promise<Response>) {
  const fetchMock = vi.fn(implementation);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('App placeholder page', () => {
  it('renders the Kaashi heading', () => {
    stubFetch(() => new Promise(() => {}));

    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Kaashi' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Checking…');
  });

  it('shows Connected when the health check succeeds', async () => {
    const fetchMock = stubFetch(async () => Response.json({ status: 'ok' }));

    render(<App />);

    expect(await screen.findByText('Connected')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/api/health', expect.anything());
  });

  it('shows Not reachable when the health check fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    stubFetch(async () => {
      throw new TypeError('Failed to fetch');
    });

    render(<App />);

    expect(await screen.findByText('Not reachable')).toBeInTheDocument();
  });

  it('shows Not reachable when the API returns an error status', async () => {
    stubFetch(async () => new Response('Bad gateway', { status: 502 }));

    render(<App />);

    expect(await screen.findByText('Not reachable')).toBeInTheDocument();
  });
});
