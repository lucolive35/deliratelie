'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-green-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-6xl font-extrabold leading-tight">
              DeliraAteliê
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-green-500">
                Cursos Criativos
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Aprenda arte de forma leve, prática e inspiradora. Workshops, cursos e experiências criativas para desbloquear sua expressão.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:scale-105 transition">
                Ver cursos
              </button>
              <button className="px-6 py-3 rounded-full border border-green-500 text-green-600 font-semibold hover:bg-green-50 transition">
                Como funciona
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-[400px] rounded-3xl bg-gradient-to-br from-pink-400 via-rose-300 to-green-300 blur-2xl opacity-60 absolute" />
            <div className="relative w-full h-[400px] rounded-3xl bg-white shadow-xl flex items-center justify-center text-xl">
              🎨 Imagem do curso aqui
            </div>
          </div>
        </section>

        {/* CURSOS */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold">Cursos em destaque</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[
              {
                title: 'Pintura para iniciantes',
                desc: 'Comece do zero e desenvolva sua criatividade',
              },
              {
                title: 'Arte terapêutica',
                desc: 'Use a arte como forma de expressão emocional',
              },
              {
                title: 'Técnicas avançadas',
                desc: 'Leve sua arte para o próximo nível',
              },
            ].map((course) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={course.title}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-r from-pink-300 to-green-300" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-gray-500 mt-2">{course.desc}</p>
                  <button className="mt-4 text-pink-500 font-semibold">
                    Ver detalhes →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIÊNCIA */}
        <section className="mt-24 bg-gradient-to-r from-pink-500 to-green-500 rounded-3xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold">Uma experiência criativa de verdade</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Aqui você não só aprende — você experimenta, cria e se conecta com sua expressão artística.
          </p>
          <button className="mt-6 px-8 py-4 bg-white text-pink-600 rounded-full font-semibold hover:scale-105 transition">
            Começar agora
          </button>
        </section>

      </div>
    </main>
  );
}
