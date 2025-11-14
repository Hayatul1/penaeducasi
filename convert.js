export default async function handler(req, res) {
  try {
    const body = req.body;

    const apiRes = await fetch("https://api.freeconvert.com/v1/process/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "api_production_afb9dc4bdd657083cb4622c1b09b2bbe7a1295e3386b4d5d1e9631da2bb77263.684fef84e5f39b43c6d19b86.691727baa22aa85dd5594892"
      },
      body: JSON.stringify(body)
    });

    const data = await apiRes.text();
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
