-- Create Pokemon Table (lowercase)
CREATE TABLE IF NOT EXISTS pokemon (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  type_1 TEXT NOT NULL,
  type_2 TEXT,
  hp INTEGER NOT NULL,
  attack INTEGER NOT NULL,
  defense INTEGER NOT NULL,
  special_attack INTEGER NOT NULL,
  special_defense INTEGER NOT NULL,
  speed INTEGER NOT NULL,
  sprite_front TEXT NOT NULL,
  artwork TEXT NOT NULL,
  favorite_count INTEGER DEFAULT 0 NOT NULL
);

-- Create Vote Table (lowercase)
CREATE TABLE IF NOT EXISTS vote (
  id SERIAL PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  pokemon_id INTEGER NOT NULL REFERENCES pokemon(id) ON DELETE CASCADE,
  UNIQUE(visitor_id, pokemon_id)
);
