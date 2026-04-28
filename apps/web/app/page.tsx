'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [status, setStatus] = useState('Conectando à API...');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchApi = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000';

      try {
        const result = await fetch(`${apiUrl}/`);
        const json = await result.json();
        setData(json);
        setStatus('✨ Tudo funcionando!');
      } catch (err) {
        setStatus('💥 Erro ao conectar');
      }
    };

    fetchApi();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#ff4ecd,_#22c55e,_#ff4ecd)] animate-pulse text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HERO */}
        <motion.header
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-7xl font-black tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
            DeliraAteliê 🌈✨
          </h1>
          <p className="mt-6 text-2xl font-medium max-w-2xl mx-auto">
            Cursos criativos, experiências sensoriais e arte sem limites
          </p>
        </motion.header>

        {/* CTA PRINCIPAL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <button className="px-10 py-5 text-xl font-bold rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-green-400 shadow-[0_0_30px_rgba(255,0,150,0.8)] hover:scale-110 transition">
            Quero criar agora 🚀
          </button>
        </motion.div>

        {/* STATUS */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold">{status}</p>
        </div>

        {/* CARDS */}
        <section className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: 'Cursos',
              desc: 'Aprenda técnicas únicas e expanda sua criatividade',
              emoji: '🎨',
            },
            {
              title: 'Experiências',
              desc: 'Vivências imersivas que despertam seus sentidos',
              emoji: '🧠',
            },
            {
              title: 'Comunidade',
              desc: 'Conecte-se com pessoas criativas como você',
              emoji: '💚',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, rotate: -5, y: 50 }}
              animate={{ opacity: 1, rotate: 0, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="p-8 rounded-[30px] bg-gradient-to-br from-pink-400/80 to-green-400/80 backdrop-blur-xl shadow-[0_0_40px_rgba(255,0,150,0.6)] border border-white/30"
            >
              <div className="text-5xl">{item.emoji}</div>
              <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
              <p className="mt-2 text-white/90">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* API DATA */}
        {data && (
          <div className="mt-20 p-6 bg-black/30 rounded-2xl backdrop-blur-lg">
            <pre className="text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
