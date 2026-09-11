const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../data/games.json");

function readGames() {
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

function writeGames(games) {
  fs.writeFileSync(dataPath, JSON.stringify(games, null, 2) + "\n");
}

function getGames() {
  return readGames();
}

function getGame(id) {
  return readGames().find((game) => game.id === id) || null;
}

function createGame(input) {
  const games = readGames();
  const game = {
    id: input.id || `game-${Date.now()}`,
    title: input.title,
    description: input.description || "",
    url: input.url,
    category: input.category || "Other",
    icon: input.icon || (input.title || "G").slice(0, 1).toUpperCase(),
    accent: input.accent || "#8b5cf6"
  };
  games.push(game);
  writeGames(games);
  return game;
}

function updateGame(id, input) {
  const games = readGames();
  const index = games.findIndex((game) => game.id === id);
  if (index === -1) return null;
  games[index] = { ...games[index], ...input, id };
  writeGames(games);
  return games[index];
}

function deleteGame(id) {
  const games = readGames();
  const nextGames = games.filter((game) => game.id !== id);
  if (games.length === nextGames.length) return false;
  writeGames(nextGames);
  return true;
}

module.exports = { getGames, getGame, createGame, updateGame, deleteGame };
