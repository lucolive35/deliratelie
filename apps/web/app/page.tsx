'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [mode, setMode] = useState<'psychedelic' | 'premium'>('psychedelic');

  return (
    <main className="min-h-screen">
      {/* TOGGLE */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => setMode('psychedelic')}
          className={`px-4 py-2 rounded-full font-semibold ${mode === 'psychedelic' ? 'bg-pink-500 text-white' : 'bg-white/50'}`}
        >
          🌈 Psicodélico
        </button>
        <button
          onClick={() => setMode('premium')}
          className={`px-4 py-2 rounded-full font-semibold ${mode === 'premium' ? 'bg-green-600 text-white' : 'bg-white/50'}`}
        >
          ✨ Premium
        </button>
      </div>

      {mode === 'psychedelic' ? <Psychedelic /> : <Premium />}
    </main>
  );
}

function Psychedelic() {
  return (
    <div className="min-h-screen text-white bg-[conic-gradient(at_top,_#ff00cc,_#00ff88,_#ff00cc)] animate-spin-slow">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-7xl font-black text-center drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
        >
          DeliraAteliê 🌈
        </motion.h1>

        <p className="text-center mt-6 text-2xl">
          Cursos criativos que expandem sua mente
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-20">
          {['Pintura Livre', 'Arte Sensorial', 'Experimentação'].map((item, i) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="p-8 rounded-[40px] bg-gradient-to-br from-pink-500 to-green-400 shadow-[0_0_60px_rgba(255,0,150,0.9)]"
            >
              <h3 className="text-3xl font-bold">{item}</h3>
              <p className="mt-2">Uma experiência fora do comum</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-20">
          <button className="px-10 py-5 text-xl font-bold rounded-full bg-white text-black hover:scale-110 transition">
            Entrar na experiência 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

function Premium() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-emerald-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-center bg-gradient-to-r from-pink-500 to-green-500 bg-clip-text text-transparent"
        >
          DeliraAteliê
        </motion.h1>

        <p className="text-center mt-6 text-lg text-gray-600">
          Cursos artesanais com design contemporâneo e experiência única
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { title: 'Cursos', desc: 'Aprenda com profundidade' },
            { title: 'Workshops', desc: 'Experiências guiadas' },
            { title: 'Mentorias', desc: 'Evolução artística' },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-500 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-20">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-green-500 text-white font-semibold shadow-lg hover:scale-105 transition">
            Explorar cursos
          </button>
        </div>
      </div>
    </div>
  );
}
