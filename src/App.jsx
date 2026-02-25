import { useState, useEffect, useRef } from "react";
import profilePhoto from "./assets/photo.jpeg"; // 👈 rename this to match your actual filename

const NAV_LINKS = ["About", "Experience", "Skills", "Projects", "Contact"];

const EXPERIENCES = [
  {
    company: "Schneider Electric",
    role: "Cloud & Infrastructure Intern",
    period: "2024 – Present",
    location: "France",
    description: "[Your description here — what are you building, which team, which tech?]",
    tags: ["Cloud", "Infrastructure"],
    current: true,
  },
  {
    company: "INRIA — Team Kairos",
    role: "Systems Research Intern",
    period: "Summer 2023",
    location: "France",
    description: "Developed a Key-Value Store (KVS) module for Linux within the Kairos research team, diving deep into kernel-level programming and distributed storage primitives.",
    tags: ["Linux", "KVS", "C", "Systems"],
    current: false,
  },
  {
    company: "Ministry of Agriculture & Maritime Fisheries",
    role: "Frontend Developer Intern",
    period: "Summer 2022",
    location: "Morocco",
    description: "Designed and developed a frontend web interface for the ministry, building responsive pages and improving the digital experience for internal stakeholders.",
    tags: ["React", "HTML/CSS", "JavaScript"],
    current: false,
  },
];

const SKILLS = [
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"],
  },
  {
    category: "Systems & OS",
    items: ["Linux (Kernel)", "Scheduling", "Memory Management", "Distributed Systems", "Networking & Security"],
  },
  {
    category: "Development",
    items: ["C", "C++", "Python", "JavaScript", "Node.js", "React", "HTML/CSS"],
  },
  {
    category: "Data & DevOps",
    items: ["SQL", "NoSQL", "Git", "CI/CD", "Data Infrastructure"],
  },
  {
    category: "Languages",
    items: ["Arabic (Native)", "French (Fluent)", "English (Fluent)", "Spanish (Fluent)"],
  },
];

const PROJECTS = [
  {
    title: "KVS Linux Module",
    description: "A Key-Value Store module developed at the kernel level for Linux, part of the INRIA Kairos research initiative on distributed storage.",
    tech: ["C", "Linux Kernel", "Systems Programming"],
    link: null,
  },
  {
    title: "Ministry Web Portal",
    description: "Frontend portal for the Moroccan Ministry of Agriculture & Maritime Fisheries — responsive, accessible, built from scratch.",
    tech: ["React", "JavaScript", "CSS"],
    link: null,
  },
  {
    title: "Your Next Project",
    description: "Add your academic or personal projects here — distributed systems experiments, cloud deployments, anything you're proud of.",
    tech: ["Coming Soon"],
    link: null,
  },
];

// ---- Utility ----
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ---- Styles ----
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --midnight: #0d1b2a;
    --navy: #112240;
    --navy-light: #1a2f4a;
    --rose: #c97b8a;
    --rose-light: #e8aab6;
    --rose-pale: #f5d6dc;
    --champagne: #e8d5b0;
    --champagne-light: #f4ead8;
    --champagne-dim: #c4a97a;
    --white: #faf8f5;
    --text: #d4cfc8;
    --text-dim: #8a8a9a;
    --border: rgba(232, 213, 176, 0.12);
    --border-rose: rgba(201, 123, 138, 0.2);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--midnight);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    line-height: 1.7;
    cursor: none;
  }

  /* Custom cursor */
  .cursor {
    width: 10px; height: 10px;
    background: var(--rose);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    mix-blend-mode: normal;
  }
  .cursor-ring {
    width: 36px; height: 36px;
    border: 1px solid rgba(201,123,138,0.5);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease, width 0.3s ease, height 0.3s ease;
  }
  .cursor.hovered { width: 18px; height: 18px; background: var(--champagne); }
  .cursor-ring.hovered { width: 52px; height: 52px; border-color: var(--champagne-dim); }

  /* Nav */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 24px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(12px);
    background: rgba(13,27,42,0.7);
    border-bottom: 1px solid var(--border);
    transition: padding 0.4s ease;
  }
  nav.scrolled { padding: 16px 60px; }

  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 0.08em;
    color: var(--champagne);
    text-decoration: none;
  }
  .nav-logo span { color: var(--rose); font-style: italic; }

  .nav-links { display: flex; gap: 40px; list-style: none; }
  .nav-links a {
    font-size: 0.78rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-dim);
    text-decoration: none;
    transition: color 0.3s ease;
    position: relative;
  }
  .nav-links a::after {
    content: '';
    position: absolute; bottom: -4px; left: 0; right: 0; height: 1px;
    background: var(--rose);
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
  }
  .nav-links a:hover { color: var(--champagne); }
  .nav-links a:hover::after { transform: scaleX(1); }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 60px;
    position: relative;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,123,138,0.07) 0%, transparent 70%),
                radial-gradient(ellipse 50% 80% at 20% 80%, rgba(17,34,64,0.8) 0%, transparent 60%);
  }

  .hero-grid-lines {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(232,213,176,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(232,213,176,0.03) 1px, transparent 1px);
    background-size: 80px 80px;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 80px;
    align-items: center;
  }

  .hero-content { max-width: 600px; }

  /* Hero photo */
  .hero-photo-wrapper {
    position: relative;
    width: 100%;
    padding-top: 130%;
  }

  .hero-photo-frame {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .hero-photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    filter: grayscale(15%) contrast(1.05);
    transition: filter 0.7s ease, transform 0.7s ease;
  }
  .hero-photo-frame:hover img {
    filter: grayscale(0%) contrast(1.08);
    transform: scale(1.03);
  }

  .hero-photo-frame::before {
    content: '';
    position: absolute;
    bottom: -14px; left: -14px;
    width: 52%; height: 52%;
    border: 1px solid var(--rose);
    z-index: 2;
    pointer-events: none;
    transition: transform 0.45s ease;
  }
  .hero-photo-frame:hover::before { transform: translate(-5px, 5px); }

  .hero-photo-frame::after {
    content: '';
    position: absolute;
    top: -12px; right: -12px;
    width: 38%; height: 38%;
    border: 1px solid var(--champagne-dim);
    z-index: 2;
    pointer-events: none;
    opacity: 0.55;
    transition: transform 0.45s ease;
  }
  .hero-photo-frame:hover::after { transform: translate(5px, -5px); }

  .hero-photo-veil {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(13,27,42,0.75) 0%, transparent 100%);
    z-index: 1;
    pointer-events: none;
  }

  .hero-photo-label {
    position: absolute;
    bottom: 18px; left: 18px;
    z-index: 3;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.72rem;
    font-style: italic;
    letter-spacing: 0.2em;
    color: var(--champagne-light);
    text-transform: uppercase;
  }

  .hero-eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--rose);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .hero-eyebrow::before {
    content: '';
    width: 40px; height: 1px;
    background: var(--rose);
    display: block;
  }

  .hero-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 8vw, 6.5rem);
    font-weight: 300;
    line-height: 1.05;
    color: var(--white);
    margin-bottom: 8px;
    letter-spacing: -0.01em;
  }
  .hero-name em {
    font-style: italic;
    color: var(--champagne);
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
    font-weight: 300;
    font-style: italic;
    color: var(--rose-light);
    margin-bottom: 32px;
    letter-spacing: 0.02em;
  }

  .hero-bio {
    font-size: 0.95rem;
    color: var(--text-dim);
    max-width: 520px;
    line-height: 1.9;
    margin-bottom: 48px;
  }

  .hero-cta {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .btn-primary {
    padding: 14px 36px;
    background: transparent;
    border: 1px solid var(--champagne-dim);
    color: var(--champagne);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.35s ease;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--champagne);
    transform: translateX(-101%);
    transition: transform 0.35s ease;
    z-index: -1;
  }
  .btn-primary:hover { color: var(--midnight); border-color: var(--champagne); }
  .btn-primary:hover::before { transform: translateX(0); }

  .btn-ghost {
    font-size: 0.78rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--rose-light);
    text-decoration: none;
    display: flex; align-items: center; gap: 8px;
    transition: gap 0.3s ease, color 0.3s ease;
  }
  .btn-ghost:hover { color: var(--rose); gap: 14px; }

  .hero-scroll-indicator {
    position: absolute;
    bottom: 40px; left: 60px;
    display: flex; align-items: center; gap: 12px;
    font-size: 0.68rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--text-dim);
  }
  .scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, var(--rose-light), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  .hero-langs {
    position: absolute;
    right: 60px; top: 50%;
    transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 20px;
    align-items: flex-end;
  }
  .lang-item {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.85rem;
    font-style: italic;
    color: var(--border);
    letter-spacing: 0.1em;
    transition: color 0.3s ease;
    cursor: default;
  }
  .lang-item:hover { color: var(--rose-light); }

  /* Sections */
  section {
    padding: 120px 60px;
  }

  .section-label {
    font-size: 0.68rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--rose);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 16px;
  }
  .section-label::after {
    content: '';
    flex: 1; max-width: 60px; height: 1px;
    background: var(--rose);
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 300;
    color: var(--white);
    line-height: 1.15;
    margin-bottom: 64px;
  }
  .section-title em { font-style: italic; color: var(--champagne); }

  /* About */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  /* Photo frame */
  .photo-wrapper {
    position: relative;
    width: 100%;
    padding-top: 130%;
  }

  .photo-frame {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    filter: grayscale(15%) contrast(1.05);
    transition: filter 0.6s ease, transform 0.6s ease;
  }
  .photo-frame:hover img {
    filter: grayscale(0%) contrast(1.08);
    transform: scale(1.03);
  }

  /* Decorative rose overlay — bottom-left corner block */
  .photo-frame::before {
    content: '';
    position: absolute;
    bottom: -12px; left: -12px;
    width: 55%; height: 55%;
    border: 1px solid var(--rose);
    z-index: 2;
    pointer-events: none;
    transition: transform 0.4s ease;
  }
  .photo-frame:hover::before { transform: translate(-4px, 4px); }

  /* Champagne accent — top-right */
  .photo-frame::after {
    content: '';
    position: absolute;
    top: -10px; right: -10px;
    width: 40%; height: 40%;
    border: 1px solid var(--champagne-dim);
    z-index: 2;
    pointer-events: none;
    opacity: 0.5;
    transition: transform 0.4s ease;
  }
  .photo-frame:hover::after { transform: translate(4px, -4px); }

  /* Tinted gradient veil over bottom of image */
  .photo-veil {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(13,27,42,0.7) 0%, transparent 100%);
    z-index: 1;
    pointer-events: none;
  }

  /* Floating label on photo */
  .photo-label {
    position: absolute;
    bottom: 20px; left: 20px;
    z-index: 3;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.75rem;
    font-style: italic;
    letter-spacing: 0.18em;
    color: var(--champagne-light);
    text-transform: uppercase;
  }
  .about-text p {
    color: var(--text-dim);
    margin-bottom: 20px;
    font-size: 0.95rem;
    line-height: 1.9;
  }
  .about-text p strong {
    color: var(--champagne);
    font-weight: 400;
  }

  .about-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }
  .stat-card {
    background: var(--navy);
    padding: 32px 28px;
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s ease;
  }
  .stat-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--rose), var(--champagne-dim));
    transform: scaleX(0);
    transition: transform 0.4s ease;
    transform-origin: left;
  }
  .stat-card:hover { border-color: var(--border-rose); }
  .stat-card:hover::before { transform: scaleX(1); }

  .stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.8rem;
    font-weight: 300;
    color: var(--champagne);
    line-height: 1;
    margin-bottom: 8px;
  }
  .stat-label {
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-dim);
  }

  /* Experience */
  .experience-section { background: var(--navy); }

  .exp-list { display: flex; flex-direction: column; gap: 2px; }

  .exp-item {
    background: var(--midnight);
    border: 1px solid var(--border);
    padding: 40px 48px;
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 48px;
    align-items: start;
    position: relative;
    overflow: hidden;
    transition: border-color 0.4s ease, transform 0.4s ease;
    cursor: default;
  }
  .exp-item::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, var(--rose), var(--champagne-dim));
    transform: scaleY(0);
    transition: transform 0.4s ease;
    transform-origin: top;
  }
  .exp-item:hover { border-color: var(--border-rose); transform: translateX(4px); }
  .exp-item:hover::before { transform: scaleY(1); }

  .exp-current-badge {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--rose);
    border: 1px solid var(--border-rose);
    padding: 4px 10px;
    display: inline-block;
    margin-bottom: 12px;
  }

  .exp-period {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-style: italic;
    color: var(--champagne-dim);
    line-height: 1.4;
  }
  .exp-location {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    color: var(--text-dim);
    margin-top: 6px;
  }

  .exp-company {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--white);
    margin-bottom: 4px;
    letter-spacing: 0.02em;
  }
  .exp-role {
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--rose-light);
    margin-bottom: 16px;
  }
  .exp-desc {
    font-size: 0.92rem;
    color: var(--text-dim);
    line-height: 1.85;
    margin-bottom: 20px;
  }
  .exp-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag {
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--champagne-dim);
    border: 1px solid var(--border);
    padding: 5px 12px;
    transition: border-color 0.3s ease, color 0.3s ease;
  }
  .tag:hover { border-color: var(--champagne-dim); color: var(--champagne); }

  /* Skills */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2px;
  }
  .skill-category {
    background: var(--navy);
    border: 1px solid var(--border);
    padding: 36px 32px;
    transition: border-color 0.3s ease;
  }
  .skill-category:hover { border-color: var(--border-rose); }

  .skill-cat-label {
    font-size: 0.68rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--rose);
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }
  .skill-items { display: flex; flex-wrap: wrap; gap: 10px; }
  .skill-pill {
    font-size: 0.8rem;
    color: var(--text);
    background: rgba(232,213,176,0.04);
    border: 1px solid var(--border);
    padding: 6px 14px;
    transition: all 0.25s ease;
  }
  .skill-pill:hover {
    background: rgba(201,123,138,0.08);
    border-color: var(--border-rose);
    color: var(--champagne);
  }

  /* Projects */
  .projects-section { background: var(--navy); }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2px;
  }
  .project-card {
    background: var(--midnight);
    border: 1px solid var(--border);
    padding: 40px 36px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.4s ease;
    display: flex; flex-direction: column;
  }
  .project-card::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--rose), var(--champagne-dim));
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  .project-card:hover { border-color: var(--border-rose); }
  .project-card:hover::after { transform: scaleX(1); }

  .project-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 300;
    color: rgba(232,213,176,0.07);
    line-height: 1;
    margin-bottom: 20px;
    letter-spacing: -0.02em;
  }
  .project-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--white);
    margin-bottom: 16px;
    letter-spacing: 0.02em;
  }
  .project-desc {
    font-size: 0.88rem;
    color: var(--text-dim);
    line-height: 1.85;
    margin-bottom: 24px;
    flex: 1;
  }
  .project-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
  .project-link {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--rose-light);
    text-decoration: none;
    display: flex; align-items: center; gap: 8px;
    transition: gap 0.3s ease, color 0.3s ease;
    margin-top: auto;
  }
  .project-link:hover { color: var(--rose); gap: 14px; }

  /* Contact */
  .contact-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }
  .contact-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 300;
    color: var(--white);
    line-height: 1.3;
    margin-bottom: 32px;
  }
  .contact-text em { font-style: italic; color: var(--champagne); }

  .contact-sub {
    font-size: 0.92rem;
    color: var(--text-dim);
    line-height: 1.85;
    margin-bottom: 40px;
  }

  .contact-links { display: flex; flex-direction: column; gap: 2px; }
  .contact-link-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 24px;
    border: 1px solid var(--border);
    text-decoration: none;
    color: var(--text);
    transition: all 0.3s ease;
    background: var(--navy);
  }
  .contact-link-item:hover {
    border-color: var(--border-rose);
    background: rgba(201,123,138,0.04);
    color: var(--champagne);
    padding-left: 32px;
  }
  .contact-link-label {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .contact-link-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-style: italic;
    color: var(--champagne-dim);
  }

  /* Footer */
  footer {
    padding: 40px 60px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    color: var(--text-dim);
  }

  /* Responsive */
  @media (max-width: 900px) {
    nav { padding: 20px 24px; }
    section { padding: 80px 24px; }
    .hero { padding: 0 24px; }
    .hero-langs { display: none; }
    .hero-scroll-indicator { left: 24px; }
    .about-grid { grid-template-columns: 1fr; }
    .hero-inner { grid-template-columns: 1fr; }
    .hero-photo-wrapper { padding-top: 100%; max-width: 320px; margin: 0 auto; }
    .contact-inner { grid-template-columns: 1fr; }
    .exp-item { grid-template-columns: 1fr; gap: 16px; }
    .nav-links { gap: 20px; }
    footer { flex-direction: column; gap: 12px; text-align: center; }
  }
`;

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setRingPos({ x: e.clientX, y: e.clientY }), 60);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("a, button, .exp-item, .stat-card, .skill-pill");
    const on = () => setHovered(true);
    const off = () => setHovered(false);
    els.forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    return () => els.forEach(el => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); });
  }, []);

  return (
    <>
      <style>{css}</style>

      {/* Custom Cursor */}
      <div className={`cursor ${hovered ? "hovered" : ""}`} style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className={`cursor-ring ${hovered ? "hovered" : ""}`} style={{ left: ringPos.x, top: ringPos.y }} />

      {/* Nav */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#hero" className="nav-logo">Alaa <span>Jennine</span></a>
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />

        <div className="hero-inner">
          {/* Left: text content */}
          <div className="hero-content">
            <div className="hero-eyebrow" style={{ opacity: 1 }}>Systems Architect · Cloud & Distributed Systems</div>
            <h1 className="hero-name">
              Alaa<br /><em>Jennine</em>
            </h1>
            <p className="hero-title">Engineering Student · ENSIMAG · Cloud & Data Infrastructure</p>
            <p className="hero-bio">
              Final-year double-degree engineering student at ENSIMAG — France's top computer science school.
              Forged through two years of intensive prépa in mathematics, physics, and CS.
              Passionate about systems architecture, distributed infrastructure, and the elegance of well-designed software.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn-primary">Get in touch</a>
              <a href="#experience" className="btn-ghost">View experience →</a>
            </div>
          </div>

          {/* Right: photo */}
          <div className="hero-photo-wrapper">
            <div className="hero-photo-frame">
              <img src={profilePhoto} alt="Alaa Jennine" />
              <div className="hero-photo-veil" />
              <div className="hero-photo-label">Alaa Jennine</div>
            </div>
          </div>
        </div>

        <div className="hero-langs">
          {["العربية", "Français", "English", "Español"].map((l, i) => (
            <div key={i} className="lang-item">{l}</div>
          ))}
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <FadeIn>
          <div className="section-label">About</div>
          <h2 className="section-title">A mind built for<br /><em>complexity</em></h2>
        </FadeIn>
        <div className="about-grid">
          <FadeIn delay={0.1}>
            <div className="about-text">
              <p>
                I'm <strong>Alaa Jennine</strong>, a systems architect in the making — currently in my final year of a double degree in engineering at <strong>ENSIMAG</strong>, specializing in <strong>Cloud Computing and Data Infrastructure</strong>.
              </p>
              <p>
                My foundation was built through two intensive years of <em>Classes Préparatoires</em> — the highly competitive gateway to France's Grandes Écoles — where I developed rigorous thinking in mathematics, physics, and computer science.
              </p>
              <p>
                I'm drawn to the low-level and the large-scale: from <strong>Linux kernel modules</strong> to <strong>distributed cloud architectures</strong>. I believe that understanding systems deeply — how they fail, how they scale, how they communicate — is the foundation of everything elegant in tech.
              </p>
              <p>
                Beyond engineering, I bring the perspective of someone who navigates <strong>four languages</strong> and multiple cultures, which shapes how I collaborate, communicate, and approach problems from unexpected angles.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="about-stats">
              {[
                { n: "3", l: "Internships" },
                { n: "4", l: "Languages" },
                { n: "2+", l: "Years Prépa" },
                { n: "∞", l: "Curiosity" },
              ].map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-number">{s.n}</div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Experience */}
      <section className="experience-section" id="experience">
        <FadeIn>
          <div className="section-label">Experience</div>
          <h2 className="section-title">Where I've<br /><em>built things</em></h2>
        </FadeIn>
        <div className="exp-list">
          {EXPERIENCES.map((e, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="exp-item">
                <div>
                  {e.current && <div className="exp-current-badge">Current</div>}
                  <div className="exp-period">{e.period}</div>
                  <div className="exp-location">{e.location}</div>
                </div>
                <div>
                  <div className="exp-company">{e.company}</div>
                  <div className="exp-role">{e.role}</div>
                  <p className="exp-desc">{e.description}</p>
                  <div className="exp-tags">
                    {e.tags.map((t, j) => <span className="tag" key={j}>{t}</span>)}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills">
        <FadeIn>
          <div className="section-label">Skills</div>
          <h2 className="section-title">Tools of my<br /><em>craft</em></h2>
        </FadeIn>
        <div className="skills-grid">
          {SKILLS.map((cat, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="skill-category">
                <div className="skill-cat-label">{cat.category}</div>
                <div className="skill-items">
                  {cat.items.map((s, j) => <span className="skill-pill" key={j}>{s}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="projects-section" id="projects">
        <FadeIn>
          <div className="section-label">Projects</div>
          <h2 className="section-title">Things I've<br /><em>shipped</em></h2>
        </FadeIn>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="project-card">
                <div className="project-num">0{i + 1}</div>
                <div className="project-title">{p.title}</div>
                <p className="project-desc">{p.description}</p>
                <div className="project-tech">
                  {p.tech.map((t, j) => <span className="tag" key={j}>{t}</span>)}
                </div>
                {p.link
                  ? <a href={p.link} className="project-link" target="_blank" rel="noreferrer">View project →</a>
                  : <span className="project-link" style={{ opacity: 0.3 }}>Coming soon →</span>
                }
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="contact-inner">
          <FadeIn>
            <div>
              <div className="section-label">Contact</div>
              <div className="contact-text">
                Let's build something<br /><em>worth remembering</em>
              </div>
              <p className="contact-sub">
                Whether it's an opportunity, a collaboration, or just a conversation about distributed systems and elegant infrastructure — I'd love to hear from you.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="contact-links">
              {[
                { label: "Email", value: "alaa.jennine@email.com", href: "mailto:alaa.jennine@email.com" },
                { label: "LinkedIn", value: "linkedin.com/in/alaa-jennine-14465022b", href: "#" },
                { label: "GitHub", value: "github.com/alaajee", href: "#" },
                { label: "Location", value: "Grenoble, France", href: null },
              ].map((c, i) => (
                c.href
                  ? <a href={c.href} className="contact-link-item" key={i}>
                      <span className="contact-link-label">{c.label}</span>
                      <span className="contact-link-value">{c.value}</span>
                    </a>
                  : <div className="contact-link-item" key={i} style={{ cursor: "default" }}>
                      <span className="contact-link-label">{c.label}</span>
                      <span className="contact-link-value">{c.value}</span>
                    </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span>© 2026 Alaa Jennine — All rights reserved</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--rose-light)" }}>
          Built with care & precision
        </span>
      </footer>
    </>
  );
}