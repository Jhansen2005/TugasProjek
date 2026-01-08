import { supabase } from './supabase.js';

async function resetVotes() {
    console.log('🧹 Resetting votes...');

    try {
        // 1. Delete all rows in 'vote' table
        const { error: deleteError } = await supabase
            .from('vote')
            .delete()
            .neq('id', 0); // Hack to delete all rows if no RLS blocks it

        if (deleteError) {
            console.error("Error deleting votes:", deleteError);
        } else {
            console.log("✅ All votes deleted.");
        }

        // 2. Reset favorite_count to 0 for all pokemon
        // Since we can't easily do "update all" without a where clause that matches all, 
        // we'll fetch all IDs (or just do a range update if possible)

        // Easier way: 
        const { error: updateError } = await supabase
            .from('pokemon')
            .update({ favorite_count: 0 })
            .neq('id', 0); // Matches all positive IDs

        if (updateError) {
            console.error("Error resetting counts:", updateError);
        } else {
            console.log("✅ All favorite counts reset to 0.");
        }

    } catch (err) {
        console.error("Reset failed:", err);
    }
}

resetVotes();
