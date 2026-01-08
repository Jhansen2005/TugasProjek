import express from "express";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import cors from "cors";
import { supabase } from "./supabase.js";

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//
// VISITOR COOKIE & HEADER
//
app.use((req, res, next) => {
  // Check header first (from frontend localStorage), then cookie
  let id = req.headers['x-visitor-id'] || req.cookies.visitorId;

  if (!id) {
    id = crypto.randomUUID();
    console.log(`[Middleware] New Visitor assigned: ${id}`);
    res.cookie("visitorId", id, { httpOnly: true });
  } else {
    // Check if we need to set the cookie to match the header (if cookie was lost)
    if (!req.cookies.visitorId) {
      res.cookie("visitorId", id, { httpOnly: true });
    }
    console.log(`[Middleware] Visitor: ${id}`);
  }

  req.visitorId = id;
  next();
});

//
// CHECK CONNECTION
// 
app.get("/", (req, res) => {
  res.send("Backend API running with Supabase SDK 🚀");
});

//
// LIST POKEMON (PAGINATION)
//
app.get("/pokemon", async (req, res) => {
  console.log(`GET /pokemon page=${req.query.page} visitor=${req.visitorId}`);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const { data: pokemonList, error: fetchError, count } = await supabase
      .from('pokemon')
      .select('*', { count: 'exact' })
      .range(skip, skip + limit - 1)
      .order('id', { ascending: true });

    if (fetchError) {
      console.error("Fetch Pokemon Error:", fetchError);
      throw fetchError;
    }

    const pokemonIds = pokemonList.map(p => p.id);

    const { data: userVotes, error: voteError } = await supabase
      .from('vote')
      .select('pokemon_id')
      .eq('visitor_id', req.visitorId)
      .in('pokemon_id', pokemonIds);

    if (voteError) {
      console.error("Fetch Votes Error:", voteError);
      throw voteError;
    }

    const userVotedSet = new Set(userVotes.map(v => v.pokemon_id));

    const enrichedPokemon = pokemonList.map(p => ({
      ...p,
      favoriteCount: p.favorite_count,
      votes: userVotedSet.has(p.id) ? [{ id: 'dummy' }] : []
    }));

    res.json({
      page,
      limit,
      total: count,
      data: enrichedPokemon,
    });
  } catch (error) {
    console.error("List Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//
// DETAIL POKEMON
//
app.get("/pokemon/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`GET /pokemon/${id} visitor=${req.visitorId}`);

  try {
    const { data: found, error } = await supabase
      .from('pokemon')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !found) {
      console.warn(`Pokemon ${id} not found`);
      return res.status(404).json({ message: "Pokemon not found" });
    }

    res.json({
      ...found,
      favoriteCount: found.favorite_count
    });
  } catch (error) {
    console.error("Detail Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//
// VOTE
//
app.post("/pokemon/:id/vote", async (req, res) => {
  const id = parseInt(req.params.id);
  const visitorId = req.visitorId;
  console.log(`POST /pokemon/${id}/vote visitor=${visitorId}`);

  try {
    const { data: p } = await supabase.from('pokemon').select('id, favorite_count').eq('id', id).single();
    if (!p) return res.status(404).json({ message: "Pokemon not found" });

    const { data: existingVote } = await supabase
      .from('vote')
      .select('id')
      .eq('visitor_id', visitorId)
      .eq('pokemon_id', id)
      .single();

    if (existingVote) {
      console.warn(`User ${visitorId} already voted for ${id}`);
      return res.status(400).json({ message: "Already voted" });
    }

    const { error: insertError } = await supabase
      .from('vote')
      .insert({ visitor_id: visitorId, pokemon_id: id });

    if (insertError) {
      console.error("Insert Vote Error:", insertError);
      throw insertError;
    }

    const newCount = p.favorite_count + 1;
    const { data: updatedPokemon, error: updateError } = await supabase
      .from('pokemon')
      .update({ favorite_count: newCount })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error("Update Pokemon Error:", updateError);
      throw updateError;
    }

    console.log(`Vote Success. New count: ${newCount}`);
    res.json({ message: "Voted", favoriteCount: updatedPokemon.favorite_count });

  } catch (error) {
    console.error("Vote Handler Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//
// UNVOTE
//
app.delete("/pokemon/:id/vote", async (req, res) => {
  const id = parseInt(req.params.id);
  const visitorId = req.visitorId;
  console.log(`DELETE /pokemon/${id}/vote visitor=${visitorId}`);

  try {
    const { data: p } = await supabase.from('pokemon').select('id, favorite_count').eq('id', id).single();
    if (!p) return res.status(404).json({ message: "Pokemon not found" });

    const { data: existingVote } = await supabase
      .from('vote')
      .select('id')
      .eq('visitor_id', visitorId)
      .eq('pokemon_id', id)
      .single();

    if (!existingVote) {
      console.warn(`User ${visitorId} has NOT voted for ${id}`);
      return res.status(400).json({ message: "Not voted yet" });
    }

    const { error: deleteError } = await supabase
      .from('vote')
      .delete()
      .eq('visitor_id', visitorId)
      .eq('pokemon_id', id);

    if (deleteError) {
      console.error("Delete Vote Error:", deleteError);
      throw deleteError;
    }

    const newCount = Math.max(0, p.favorite_count - 1);
    const { data: updatedPokemon, error: updateError } = await supabase
      .from('pokemon')
      .update({ favorite_count: newCount })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error("Update Pokemon Error (Dec):", updateError);
      throw updateError;
    }

    console.log(`Unvote Success. New count: ${newCount}`);
    res.json({ message: "Unvoted", favoriteCount: updatedPokemon.favorite_count });

  } catch (error) {
    console.error("Unvote Handler Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
