export async function postJson(url, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && data.detail) ||
      (typeof data === "string" ? data : "Request failed");
    throw new Error(`${res.status} ${msg}`);
  }

  return data;
}

export async function getJson(url) {
  const res = await fetch(url);

  const contentType = res.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    const message =
      payload?.error?.message ||
      payload?.detail ||
      payload?.message ||
      (typeof payload === "string" ? payload : "Request failed");
    throw new Error(message);
  }

  return payload;
}

