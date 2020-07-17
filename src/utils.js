/**get with cookie
 *
 * Params:
 *   url [String]
 *   params [Object]
 * Return:
 *   [Promise]: return [Response]
 */
export function get(url, params={}) {
  const urlO = new URL(url);

  for (const [k, v] of Object.entries(params)) {
    urlO.searchParams.append(k, v);
  }
  console.log('get: %o', { urlO });
  return fetch(urlO.href, {
    credentials: 'include',
  });
}


/**JSON post with cookie
 *
 * Params:
 *   url [String]
 *   body [Object]:
 * Return:
 *   [Promise]: return [Response]
 */
export function post(url, body={}) {
  console.log('post: %o', { url, body });
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: 'include',
  });
}


/**Form post with cookie
 *
 * Params:
 *   url [String]
 *   body [Object]:
 * Return:
 *   [Promise]: return [Response]
 */
export function postForm(url, body={}) {
  const formData = new FormData();
  for (const [k, v] of Object.entries(body)) {
    formData.append(k, v);
  }

  console.log('postForm: %o', { url, formData });
  return fetch(url, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
}
