import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Rocket, Star, Ghost, Gamepad2, Heart, Zap, Diamond, Sparkles } from 'lucide-react';

export default function Playful404() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent page scroll when touching inside the playground on mobile
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prevent = (e: TouchEvent) => e.preventDefault();
    el.addEventListener('touchmove', prevent, { passive: false });
    return () => el.removeEventListener('touchmove', prevent);
  }, []);

  const shapes = [
    { Icon: Gamepad2, color: 'text-neon-cyan', size: 64, top: '15%', left: '15%', delay: 0 },
    { Icon: Heart, color: 'text-rose-500', size: 50, top: '75%', left: '85%', delay: 0.5 },
    { Icon: Zap, color: 'text-amber-400', size: 55, top: '25%', left: '80%', delay: 1 },
    { Icon: Ghost, color: 'text-neon-purple', size: 60, top: '70%', left: '20%', delay: 1.5 },
    { Icon: Rocket, color: 'text-emerald-400', size: 70, top: '45%', left: '50%', delay: 2 },
    { Icon: Diamond, color: 'text-sky-400', size: 45, top: '85%', left: '50%', delay: 2.5 },
    { Icon: Sparkles, color: 'text-yellow-300', size: 65, top: '40%', left: '80%', delay: 3 },
    { Icon: Star, color: 'text-orange-400', size: 55, top: '30%', left: '40%', delay: 3.5 },
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center cursor-crosshair bg-space-900"
      style={{ touchAction: 'none' }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="grid-bg w-full h-full" />
      </div>

      <div className="absolute top-8 left-0 right-0 z-0 flex justify-center mt-20">
         <div className="glass px-6 py-2 rounded-full border-white/10">
           <p className="text-neon-cyan font-mono text-sm tracking-[0.2em] font-semibold animate-pulse">
             INTERACTIVE PLAY ZONE ACTIVE
           </p>
         </div>
      </div>

      {/* Floating Interactive Game Objects */}
      {shapes.map((item, i) => (
        <motion.div
          key={i}
          className="absolute z-20 cursor-grab active:cursor-grabbing p-6 md:p-10"
          style={{ top: item.top, left: item.left, touchAction: 'none' }}
          drag
          dragConstraints={containerRef}
          dragElastic={0.4}
          whileDrag={{ scale: 1.4, rotate: 180 }}
          whileHover={{ scale: 1.2, rotate: 15 }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5 + (i % 3),
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative group">
            <div className={`absolute -inset-4 bg-white/5 rounded-full blur-xl group-hover:bg-white/20 transition-all duration-500`} />
            <item.Icon className={`${item.color} relative drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`} size={item.size} />
          </div>
        </motion.div>
      ))}

      {/* Action Area */}
      <div className="absolute bottom-12 md:bottom-24 z-30 flex flex-col items-center gap-6 pointer-events-auto">
         <h2 className="text-3xl md:text-5xl font-heading font-black text-white tracking-tight text-center px-4 drop-shadow-glow">
           Looks like you found our <span className="gradient-text">Playground!</span>
         </h2>
         <p className="text-muted-200 text-lg mb-4 max-w-lg text-center">Take a break, drag the floating gems around, and when you're ready to build something incredible, let's head back.</p>
         <a 
          href="/" 
          className="btn-primary shadow-glow-strong"
         >
           Return to Homepage
         </a>
      </div>
    </div>
  );
}

