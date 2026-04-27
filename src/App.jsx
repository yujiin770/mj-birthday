import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// Birthday content for a 9-year-old niece
const wishCards = [
  {
    title: 'Magical Adventures',
    text: 'May your days be filled with exciting discoveries, new friends, and wonderful stories waiting to be written!',
    color: '#FFB347'
  },
  {
    title: 'Big Dreams',
    text: 'Whatever you want to be when you grow up - a scientist, artist, teacher, or superhero - know that you can do ANYTHING!',
    color: '#6C5CE7'
  },
  {
    title: 'Endless Smiles',
    text: 'May you always find reasons to laugh, play, and be your amazing, wonderful, one-of-a-kind self!',
    color: '#FF6B9D'
  }
]

const memoryQuotes = [
  'Your imagination can take you anywhere in the universe',
  'Every day you teach us something new about joy',
  'The bravest hearts belong to those who keep dreaming',
  'You make the ordinary feel like a celebration'
]

const galleryItems = [
  { 
    title: 'Birthday Wishes', 
    description: 'A special message just for you',
    prompt: '✨ Make a wish ✨'
  },
  { 
    title: 'Favorite Memories', 
    description: 'All the fun times we shared',
    prompt: '🎈 Blow the balloons 🎈'
  },
  { 
    title: 'Secret Surprise', 
    description: 'Something magical awaits',
    prompt: '🎁 Open me! 🎁'
  },
  { 
    title: 'Future Fun', 
    description: 'New adventures coming soon',
    prompt: '🌟 Coming soon 🌟'
  }
]

function App() {
  const appRef = useRef(null)
  const [showSplash, setShowSplash] = useState(true)
  const [countdownValue, setCountdownValue] = useState(3)
  const countdownRef = useRef(null)

  // COUNTDOWN EFFECT - 3, 2, 1, GO!
  useEffect(() => {
    if (!showSplash) return
    
    let current = 3
    const countdownInterval = setInterval(() => {
      current -= 1
      setCountdownValue(current)
      
      if (current <= 0) {
        clearInterval(countdownInterval)
        // Small delay after "GO!" before removing splash
        setTimeout(() => {
          setShowSplash(false)
        }, 500)
      }
    }, 1000)
    
    return () => clearInterval(countdownInterval)
  }, [showSplash])

  useLayoutEffect(() => {
    if (showSplash) return

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // ENTRANCE ANIMATIONS
        gsap.from('.hero-title span', {
          y: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'back.out(1.2)'
        })
        
        gsap.from('.hero-subtitle', {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'power3.out'
        })
        
        gsap.from('.hero-buttons a', {
          scale: 0,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          delay: 0.6,
          ease: 'back.out(1.2)'
        })
        
        gsap.from('.floating-balloon', {
          y: 100,
          opacity: 0,
          duration: 1,
          delay: 0.8,
          stagger: 0.1
        })
        
        // MORPHING CANDLE
        gsap.to('.morph-candle', {
          scale: 1.2,
          rotate: 360,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        })
        
        gsap.to('.candle-flame', {
          scale: 1.3,
          opacity: 0.7,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
        
        // PARALLAX FLOATING ELEMENTS
        gsap.to('.float-1', {
          y: -60,
          x: 40,
          rotation: 15,
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        })
        
        gsap.to('.float-2', {
          y: 80,
          x: -50,
          rotation: -20,
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2
          }
        })
        
        gsap.to('.float-3', {
          y: -40,
          x: -30,
          scale: 1.3,
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8
          }
        })
        
        // WISH CARDS STAGGER
        gsap.utils.toArray('.wish-card').forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: '.wishes-section',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            rotation: i % 2 === 0 ? -5 : 5,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'back.out(0.8)'
          })
        })
        
        // GALLERY CARDS - BOUNCE IN
        gsap.utils.toArray('.gallery-card').forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: '.gallery-section',
              start: 'top 80%'
            },
            scale: 0,
            opacity: 0,
            rotation: 360,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'back.out(1)'
          })
          
          gsap.to(card, {
            y: -15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2
          })
        })
        
        // MEMORY PILLS
        gsap.utils.toArray('.memory-pill').forEach((pill, i) => {
          gsap.from(pill, {
            scrollTrigger: {
              trigger: '.memories-section',
              start: 'top 80%'
            },
            x: i % 2 === 0 ? -80 : 80,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out'
          })
        })
        
        // PROMISE SECTION
        const pinTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.promise-section',
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
            pin: false
          }
        })
        
        pinTimeline
          .fromTo('.promise-crown',
            { scale: 0, rotation: -360, y: -100 },
            { scale: 1, rotation: 0, y: 0, duration: 1 }
          )
          .fromTo('.promise-content h2',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            '-=0.5'
          )
          .fromTo('.promise-content p',
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1 },
            '-=0.5'
          )
        
        // CLOSING SECTION
        gsap.from('.closing-card', {
          scrollTrigger: {
            trigger: '.closing-section',
            start: 'top 80%'
          },
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'elastic.out(1, 0.6)'
        })
        
      }, appRef)
      
      return () => ctx.revert()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [showSplash])

  // SPLASH SCREEN WITH COUNTDOWN
  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          {countdownValue > 0 ? (
            <>
              <div className="countdown-number">{countdownValue}</div>
              <p className="countdown-text">Get ready...</p>
            </>
          ) : (
            <>
              <div className="countdown-number go">GO!</div>
              <p className="countdown-text">Here we go!</p>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="app" ref={appRef}>
      {/* CONFETTI PIECES */}
      {[...Array(30)].map((_, i) => (
        <div key={i} className="confetti-piece" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          backgroundColor: ['#FFB347', '#6C5CE7', '#FF6B9D', '#00CEC9', '#FFEAA7'][Math.floor(Math.random() * 5)],
          animationDelay: `${Math.random() * 5}s`
        }}></div>
      ))}
      
      <main>
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="float-1 floating-balloon"></div>
          <div className="float-2 floating-balloon"></div>
          <div className="float-3 floating-balloon"></div>
          
          <div className="morph-candle">
            <div className="candle-body"></div>
            <div className="candle-flame"></div>
          </div>
          
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                <span>Happy</span>
                <span>9th</span>
                <span>Birthday</span>
              </h1>
              <p className="hero-subtitle">To the most AMAZING 9-year-old in the whole wide world!</p>
              <div className="hero-buttons">
                <a href="#wishes" className="btn-primary">🎈 Start the Fun 🎈</a>
                <a href="#closing" className="btn-secondary">💝 A Special Message 💝</a>
              </div>
            </div>
          </div>
        </section>
        
        {/* WISHES SECTION */}
        <section className="wishes-section" id="wishes">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">✨ Three Birthday Wishes ✨</span>
              <h2>Made Just For You</h2>
              <div className="section-line"></div>
            </div>
            
            <div className="wishes-grid">
              {wishCards.map((wish, idx) => (
                <div className="wish-card" key={idx} style={{ borderTopColor: wish.color }}>
                  <div className="wish-number">{idx + 1}</div>
                  <h3>{wish.title}</h3>
                  <p>{wish.text}</p>
                  <div className="wish-decoration"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* GALLERY PLACEHOLDERS SECTION */}
        <section className="gallery-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-tag">🎁 Fun Surprises 🎁</span>
              <h2>Interactive Placeholders</h2>
              <p className="section-subtitle">Tap or hover to see the magic!</p>
            </div>
            
            <div className="gallery-grid">
              {galleryItems.map((item, idx) => (
                <div className="gallery-card" key={idx}>
                  <div className="gallery-placeholder">
                    <div className="placeholder-overlay"></div>
                    <div className="placeholder-content">
                      <div className="placeholder-icon"></div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <div className="placeholder-prompt">{item.prompt}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* MEMORIES SECTION */}
        <section className="memories-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-tag">💖 You're Amazing Because 💖</span>
              <h2>Little Reminders</h2>
            </div>
            
            <div className="memories-grid">
              {memoryQuotes.map((quote, idx) => (
                <div className="memory-pill" key={idx}>
                  <div className="pill-dot"></div>
                  <p>{quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* PROMISE SECTION */}
        <section className="promise-section">
          <div className="promise-crown">👑</div>
          <div className="floating-stars">
            {[...Array(15)].map((_, i) => (
              <span key={i} style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`
              }}>⭐</span>
            ))}
          </div>
          
          <div className="promise-content">
            <div className="promise-inner">
              <span className="promise-label">🌟 A Very Special Promise 🌟</span>
              <h2>You are a STAR, and you'll always shine bright!</h2>
              <p>No matter how tall you grow or how far you go, you will always have someone who believes in you, cheers for you, and loves you more than words can say.</p>
              <div className="promise-heart"></div>
            </div>
          </div>
        </section>
        
        {/* CLOSING SECTION */}
        <section className="closing-section" id="closing">
          <div className="container">
            <div className="closing-card">
              <div className="closing-header"></div>
              <div className="closing-content">
                <span className="closing-tag">🎉 🎂 🎈</span>
                <h2>Have the BEST Birthday Ever!</h2>
                <p>You're 9 years old now - that's a whole new chapter of fun, learning, and amazing adventures! Enjoy every single moment of your special day, dear niece.</p>
                <div className="closing-signature">
                  <div className="signature-dots"></div>
                  <p>We love you to the moon and back! 💕</p>
                  <div className="signature-dots"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </main>
    </div>
  )
}

export default App