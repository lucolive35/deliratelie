'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-hidden relative">
      <Background />
      <Navbar />
      <Hero />
      <Courses />
      <Footer />
    </main>
  );
}

function Background() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#ff2bd6,transparent_40%),radial-gradient(circle_at_70%_70%,#22ff88,transparent_40%),linear-gradient(120deg,#ff2bd6,#22ff88)] animate-[pulse_10s_ease-in-out_infinite]" />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-60"
          style={{
            background: i % 2 === 0 ? '#ff2bd6' : '#22ff88',
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
          animate={{
            x: [0, 120, -120, 0],
            y: [0, -150, 150, 0],
          }}
          transition={{ duration: 25 + i * 5, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex justify-between items-center px-10 py-6">
      <h1 className="text-2xl font-bold">DeliraAteliê ✨</h1>
      <div className="flex gap-8 text-sm">
        <a className="hover:opacity-80">Cursos</a>
        <a className="hover:opacity-80">Galeria</a>
        <a className="hover:opacity-80">Sobre</a>
        <a className="hover:opacity-80">Contato</a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="text-center mt-10 px-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-7xl md:text-8xl font-black tracking-tight opacity-80"
      >
        DELIRA
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold mt-4"
      >
        Desperte sua Criatividade
      </motion.h2>

      <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
        Explore experiências artísticas transformadoras
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button className="px-6 py-3 rounded-full bg-green-400 text-black font-semibold hover:scale-105 transition">
          Ver Cursos
        </button>
        <button className="px-6 py-3 rounded-full border border-white/50 hover:bg-white/10 transition">
          Saiba Mais
        </button>
      </div>
    </div>
  );
}

function Courses() {
  const items = [
    {
      title: 'Arte Psicodélica',
      desc: 'Explore novas dimensões',
    },
    {
      title: 'Esculturas Criativas',
      desc: 'Modele suas ideias',
    },
    {
      title: 'Oficinas de Mandalas',
      desc: 'Harmonia e cor',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-20 px-10">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          whileHover={{ scale: 1.08 }}
          className="rounded-3xl overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_0_40px_rgba(255,0,150,0.4)]"
        >
          <div className="h-48 bg-gradient-to-br from-pink-500 to-green-400" />
          <div className="p-6">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-white/70 mt-2">{item.desc}</p>

            <button className="mt-4 px-4 py-2 rounded-full bg-white text-black font-semibold">
              Acessar
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <div className="text-center mt-20 pb-10 text-lg font-medium">
      Viva a Arte. Sinta a Magia.
    </div>
  );
}
