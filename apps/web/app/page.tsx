'use client';

import { motion, useMotionValue, useTransform, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

// ---- Componente de Partículas Flutuantes (glitter) ----
const FloatingParticles = () => {
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    type: Math.random() > 0.5 ? 'pink' : 'green',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${
            p.type === 'pink' ? 'bg-pink-400/30' : 'bg-green-400/30'
          } backdrop-blur-sm`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// ---- Componente de Círculo Orgânico Animado ----
const OrganicBlob = ({ className, color = 'pink' }: { className?: string; color?: 'pink' | 'green' }) => {
  const variants = {
    animate: {
      borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%'],
      rotate: [0, 360],
      scale: [1, 1.1, 1],
    },
  };

  return (
    <motion.div
      className={`absolute blur-3xl opacity-40 ${className}`}
      variants={variants}
      animate="animate"
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      style={{
        background: color === 'pink' 
          ? 'radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(244,114,182,0.1) 70%)' 
          : 'radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(134,239,172,0.1) 70%)',
        width: '300px',
        height: '300px',
      }}
    />
  );
};

// ---- Card de Curso com Efeito 3D ----
const CourseCard = ({ title, desc, index }: { title: string; desc: string; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const colors = [
    { from: 'from-pink-400', to: 'to-rose-300', shadow: 'shadow-pink-400/30' },
    { from: 'from-green-400', to: 'to-emerald-300', shadow: 'shadow-green-400/30' },
    { from: 'from-fuchsia-400', to: 'to-pink-300', shadow: 'shadow-fuchsia-400/30' },
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 800 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden cursor-pointer group relative"
    >
      <div className={`h-44 bg-gradient-to-br ${color.from} ${color.to} relative overflow-hidden`}>
        <motion.div
          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.8) 0%, transparent 60%)',
          }}
        />
        <div className="absolute bottom-3 left-4 text-white font-bold text-2xl drop-shadow-lg">
          {title.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600">{desc}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full font-semibold text-sm"
        >
          Ver detalhes →
        </motion.button>
      </div>
    </motion.div>
  );
};

// ---- Hero Section com Paralaxe e Texto Animado ----
const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const blobX = useTransform(mouseX, [0, 800], [-50, 50]);
  const blobY = useTransform(mouseY, [0, 600], [-50, 50]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative grid md:grid-cols-2 gap-10 items-center min-h-[80vh] overflow-hidden"
    >
      {/* Blobs orgânicos seguindo o mouse */}
      <motion.div style={{ x: blobX, y: blobY }} className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl" />
      <motion.div style={{ x: useTransform(mouseX, [0, 800], [50, -50]), y: useTransform(mouseY, [0, 600], [50, -50]) }} className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-400/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-600">
              Delira
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
              Ateliê
            </span>
            <span className="block text-3xl md:text-4xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-green-400">
              Cursos Criativos
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-lg text-gray-600 max-w-xl"
        >
          Aprenda arte de forma leve, prática e inspiradora. Workshops, cursos e experiências criativas para desbloquear sua expressão.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex gap-4 flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(236,72,153,0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg shadow-lg shadow-pink-500/30 transition-all"
          >
            Ver cursos ✨
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(34,197,94,0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full border-2 border-green-400 text-green-600 font-bold text-lg bg-white/50 backdrop-blur-sm hover:bg-green-50 transition-all"
          >
            Como funciona
          </motion.button>
        </motion.div>
      </div>

      {/* Imagem ilustrativa com efeito de flutuação */}
      <motion.div
        style={{ y: yImage }}
        className="relative hidden md:block"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative w-full h-[450px] rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden border border-white/60">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 via-white/20 to-green-400/30" />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute w-64 h-64 rounded-full border-2 border-dashed border-pink-300/50"
          />
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute w-48 h-48 rounded-full border-2 border-dashed border-green-300/50"
          />
          <span className="text-7xl relative z-10">🎨</span>
        </div>
      </motion.div>
    </section>
  );
};

// ---- Seção de Cursos ----
const CoursesSection = () => {
  const courses = [
    { title: 'Pintura para iniciantes', desc: 'Comece do zero e desenvolva sua criatividade com cores e formas.' },
    { title: 'Arte terapêutica', desc: 'Use a arte como forma de expressão emocional e autoconhecimento.' },
    { title: 'Técnicas avançadas', desc: 'Leve sua arte para o próximo nível com técnicas profissionais.' },
  ];

  return (
    <section className="mt-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-5xl font-extrabold text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
            Cursos em destaque
          </span>
        </h2>
        <p className="text-center text-gray-500 mt-3 max-w-xl mx-auto">
          Escolha seu caminho criativo e mergulhe em experiências únicas
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10 mt-12">
        {courses.map((course, i) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <CourseCard title={course.title} desc={course.desc} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ---- Seção Experiência Imersiva ----
const ExperienceSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="mt-32 relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 to-green-500 p-10 md:p-16 text-white text-center"
    >
      {/* Efeito de luz seguindo o mouse */}
      <motion.div
        className="absolute w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"
        animate={{ x: mousePosition.x - 128, y: mousePosition.y - 128 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />

      {/* Orbes decorativos */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 0.8, 1], rotate: [360, 180, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-10 right-10 w-40 h-40 border border-white/20 rounded-full"
      />

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold"
        >
          Uma experiência criativa de verdade
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 max-w-2xl mx-auto text-white/90 text-lg"
        >
          Aqui você não só aprende — você experimenta, cria e se conecta com sua expressão artística mais profunda.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(255,255,255,0.7)' }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-10 py-5 bg-white text-pink-600 rounded-full font-bold text-xl shadow-2xl transition-all"
        >
          Começar agora 🚀
        </motion.button>
      </div>
    </section>
  );
};

// ---- Rodapé Simples mas Animado ----
const Footer = () => (
  <footer className="mt-32 pb-10 text-center relative">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-gray-400"
    >
      <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-green-400 inline-block">
        DeliraAteliê
      </p>
      <p className="mt-2">© 2025 Todos os direitos reservados. Feito com 💖 e muita arte.</p>
    </motion.div>
  </footer>
);

// ---- Página Principal ----
export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 text-gray-800 overflow-x-hidden">
      {/* Partículas de fundo */}
      <FloatingParticles />

      {/* Blobs orgânicos fixos no fundo */}
      <OrganicBlob className="top-20 -left-32" color="pink" />
      <OrganicBlob className="bottom-20 -right-32" color="green" />
      <OrganicBlob className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="pink" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <HeroSection />
        <CoursesSection />
        <ExperienceSection />
        <Footer />
      </div>
    </main>
  );
}