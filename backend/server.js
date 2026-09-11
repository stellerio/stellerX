const express = require("express");
const cors = require("cors");
const path = require("path");
const gamesRouter = require("./routes/games");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "stellerxlets-api", time: new Date().toISOString() });
});

app.use("/api/games", gamesRouter);

const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

app.get("*splat", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`StellerXlets backend listening on http://localhost:${PORT}`);
});
