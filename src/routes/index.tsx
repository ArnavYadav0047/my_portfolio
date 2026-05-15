import profileImg from "@/assets/profile.jpeg";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Trophy,
  Wrench,
  GraduationCap,
  Briefcase,
  FolderGit2,
  User,
  Send,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arnav Yadav — Portfolio" },
      {
        name: "description",
        content:
          "Arnav Yadav — CS & Design student at RGIPT. Multimodal ML, decentralized systems, and playful product engineering.",
      },
      { property: "og:title", content: "Arnav Yadav — Portfolio" },
      {
        property: "og:description",
        content: "ML, multimodal architectures, and product engineering.",
      },
    ],
  }),
  component: Index,
});

/* ---------- DATA ---------- */

const NAV = [
  { id: "about", label: "ABOUT" },
  { id: "education", label: "EDUCATION" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "achievements", label: "WINS" },
  { id: "contact", label: "CONTACT" },
];

const PROJECTS = [
  {
    title: "Smart Product Pricing",
    badge: "ML / MULTIMODAL",
    color: "bg-pop-yellow",
    period: "Oct 2025 — Present",
    stack: ["Python", "PyTorch", "LightGBM", "ViT", "RoBERTa"],
    bullets: [
      "Built two ML pipelines — a LightGBM regression baseline and a multimodal gated-fusion model.",
      "Fused frozen RoBERTa, ViT, and tabular embeddings via a residual MLP with adaptive gating.",
      "Hit cross-validation SMAPE 41.5% on the multimodal model; 43% on the LightGBM baseline.",
    ],
  },
  {
    title: "Sarvadrishti",
    badge: "DECENTRALIZED",
    color: "bg-pop-mint",
    period: "Oct 2024 — Dec 2024",
    stack: ["Python", "Streamlit", "IPFS", "Pinata"],
    bullets: [
      "Decentralized facial recognition with distributed IPFS storage — no single point of failure.",
      "Tuned algorithms for low-resource hardware: 90–93% accuracy on real-world test sets.",
      "Locally hosted with sub-200ms latency and 99.9% uptime in low-connectivity environments.",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Information Technology Intern",
    org: "REC Limited (Govt. of India Enterprise)",
    location: "Gurugram, Haryana",
    period: "Dec 2024 — Jan 2025",
    bullets: [
      "Built Power BI dashboards that surfaced the three biggest causes of project delays.",
      "Shipped a Power Apps automation that cut application processing time by 72 hours.",
    ],
  },
];

const EDUCATION = [
  {
    school: "Rajiv Gandhi Institute of Petroleum Technology",
    degree: "B.Tech, Computer Science and Design",
    location: "Amethi, Uttar Pradesh",
    period: "Aug 2023 — Present",
    color: "bg-pop-sky",
  },
  {
    school: "Modern Vidya Niketan, Aravali Hills",
    degree: "Higher Secondary",
    location: "Faridabad, Haryana",
    period: "Apr 2020 — Mar 2022",
    color: "bg-pop-cream",
  },
];

const ACHIEVEMENTS = [
  {
    title: "Winner — HMEL Quest 2025",
    period: "Oct 2025",
    color: "bg-pop-coral",
    detail:
      "Top team among 1,000+ participants. Designed an AI wind-analysis framework using CFD, GNNs, PINNs and BiLSTM across 800,000+ m² refinery zones — projected +30% energy output, −25% maintenance.",
  },
  {
    title: "Smart India Hackathon 2024 — Grand Finalist",
    period: "Dec 2024",
    color: "bg-pop-lilac",
    detail:
      "Real-time facial-recognition attendance system for police use, 95%+ accuracy with Python, OpenCV and Streamlit. Deployed across heterogeneous environments with a 5-dev team.",
  },
];

const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "C", "C++", "JavaScript", "SQL", "Dart", "Matlab", "HTML", "CSS"],
    color: "bg-pop-yellow",
  },
  {
    group: "Frameworks",
    items: ["React", "Node.js", "Flask", "Streamlit", "Flutter"],
    color: "bg-pop-mint",
  },
  {
    group: "ML & Data",
    items: ["PyTorch", "Scikit-learn", "LightGBM", "OpenCV", "pandas", "NumPy", "Matplotlib"],
    color: "bg-pop-sky",
  },
  {
    group: "Tools",
    items: ["Git", "Figma", "Power BI", "Tableau", "IPFS", "Pinata"],
    color: "bg-pop-cream",
  },
];

/* ---------- BITS ---------- */

function Marquee() {
  const items = [
    "OPEN_TO_INTERNSHIPS",
    "ML × DESIGN",
    "RGIPT '27",
    "BUILDING_IN_PUBLIC",
    "MULTIMODAL_SYSTEMS",
    "HMEL_QUEST_WINNER",
    "SIH_2024_FINALIST",
  ];
  const loop = [...items, ...items];
  return (
    <div className="border-y-[3px] border-foreground bg-foreground py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap font-mono text-sm font-bold text-pop-yellow">
        {loop.map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-3">
            <span>★</span>
            <span>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Tag({
  children,
  color = "bg-card",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`chunky-thin inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs font-bold uppercase ${color} ${className}`}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  icon: Icon,
  kicker,
  title,
  color = "bg-pop-yellow",
}: {
  icon: React.ComponentType<{ className?: string }>;
  kicker: string;
  title: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-10 flex flex-wrap items-end justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className={`chunky flex h-14 w-14 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-6 w-6 text-foreground" />
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
            {`// ${kicker}`}
          </p>
          <h2 className="font-display text-4xl uppercase leading-none text-foreground md:text-6xl">
            {title}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- NAV ---------- */

function Nav() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);
  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="sticky top-3 z-50 px-3 md:top-5 md:px-5">
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="chunky-lg mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl bg-pop-lilac px-4 py-3 md:px-6"
      >
        <a href="#top" className="font-display text-xl uppercase italic md:text-2xl">
          Arnav.
        </a>
        <nav className="hidden flex-wrap items-center gap-2 lg:flex">
          {NAV.slice(0, -1).map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="chunky-thin rounded-full bg-card px-4 py-1.5 font-mono text-xs font-bold uppercase transition-transform hover:-translate-y-0.5"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            className="chunky-thin rounded-full bg-pop-coral px-4 py-1.5 font-mono text-xs font-bold uppercase transition-transform hover:-translate-y-0.5"
          >
            CONTACT
          </a>
        </nav>
        <div className="chunky-thin hidden items-center gap-2 rounded-full bg-pop-yellow px-3 py-1.5 font-mono text-xs font-bold md:flex">
          <span>📅</span>
          <span>{date}</span>
        </div>
      </motion.header>
    </div>
  );
}

/* ---------- HERO with morphing scroll photo ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springCfg = { stiffness: 80, damping: 20, mass: 0.6 };
  const photoScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.55]), springCfg);
  const photoRotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, -12]), springCfg);
  const photoRadius = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["50% 50% 50% 50%", "30% 70% 70% 30% / 30% 30% 70% 70%", "20% 80% 30% 70% / 60% 30% 70% 40%"],
  );
  const photoY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), springCfg);
  const blobRotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 90]), springCfg);

  return (
    <section id="top" ref={ref} className="px-3 pt-6 md:px-5">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-12">
        {/* Left card with photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="chunky-lg relative overflow-hidden rounded-3xl bg-card p-6 md:p-8 lg:col-span-5"
        >
          {/* morphing photo */}
          <div className="relative mx-auto mb-6 flex h-64 w-64 items-center justify-center md:h-72 md:w-72">
            <motion.div
              style={{ rotate: blobRotate }}
              className="absolute inset-0 -z-10"
              aria-hidden
            >
              <div className="absolute inset-0 rounded-full bg-pop-yellow blur-2xl opacity-70" />
            </motion.div>
            <motion.div
              style={{
                scale: photoScale,
                rotate: photoRotate,
                borderRadius: photoRadius,
                y: photoY,
              }}
              className="chunky-lg h-full w-full overflow-hidden bg-pop-coral"
            >
              {/* PHOTO PLACEHOLDER — drop image into src/assets/profile.jpg and import here */}
              <img
                src={profileImg}
                alt="Arnav Yadav"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -right-3 -top-3"
            >
              <span className="chunky-thin block rounded-full bg-pop-mint px-3 py-1 font-mono text-[10px] font-bold uppercase">
                ✦ HELLO WORLD ✦
              </span>
            </motion.span>
          </div>

          <h2 className="font-display text-4xl uppercase italic leading-none">Arnav Yadav</h2>
          <div className="my-3 inline-block rounded-md bg-foreground px-2 py-1 font-mono text-xs font-bold text-pop-yellow">
            FULL_STACK_DEVELOPER()
            ML_Ops()
          </div>

          <div className="mt-6 space-y-3 border-t-2 border-dashed border-foreground/30 pt-5 font-mono text-sm">
            <div className="flex items-center gap-3">
              <Tag color="bg-pop-yellow">[LOCATION]</Tag>
              <span>Amethi / Gurugram, IN</span>
            </div>
            <div className="flex items-center gap-3">
              <Tag color="bg-pop-mint">[STATUS]</Tag>
              <span>3rd Year B.Tech</span>
            </div>
            <div className="flex items-center gap-3">
              <Tag color="bg-pop-sky">[MISSION]</Tag>
              <span>Build. Learn. Ship.</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="#contact"
              className="chunky inline-flex items-center justify-center gap-2 rounded-xl bg-pop-mint px-4 py-3 font-mono text-sm font-bold uppercase transition-transform hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4" /> CONTACT_ME
            </a>
            <a
              href="mailto:arnavyadav0047@gmail.com"
              className="chunky inline-flex items-center justify-center gap-2 rounded-xl bg-pop-coral px-4 py-3 font-mono text-sm font-bold uppercase transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" /> SAY_HI
            </a>
          </div>
        </motion.div>

        {/* Right hello card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="chunky-lg relative overflow-hidden rounded-3xl bg-pop-yellow p-6 md:p-10 lg:col-span-7"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6"
          >
            <h1 className="font-display text-5xl uppercase italic leading-[0.95] md:text-7xl lg:text-8xl">
              Hi people! <span className="inline-block animate-float">👋</span>
            </h1>
          </motion.div>

          <p className="max-w-2xl font-mono text-base leading-relaxed text-foreground/80 md:text-lg">
            I&apos;m a{" "}
            <span className="chunky-thin rounded bg-card px-1.5 py-0.5 font-bold">
              3rd-year student at RGIPT
            </span>
            , pursuing a B.Tech in{" "}
            <span className="chunky-thin rounded bg-card px-1.5 py-0.5 font-bold">
              Computer Science &amp; Design
            </span>
            . I build multimodal ML systems, decentralized infra, and the small details
            that make products feel alive.
          </p>

          <p className="mt-5 max-w-2xl font-mono text-base leading-relaxed text-foreground/80 md:text-lg">
            Recently won{" "}
            <span className="chunky-thin rounded bg-pop-coral px-1.5 py-0.5 font-bold">
              HMEL Quest 2025
            </span>{" "}
            against 1,000+ teams, and was a Grand Finalist at{" "}
            <span className="chunky-thin rounded bg-pop-mint px-1.5 py-0.5 font-bold">
              SIH 2024
            </span>
            . Always cooking something new.
          </p>

          <a
            href="#projects"
            className="chunky mt-8 inline-flex items-center gap-2 rounded-xl bg-card px-5 py-3 font-mono text-sm font-bold uppercase transition-transform hover:-translate-y-0.5"
          >
            🚀 See What I&apos;ve Built <ArrowUpRight className="h-4 w-4" />
          </a>

          {/* Terminal */}
          <div className="chunky mt-8 overflow-hidden rounded-xl bg-card">
            <div className="flex items-center gap-2 border-b-2 border-foreground bg-pop-cream px-4 py-2">
              <span className="h-3 w-3 rounded-full border-2 border-foreground bg-pop-coral" />
              <span className="h-3 w-3 rounded-full border-2 border-foreground bg-pop-yellow" />
              <span className="h-3 w-3 rounded-full border-2 border-foreground bg-pop-mint" />
              <span className="ml-3 font-mono text-xs font-bold">root@arnav:~</span>
            </div>
            <Terminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Terminal() {
  const lines = [
    "$ whoami",
    "→ arnav_yadav",
    "$ cat skills.json | jq .focus",
    '→ ["multimodal_ML", "product_engineering", "design"]',
    "$ status",
    "→ open_to_internships ✓",
  ];
  const [shown, setShown] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setShown((s) => [...s, lines[i]]);
      i++;
      if (i >= lines.length) clearInterval(id);
    }, 700);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-foreground p-4 font-mono text-xs leading-6 text-pop-mint md:text-sm">
      {shown.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className={(l?.startsWith?.("$") ?? false) ? "text-pop-yellow" : "text-pop-mint"}
        >
          {l}
        </motion.div>
      ))}
      <span className="inline-block h-4 w-2 animate-pulse bg-pop-mint align-middle" />
    </div>
  );
}

/* ---------- Generic motion section wrapper ---------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Sections ---------- */

function About() {
  return (
    <section id="about" className="px-3 py-16 md:px-5 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader icon={User} kicker="who_am_i.md" title="ABOUT" color="bg-pop-mint" />
        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="chunky-lg rounded-3xl bg-card p-6 md:p-10">
              <p className="font-mono text-base leading-relaxed text-foreground md:text-lg">
                I study{" "}
                <Tag color="bg-pop-yellow">Computer Science &amp; Design</Tag> at RGIPT,
                where I split time between shipping ML pipelines and obsessing over the
                interfaces around them. Recent work spans{" "}
                <Tag color="bg-pop-coral">multimodal pricing models</Tag>,{" "}
                <Tag color="bg-pop-mint">decentralized facial recognition</Tag>, and an{" "}
                <Tag color="bg-pop-sky">AI wind-analysis framework</Tag> that won HMEL
                Quest 2025 against 1,000+ teams.
              </p>
              <p className="mt-5 font-mono text-base leading-relaxed text-foreground md:text-lg">
                I care about clarity — in code, in copy, and in the systems I build.
                Always learning, always shipping, always down to talk about a weird
                idea.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="chunky-lg space-y-4 rounded-3xl bg-pop-cream p-6 font-mono text-sm md:p-8">
              <Stat label="Years coding" value="5+" color="bg-pop-yellow" />
              <Stat label="Projects shipped" value="12+" color="bg-pop-mint" />
              <Stat label="Hackathon wins" value="2" color="bg-pop-coral" />
              <Stat label="Coffee / day" value="∞" color="bg-pop-sky" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-bold uppercase tracking-wider">{label}</span>
      <span className={`chunky-thin rounded-lg px-3 py-1 font-display text-xl ${color}`}>
        {value}
      </span>
    </div>
  );
}

function Education() {
  return (
    <section id="education" className="px-3 py-16 md:px-5 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          icon={GraduationCap}
          kicker="education.log"
          title="EDUCATION"
          color="bg-pop-sky"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.08}>
              <div className={`chunky-lg h-full rounded-3xl p-6 md:p-8 ${e.color}`}>
                <Tag color="bg-card">{e.period}</Tag>
                <h3 className="mt-4 font-display text-2xl uppercase leading-tight md:text-3xl">
                  {e.school}
                </h3>
                <p className="mt-3 font-mono text-sm font-bold">{e.degree}</p>
                <p className="mt-1 flex items-center gap-2 font-mono text-xs">
                  <MapPin className="h-3 w-3" /> {e.location}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Experience inline */}
        <div className="mt-12">
          <SectionHeader
            icon={Briefcase}
            kicker="experience.sh"
            title="EXPERIENCE"
            color="bg-pop-coral"
          />
          {EXPERIENCE.map((x, i) => (
            <Reveal key={x.role} delay={i * 0.08}>
              <div className="chunky-lg rounded-3xl bg-card p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl uppercase md:text-3xl">{x.role}</h3>
                    <p className="mt-1 font-mono text-sm font-bold">{x.org}</p>
                    <p className="mt-1 flex items-center gap-2 font-mono text-xs text-foreground/70">
                      <MapPin className="h-3 w-3" />
                      {x.location}
                    </p>
                  </div>
                  <Tag color="bg-pop-yellow">{x.period}</Tag>
                </div>
                <ul className="mt-5 space-y-3">
                  {x.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 font-mono text-sm leading-relaxed text-foreground/85"
                    >
                      <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-sm bg-foreground" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="px-3 py-16 md:px-5 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          icon={Wrench}
          kicker="toolkit.yaml"
          title="SKILLS"
          color="bg-pop-yellow"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {SKILLS.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.06}>
              <div className={`chunky-lg h-full rounded-3xl p-6 md:p-8 ${s.color}`}>
                <h3 className="font-display text-2xl uppercase">{s.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <motion.li
                      key={it}
                      whileHover={{ y: -3, rotate: -1 }}
                      className="chunky-thin rounded-lg bg-card px-3 py-1.5 font-mono text-xs font-bold uppercase"
                    >
                      {it}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="px-3 py-16 md:px-5 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          icon={FolderGit2}
          kicker="projects/"
          title="PROJECTS"
          color="bg-pop-coral"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, rotate: i % 2 ? 0.5 : -0.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className={`chunky-lg h-full rounded-3xl ${p.color} p-6 md:p-8`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Tag color="bg-card">{p.badge}</Tag>
                  <span className="font-mono text-xs font-bold">{p.period}</span>
                </div>
                <h3 className="mt-4 font-display text-3xl uppercase leading-tight md:text-4xl">
                  {p.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 font-mono text-sm leading-relaxed text-foreground/85"
                    >
                      <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-sm bg-foreground" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Tag key={s} color="bg-card">
                      {s}
                    </Tag>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="px-3 py-16 md:px-5 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          icon={Trophy}
          kicker="wins.csv"
          title="ACHIEVEMENTS"
          color="bg-pop-mint"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.01, rotate: i % 2 ? 0.4 : -0.4 }}
                className={`chunky-lg h-full rounded-3xl p-6 md:p-8 ${a.color}`}
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="h-6 w-6 shrink-0" />
                  <Tag color="bg-card">{a.period}</Tag>
                </div>
                <h3 className="mt-4 font-display text-2xl uppercase leading-tight md:text-3xl">
                  {a.title}
                </h3>
                <p className="mt-3 font-mono text-sm leading-relaxed text-foreground/85">
                  {a.detail}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-3 py-16 md:px-5 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader icon={Mail} kicker="contact.exe" title="LET'S TALK" color="bg-pop-coral" />
        <Reveal>
          <div className="chunky-lg rounded-3xl bg-card p-6 md:p-12">
            <h3 className="font-display text-4xl uppercase leading-tight md:text-6xl">
              Got an idea?
              <br />
              <span className="bg-pop-yellow px-2">Let&apos;s build it.</span>
            </h3>
            <p className="mt-6 max-w-2xl font-mono text-base leading-relaxed text-foreground/80 md:text-lg">
              I&apos;m open to software &amp; research internships. Fastest way to reach
              me is email — I read everything and reply within a day.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <ContactBtn
                href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=arnav30yadav@gmail.com"
                color="bg-pop-yellow"
                icon={Mail}
                label="Email"
                value="arnav30yadav@gmail.com"
              />
              <ContactBtn
                href="tel:+919205167135"
                color="bg-pop-mint"
                icon={Phone}
                label="Phone"
                value="+91 92051 67135"
              />
              <ContactBtn
                href="https://github.com/ArnavYadav0047"
                color="bg-pop-sky"
                icon={Github}
                label="GitHub"
                value="@arnavyadav"
              />
              <ContactBtn
                href="https://www.linkedin.com/in/arnav-yadav-aaa088292/"
                color="bg-pop-lilac"
                icon={Linkedin}
                label="LinkedIn"
                value="Arnav Yadav"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactBtn({
  href,
  color,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`chunky group flex items-center justify-between gap-3 rounded-2xl ${color} p-5`}
    >
      <div className="flex items-center gap-3">
        <span className="chunky-thin flex h-10 w-10 items-center justify-center rounded-lg bg-card">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-70">
            {label}
          </p>
          <p className="font-mono text-sm font-bold">{value}</p>
        </div>
      </div>
      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
    </motion.a>
  );
}

function Footer() {
  return (
    <footer className="px-3 pb-6 pt-10 md:px-5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-foreground/40 pt-6 font-mono text-xs">
        <span>© {new Date().getFullYear()} Arnav Yadav. All bytes reserved.</span>
        <span className="opacity-70">Designed &amp; coded with ☕ + 🎧</span>
      </div>
    </footer>
  );
}

/* ---------- Cursor halo (subtle vibe) ---------- */

function CursorHalo() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[1] hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pop-yellow/30 blur-3xl md:block"
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

/* ---------- Page ---------- */

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <CursorHalo />
      <Nav />
      <main className="pt-6">
        <Hero />
        <div className="mt-12">
          <Marquee />
        </div>
        <About />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
