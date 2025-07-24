export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = "demo-1l3z9y1n-4n7e-4sm2-9765-8a2ec5aa25f6";
  const sourceCode = "Default";

  const response = await fetch(
    "https://demo.vivapayments.com/api/checkout/v2/orders",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 1000,
        sourceCode,
        customer: { email: "demo@example.com" }
      })
    }
  );
  const data = await response.json();
  if (data.checkoutUrl) res.status(200).json({ redirectUrl: data.checkoutUrl });
  else res.status(400).json({ error: "Invalid response", raw: data });
}
