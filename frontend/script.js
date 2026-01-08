// Data Pokémon dari backend
const pokemonData = {
  "page": 1,
  "limit": 20,
  "total": 386,
  "data": [
    {"id":1,"name":"bulbasaur","type_1":"grass","type_2":"poison","hp":45,"attack":49,"defense":49,"special_attack":65,"special_defense":65,"speed":45,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png","favoriteCount":0},
    {"id":2,"name":"ivysaur","type_1":"grass","type_2":"poison","hp":60,"attack":62,"defense":63,"special_attack":80,"special_defense":80,"speed":60,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"},
    {"id":3,"name":"venusaur","type_1":"grass","type_2":"poison","hp":80,"attack":82,"defense":83,"special_attack":100,"special_defense":100,"speed":80,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"},
    {"id":4,"name":"charmander","type_1":"fire","type_2":null,"hp":39,"attack":52,"defense":43,"special_attack":60,"special_defense":50,"speed":65,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"},
    {"id":5,"name":"charmeleon","type_1":"fire","type_2":null,"hp":58,"attack":64,"defense":58,"special_attack":80,"special_defense":65,"speed":80,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"},
    {"id":6,"name":"charizard","type_1":"fire","type_2":"flying","hp":78,"attack":84,"defense":78,"special_attack":109,"special_defense":85,"speed":100,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"},
    {"id":7,"name":"squirtle","type_1":"water","type_2":null,"hp":44,"attack":48,"defense":65,"special_attack":50,"special_defense":64,"speed":43,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"},
    {"id":8,"name":"wartortle","type_1":"water","type_2":null,"hp":59,"attack":63,"defense":80,"special_attack":65,"special_defense":80,"speed":58,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png"},
    {"id":9,"name":"blastoise","type_1":"water","type_2":null,"hp":79,"attack":83,"defense":100,"special_attack":85,"special_defense":105,"speed":78,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png"},
    {"id":10,"name":"caterpie","type_1":"bug","type_2":null,"hp":45,"attack":30,"defense":35,"special_attack":20,"special_defense":20,"speed":45,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png"},
    {"id":11,"name":"metapod","type_1":"bug","type_2":null,"hp":50,"attack":20,"defense":55,"special_attack":25,"special_defense":25,"speed":30,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png"},
    {"id":12,"name":"butterfree","type_1":"bug","type_2":"flying","hp":60,"attack":45,"defense":50,"special_attack":90,"special_defense":80,"speed":70,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png"},
    {"id":13,"name":"weedle","type_1":"bug","type_2":"poison","hp":40,"attack":35,"defense":30,"special_attack":20,"special_defense":20,"speed":50,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png"},
    {"id":14,"name":"kakuna","type_1":"bug","type_2":"poison","hp":45,"attack":25,"defense":50,"special_attack":25,"special_defense":25,"speed":35,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png"},
    {"id":15,"name":"beedrill","type_1":"bug","type_2":"poison","hp":65,"attack":90,"defense":40,"special_attack":45,"special_defense":80,"speed":75,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png"},
    {"id":16,"name":"pidgey","type_1":"normal","type_2":"flying","hp":40,"attack":45,"defense":40,"special_attack":35,"special_defense":35,"speed":56,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png"},
    {"id":17,"name":"pidgeotto","type_1":"normal","type_2":"flying","hp":63,"attack":60,"defense":55,"special_attack":50,"special_defense":50,"speed":71,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png"},
    {"id":18,"name":"pidgeot","type_1":"normal","type_2":"flying","hp":83,"attack":80,"defense":75,"special_attack":70,"special_defense":70,"speed":101,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png"},
    {"id":19,"name":"rattata","type_1":"normal","type_2":null,"hp":30,"attack":56,"defense":35,"special_attack":25,"special_defense":35,"speed":72,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png"},
    {"id":20,"name":"raticate","type_1":"normal","type_2":null,"hp":55,"attack":81,"defense":60,"special_attack":50,"special_defense":70,"speed":97,"sprite_front":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png","artwork":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png"}
  ]
};

let currentPokemon = null;
const votes = {};
const userVotes = {}; // Track which Pokemon the user has voted for

// Initialize votes
pokemonData.data.forEach(pokemon => {
  votes[pokemon.id] = pokemon.favoriteCount || 0;
  userVotes[pokemon.id] = false;
});

// Render daftar Pokémon
function renderPokemonList() {
  const listContainer = document.getElementById('pokemon-list');
  listContainer.innerHTML = '';

  pokemonData.data.forEach(pokemon => {
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
        <span>${votes[pokemon.id]} votes</span>
      </div>
    `;

    listContainer.appendChild(card);
  });
}

// Tampilkan detail Pokémon
function showDetail(pokemon) {
  currentPokemon = pokemon;
  
  document.getElementById('list-view').classList.add('hidden');
  document.getElementById('detail-view').classList.add('active');

  document.getElementById('detail-number').textContent = pokemon.id;
  document.getElementById('detail-artwork').src = pokemon.artwork;
  document.getElementById('detail-name').textContent = pokemon.name;
  document.getElementById('detail-fav').textContent = votes[pokemon.id] || 0;

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
  renderPokemonList(); // Re-render to update vote counts
}

// Vote untuk Pokémon
function voteForPokemon() {
  if (currentPokemon && !userVotes[currentPokemon.id]) {
    votes[currentPokemon.id] = (votes[currentPokemon.id] || 0) + 1;
    userVotes[currentPokemon.id] = true;
    document.getElementById('detail-fav').textContent = votes[currentPokemon.id];
    updateVoteStatus();
    
    // Animasi tombol
    const btn = document.getElementById('vote-button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Voted!';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 1000);
  }
}

// Unvote untuk Pokémon
function unvoteForPokemon() {
  if (currentPokemon && userVotes[currentPokemon.id]) {
    votes[currentPokemon.id] = Math.max(0, (votes[currentPokemon.id] || 0) - 1);
    userVotes[currentPokemon.id] = false;
    document.getElementById('detail-fav').textContent = votes[currentPokemon.id];
    updateVoteStatus();
    
    // Animasi tombol
    const btn = document.getElementById('unvote-button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Unvoted!';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 1000);
  }
}

// Inisialisasi
renderPokemonList();