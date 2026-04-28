'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden relative text-white">
      <AnimatedBackground />
      <FloatingDelira />
      <Content />
    </main>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#ff2bd6,transparent_40%),radial-gradient(circle_at_80%_70%,#22ff88,transparent_40%),radial-gradient(circle_at_50%_50%,#ff2bd6,#22ff88)] animate-[pulse_8s_ease-in-out_infinite]" />

      {/* Moving blobs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-70"
          style={{
            background: i % 2 === 0 ? '#ff2bd6' : '#22ff88',
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -120, 120, 0],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function FloatingDelira() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-6xl md:text-8xl font-black tracking-widest opacity-10"
          style={{
            color: i % 2 === 0 ? '#ff2bd6' : '#22ff88',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.15, 0],
            y: [0, -200, 200],
            x: [0, 100, -100],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            delay: i * 2,
          }}
        >
          DELIRA
        </motion.span>
      ))}
    </div>
  );
}

function Content() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-black leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-green-400">
            DeliraAteliê
          </span>
        </h1>

        <p className="mt-6 text-xl md:text-2xl max-w-2xl mx-auto text-white/90">
          Cursos criativos, experiências sensoriais e arte sem limites
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-10 py-5 text-lg font-bold rounded-full bg-gradient-to-r from-pink-500 to-green-400 shadow-[0_0_40px_rgba(255,0,150,0.8)]"
        >
          Entrar na experiência
        </motion.button>
      </motion.div>

      {/* COURSES */}
      <div className="grid md:grid-cols-3 gap-10 mt-24">
        {[
          {
            title: 'Pintura Intuitiva',
            desc: 'Liberte sua expressão criativa',
          },
          {
            title: 'Arte Sensorial',
            desc: 'Experimente com todos os sentidos',
          },
          {
            title: 'Laboratório Criativo',
            desc: 'Misture técnicas e crie algo único',
          },
        ].map((course, i) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.08, rotate: 1 }}
            className="p-8 rounded-[30px] backdrop-blur-xl border border-white/20 bg-white/10 shadow-[0_0_40px_rgba(0,0,0,0.2)]"
          >
            <div className="h-40 rounded-xl mb-6 bg-gradient-to-br from-pink-500 to-green-400" />
            <h3 className="text-2xl font-bold">{course.title}</h3>
            <p className="mt-2 text-white/80">{course.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* EXPERIENCE SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-32 text-center"
      >
        <h2 className="text-4xl font-bold">
          Uma experiência artística fora do comum
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-white/80">
          Aqui você não aprende só técnica. Você entra em um estado criativo diferente.
        </p>
      </motion.div>
    </div>
  );
}
