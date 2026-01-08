// Data Pokémon dari backend
let pokemonData = {
  page: 1,
  limit: 20,
  total: 0,
  data: []
};

let currentPokemon = null;
let currentPage = 1;
const votes = {}; // Local cache for immediate UI updates, but source of truth is backend
const userVotes = {}; // Track which Pokemon the user has voted for

// Helper to persist visitor identity
function getVisitorId() {
  let id = localStorage.getItem('pokemon_visitor_id');
  if (!id) {
    id = crypto.randomUUID(); // Requires secure context or polyfill. If fetch works, we are typically in a context where we can generate ID or let backend handling logic prevail if not. 
    // Wait, crypto.randomUUID might not be available in all older browsers or non-secure contexts (http localhost).
    // Fallback simple ID generator
    if (!id) {
      id = 'visitor-' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
    localStorage.setItem('pokemon_visitor_id', id);
  }
  return id;
}

const VISITOR_ID = getVisitorId();

// Render daftar Pokémon
async function fetchAndRenderPokemon(page = 1) {
  try {
    const res = await fetch(`http://localhost:3000/pokemon?page=${page}&limit=20`, {
      headers: {
        'x-visitor-id': VISITOR_ID
      }
    });
    const data = await res.json();

    pokemonData = data;
    currentPage = data.page;

    const listContainer = document.getElementById('pokemon-list');
    listContainer.innerHTML = '';

    pokemonData.data.forEach(pokemon => {
      // Sync local votes
      votes[pokemon.id] = pokemon.favoriteCount;
      // Sync user voted status
      if (pokemon.votes && pokemon.votes.length > 0) {
        userVotes[pokemon.id] = true;
      } else {
        userVotes[pokemon.id] = false;
      }

      const card = document.createElement('div');
      card.className = 'pokemon-card';
      card.onclick = () => showDetail(pokemon);

      const types = `
        <span class="pokemon-type type-${pokemon.type_1}">${pokemon.type_1}</span>
        ${pokemon.type_2 ? `<span class="pokemon-type type-${pokemon.type_2}">${pokemon.type_2}</span>` : ''}
      `;

      card.innerHTML = `
        <img src="${pokemon.artwork}" alt="${pokemon.name}">
        <h3>#${pokemon.id} ${pokemon.name}</h3>
        <div class="pokemon-types">${types}</div>
        <div class="favorite-badge">
          <span>❤️</span>
          <span>${pokemon.favoriteCount} votes</span>
        </div>
      `;

      listContainer.appendChild(card);
    });

    renderPagination();

  } catch (err) {
    console.error("Failed to fetch pokemon:", err);
  }
}

function renderPagination() {
  let paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) {
    paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination';
    paginationContainer.style.textAlign = 'center';
    paginationContainer.style.marginTop = '20px';
    document.getElementById('pokemon-list').after(paginationContainer);
  }

  const totalPages = Math.ceil(pokemonData.total / pokemonData.limit);

  paginationContainer.innerHTML = `
    <button ${currentPage === 1 ? 'disabled' : ''} onclick="fetchAndRenderPokemon(${currentPage - 1})">Previous</button>
    <span style="margin: 0 10px;">Page ${currentPage} of ${totalPages}</span>
    <button ${currentPage === totalPages ? 'disabled' : ''} onclick="fetchAndRenderPokemon(${currentPage + 1})">Next</button>
  `;
}

// Tampilkan detail Pokémon
function showDetail(pokemon) {
  currentPokemon = pokemon;

  document.getElementById('list-view').classList.add('hidden');
  document.getElementById('detail-view').classList.add('active');

  document.getElementById('detail-number').textContent = pokemon.id;
  document.getElementById('detail-artwork').src = pokemon.artwork;
  document.getElementById('detail-name').textContent = pokemon.name;

  // Use latest vote count from local cache or pokemon object
  const currentVotes = votes[pokemon.id] !== undefined ? votes[pokemon.id] : pokemon.favoriteCount;
  document.getElementById('detail-fav').textContent = currentVotes;

  const typesHtml = `
    <span class="pokemon-type type-${pokemon.type_1}">${pokemon.type_1}</span>
    ${pokemon.type_2 ? `<span class="pokemon-type type-${pokemon.type_2}">${pokemon.type_2}</span>` : ''}
  `;
  document.getElementById('detail-types').innerHTML = typesHtml;

  const stats = [
    { label: 'HP', value: pokemon.hp },
    { label: 'Attack', value: pokemon.attack },
    { label: 'Defense', value: pokemon.defense },
    { label: 'Sp. Attack', value: pokemon.special_attack },
    { label: 'Sp. Defense', value: pokemon.special_defense },
    { label: 'Speed', value: pokemon.speed }
  ];

  const maxStat = 255;
  const statsContainer = document.getElementById('detail-stats');
  statsContainer.innerHTML = stats.map(stat => `
    <div class="stat-row">
      <div class="stat-label">${stat.label}</div>
      <div class="stat-bar-container">
        <div class="stat-bar">
          <div class="stat-fill" style="width: ${(stat.value / maxStat) * 100}%"></div>
        </div>
        <div class="stat-value">${stat.value}</div>
      </div>
    </div>
  `).join('');

  updateVoteStatus();
}

// Update vote status display
function updateVoteStatus() {
  if (!currentPokemon) return;

  const hasVoted = userVotes[currentPokemon.id];
  console.log(`Check vote for ${currentPokemon.id}: ${hasVoted}`);

  const statusDiv = document.getElementById('vote-status');
  const voteBtn = document.getElementById('vote-button');
  const unvoteBtn = document.getElementById('unvote-button');

  if (hasVoted) {
    statusDiv.className = 'vote-status voted';
    statusDiv.innerHTML = '✅ You have voted for this Pokémon!';
    voteBtn.disabled = true;
    unvoteBtn.disabled = false;
  } else {
    statusDiv.className = 'vote-status not-voted';
    statusDiv.innerHTML = '❌ You haven\'t voted for this Pokémon yet';
    voteBtn.disabled = false;
    unvoteBtn.disabled = true;
  }
}

// Kembali ke daftar
function showList() {
  document.getElementById('list-view').classList.remove('hidden');
  document.getElementById('detail-view').classList.remove('active');
  currentPokemon = null;
  fetchAndRenderPokemon(currentPage); // Re-fetch to update vote counts
}

// Vote untuk Pokémon
async function voteForPokemon() {
  if (currentPokemon && !userVotes[currentPokemon.id]) {
    // 1. Optimistic UI Update
    const originalVotes = votes[currentPokemon.id];
    const newVotes = (originalVotes || 0) + 1;

    votes[currentPokemon.id] = newVotes;
    userVotes[currentPokemon.id] = true;
    document.getElementById('detail-fav').textContent = newVotes;
    updateVoteStatus();

    // 2. Call Backend
    try {
      const res = await fetch(`http://localhost:3000/pokemon/${currentPokemon.id}/vote`, {
        method: 'POST',
        headers: { 'x-visitor-id': VISITOR_ID }
      });

      if (!res.ok) {
        throw new Error('Vote failed');
      }

      const data = await res.json();
      // Sync with strict server truth
      votes[currentPokemon.id] = data.favoriteCount;
      document.getElementById('detail-fav').textContent = data.favoriteCount;

    } catch (e) {
      console.error(e);
      // Revert optimistic update
      votes[currentPokemon.id] = originalVotes;
      userVotes[currentPokemon.id] = false;
      document.getElementById('detail-fav').textContent = originalVotes;
      updateVoteStatus();
      alert("Failed to vote, please try again.");
    }
  }
}

// Unvote untuk Pokémon
async function unvoteForPokemon() {
  if (currentPokemon && userVotes[currentPokemon.id]) {
    // 1. Optimistic UI Update
    const originalVotes = votes[currentPokemon.id];
    const newVotes = Math.max(0, (originalVotes || 0) - 1);

    votes[currentPokemon.id] = newVotes;
    userVotes[currentPokemon.id] = false;
    document.getElementById('detail-fav').textContent = newVotes;
    updateVoteStatus();

    // 2. Call Backend
    try {
      const res = await fetch(`http://localhost:3000/pokemon/${currentPokemon.id}/vote`, {
        method: 'DELETE',
        headers: { 'x-visitor-id': VISITOR_ID }
      });

      if (!res.ok) {
        throw new Error('Unvote failed');
      }

      const data = await res.json();
      // Sync
      votes[currentPokemon.id] = data.favoriteCount;
      document.getElementById('detail-fav').textContent = data.favoriteCount;

    } catch (e) {
      console.error(e);
      // Revert
      votes[currentPokemon.id] = originalVotes;
      userVotes[currentPokemon.id] = true;
      document.getElementById('detail-fav').textContent = originalVotes;
      updateVoteStatus();
      alert("Failed to unvote, please try again.");
    }
  }
}

// Inisialisasi
fetchAndRenderPokemon();