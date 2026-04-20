// Replace APPS_SCRIPT_URL with your deployed Google Apps Script URL
const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_URL_HERE";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    let response;
    if (req.method === "GET") {
      const params = new URLSearchParams(req.query).toString();
      response = await fetch(`${APPS_SCRIPT_URL}?${params}`, { method: "GET" });
    } else {
      const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
    }

    const text = await response.text();
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      return res.status(200).send(text);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
