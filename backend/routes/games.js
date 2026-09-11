const express = require("express");
const {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame
} = require("../services/gameService");

const router = express.Router();

router.get("/", (req, res) => res.json({ games: getGames() }));

router.get("/:id", (req, res) => {
  const game = getGame(req.params.id);
  if (!game) return res.status(404).json({ error: "Game not found" });
  res.json({ game });
});

router.post("/", (req, res) => {
  if (!req.body?.title || !req.body?.url) {
    return res.status(400).json({ error: "title and url are required" });
  }
  res.status(201).json({ game: createGame(req.body) });
});

router.put("/:id", (req, res) => {
  const game = updateGame(req.params.id, req.body || {});
  if (!game) return res.status(404).json({ error: "Game not found" });
  res.json({ game });
});

router.delete("/:id", (req, res) => {
  if (!deleteGame(req.params.id)) {
    return res.status(404).json({ error: "Game not found" });
  }
  res.status(204).end();
});

module.exports = router;
