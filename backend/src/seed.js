import { supabase } from './supabase.js';

async function seed() {
    console.log('🌱 Seeding database with 151 Pokemon...');

    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await res.json();
        const results = data.results;

        for (let i = 0; i < results.length; i++) {
            const p = results[i];
            const id = i + 1;

            // Fetch details for stats and types
            const detailRes = await fetch(p.url);
            const details = await detailRes.json();

            const dbPayload = {
                id: id,
                name: details.name,
                type_1: details.types[0].type.name,
                type_2: details.types[1] ? details.types[1].type.name : null,
                hp: details.stats[0].base_stat,
                attack: details.stats[1].base_stat,
                defense: details.stats[2].base_stat,
                special_attack: details.stats[3].base_stat,
                special_defense: details.stats[4].base_stat,
                speed: details.stats[5].base_stat,
                sprite_front: details.sprites.front_default,
                artwork: details.sprites.other['official-artwork'].front_default,
                favorite_count: 0
            };

            const { error } = await supabase.from('pokemon').upsert(dbPayload);

            if (error) {
                console.error(`Error inserting ${details.name}:`, error);
            } else {
                if (id % 10 === 0) console.log(`Upserted ${id}/151: ${details.name}`);
            }
        }

        console.log('✅ Seeding complete.');
    } catch (err) {
        console.error("Seeding failed:", err);
    }
}

seed();
