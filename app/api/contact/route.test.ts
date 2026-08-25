import { describe, it, expect } from 'vitest';
import { POST } from './route';

describe('Contact API POST handler', () => {
  it('should return 400 if required fields are missing', async () => {
    // Missing name
    let req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', message: 'hello' })
    });
    let res = await POST(req);
    expect(res.status).toBe(400);
    let data = await res.json();
    expect(data.error).toBe('Missing required fields');

    // Missing email
    req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', message: 'hello' })
    });
    res = await POST(req);
    expect(res.status).toBe(400);

    // Missing message
    req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', email: 'test@example.com' })
    });
    res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('should return 200 on successful submission', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test User', email: 'test@example.com', message: 'Test message' })
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it('should return 500 on internal error (e.g. invalid JSON)', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: 'invalid json'
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe('Internal server error');
  });
});
