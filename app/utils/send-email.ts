import type { FormData } from '../(pages)/contact/contactus';

export function sendEmail(data: FormData) {
  const apiEndpoint = '/api/email';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json() as Promise<Record<string, unknown>>)
    .then((response) => {
      const message = typeof response.message === 'string' ? response.message : 'Email sent';
      alert(message);
      return response;
    })
    .catch((err) => {
      const message = err instanceof Error ? err.message : String(err);
      alert(message);
      throw err;
    })
}

