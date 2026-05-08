import { useState, useMemo } from 'react';
import { 
  Gamepad2, 
  Search, 
  Maximize2, 
  X, 
  Flame, 
  Zap, 
  Ghost, 
  Clock, 
  Bomb
} from 'lucide-react';
import gamesDataRaw from './games.json';

const gamesData = Array.isArray(gamesDataRaw) ? gamesDataRaw : [];

export default function App() {
  console.log('App rendering, games count:', gamesData.length);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(gamesData.map(g => g.category))], []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white selection:bg-[#00ff00] selection:text-black">
      {/* Header / Navbar */}
      <nav className="border-b-2 border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2 bg-[#00ff00] border-2 border-white shadow-[4px_4px_0px_0px_white]">
              <Bomb size={24} className="text-black" />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tighter hidden sm:block">
              GET <span className="text-[#00ff00]">NUKD</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH GAMES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border-2 border-white/10 px-10 py-2 font-mono text-sm focus:outline-none focus:border-[#00ff00] transition-colors placeholder:text-white/20 text-white"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 font-mono text-xs hover:text-[#00ff00] transition-colors">
              <Zap size={14} /> NEW RELEASES
            </button>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <Ghost size={20} className="text-white/60" />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1 font-mono text-xs whitespace-nowrap transition-all uppercase ${
                activeCategory === cat 
                ? 'bg-[#00ff00] text-black font-bold border-2 border-white shadow-[4px_4px_0px_0px_#00ff00]' 
                : 'bg-white/5 text-white/60 border-2 border-transparent hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {searchQuery === '' && activeCategory === 'All' && gamesData.length > 0 && (
          <section className="mb-12 relative overflow-hidden group border-4 border-white p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ff00]/10 to-transparent z-0 pointer-events-none" />
            <div className="relative z-10 lg:flex items-center justify-between gap-8">
              <div className="flex-1 text-white">
                <div className="flex items-center gap-2 text-[#00ff00] mb-4 font-mono font-bold tracking-widest text-sm">
                  <Flame size={16} /> TRENDING NOW
                </div>
                <h2 className="text-5xl md:text-7xl font-black leading-none mb-6 uppercase tracking-tighter italic">
                  SLOPE <br /> <span className="text-[#00ff00] italic">MAYHEM</span>
                </h2>
                <p className="text-white/60 text-lg mb-8 max-w-md">
                  Experience the ultimate high-speed reaction game in a neon world. No blocks, just nukes.
                </p>
                <button 
                  onClick={() => setSelectedGame(gamesData.find(g => g.id === 'slope') || gamesData[0])}
                  className="bg-white text-black px-8 py-4 font-bold text-xl uppercase border-2 border-black shadow-[4px_4px_0px_0px_#00ff00] hover:bg-[#00ff00] transition-colors flex items-center gap-3"
                >
                  PLAY NOW <Zap size={24} fill="currentColor" />
                </button>
              </div>
              <div className="hidden lg:block w-1/2 aspect-video bg-white/10 border-2 border-[#00ff00] shadow-[8px_8px_0px_0px_#00ff00] overflow-hidden">
                <img 
                  src="https://img.gamedistribution.com/de6d6c29a67448d3900b95eb88e0f666-512x512.jpeg" 
                  alt="Slope Feature"
                  className="w-full h-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square mb-3 overflow-hidden bg-white/5 border-2 border-white/10 group-hover:border-[#00ff00] transition-all">
                <img 
                  src={game.thumbnail} 
                  alt={game.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#00ff00] text-black font-mono text-[10px] font-bold uppercase">
                  {game.category}
                </div>
              </div>
              <h3 className="font-bold text-lg uppercase tracking-tight group-hover:text-[#00ff00] transition-colors text-white">
                {game.name}
              </h3>
              <div className="flex items-center gap-2 text-white/40 font-mono text-[10px]">
                <Clock size={10} /> ADDED 2d AGO
              </div>
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <Bomb size={48} className="mx-auto text-white/20 mb-4" />
            <h3 className="text-2xl font-bold uppercase mb-2 text-white">NO GAMES DETONATED</h3>
            <p className="text-white/40 font-mono text-sm">Search query "{searchQuery}" came up dry.</p>
          </div>
        )}
      </main>

      <footer className="border-t-2 border-white/10 py-12 px-4 mt-20 bg-black/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="p-1 px-2 border-2 border-white font-black text-xl italic uppercase text-white">
              G <span className="text-[#00ff00]">N</span>
            </div>
            <div className="text-[10px] font-mono text-white/40">
              © 2026 GET NUKD INTERACTIVE<br />
              ALL RIGHTS RADIATED
            </div>
          </div>
          <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest text-white/60">
            <a href="#" className="hover:text-[#00ff00] transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-[#00ff00] transition-colors">DMCA</a>
            <a href="#" className="hover:text-[#00ff00] transition-colors">CONTACT</a>
            <a href="#" className="hover:text-[#00ff00] transition-colors">SUBMIT</a>
          </div>
        </div>
      </footer>

      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl">
          <div className="absolute inset-0 cursor-crosshair pb-4" onClick={() => setSelectedGame(null)} />
          
          <div className="relative w-full max-w-6xl aspect-[16/10] bg-black border-2 border-white flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <Gamepad2 size={20} className="text-[#00ff00]" />
                <h2 className="font-bold text-xl uppercase tracking-tighter text-white">
                  {selectedGame.name}
                </h2>
              </div>
              <button onClick={() => setSelectedGame(null)} className="p-1 hover:bg-white/10 text-white/60 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 relative bg-[#0a0a0a]">
              <iframe 
                src={selectedGame.url}
                className="w-full h-full border-none"
                title={selectedGame.name}
                allow="autoplay; fullscreen; pointer-lock"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="bg-[#0a0a0a] p-4 border-t-2 border-white/10 flex items-center justify-between">
              <div className="flex gap-4">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white/40 uppercase">Developer</span>
                    <span className="text-sm font-bold uppercase text-white">UNKNOWN RADIATIVE</span>
                 </div>
                 <div className="w-[1px] bg-white/10" />
                 <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white/40 uppercase">Rating</span>
                    <span className="text-sm font-bold uppercase text-[#00ff00]">☢️ RADIOACTIVE</span>
                 </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                      const iframe = document.querySelector('iframe');
                      if (iframe?.requestFullscreen) iframe.requestFullscreen();
                  }}
                  className="px-6 py-2 bg-[#00ff00] text-black border-2 border-black font-bold uppercase hover:opacity-90 transition-opacity"
                >
                  FULLSCREEN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
