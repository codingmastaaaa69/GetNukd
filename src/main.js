import './index.css';
import gamesData from './games.json';

// State
let searchQuery = '';
let activeCategory = 'All';
let selectedGame = null;

const root = document.getElementById('root');

function init() {
  render();
}

function render() {
  const categories = ['All', ...new Set(gamesData.map(g => g.category))];
  const filteredGames = gamesData.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  root.innerHTML = `
    <div class="min-h-screen flex flex-col selection:bg-neon-primary selection:text-nuke-black">
      <!-- Navbar -->
      <nav class="border-b-2 border-white/10 bg-nuke-black/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
        <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div id="logo-btn" class="flex items-center gap-3 group cursor-pointer">
            <div class="p-2 bg-[#00ff00] brutal-border-neon transform transition-transform group-hover:rotate-12">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/><path d="m19.07 4.93-14.14 14.14"/><circle cx="12" cy="12" r="4"/></svg>
            </div>
            <h1 class="text-2xl font-display font-bold uppercase tracking-tighter hidden sm:block">
              GET <span class="text-[#00ff00] neon-glow">NUKD</span>
            </h1>
          </div>

          <div class="flex-1 max-w-md relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              id="search-input"
              type="text" 
              placeholder="SEARCH GAMES..."
              value="${searchQuery}"
              class="w-full bg-white/5 border-2 border-white/10 px-10 py-2 font-mono text-sm focus:outline-none focus:border-[#00ff00] transition-colors focus:ring-0 placeholder:text-white/20 text-white"
            />
          </div>

          <div class="flex items-center gap-4">
            <button class="hidden md:flex items-center gap-2 font-mono text-xs hover:text-[#00ff00] transition-colors">
              NEW RELEASES
            </button>
            <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 text-white/60">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="m12 2 8 4-8 4-8-4 8-4Z"/><path d="m12 10 8 4-8 4-8-4 8-4Z"/><path d="m12 18 8 4-8 4-8-4 8-4Z"/></svg>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Contents -->
      <main class="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <!-- Categories -->
        <div class="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          ${categories.map(cat => `
            <button
              id="cat-${cat}"
              class="category-btn px-4 py-1 font-mono text-xs whitespace-nowrap transition-all uppercase ${
                activeCategory === cat 
                ? 'bg-[#00ff00] text-black font-bold brutal-border-neon' 
                : 'bg-white/5 text-white/60 border-2 border-transparent hover:border-white/20'
              }"
              data-category="${cat}"
            >
              ${cat}
            </button>
          `).join('')}
        </div>

        ${searchQuery === '' && activeCategory === 'All' ? `
          <section id="hero-slope" class="mb-12 relative overflow-hidden group cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-r from-[#00ff00]/10 to-transparent z-0"></div>
            <div class="relative z-10 border-4 border-white p-8 md:p-12 lg:flex items-center justify-between gap-8">
              <div class="flex-1 text-white text-left">
                <div class="flex items-center gap-2 text-[#00ff00] mb-4 font-mono font-bold tracking-widest text-sm">
                  TRENDING NOW
                </div>
                <h2 class="text-5xl md:text-7xl font-display font-black leading-none mb-6 uppercase tracking-tighter italic">
                  SLOPE <br /> <span class="text-[#00ff00] neon-glow italic">MAYHEM</span>
                </h2>
                <p class="text-white/60 text-lg mb-8 max-w-md font-sans">
                  Experience the ultimate high-speed reaction game in a neon world. No blocks, just nukes.
                </p>
                <button class="bg-white text-black px-8 py-4 font-display font-bold text-xl uppercase brutal-border hover:bg-[#00ff00] transition-colors flex items-center gap-3">
                  PLAY NOW
                </button>
              </div>
              <div class="hidden lg:block w-1/2 aspect-video bg-white/10 brutal-border-neon overflow-hidden">
                <img src="https://img.gamedistribution.com/de6d6c29a67448d3900b95eb88e0f666-512x512.jpeg" alt="Slope" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100" />
              </div>
            </div>
          </section>
        ` : ''}

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          ${filteredGames.map(game => `
            <div class="game-card group cursor-pointer" data-id="${game.id}">
              <div class="relative aspect-square mb-3 overflow-hidden bg-white/5 border-2 border-white/10 group-hover:border-[#00ff00] transition-all">
                <img src="${game.thumbnail}" alt="${game.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="absolute top-2 left-2 px-2 py-0.5 bg-[#00ff00] text-black font-mono text-[10px] font-bold uppercase translate-y-[-100%] group-hover:translate-y-0 transition-transform">
                  ${game.category}
                </div>
              </div>
              <h3 class="font-display font-bold text-lg uppercase tracking-tight group-hover:text-[#00ff00] transition-colors text-white">${game.name}</h3>
              <div class="text-white/40 font-mono text-[10px] uppercase mt-1">Ready to Deploy</div>
            </div>
          `).join('')}
        </div>

        ${filteredGames.length === 0 ? `
           <div class="text-center py-20 text-white">
            <h3 class="text-2xl font-display font-bold uppercase mb-2">NO GAMES DETONATED</h3>
            <p class="text-white/40 font-mono text-sm uppercase">Sector clear. Try a different search.</p>
          </div>
        ` : ''}
      </main>

      <!-- Footer -->
       <footer class="border-t-2 border-white/10 py-12 px-4 mt-20 bg-black/50">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="flex items-center gap-3">
            <div class="p-1 px-2 border-2 border-white font-display font-black text-xl italic uppercase text-white">
              G <span class="text-[#00ff00]">N</span>
            </div>
            <div class="text-[10px] font-mono text-white/40">
              © 2026 GET NUKD INTERACTIVE<br />
              ALL RIGHTS RADIATED
            </div>
          </div>
        </div>
      </footer>

      <!-- Modal -->
      <div id="modal-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl ${selectedGame ? 'block' : 'hidden'}">
        <div id="modal-close-bg" class="absolute inset-0 cursor-crosshair"></div>
        <div class="relative w-full max-w-6xl aspect-[16/10] bg-black brutal-border overflow-hidden flex flex-col z-[51]">
          <div class="flex items-center justify-between px-4 py-3 border-b-2 border-white/10 bg-white/5">
            <h2 id="modal-title" class="font-display font-bold text-xl uppercase tracking-tighter text-white">
              ${selectedGame ? selectedGame.name : ''}
            </h2>
            <button id="modal-close-btn" class="p-1 text-white/60 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <div class="flex-1 relative bg-[#0a0a0a]">
            ${selectedGame ? `<iframe src="${selectedGame.url}" class="w-full h-full border-none" allow="autoplay; fullscreen; pointer-lock"></iframe>` : ''}
          </div>
          <div class="bg-[#0a0a0a] p-4 border-t-2 border-white/10 flex items-center justify-end gap-2">
              <button id="fullscreen-btn" class="px-4 py-2 bg-[#00ff00] text-black border border-[#00ff00] font-display font-bold text-[12px] uppercase hover:opacity-90 transition-opacity">
                FULLSCREEN
              </button>
          </div>
        </div>
      </div>
    </div>
  `;

  addEventListeners();
}

function addEventListeners() {
  // Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.focus();
    // Keep cursor at end
    const val = searchInput.value;
    searchInput.value = '';
    searchInput.value = val;
    
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });
  }

  // Categories
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      render();
    });
  });

  // Game Cards
  document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      selectedGame = gamesData.find(g => g.id === id);
      render();
    });
  });

  // Hero
  const hero = document.getElementById('hero-slope');
  if (hero) {
    hero.addEventListener('click', () => {
      selectedGame = gamesData.find(g => g.id === 'slope');
      render();
    });
  }

  // Modal Close
  const closeBtn = document.getElementById('modal-close-btn');
  const closeBg = document.getElementById('modal-close-bg');
  if (closeBtn) closeBtn.addEventListener('click', () => { selectedGame = null; render(); });
  if (closeBg) closeBg.addEventListener('click', () => { selectedGame = null; render(); });

  // Fullscreen
  const fsBtn = document.getElementById('fullscreen-btn');
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.requestFullscreen) iframe.requestFullscreen();
    });
  }

  // Logo Reset
  const logo = document.getElementById('logo-btn');
  if (logo) {
    logo.addEventListener('click', () => {
      searchQuery = '';
      activeCategory = 'All';
      selectedGame = null;
      render();
    });
  }
}

// Initial Boot
init();
