import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  GraduationCap,
  Mail,
  Menu,
  Moon,
  Phone,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { experience, projects, skills } from './data/portfolio'
import './styles.css'

const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact']

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.21c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.41v1.57h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <article
      className="project-card"
      onClick={() => onOpen(project)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(project)
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title} project gallery`}
    >
      <div className="project-image-wrap">
        <img
          src={project.images[0]}
          alt={project.imageAlt}
          loading="lazy"
        />
        <span className="project-number">{project.number}</span>
      </div>
      <div className="project-content">
        <p className="project-subtitle">{project.subtitle}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}
        </div>
        <span className="project-open-hint">View project <ArrowUpRight size={17} /></span>
      </div>
    </article>
  )
}

function ProjectLightbox({ project, onClose }) {
  const [activeImage, setActiveImage] = useState(0)
  const hasGallery = project.images.length > 1

  const showPrevious = () => setActiveImage((current) => (current - 1 + project.images.length) % project.images.length)
  const showNext = () => setActiveImage((current) => (current + 1) % project.images.length)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, project.images.length])

  return (
    <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} project gallery`} onMouseDown={onClose}>
      <article className="project-lightbox-panel" onMouseDown={(event) => event.stopPropagation()}>
        <header className="project-lightbox-header">
          <div>
            <p className="project-subtitle">{project.subtitle}</p>
            <h3>{project.title}</h3>
          </div>
          <div className="project-lightbox-actions">
            <span>{activeImage + 1} / {project.images.length}</span>
            <button onClick={onClose} aria-label="Close project gallery"><X size={22} /></button>
          </div>
        </header>

        <div className="project-lightbox-stage">
          <div className="project-lightbox-image">
            <img src={project.images[activeImage]} alt={`${project.imageAlt} — image ${activeImage + 1} of ${project.images.length}`} />
          </div>
        </div>

        <footer className="project-lightbox-footer">
          {hasGallery && (
            <div className="project-lightbox-controls">
              <div className="project-lightbox-control-buttons">
                <button onClick={showPrevious} aria-label="Previous image"><ChevronLeft size={20} /> Previous</button>
                <button onClick={showNext} aria-label="Next image">Next <ChevronRight size={20} /></button>
              </div>
              <span>Image {activeImage + 1} of {project.images.length}</span>
            </div>
          )}
          <div className="project-lightbox-thumbnails" aria-label="Project image selector">
            {project.images.map((image, index) => (
              <button key={image} className={index === activeImage ? 'active' : ''} onClick={() => setActiveImage(index)} aria-label={`Show image ${index + 1}`}>
                <img src={image} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </footer>
      </article>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="container nav">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Go to home">
            <span className="brand-mark">MA</span>
            <span className="brand-name">Maroom Abdalla</span>
          </button>

          <div className="nav-links desktop-nav">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item)}>{item}</button>
            ))}
          </div>

          <div className="nav-actions">
            <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button asChild variant="outline" className="desktop-cv">
              <a href="/Maroom_Abdalla_CV.pdf" target="_blank" rel="noreferrer">
                CV <Download size={16} />
              </a>
            </Button>
            <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="mobile-panel container">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item)}>{item}</button>
            ))}
            <a href="/Maroom_Abdalla_CV.pdf" target="_blank" rel="noreferrer">Download CV</a>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <Badge className="eyebrow"><Sparkles size={13} /> Computer Science · Full-Stack Development</Badge>
              <p className="hero-kicker">Hi, I’m Maroom.</p>
              <h1>I build thoughtful software with <em>clarity, structure,</em> and purpose.</h1>
              <p className="hero-description">
                Computer Science graduate growing across backend engineering, modern full-stack development, and AI-driven software — with a strong foundation in Java, React, Python, APIs, and databases.
              </p>
              <div className="hero-actions">
                <Button onClick={() => scrollTo('Experience')}>Explore my journey <ArrowDown size={17} /></Button>
                <Button asChild variant="ghost">
                  <a href="mailto:maroomabdallah@gmail.com">Let’s connect <ArrowUpRight size={17} /></a>
                </Button>
              </div>
              <div className="social-row">
                <a href="https://github.com/maroomabdallah-ux" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /> GitHub</a>
                <a href="https://www.linkedin.com/in/maroom-abdalla" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /> LinkedIn</a>
              </div>
            </div>

            <div className="hero-visual reveal delay-1" aria-hidden="true">
              <div className="portrait-frame">
                <div className="portrait-orbit orbit-one" />
                <div className="portrait-orbit orbit-two" />
                <div className="monogram">M</div>
                <div className="floating-note note-top">clean systems</div>
                <div className="floating-note note-bottom">curious mind</div>
              </div>
              <div className="signature">Maroom</div>
            </div>
          </div>
        </section>

        <section id="about" className="section soft-section">
          <div className="container split-layout">
            <div className="section-heading">
              <span className="section-index">01</span>
              <p className="overline">About</p>
              <h2>Technology changes. The way I learn doesn’t.</h2>
            </div>
            <div className="about-copy">
              <p className="lead">
                I’m a Computer Science graduate who enjoys understanding how software works from the inside out — from backend logic and databases to the experience people interact with on screen.
              </p>
              <p>
                My training journey has taken me through Spring Boot and microservices, enterprise Java web development, and now modern full-stack systems with React, FastAPI, PostgreSQL, Docker, and shadcn/ui. I care less about being tied to one language and more about mastering the concepts that make software reliable, maintainable, and useful.
              </p>
              <div className="about-values">
                <div><span>01</span><strong>Structured thinking</strong></div>
                <div><span>02</span><strong>Continuous learning</strong></div>
                <div><span>03</span><strong>Clean execution</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <div className="section-title-row">
              <div>
                <p className="overline">Capabilities</p>
                <h2>What I work with.</h2>
              </div>
              <p className="section-note">A growing toolkit built through real projects, not just tutorials.</p>
            </div>
            <div className="skills-grid">
              {skills.map((group, index) => (
                <Card key={group.title} className="skill-card">
                  <CardContent>
                    <div className="skill-number">0{index + 1}</div>
                    <Code2 size={24} />
                    <h3>{group.title}</h3>
                    <div className="tag-cloud">
                      {group.items.map((item) => <Badge key={item}>{item}</Badge>)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section soft-section">
          <div className="container">
            <div className="section-title-row">
              <div>
                <p className="overline">Experience</p>
                <h2>A journey built layer by layer.</h2>
              </div>
              <BriefcaseBusiness className="section-icon" size={30} />
            </div>

            <div className="timeline">
              {experience.map((item, index) => (
                <article className="timeline-item" key={item.company}>
                  <div className="timeline-meta">
                    <span className="timeline-dot" />
                    <p>{item.period}</p>
                    {item.status && <Badge className="current-badge">{item.status}</Badge>}
                  </div>
                  <div className="timeline-content">
                    <p className="company">{item.company}</p>
                    <h3>{item.role}</h3>
                    <p className="experience-summary">{item.summary}</p>
                    <ul>
                      {item.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </div>
                  <div className="timeline-count">0{experience.length - index}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="container">
            <div className="section-title-row">
              <div>
                <p className="overline">Selected Work</p>
                <h2>Projects, thoughtfully documented.</h2>
              </div>
              <p className="section-note">A selection of full-stack systems built around real business and user needs.</p>
            </div>
            <div className="projects-grid">
              {projects.map((project) => <ProjectCard project={project} onOpen={setActiveProject} key={project.number} />)}
            </div>
          </div>
        </section>

        <section id="education" className="section soft-section">
          <div className="container education-grid">
            <div>
              <p className="overline">Education</p>
              <h2>Strong foundations, still evolving.</h2>
            </div>
            <Card className="education-card">
              <CardContent>
                <div className="education-icon"><GraduationCap size={26} /></div>
                <div>
                  <span className="education-year">Bachelor’s Degree</span>
                  <h3>Computer Science</h3>
                  <p>The World Islamic Sciences and Education University · Jordan</p>
                  <Separator />
                  <p className="education-detail">Excellent academic standing</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-card">
            <div>
              <p className="overline light-overline">Contact</p>
              <h2>Have something meaningful to build?</h2>
              <p>I’m always open to thoughtful conversations, learning opportunities, and software projects that create real value.</p>
            </div>
            <div className="contact-actions">
              <div className="contact-links">
                <Button asChild className="light-button">
                  <a href="mailto:maroomabdallah@gmail.com"><Mail size={17} /> <span>maroomabdallah@gmail.com</span></a>
                </Button>
                <Button asChild className="light-button">
                  <a href="tel:+962790026786"><Phone size={17} /> <span>+962 79 002 6786</span></a>
                </Button>
              </div>
              <div className="contact-socials">
                <a href="https://github.com/maroomabdallah-ux" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon size={19} /></a>
                <a href="https://www.linkedin.com/in/maroom-abdalla" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={19} /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Maroom Abdalla</p>
          <p>Designed with intention. Built with React.</p>
        </div>
      </footer>
      {activeProject && <ProjectLightbox project={activeProject} onClose={() => setActiveProject(null)} />}
    </div>
  )
}

export default App
