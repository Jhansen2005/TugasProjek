import express from "express";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import crypto from "crypto";
console.log("APP.JS BARU AKTIF");


const app = express();
app.use(express.json());
app.use(cookieParser());

// fix __dirname (karena ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load pokemon.json
const dataPath = path.join(__dirname, "data", "pokemon.json");
let pokemon = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// simpan vote visitor (memory)
const votes = {}; 
// { visitorId: [pokemonId, pokemonId] }

//
// STEP 3 — VISITOR COOKIE
//
app.use((req, res, next) => {
  if (!req.cookies.visitorId) {
    const id = crypto.randomUUID();
    res.cookie("visitorId", id, { httpOnly: true });
    req.visitorId = id;
  } else {
    req.visitorId = req.cookies.visitorId;
  }
  next();
});

//
// ROOT CHECK
//
app.get("/", (req, res) => {
  res.send("Backend API running 🚀");
});

//
// STEP 4 — LIST POKEMON (PAGINATION)
//
app.get("/pokemon", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    page,
    limit,
    total: pokemon.length,
    data: pokemon.slice(start, end),
  });
});

//
// STEP 5 — DETAIL POKEMON
//
app.get("/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const found = pokemon.find(p => p.id === id);

  if (!found) {
    return res.status(404).json({ message: "Pokemon not found" });
  }

  res.json(found);
});

//
// STEP 6 — VOTE / FAVORITE
//
app.post("/pokemon/:id/vote", (req, res) => {
  const id = parseInt(req.params.id);
  const visitorId = req.visitorId;

  const p = pokemon.find(p => p.id === id);
  if (!p) return res.status(404).json({ message: "Pokemon not found" });

  votes[visitorId] ??= [];

  if (votes[visitorId].includes(id)) {
    return res.status(400).json({ message: "Already voted" });
  }

  votes[visitorId].push(id);
  p.favoriteCount = Number(p.favoriteCount || 0) + 1;


  fs.writeFileSync(dataPath, JSON.stringify(pokemon, null, 2));

  res.json({ message: "Voted", favoriteCount: p.favoriteCount });
});

//
// STEP 7 — UNVOTE
//
app.delete("/pokemon/:id/vote", (req, res) => {
  const id = parseInt(req.params.id);
  const visitorId = req.visitorId;

  const p = pokemon.find(p => p.id === id);
  if (!p) return res.status(404).json({ message: "Pokemon not found" });

  if (!votes[visitorId] || !votes[visitorId].includes(id)) {
    return res.status(400).json({ message: "Not voted yet" });
  }

  votes[visitorId] = votes[visitorId].filter(pid => pid !== id);
  p.favoriteCount = Math.max(0, Number(p.favoriteCount || 0) - 1);


  fs.writeFileSync(dataPath, JSON.stringify(pokemon, null, 2));

  res.json({ message: "Unvoted", favoriteCount: p.favoriteCount });
});

export default app;
