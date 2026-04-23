import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const wishCards = [
  {
    title: 'A year full of wonder',
    text: 'May every month surprise you with brave little adventures, bright laughter, and beautiful memories you will keep forever.',
  },
  {
    title: 'Dreams that keep growing',
    text: 'May your heart stay playful, your imagination stay big, and your future keep opening into lovely new possibilities.',
  },
  {
    title: 'Joy you can feel',
    text: 'May you always be surrounded by people who cheer for you, protect your smile, and remind you how deeply loved you are.',
  },
]

const memoryNotes = [
  'Your smile makes every room feel warmer.',
  'Your kindness is already a beautiful superpower.',
  'Your laughter turns ordinary days into celebrations.',
  'Your future is shining so brightly already.',
]

function App() {
  const appRef = useRef(null)
  const [countdown, setCountdown] = useState(3)
  const [showLoader, setShowLoader] = useState(true)
  const [isExitingLoader, setIsExitingLoader] = useState(false)

  useEffect(() => {
    let current = 3

    const timer = window.setInterval(() => {
      current -= 1
      setCountdown(current)

      if (current <= 0) {
        window.clearInterval(timer)
        setIsExitingLoader(true)
        window.setTimeout(() => {
          setShowLoader(false)
        }, 900)
      }
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  useLayoutEffect(() => {
    if (showLoader || !appRef.current) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.set('.hero-title, .hero-copy, .hero-badge, .hero-actions', {
        opacity: 0,
        y: 48,
      })
      gsap.set('.wish-card, .memory-pill, .closing-panel', {
        opacity: 0,
        y: 70,
      })

      const introTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      introTimeline
        .from('.hero-backdrop', {
          opacity: 0,
          scale: 0.88,
          duration: 1.2,
        })
        .to(
          '.hero-badge, .hero-title, .hero-copy, .hero-actions',
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          '-=0.75',
        )
        .from(
          '.hero-card',
          {
            opacity: 0,
            x: 60,
            rotate: 8,
            duration: 1,
          },
          '-=0.8',
        )

      gsap.to('.orb--one', {
        yPercent: -18,
        xPercent: 10,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.orb--two', {
        yPercent: 20,
        xPercent: -14,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.hero-card', {
        yPercent: -18,
        rotate: -5,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.morph-blob', {
        borderRadius: '64% 36% 48% 52% / 42% 58% 42% 58%',
        scale: 1.08,
        rotation: 20,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.spark-ring', {
        rotation: 360,
        duration: 16,
        repeat: -1,
        ease: 'none',
      })

      gsap.utils.toArray('.wish-card').forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
          },
          delay: index * 0.08,
        })
      })

      gsap.utils.toArray('.memory-pill').forEach((pill, index) => {
        gsap.to(pill, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.memories-grid',
            start: 'top 80%',
          },
          delay: index * 0.1,
        })
      })

      gsap.to('.story-spotlight', {
        yPercent: -16,
        scale: 1.06,
        scrollTrigger: {
          trigger: '.story',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      const promiseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.promise',
          start: 'top top',
          end: '+=140%',
          scrub: true,
          pin: true,
        },
      })

      promiseTimeline
        .fromTo(
          '.promise-glow',
          { scale: 0.8, opacity: 0.35 },
          { scale: 1.2, opacity: 0.9, ease: 'none' },
        )
        .fromTo(
          '.promise-copy',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1,
        )
        .fromTo(
          '.promise-stars span',
          { y: 30, opacity: 0 },
          { y: -18, opacity: 1, stagger: 0.08, ease: 'none' },
          0.12,
        )

      gsap.to('.closing-panel', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.closing',
          start: 'top 78%',
        },
      })
    }, appRef)

    return () => context.revert()
  }, [showLoader])

  return (
    <div className="birthday-app" ref={appRef}>
      {showLoader && (
        <div
          className={`loading-screen${isExitingLoader ? ' loading-screen--exit' : ''}`}
        >
          <div className="loading-screen__glow" />
          <div className="loading-screen__content">
            <p className="eyebrow">Birthday surprise loading</p>
            <div className="countdown">{countdown > 0 ? `0${countdown}` : 'Go'}</div>
            <p className="loading-copy">
              Preparing a magical greeting for your wonderful niece.
            </p>
            <div className="loading-bar">
              <span />
            </div>
          </div>
        </div>
      )}

      <main className="page-shell">
        <section className="hero">
          <div className="hero-backdrop">
            <div className="orb orb--one" />
            <div className="orb orb--two" />
            <div className="spark-ring" />
            <div className="morph-blob" />
          </div>

          <div className="hero-copy-block">
            <p className="hero-badge">For a very special niece</p>
            <h1 className="hero-title">
              Happy Birthday to the sweetest light in the family
            </h1>
            <p className="hero-copy">
              Today is all about celebrating your joy, your sparkle, and the
              beautiful person you are becoming every single day.
            </p>
            <div className="hero-actions">
              <a href="#wishes">See your birthday wishes</a>
              <a href="#finale" className="hero-actions__ghost">
                Jump to the love note
              </a>
            </div>
          </div>

          <aside className="hero-card">
            <div className="hero-card__shine" />
            <p className="hero-card__label">Special wish</p>
            <h2>
              May your day feel as bright, playful, and unforgettable as your
              smile.
            </h2>
            <p>
              Keep shining, keep dreaming, and keep being the lovely heart that
              makes everyone proud.
            </p>
          </aside>
        </section>

        <section className="story" id="wishes">
          <div className="story-spotlight" />
          <div className="section-heading">
            <p className="eyebrow">A birthday wish in motion</p>
            <h2>Every scroll opens another little surprise for you</h2>
          </div>

          <div className="wishes-grid">
            {wishCards.map((wish) => (
              <article className="wish-card" key={wish.title}>
                <span className="wish-card__line" />
                <h3>{wish.title}</h3>
                <p>{wish.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="memories">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">Little truths about you</p>
            <h2>You make life softer, brighter, and more fun just by being you</h2>
          </div>

          <div className="memories-grid">
            {memoryNotes.map((note) => (
              <div className="memory-pill" key={note}>
                {note}
              </div>
            ))}
          </div>
        </section>

        <section className="promise">
          <div className="promise-glow" />
          <div className="promise-stars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="promise-copy">
            <p className="eyebrow">Pinned birthday moment</p>
            <h2>
              No matter how fast you grow, you will always be surrounded by love,
              prayers, and people cheering for your happiness.
            </h2>
          </div>
        </section>

        <section className="closing" id="finale">
          <div className="closing-panel">
            <p className="eyebrow">With all our love</p>
            <h2>Have the happiest birthday, dear niece.</h2>
            <p>
              May this new chapter bring you sweet days, brave dreams, endless
              laughter, and beautiful moments that feel like magic.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
