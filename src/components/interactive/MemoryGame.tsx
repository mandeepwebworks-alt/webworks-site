import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Rocket, Star } from 'lucide-react';

const icons = [Target, Zap, Rocket, Star]; // Reduced down to 4 extremely easy pairs

export default function MemoryGame() {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffledCards = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((Icon, index) => ({ id: index, Icon }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setDisabled(false);
  };

  const handleCardClick = (id: number) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    
    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves(moves + 1);
      
      const [first, second] = newFlipped;
      if (cards[first].Icon === cards[second].Icon) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1100); // Gives them a little more time to memorize
      }
    }
  };

  const isWon = solved.length === cards.length && cards.length > 0;

  return (
    <div className="relative w-full min-h-[70vh] flex flex-col items-center justify-center p-4">
      
      <div className="z-10 text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-2">Memory <span className="gradient-text">Match</span></h2>
        <p className="text-muted-200 uppercase tracking-widest text-sm">Moves: <span className="text-neon-cyan font-bold">{moves}</span></p>
      </div>

      <div className="z-10 grid grid-cols-4 gap-3 max-w-lg w-full">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || solved.includes(index);
          const isMatched = solved.includes(index);
          return (
            <motion.div
              key={card.id}
              className="relative w-full aspect-square cursor-pointer"
              onClick={() => handleCardClick(index)}
              whileHover={!isFlipped && !disabled ? { scale: 1.05 } : {}}
              whileTap={!isFlipped && !disabled ? { scale: 0.95 } : {}}
            >
              <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front (Hidden state) */}
                <div 
                  className={`absolute inset-0 rounded-2xl glass flex items-center justify-center border-white/5 transition-all outline-none`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-white/20 font-heading text-3xl font-bold">?</span>
                </div>
                
                {/* Back (Revealed state) */}
                <div 
                  className={`absolute inset-0 rounded-2xl flex items-center justify-center
                  ${isMatched ? 'bg-neon-cyan/[0.08] border border-neon-cyan/20' : 'glass'}`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <card.Icon className={`w-1/2 h-1/2 ${isMatched ? 'text-neon-cyan' : 'text-white drop-shadow-md'}`} strokeWidth={2.5} />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {isWon && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-20 absolute inset-0 bg-space-900/90 backdrop-blur-sm flex flex-col justify-center items-center text-center p-6 rounded-3xl"
          >
            <h3 className="text-5xl font-heading font-black mb-4">You <span className="gradient-text">Win!</span></h3>
            <p className="text-xl text-muted-200 mb-8 max-w-md">Completed in {moves} moves. A sharp mind deserves a sharp website.</p>
            <div className="flex gap-4">
              <button 
                onClick={startNewGame}
                className="btn-secondary"
              >
                Play Again
              </button>
              <a href="/contact" className="btn-primary">Get a Quote</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
