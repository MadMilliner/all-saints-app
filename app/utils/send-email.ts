import type { FormData } from '../(pages)/contact/contactus';

export function sendEmail(data: FormData) {
  const apiEndpoint = '/api/email';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
        alert(response.message);
        return response;
    })
    .catch((err) => {
        alert(err);
        throw err;
    })
}

