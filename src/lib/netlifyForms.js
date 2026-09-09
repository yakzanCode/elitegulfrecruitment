/**
 * Submits data to a Netlify Form by name. Works for SPAs like this one -
 * Netlify's build-time bot detects the matching hidden form in index.html,
 * and this function posts to the same endpoint at runtime.
 *
 * Netlify only accepts urlencoded or multipart form submissions to "/",
 * with a "form-name" field identifying which form it belongs to.
 */
export async function submitToNetlify(formName, fields) {
  const body = new URLSearchParams({ "form-name": formName, ...fields }).toString();

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error(`Form submission failed (${response.status})`);
  }
}
