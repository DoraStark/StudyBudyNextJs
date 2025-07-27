import handler from '../src/pages/api/profile';
import { createMocks } from 'node-mocks-http';

describe('/api/profile (E2E)', () => {
  it('should return profile data with correct structure', async () => {
    const { req, res } = createMocks({ method: 'GET' });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);

    const data = JSON.parse(res._getData());
    console.log('Response data:', data);

    expect(Array.isArray(data.languages)).toBe(true);
    expect(data.languages.length).toBeGreaterThan(0);

    expect(Array.isArray(data.learn)).toBe(true);
    expect(data.learn.length).toBeGreaterThan(0);

    expect(Array.isArray(data.teach)).toBe(true);
    expect(data.teach.length).toBeGreaterThan(0);

    expect(Array.isArray(data.preferences)).toBe(true);
    expect(data.preferences.length).toBeGreaterThan(0);
    expect(data.preferences[0]).toHaveProperty('title');
    expect(data.preferences[0]).toHaveProperty('text');
  });
});

