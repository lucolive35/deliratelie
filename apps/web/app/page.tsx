import { useState, useEffect, useRef } from "react";

const ROSA = "#FF3D8B";
const VERDE = "#00C875";
const ROSA2 = "#FF80B5";
const VERDE2 = "#4DEBB0";

const COLORS = [
  "#FF3D8B", "#00C875", "#FF80B5", "#4DEBB0", "#FF1A6E",
  "#00A85E", "#FFB3D0", "#00E890", "#FF6BAB", "#33D98A",
  "#FF0066", "#00FF99", "#FF4D97", "#1ADB7A", "#FFD6E7",
];

const courses = [
  {
    id: 1,
    emoji: "🧵",
    title: "Crochê Mágico",
    desc: "Do básico ao avançado com fios coloridos e técnicas psicodélicas. Crie mandalas, bolsas e muito mais!",
    color: ROSA,
    bg: "#FFF0F6",
    price: "R$ 280",
    duration: "8 semanas",
    tag: "Mais Popular",
  },
  {
    id: 2,
    emoji: "🎨",
    title: "Arte Intuitiva",
    desc: "Pintura acrílica, aquarela e técnicas mistas. Libere sua criatividade sem julgamentos!",
    color: VERDE,
    bg: "#F0FFF8",
    price: "R$ 320",
    duration: "6 semanas",
    tag: "Novo",
  },
  {
    id: 3,
    emoji: "🌸",
    title: "Bordado Contemporâneo",
    desc: "Bordado em tela livre com inspirações botânicas, abstratas e geométricas coloridas.",
    color: ROSA2,
    bg: "#FFF5F9",
    price: "R$ 240",
    duration: "5 semanas",
    tag: "Iniciantes",
  },
  {
    id: 4,
    emoji: "✨",
    title: "Macramê & Fibras",
    desc: "Tapeçarias, porta-vasos e adereços com nós artísticos. Arte que decora e encanta!",
    color: VERDE2,
    bg: "#F0FFFB",
    price: "R$ 200",
    duration: "4 semanas",
    tag: "Relax",
  },
];

const testimonials = [
  { name: "Ju Almeida", text: "Minha vida mudou! O ateliê é um portal de magia e cor 🌈", avatar: "🌻", color: ROSA },
  { name: "Renata M.", text: "Aprendi crochê do zero e hoje vendo minhas peças. Incrível! 🧶", avatar: "🦋", color: VERDE },
  { name: "Carol T.", text: "A energia do espaço é diferente. Me sinto em casa criando aqui 💫", avatar: "🌺", color: ROSA2 },
  { name: "Bea Santos", text: "As aulas de arte intuitiva abriram minha mente. Recomendo demais!", avatar: "🌙", color: VERDE2 },
];

function FloatingBlob({ color, size, top, left, delay, duration }: { color: string; size: string; top: string; left: string; delay: number; duration: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top, left,
        width: size, height: size,
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        background: color,
        opacity: 0.18,
        animation: `morphBlob ${duration}s ease-in-out ${delay}s infinite alternate`,
        pointerEvents: "none",
        filter: "blur(2px)",
      }}
    />
  );
}

function CursorTrail() {
  const [dots, setDots] = useState<{id: number, x: number, y: number, color: string}[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      counter.current += 1;
      const id = counter.current;
      const color = COLORS[id % COLORS.length];
      setDots(prev => [...prev.slice(-22), { id, x: e.clientX, y: e.clientY, color }]);
      setTimeout(() => setDots(prev => prev.filter(d => d.id !== id)), 700);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {dots.map((d, i) => (
        <div
          key={d.id}
          style={{
            position: "fixed",
            left: d.x - 6,
            top: d.y - 6,
            width: 12 + (i % 4) * 2,
            height: 12 + (i % 4) * 2,
            borderRadius: "50%",
            background: d.color,
            opacity: 0,
            animation: "trailFade 0.7s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}

function AnimatedText({ text, color }: { text: string; color: string }) {
  return (
    <span>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            animation: `waveLetter 2s ease-in-out ${i * 0.06}s infinite`,
            color: ch === " " ? "transparent" : undefined,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function CourseCard({ course, idx }: { course: typeof courses[0]; idx: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: course.bg,
        border: `2.5px solid ${course.color}`,
        borderRadius: 28,
        padding: "2rem 1.8rem",
        cursor: "pointer",
        transform: hovered ? "translateY(-12px) rotate(1deg) scale(1.03)" : "translateY(0) rotate(0deg) scale(1)",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: hovered ? `0 20px 60px ${course.color}55` : `0 4px 20px ${course.color}22`,
        position: "relative",
        overflow: "hidden",
        animation: `cardFloat ${3 + idx * 0.4}s ease-in-out ${idx * 0.2}s infinite alternate`,
      }}
    >
      <div
        style={{
          position: "absolute", top: -20, right: -20,
          width: 80, height: 80,
          borderRadius: "50%",
          background: course.color,
          opacity: 0.12,
        }}
      />
      <div
        style={{
          display: "inline-block",
          background: course.color,
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
          padding: "4px 12px",
          borderRadius: 20,
          marginBottom: 14,
          letterSpacing: 0.8,
          textTransform: "uppercase",
        }}
      >
        {course.tag}
      </div>
      <div style={{ fontSize: 42, marginBottom: 8 }}>{course.emoji}</div>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: course.color, margin: "0 0 10px", fontFamily: "'Pacifico', cursive" }}>
        {course.title}
      </h3>
      <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.65, margin: "0 0 20px" }}>{course.desc}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900, color: course.color }}>{course.price}</div>
          <div style={{ fontSize: 12, color: "#888" }}>⏱ {course.duration}</div>
        </div>
        <button
          style={{
            background: hovered ? course.color : "transparent",
            border: `2px solid ${course.color}`,
            color: hovered ? "#fff" : course.color,
            padding: "10px 20px",
            borderRadius: 50,
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
          }}
        >
          Quero participar →
        </button>
      </div>
    </div>
  );
}

function Testimonial({ t, idx }: { t: typeof testimonials[0]; idx: number }) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        border: `2px solid ${t.color}`,
        borderRadius: 22,
        padding: "1.6rem",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease ${idx * 0.15}s`,
        boxShadow: `0 8px 32px ${t.color}22`,
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 10 }}>{t.avatar}</div>
      <p style={{ fontSize: 14.5, color: "#444", fontStyle: "italic", lineHeight: 1.7, margin: "0 0 14px" }}>
        "{t.text}"
      </p>
      <div style={{ fontWeight: 700, color: t.color, fontSize: 14 }}>— {t.name}</div>
    </div>
  );
}

function ColorPicker() {
  const [picked, setPicked] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const messages: {[key: string]: string} = {
    "#FF3D8B": "Rosa forte = paixão e criatividade pura! 💕",
    "#FF80B5": "Rosa suave = delicadeza e amor em tudo 🌸",
    "#FFD6E7": "Rosa claro = doçura e leveza no coração 🩷",
    "#00C875": "Verde vibrante = crescimento e renovação 🌿",
    "#4DEBB0": "Verde água = harmonia e fluxo criativo 🌊",
    "#00FF99": "Verde neon = energia e originalidade 🌱",
    "#FF1A6E": "Vermelho rosa = intensidade e ousadia 🔥",
    "#1ADB7A": "Verde esmeralda = frescor e inspiração ✨",
  };
  const cols = Object.keys(messages);
  return (
    <div
      style={{
        background: `linear-gradient(135deg, #FFF0F6 0%, #F0FFF8 50%, #FFF5FA 100%)`,
        borderRadius: 28,
        padding: "2.5rem",
        textAlign: "center",
        border: `2px dashed ${ROSA2}`,
      }}
    >
      <h3 style={{ fontFamily: "'Pacifico', cursive", fontSize: 28, color: ROSA, marginBottom: 8 }}>
        🎨 Qual sua cor da alma?
      </h3>
      <p style={{ color: "#666", marginBottom: 24 }}>Clique na cor que mais te representa hoje</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 24 }}>
        {cols.map(c => (
          <button
            key={c}
            onClick={() => { setPicked(c); setMessage(messages[c]); }}
            style={{
              width: 54, height: 54,
              borderRadius: "50%",
              background: c,
              border: picked === c ? "4px solid #333" : "3px solid #fff",
              cursor: "pointer",
              transform: picked === c ? "scale(1.3)" : "scale(1)",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: `0 4px 16px ${c}66`,
            }}
          />
        ))}
      </div>
      {message && (
        <div
          style={{
            background: picked!,
            color: "#fff",
            borderRadius: 16,
            padding: "14px 24px",
            fontSize: 16,
            fontWeight: 600,
            animation: "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

function SparkleButton({ children, onClick, color }: { children: React.ReactNode; onClick?: () => void; color: string }) {
  const [sparks, setSparks] = useState<{id: number, angle: number, color: string}[]>([]);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newSparks = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 12) * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 600);
    onClick?.();
  };
  return (
    <button
      onClick={handleClick}
      style={{
        position: "relative",
        background: `linear-gradient(135deg, ${color}, ${color}BB)`,
        color: "#fff",
        border: "none",
        padding: "16px 40px",
        borderRadius: 50,
        fontFamily: "'Pacifico', cursive",
        fontSize: 18,
        cursor: "pointer",
        overflow: "visible",
        boxShadow: `0 8px 32px ${color}55`,
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      {children}
      {sparks.map(s => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 8, height: 8,
            borderRadius: "50%",
            background: s.color,
            animation: `spark 0.6s ease-out forwards`,
            "--angle": `${s.angle}deg`,
            pointerEvents: "none",
          } as React.CSSProperties & { '--angle': string }}
        />
      ))}
    </button>
  );
}

export default function Atelie() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#FFFBFE", color: "#222", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes morphBlob {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0,0); }
          100% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate(20px, -20px); }
        }
        @keyframes waveLetter {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes cardFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }
        @keyframes trailFade {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.2); }
        }
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spark {
          0% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(60px) scale(0); opacity: 0; }
        }
        @keyframes rotate360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #FFF5FB; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #FF6B9D, #A29BFE); border-radius: 10px; }
      `}</style>

      <CursorTrail />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1.5px solid #FFE0EF" : "none",
        transition: "all 0.4s ease",
        padding: "1rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div
          style={{ fontFamily: "'Pacifico', cursive", fontSize: 24, cursor: "pointer",
            background: "linear-gradient(90deg, #FF3D8B, #FF80B5, #00C875, #4DEBB0)",
            backgroundSize: "200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s linear infinite",
          }}
          onClick={() => scrollTo("home")}
        >
          ✦ Ateliê Arco-Íris
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["home","cursos","sobre","depoimentos","contato"].map(s => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              style={{
                background: activeSection === s ? ROSA : "transparent",
                color: activeSection === s ? "#fff" : "#555",
                border: activeSection === s ? "none" : "1.5px solid #DDD",
                padding: "8px 16px",
                borderRadius: 50,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.3s",
                textTransform: "capitalize",
              }}
            >
              {s === "home" ? "Início" : s === "cursos" ? "Cursos" : s === "sobre" ? "Sobre" : s === "depoimentos" ? "Depoimentos" : "Contato"}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: 80 }}>
        <FloatingBlob color={ROSA} size="320px" top="5%" left="5%" delay={0} duration={7} />
        <FloatingBlob color={VERDE} size="280px" top="60%" left="70%" delay={1} duration={8} />
        <FloatingBlob color={ROSA2} size="240px" top="10%" left="65%" delay={0.5} duration={6} />
        <FloatingBlob color={VERDE2} size="200px" top="70%" left="5%" delay={1.5} duration={9} />
        <FloatingBlob color={ROSA} size="180px" top="40%" left="45%" delay={0.8} duration={7.5} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 2rem", maxWidth: 900 }}>
          <div style={{
            fontSize: 80,
            animation: "heroFloat 4s ease-in-out infinite",
            marginBottom: 16,
            lineHeight: 1,
          }}>
            🌈
          </div>
          <h1 style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            <AnimatedText text="Delira" color={ROSA} />
            {" "}
            <span style={{ color: VERDE }}>Ateliê</span>
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            color: "#555",
            lineHeight: 1.7,
            maxWidth: 620,
            margin: "0 auto 40px",
          }}>
            Um espaço onde a <strong style={{ color: ROSA }}>arte</strong> encontra o <strong style={{ color: VERDE }}>crochê</strong> e a magia acontece. Cursos para todos os níveis com muita cor, criatividade e amor. ✨
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <SparkleButton color="#FF6B9D" onClick={() => scrollTo("cursos")}>
              🎨 Ver Cursos
            </SparkleButton>
            <button
              onClick={() => scrollTo("sobre")}
              style={{
                background: "transparent",
                border: `2.5px solid ${VERDE}`,
                color: VERDE,
                padding: "16px 36px",
                borderRadius: 50,
                fontSize: 16,
                fontFamily: "'Pacifico', cursive",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e: React.MouseEvent) => { (e.target as HTMLElement).style.background = VERDE; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={(e: React.MouseEvent) => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = VERDE; }}
            >
              🌸 Nossa História
            </button>
          </div>

          {/* stats pills */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 56, flexWrap: "wrap" }}>
            {[["500+","Alunas"], ["4","Cursos"], ["5 ⭐","Avaliação"], ["3 anos","De arte"]].map(([n,l]) => (
              <div key={l} style={{
                background: "#fff",
                border: "2px solid #D0FFE8",
                borderRadius: 60,
                padding: "12px 24px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,200,117,0.15)",
              }}>
                <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 20, color: VERDE }}>{n}</div>
                <div style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAVE DIVIDER */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
          <path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 V60 H0Z" fill="#F5FFF9" />
        </svg>
      </div>

      {/* SOBRE */}
      <section id="sobre" style={{ background: "#F5FFF9", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{
              width: 320, height: 320,
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              background: `linear-gradient(135deg, ${ROSA}, ${ROSA2}, ${VERDE}, ${VERDE2})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 100,
              animation: "morphBlob 8s ease-in-out infinite alternate",
              boxShadow: `0 20px 60px ${ROSA}55`,
            }}>
              🧶
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: 42, color: ROSA, marginBottom: 16 }}>
              Nossa Historia ✨
            </h2>
            <p style={{ fontSize: 16.5, color: "#555", lineHeight: 1.85, marginBottom: 16 }}>
              O Delira Ateliê nasceu em 2022 do sonho de criar um espaço onde a arte seja acessível, colorida e transformadora. Acreditamos que <strong style={{ color: VERDE }}>cada pessoa carrega uma artista dentro de si</strong>.
            </p>
            <p style={{ fontSize: 16.5, color: "#555", lineHeight: 1.85, marginBottom: 28 }}>
              Nossas aulas mesclam técnicas tradicionais com uma energia psicodélica e alegre. Aqui não existe "errado" — existe <strong style={{ color: ROSA }}>expressão, cor e vida</strong>! 🌈
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["🎨 Arte sem limites", "🧵 Crochê terapêutico", "🌸 Comunidade amorosa", "✨ Espaço seguro"].map((tag, i) => (
                <span key={tag} style={{
                  background: "#fff",
                  border: `2px solid ${i % 2 === 0 ? ROSA : VERDE}`,
                  color: i % 2 === 0 ? ROSA : VERDE,
                  borderRadius: 50,
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CURSOS */}
      <section id="cursos" style={{ padding: "6rem 2rem", background: "#FFFBFE" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: 48, color: VERDE, marginBottom: 12 }}>
              Nossos Cursos 🎨
            </h2>
            <p style={{ fontSize: 17, color: "#666", maxWidth: 500, margin: "0 auto" }}>
              Cada curso é uma viagem sensorial de cores, texturas e criatividade pura
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {courses.map((c, i) => <CourseCard key={c.id} course={c} idx={i} />)}
          </div>
        </div>
      </section>

      {/* COLOR PICKER INTERATIVO */}
      <section style={{ padding: "4rem 2rem", background: "#FFF0F6" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <ColorPicker />
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" style={{ padding: "6rem 2rem", background: "#FFFBFE" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: 42, color: ROSA, textAlign: "center", marginBottom: 48 }}>
            Quem já passou por aqui... 💫
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {testimonials.map((t, i) => <Testimonial key={t.name} t={t} idx={i} />)}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contato" style={{
        padding: "6rem 2rem",
        background: `linear-gradient(135deg, ${ROSA}22, ${ROSA2}22, ${VERDE}22, ${VERDE2}22)`,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <FloatingBlob color={VERDE} size="200px" top="10%" left="80%" delay={0} duration={6} />
        <FloatingBlob color={ROSA} size="160px" top="60%" left="5%" delay={1} duration={7} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 64, marginBottom: 16, animation: "pulse 2s ease-in-out infinite" }}>🌈</div>
          <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: 48, color: ROSA, marginBottom: 16 }}>
            Pronta para criar?
          </h2>
          <p style={{ fontSize: 18, color: "#555", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Entre nessa jornada colorida com a gente! As turmas são pequenas e acolhedoras. 🧡
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <SparkleButton color={ROSA}>
              📲 WhatsApp
            </SparkleButton>
            <SparkleButton color={VERDE}>
              📸 Instagram
            </SparkleButton>
          </div>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            padding: "2rem",
            maxWidth: 440,
            margin: "0 auto",
            border: `2px dashed ${VERDE}`,
          }}>
            <h3 style={{ fontFamily: "'Pacifico', cursive", fontSize: 22, color: ROSA, marginBottom: 16 }}>
              Receba a newsletter ✉️
            </h3>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                type="email"
                placeholder="seu@email.com"
                style={{
                  flex: 1, padding: "12px 18px", borderRadius: 50,
                  border: "2px solid #D0FFE8",
                  fontFamily: "inherit", fontSize: 14, outline: "none",
                  transition: "border 0.3s",
                }}
                onFocus={e => e.target.style.border = `2px solid ${VERDE}`}
                onBlur={e => e.target.style.border = "2px solid #D0FFE8"}
              />
              <button style={{
                background: `linear-gradient(135deg, ${ROSA}, ${VERDE})`,
                color: "#fff", border: "none",
                padding: "12px 22px", borderRadius: 50,
                fontFamily: "inherit", fontWeight: 700,
                cursor: "pointer", fontSize: 14,
                transition: "transform 0.2s",
              }}
                onMouseEnter={(e: React.MouseEvent) => (e.target as HTMLElement).style.transform = "scale(1.05)"}
                onMouseLeave={(e: React.MouseEvent) => (e.target as HTMLElement).style.transform = "scale(1)"}
              >
                ✨ Inscrever
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "#2D1B3D",
        color: "#fff",
        textAlign: "center",
        padding: "2.5rem",
      }}>
        <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 26,
          background: `linear-gradient(90deg, ${ROSA}, ${ROSA2}, ${VERDE}, ${VERDE2})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: 12,
        }}>
          ✦ Delira Ateliê
        </div>
        <p style={{ color: "#AAA", fontSize: 14, marginBottom: 16 }}>
          Feito com 🧶 amor e muita cor • São Paulo, SP
        </p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          {["🌈 Arte", "🧵 Crochê", "🌸 Bordado", "✨ Macramê"].map(t => (
            <span key={t} style={{ color: "#777", fontSize: 13 }}>{t}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}