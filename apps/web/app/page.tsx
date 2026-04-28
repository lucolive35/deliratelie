'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, MessageCircle } from 'lucide-react';

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
        setStatus('API conectada');
      } catch (err) {
        setStatus(`Erro ao conectar: ${apiUrl}`);
      }
    };

    fetchApi();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-emerald-50 to-rose-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* HERO */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-emerald-500 bg-clip-text text-transparent">
            DeliraAteliê ✨
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Artesanato com alma, design contemporâneo e experiências únicas.
          </p>
        </motion.header>

        {/* STATUS CARD */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-6 mb-12"
        >
          <h2 className="text-xl font-semibold">Status da API</h2>
          <p className={`mt-2 font-medium ${status.includes('conectada') ? 'text-emerald-600' : 'text-pink-500'}`}>
            {status}
          </p>

          {data && (
            <pre className="mt-4 p-4 bg-black/5 rounded-xl text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </motion.section>

        {/* FEATURES */}
        <section className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Portfólio',
              desc: 'Explore peças únicas feitas à mão',
              icon: <Palette size={28} />,
            },
            {
              title: 'Sobre',
              desc: 'A história por trás de cada criação',
              icon: <Sparkles size={28} />,
            },
            {
              title: 'Contato',
              desc: 'Vamos criar algo exclusivo juntos',
              icon: <MessageCircle size={28} />,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group p-6 rounded-3xl bg-white/60 backdrop-blur-lg border border-white/30 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-emerald-400 text-white shadow-md group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-500 mt-1">{item.desc}</p>

              <div className="mt-4 text-sm text-emerald-600 opacity-0 group-hover:opacity-100 transition">
                Explorar →
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-emerald-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition">
            Criar algo exclusivo
          </button>
        </motion.div>
      </div>
    </main>
  );
}
