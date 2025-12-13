import { describe, it, expect } from 'vitest';

const STRAPI_URL = process.env.VITE_STRAPI_URL || 'http://strapi.vietpride.online';
const STRAPI_API_TOKEN = process.env.VITE_STRAPI_API_TOKEN || '';

describe('Strapi Connection', () => {
  it('should connect to Strapi API and fetch member tiers', async () => {
    const response = await fetch(`${STRAPI_URL}/api/member-tiers`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data).toHaveProperty('data');
    expect(Array.isArray(data.data)).toBe(true);
  });

  it('should connect to Strapi API and fetch users', async () => {
    const response = await fetch(`${STRAPI_URL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it('should connect to Strapi API and fetch posts', async () => {
    const response = await fetch(`${STRAPI_URL}/api/posts?populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data).toHaveProperty('data');
    expect(Array.isArray(data.data)).toBe(true);
  });

  it('should connect to Strapi API and fetch events', async () => {
    const response = await fetch(`${STRAPI_URL}/api/events?populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data).toHaveProperty('data');
    expect(Array.isArray(data.data)).toBe(true);
  });

  it('should connect to Strapi API and fetch servers', async () => {
    const response = await fetch(`${STRAPI_URL}/api/servers?populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data).toHaveProperty('data');
    expect(Array.isArray(data.data)).toBe(true);
  });
});
