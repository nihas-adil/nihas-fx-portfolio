
import React, { useEffect, useState } from 'react'
import FireParticles from './FireParticles'
import { MotionConfig, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  Mail,
  Phone,
  Play,
  Sparkles,
  MessageCircle,
  X,
  Send,
} from 'lucide-react'

const IG_URL = 'https://www.instagram.com/nihas_fx/'
const PORTRAIT_SRC = '/images/profile.png'

const projects = [
  {
    name: 'Demanzo — Nagercoil',
    type: 'Meta Ads Video Editing',
    year: '2025–2026',
    logo: '/images/logos/demanzo.png',
    description:
      'Client advertisement reels for social campaigns, built around impactful visuals, motion effects and strong storytelling.',
  },
  {
    name: 'Naveen Events',
    type: 'Meta Ads & Video Editing',
    year: '2024–2026',
    logo: '/images/logos/naveen-events.png',
    description:
      'Event promotional reels with dynamic visuals, smooth transitions and motion effects that bring event designs to life.',
  },
  {
    name: 'Cat Wash Factory',
    type: 'Instagram Reels',
    year: '2025',
    logo: '/images/logos/car-wash-factory.png',
    description:
      'A high-energy social reel with cut-out transitions, motion graphics and an engagement-first edit.',
  },
  {
    name: 'New Street — Men’s Fashion',
    type: 'Instagram Reels',
    year: '2026',
    logo: '/images/logos/new-street.png',
    description:
      'Trendy, fast-paced fashion edits combining stylish visual effects, cut-out transitions and rhythmic pacing.',
  },
  {
    name: 'Krishna Kumar Ortho Hospital',
    type: 'Instagram Reels',
    year: '2026',
    logo: '/images/logos/krishna-kumar-ortho-hospital.png',
    description:
      'A social-ready promotional video highlighting hospital services with clean motion effects and clear messaging.',
  },
]

const videoGroups = [
  {
    title: 'Naveen Events',
    category: 'EVENTS & CELEBRATIONS',
    description:
      'Event films shaped around atmosphere, meaningful details, and the energy of every celebration.',
    files: [
      { id: 'event-01', label: 'Film 01', src: 'naveen-events/event-01.mp4' },
      { id: 'event-02', label: 'Film 02', src: 'naveen-events/event-02.mp4' },
    ],
  },
  {
    title: 'Real Estate Marketing',
    category: 'PROPERTY FILMS',
    description:
      'Property showcases highlighting homes through thoughtful pacing and inviting visual detail.',
    files: [
      { id: 'property-01', label: 'Film 01', src: 'real-estate/home-01.mp4' },
      { id: 'property-02', label: 'Film 02', src: 'real-estate/home-02.mp4' },
    ],
  },
  {
    title: 'Arakkonam Dudes',
    category: 'SHOWROOM CAMPAIGNS',
    description:
      'Showroom edits pairing product-focused visuals with a confident, energetic rhythm.',
    files: [
      { id: 'showroom-01', label: 'Film 01', src: 'arakkonam-dudes/showroom-01.mp4' },
      { id: 'showroom-02', label: 'Film 02', src: 'arakkonam-dudes/showroom-02.mp4' },
    ],
  },
  {
    title: 'KTM Showroom-Arakkonam',
    category: 'AUTOMOTIVE',
    description:
      'A bold automotive promo focused on the character, details, and movement of the showroom.',
    files: [{ id: 'automotive-01', label: 'Film 01', src: 'ktm-showroom/ktm-01.mp4' }],
  },
  {
    title: 'Texvalley Mall Erode',
    category: 'RETAIL PROMOTION',
    description:
      'Retail campaign edits capturing the mall experience and launch atmosphere.',
    files: [
      { id: 'retail-01', label: 'Film 01', src: 'texvalley/mall-01.mp4' },
      { id: 'retail-02', label: 'Film 02', src: 'texvalley/mall-02.mp4' },
    ],
  },
  {
    title: 'E-Commerce Product Promotion – Men’s Fashion',
    category: 'MEN’S FASHION',
    description:
      'Fast-paced product reels presenting menswear with polished movement and style.',
    files: [
      { id: 'fashion-01', label: 'Film 01', src: 'mens-fashion/fashion-01.mp4' },
      { id: 'fashion-02', label: 'Film 02', src: 'mens-fashion/fashion-02.mp4' },
    ],
  },
  {
    title: 'Home Interior Transformation – Promotional Video Editing',
    category: 'INTERIOR PROMOTION',
    description:
      'A home transformation story showcasing spaces, finishes, and considered details.',
    files: [
      { id: 'interior-01', label: 'Film 01', src: 'home-interior/interior-01.mp4' },
      { id: 'interior-02', label: 'Film 02', src: 'home-interior/interior-02.mp4' },
    ],
  },
  {
    title: 'ONECRETE – AAC Blocks Promotional Video Editing',
    category: 'INDUSTRIAL PROMOTION',
    description:
      'A promotional reel presenting the ONECRETE brand and its industrial identity.',
    files: [
      { id: 'onecrete-promo-01', label: 'Film 01', src: 'onecrete/brand-promo-01.mp4' },
    ],
  },
]

/* Actual software logo files inside public/images/software/ */
const software = [
  {
    name: 'Premiere Pro',
    logo: '/images/software/premiere-pro.png',
    cls: 'premiere',
  },
  {
    name: 'After Effects',
    logo: '/images/software/after-effects.png',
    cls: 'after',
  },
  {
    name: 'DaVinci Resolve',
    logo: '/images/software/davinci-resolve.png',
    cls: 'davinci',
  },
  {
    name: 'CapCut',
    logo: '/images/software/capcut.png',
    cls: 'capcut',
  },
  {
    name: 'Photoshop',
    logo: '/images/software/photoshop.png',
    cls: 'photoshop',
  },
]

const skills = [
  'Professional Color Grading & Correction',
  'Creative Thinking & Visual Storytelling',
  'Audio Editing & Sound Design',
  'Time Management & Deadline Handling',
  'Social Media Reels Production',
  'Short-Form Video Editing',
]

const process = [
  ['01', 'DISCOVER', 'Understanding goals, audience, and project requirements.', '◎'],
  ['02', 'IDEATE', 'Planning the creative direction and finding the right concept.', '✳'],
  ['03', 'DESIGN', 'Crafting visuals with a focus on mood, rhythm and story.', '／'],
  ['04', 'DEVELOP', 'Building a polished edit with considered pacing and motion.', '⌘'],
  ['05', 'DELIVER', 'Reviewing, optimizing and delivering with care.', '↗'],
]

function CursorOrb() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (event) => {
      setPos({ x: event.clientX, y: event.clientY })
      setVisible(true)
    }

    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`cursor-orb ${visible ? 'is-visible' : ''}`}
      style={{ left: pos.x, top: pos.y }}
    />
  )
}

function Landing({ onEnter }) {
  const [portraitFailed, setPortraitFailed] = useState(false)

  return (
    <motion.main
      className="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className="landing-grain" />

      <header className="landing-top">
        <span>
          NA<span className="red-dot">.</span>
        </span>
        <span>VIDEO EDITOR / VISUAL STORYTELLER</span>
      </header>

      <section className="landing-center">
        <motion.div
          className="portrait-ring"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {!portraitFailed && (
            <img
              src={PORTRAIT_SRC}
              alt="Nihas Adil"
              onError={() => {
                if (import.meta.env.DEV) {
                  console.error(`Profile image failed to load: ${PORTRAIT_SRC}`)
                }
                setPortraitFailed(true)
              }}
            />
          )}

          {portraitFailed && (
            <div className="portrait-fallback" role="img" aria-label="Profile image unavailable">
              N<span>A</span>
            </div>
          )}

          <span className="ring-star">
            <Sparkles size={18} />
          </span>
        </motion.div>

        <motion.p
          className="eyebrow landing-eyebrow"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          CUT WITH PURPOSE. MADE TO FEEL.
        </motion.p>

        <motion.h1
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.28 }}
        >
          Nihas <span>Adil</span>
        </motion.h1>

        <p className="landing-copy">Video Editor · Photo Editor · Motion Designer</p>

        <div className="landing-actions">
          <button className="pill pill-dark" onClick={onEnter}>
            My Portfolio <ArrowUpRight size={17} />
          </button>
          <a className="pill pill-outline" href={IG_URL} target="_blank" rel="noreferrer">
            My Alter Ego <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <footer className="landing-footer">
        <span>INDEPENDENT CREATIVE</span>
        <span>
          AVAILABLE FOR FREELANCE <Asterisk size={15} />
        </span>
      </footer>
    </motion.main>
  )
}

function Portfolio({ onHome }) {
  const [portraitFailed, setPortraitFailed] = useState(false)
  const [videoStates, setVideoStates] = useState({})
  const [videoMetadata, setVideoMetadata] = useState({})
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const recordVideoMetadata = (id, event) => {
    const { videoWidth: width, videoHeight: height } = event.currentTarget

    if (!width || !height) return

    setVideoMetadata((previous) => ({
      ...previous,
      [id]: { width, height },
    }))
  }

  const markVideoUnavailable = (id, src, category) => {
    if (import.meta.env.DEV) {
      console.error(`Portfolio video failed to load: ${category}`, {
        id,
        src: `/videos/${src}`,
      })
    }

    setVideoStates((previous) => ({
      ...previous,
      [id]: 'unavailable',
    }))
  }

  const getVideoLayout = (file) => {
    const dimensions = videoMetadata[file.id]

    if (!dimensions?.width || !dimensions.height) return undefined

    const maxWidth = Math.min((dimensions.width / dimensions.height) * 70, 100)

    return {
      aspectRatio: `${dimensions.width} / ${dimensions.height}`,
      width: `min(100%, ${maxWidth.toFixed(2)}svh)`,
    }
  }

  return (
    <motion.main
      className="portfolio"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
    >
      <nav className="nav shell">
        <button className="wordmark" onClick={onHome}>
          NA<span>.</span>
        </button>

        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#reels">Video work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <a className="availability" href="mailto:anihasadil@gmail.com">
          <span className="status-dot" /> AVAILABLE FOR FREELANCE
        </a>
      </nav>

      <section className="hero shell">
        <div className="hero-topline">
          <span>VIDEO EDITOR & DIGITAL CREATOR</span>
          <span>BASED IN INDIA · WORKING WORLDWIDE</span>
        </div>

        <div className="hero-stage">
          <div className="hero-backword" aria-hidden="true">CREATE</div>

          <div className="hero-intro">
            <p className="script">Hello, I’m</p>
            <h1>
              NIHAS<br />ADIL<span className="red-dot">.</span>
            </h1>
            <p className="hero-role">
              VIDEO EDITOR &<br />VISUAL STORYTELLER
            </p>
            <p className="hero-summary">
              I shape raw footage into stories that move people — through rhythm,
              cinematic visuals and intentional detail.
            </p>
            <a className="text-link" href="#reels">
              EXPLORE MY WORK <ArrowDownRight size={16} />
            </a>
          </div>

          <div className="hero-person">
            {!portraitFailed && (
              <img
                src={PORTRAIT_SRC}
                alt="Portrait of Nihas Adil"
                onError={() => {
                  if (import.meta.env.DEV) {
                    console.error(`Profile image failed to load: ${PORTRAIT_SRC}`)
                  }
                  setPortraitFailed(true)
                }}
              />
            )}

            {portraitFailed && (
              <div className="person-placeholder" role="img" aria-label="Profile image unavailable">
                NA<span>.</span>
              </div>
            )}

            <div className="portrait-label">
              FRAMES WITH<br />FEELING <Asterisk size={14} />
            </div>
          </div>

          <div className="hero-stats">
            <div>
              <strong>2<span>+</span></strong>
              <small>YEARS<br />EXPERIENCE</small>
            </div>
            <div>
              <strong>40<span>+</span></strong>
              <small>PROJECTS<br />COMPLETED</small>
            </div>
            <div>
              <strong>20<span>+</span></strong>
              <small>HAPPY<br />CLIENTS</small>
            </div>
          </div>
        </div>

        <div className="hero-bottomline">
          <span>EDIT. EXPERIMENT. ELEVATE.</span>
          <span>SCROLL TO DISCOVER ↓</span>
        </div>
      </section>

      <motion.section id="projects" className="selected shell section-pad" variants={fadeUp}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">A FEW STORIES I HELPED TELL</span>
            <h2>SELECTED <span>PROJECTS</span></h2>
          </div>
          <span className="heading-index">01 / WORK</span>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-row" key={project.name}>
              <span className="project-number">{String(index + 1).padStart(2, '0')}</span>

              <div className={`project-art art-${index + 1}`} aria-hidden="true">
                {project.logo ? (
                  <img className="project-logo" src={project.logo} alt={`${project.name} logo`} />
                ) : (
                  <span>{['D', 'N', 'C', 'NS', 'KK'][index]}</span>
                )}
                <i>{['AD CAMPAIGN', 'EVENT FILM', 'SOCIAL CUT', 'FASHION FILM', 'HEALTHCARE'][index]}</i>
              </div>

              <div className="project-info">
                <div className="project-meta">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>

              <a href="#reels" className="project-arrow" aria-label={`See video work for ${project.name}`}>
                <ArrowUpRight />
              </a>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section id="about" className="about-grid shell" variants={fadeUp}>
        <div className="about-copy section-pad">
          <span className="eyebrow">A LITTLE ABOUT ME</span>
          <h2>STORIES FIRST.<br /><span>PIXELS SECOND.</span></h2>

          <p>
            Creative and detail-oriented Video Editor and Photo Editor with a strong passion for
            visual storytelling, cinematic aesthetics, and engaging content creation. Experienced
            in editing promotional videos, YouTube content, social media reels, and advertising
            creatives with a focus on smooth transitions, dynamic visuals, and impactful storytelling.
          </p>

          <p>
            Proficient in Adobe Premiere Pro, Adobe After Effects, DaVinci Resolve, CapCut,
            and Adobe Photoshop — with a commitment to creating work that captures attention
            and communicates ideas effectively.
          </p>

          <div className="about-signature">Nihas Adil<span>.</span></div>
        </div>

        <div className="software-panel section-pad">
          <span className="eyebrow">MY CREATIVE TOOLKIT</span>
          <h2>TOOLS OF<br /><span>THE TRADE</span></h2>

          <div className="software-grid">
            {software.map((item) => (
              <div className="software-item" key={item.name}>
                <div className={`software-icon ${item.cls}`}>
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'

                      if (import.meta.env.DEV) {
                        console.error(`Software logo failed to load: ${item.logo}`)
                      }
                    }}
                  />
                </div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <p className="software-note">
            The tool is only the beginning. The story is everything.
          </p>
        </div>
      </motion.section>

      <motion.section id="reels" className="video-section shell section-pad" variants={fadeUp}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE CUTS, THE COLOR, THE FEELING</span>
            <h2>VIDEO <span>SHOWCASE</span></h2>
          </div>
          <span className="heading-index">02 / MOTION</span>
        </div>

        <p className="section-intro">
          A selection of campaigns, reels and visual stories. Videos are grouped by project — just press play.
        </p>

        <div className="video-grid">
          {videoGroups.map((group) => (
            <article className="video-category" key={group.title}>
              <header className="video-category-heading">
                <span className="eyebrow">{group.category}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </header>

              <div className="category-video-grid">
                {group.files.map((file, index) => {
                  const state = file.unavailable
                    ? 'unavailable'
                    : videoStates[file.id] || 'loading'

                  return (
                    <article className="video-card" key={file.id}>
                      <div className={`video-preview${state === 'loading' ? ' is-loading' : ''}`}>
                        {state !== 'unavailable' && (
                          <video
                            controls
                            preload="metadata"
                            playsInline
                            aria-label={`${group.title}: ${file.label}`}
                            style={getVideoLayout(file)}
                            onLoadedMetadata={(event) => recordVideoMetadata(file.id, event)}
                            onLoadedData={() =>
                              setVideoStates((previous) => ({
                                ...previous,
                                [file.id]: 'ready',
                              }))
                            }
                            onWaiting={() =>
                              setVideoStates((previous) =>
                                previous[file.id] === 'ready'
                                  ? { ...previous, [file.id]: 'loading' }
                                  : previous
                              )
                            }
                            onPlaying={() =>
                              setVideoStates((previous) => ({
                                ...previous,
                                [file.id]: 'ready',
                              }))
                            }
                            onError={() => markVideoUnavailable(file.id, file.src, group.category)}
                          >
                            <source src={`/videos/${file.src}`} type="video/mp4" />
                          </video>
                        )}

                        {state === 'loading' && (
                          <div className="video-loading" role="status">
                            <span className="loading-indicator" aria-hidden="true" />
                            <span>LOADING VIDEO</span>
                          </div>
                        )}

                        {state === 'unavailable' && (
                          <div className="video-placeholder" role="status">
                            <Play size={28} />
                            <span>
                              {file.unavailable ? 'SOURCE VIDEO NOT FOUND' : 'VIDEO UNAVAILABLE'}
                            </span>
                            <small>{group.category}</small>
                          </div>
                        )}
                      </div>

                      <div className="video-card-title">
                        <div>
                          <span className="eyebrow">
                            FILM {String(index + 1).padStart(2, '0')}
                          </span>
                          <h4>{file.label}</h4>
                        </div>

                        {videoMetadata[file.id] && (
                          <span className="video-dimensions">
                            {videoMetadata[file.id].width} × {videoMetadata[file.id].height}
                          </span>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            </article>
          ))}
        </div>

        <p className="video-hint">
          Each film keeps its original proportions. A missing source affects only its own card,
          not the rest of the showcase.
        </p>
      </motion.section>

      <motion.section className="process-grid shell" variants={fadeUp}>
        <div className="skills-panel section-pad">
          <span className="eyebrow">WHAT I BRING</span>
          <h2>SKILLS &<br /><span>INSTINCT</span></h2>

          <div className="skill-tags">
            {skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </div>

        <div className="process-panel section-pad">
          <span className="eyebrow">FROM FIRST THOUGHT TO FINAL FRAME</span>
          <h2>WORK <span>PROCESS</span></h2>

          <div className="process-list">
            {process.map(([number, title, description, icon]) => (
              <div className="process-item" key={number}>
                <span className="process-no">{number}</span>
                <span className="process-icon">{icon}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <blockquote className="quote-panel">
          <span className="quote-mark">“</span>
          <p>Great editing doesn’t just show a story. It makes you <em>feel</em> it.</p>
          <footer>Nihas Adil <Asterisk size={16} /></footer>
          <span className="quote-bottom">
            LET’S MAKE SOMETHING<br />THAT STAYS WITH PEOPLE.
          </span>
        </blockquote>
      </motion.section>

      <motion.footer id="contact" className="contact shell section-pad" variants={fadeUp}>
        <div className="contact-head">
          <span className="eyebrow">HAVE A GOOD PROJECT IN MIND?</span>
          <h2>
            LET’S WORK<br /><span>TOGETHER</span><Asterisk />
          </h2>
          <p>
            I’m currently open for new projects and collaborations. Let’s create something
            amazing that drives results.
          </p>
          <span className="freelance-badge">
            <span className="status-dot" /> AVAILABLE FOR FREELANCE WORK
          </span>
        </div>

        <div className="contact-details">
          <a href="mailto:anihasadil@gmail.com">
            <span className="contact-icon"><Mail /></span>
            <span>
              <small>DROP ME A LINE</small>
              <strong>anihasadil@gmail.com</strong>
            </span>
            <ArrowUpRight />
          </a>

          <a href="tel:+918838484237">
            <span className="contact-icon"><Phone /></span>
            <span>
              <small>LET’S TALK</small>
              <strong>+91 88384 84237</strong>
            </span>
            <ArrowUpRight />
          </a>

          <a href={IG_URL} target="_blank" rel="noreferrer">
            <span className="contact-icon"><Sparkles /></span>
            <span>
              <small>FOLLOW THE OTHER SIDE</small>
              <strong>@nihas_fx</strong>
            </span>
            <ArrowUpRight />
          </a>
        </div>

        <div className="contact-visual">
          <div className="visual-window">
            <div className="window-top">
              <i /><i /><i />
              <span>NIHAS_ADIL / SHOWREEL</span>
            </div>
            <div className="visual-type">
              MAKE IT<br /><span>MOVE.</span>
            </div>
            <div className="visual-shape" />
          </div>
        </div>

        <div className="footer-line">
          <span>© {new Date().getFullYear()} NIHAS ADIL</span>
          <span>MADE WITH INTENTION <Asterisk size={13} /></span>
          <button onClick={onHome}>BACK TO INTRO ↑</button>
        </div>
      </motion.footer>
    </motion.main>
  )
}

function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hey! Welcome to Nihas FX. Ask me about video editing, services, or contact details.',
    },
  ])

  const getReply = (question) => {
    const q = question.toLowerCase()

    if (q.includes('price') || q.includes('cost') || q.includes('rate')) {
      return 'Pricing depends on the video type, duration, and editing requirements. Use the contact section to request a quote.'
    }

    if (q.includes('service') || q.includes('edit') || q.includes('reel')) {
      return 'I work on promotional videos, Instagram Reels, product promotions, event videos, real estate videos, and creative video editing.'
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire')) {
      return 'You can email anihasadil@gmail.com or call +91 88384 84237. You can also find the contact links in the Contact section.'
    }

    if (q.includes('instagram') || q.includes('social')) {
      return 'Find my work on Instagram: @nihas_fx — instagram.com/nihas_fx/'
    }

    if (q.includes('software') || q.includes('tool')) {
      return 'My creative toolkit includes Premiere Pro, After Effects, DaVinci Resolve, CapCut, and Photoshop.'
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return 'Hey there! 👋 What would you like to know about my video editing work?'
    }

    return 'Thanks for your message! For project-specific questions, contact me at anihasadil@gmail.com or call +91 88384 84237.'
  }

  const sendMessage = (event) => {
    event.preventDefault()

    const text = input.trim()
    if (!text) return

    const reply = getReply(text)

    setMessages((previous) => [
      ...previous,
      { from: 'user', text },
      { from: 'bot', text: reply },
    ])

    setInput('')
  }

  const sendSuggestion = (item) => {
    const reply = getReply(item)

    setMessages((previous) => [
      ...previous,
      { from: 'user', text: item },
      { from: 'bot', text: reply },
    ])
  }

  return (
    <div className="chat-assistant">
      {isOpen && (
        <section className="chat-panel" aria-label="Portfolio chat assistant">
          <header className="chat-header">
            <div>
              <span className="chat-status-dot" />
              <strong>NIHAS FX ASSISTANT</strong>
              <small>Portfolio help · Quick replies</small>
            </div>

            <button
              type="button"
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={19} />
            </button>
          </header>

          <div className="chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.from}`} key={index}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="chat-suggestions">
            {['Editing services', 'Pricing', 'Contact'].map((item) => (
              <button type="button" key={item} onClick={() => sendSuggestion(item)}>
                {item}
              </button>
            ))}
          </div>

          <form className="chat-form" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me something..."
              aria-label="Type your message"
              maxLength={500}
            />

            <button type="submit" aria-label="Send message" disabled={!input.trim()}>
              <Send size={17} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chat-launcher"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && <span>CHAT WITH ME</span>}
      </button>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('landing')

  useEffect(() => {
    document.body.classList.toggle('portfolio-mode', page === 'portfolio')

    return () => {
      document.body.classList.remove('portfolio-mode')
    }
  }, [page])

  const enterPortfolio = () => {
    setPage('portfolio')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const returnHome = () => {
    setPage('landing')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.35, ease: 'easeOut' }}>
      <FireParticles />
      <CursorOrb />

      {page === 'landing' ? (
        <Landing onEnter={enterPortfolio} />
      ) : (
        <Portfolio onHome={returnHome} />
      )}

      <ChatAssistant />
    </MotionConfig>
  )
}
