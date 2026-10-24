import assert from 'node:assert/strict';
import { createAgentraApiClient } from '@x12i/agentra-client';

const originalFetch = globalThis.fetch;
try {
  globalThis.fetch = async (url, init) => {
    assert.equal(new URL(url).pathname, '/v1/dashboards');
    assert.equal(new URL(url).searchParams.get('scope'), 'demo');
    assert.equal(init.method, 'GET');
    return Response.json({ dashboards: [{ id: 'overview', name: 'Overview' }] });
  };
  const client = createAgentraApiClient({ endpoint: 'https://agentra.example.invalid', apiKey: 'fixture-only' });
  const result = await client.listDashboards('demo');
  assert.equal(result.dashboards[0].id, 'overview');
  console.log(result);
} finally { globalThis.fetch = originalFetch; }
