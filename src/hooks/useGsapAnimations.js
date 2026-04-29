import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations(appRef, isReady) {
  useLayoutEffect(() => {
    if (!isReady) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ==========================================
        // 1. EPIC HERO ENTRANCE TIMELINE
        // ==========================================
        const heroTl = gsap.timeline();

        heroTl
          .fromTo('.hero-bg-orb',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
          )
          // Sick 3D Flip Reveal for the Picture Frame
          .fromTo('.hero-portrait-container',
            { scale: 0, rotateY: 180, opacity: 0, y: 50 },
            { scale: 1, rotateY: 0, opacity: 1, y: 0, duration: 1.5, ease: 'back.out(1.5)' },
            "-=1"
          )
          .fromTo('.word-wrapper span',
            { y: '120%', skewY: 10, rotateX: 45, opacity: 0 },
            { y: '0%', skewY: 0, rotateX: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out' },
            "-=1"
          )
          .fromTo('.balloon-wrapper',
            { y: 300, scale: 0.2, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 1.8, stagger: 0.15, ease: 'elastic.out(1.2, 0.4)' },
            "-=0.8"
          )
          .fromTo('.candle-body',
            { y: -400, scaleY: 1.5, scaleX: 0.5, opacity: 0 },
            { y: 0, scaleY: 1, scaleX: 1, opacity: 1, duration: 1, ease: 'bounce.out' },
            "-=1.2"
          )
          .fromTo('.flame-wrapper',
            { scale: 0, opacity: 0 },
            { scale: 2.5, opacity: 1, duration: 0.15, ease: 'power2.out' },
            "-=0.2"
          )
          .to('.flame-wrapper', { scale: 1, duration: 0.8, ease: 'elastic.out(1.5, 0.3)' })
          .fromTo('.hero-subtitle',
            { y: 30, opacity: 0, filter: 'blur(15px)', rotateX: -20 },
            { y: 0, opacity: 1, filter: 'blur(0px)', rotateX: 0, duration: 1.2, ease: 'power3.out' },
            "-=0.9"
          );

        // ==========================================
        // 2. HERO EXIT PARALLAX (Bug Fixed!)
        // ==========================================
        // We animate the WRAPPER instead of individual items. 
        // Using fromTo ensures GSAP perfectly resets it when scrolling back up!
        gsap.fromTo('.hero-content-wrapper',
          { y: 0, opacity: 1, scale: 1 },
          {
            y: -250, opacity: 0, scale: 0.9,
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: 'bottom 20%',
              scrub: 1
            }
          }
        );

        gsap.fromTo('.hero-bg-orb',
          { y: 0, opacity: 1, scale: 1 },
          {
            y: 300, opacity: 0, scale: 1.5,
            scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 3 }
          }
        );

        // Continuous Magic Floating for Frame & Props
        gsap.to('.hero-portrait-container', { y: -15, rotation: 3, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.morph-candle', { scale: 1.05, rotate: 2, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.bw-1', { y: -100, x: 50, rotation: 15, scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.to('.bw-2', { y: 120, x: -50, rotation: -20, scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.2 } });
        gsap.to('.bw-3', { y: -80, x: -30, scale: 1.3, scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 0.8 } });

        // ==========================================
        // 3. PREMIUM WISHES SHOWCASE
        // ==========================================
        gsap.fromTo('.wishes-header .section-tag',
          { y: 30, opacity: 0, letterSpacing: '0px' },
          { y: 0, opacity: 1, letterSpacing: '3px', duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.wishes-header', start: 'top 85%' } }
        );
        gsap.fromTo('.wishes-title',
          { y: 50, opacity: 0, rotateX: -40, transformOrigin: 'bottom center' },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: 'back.out(1.2)', scrollTrigger: { trigger: '.wishes-header', start: 'top 85%' } }
        );

        gsap.utils.toArray('.premium-wish-card').forEach((card) => {
          const isLeft = card.classList.contains('align-left');
          gsap.fromTo(card,
            { x: isLeft ? -100 : 100, y: 100, opacity: 0, rotateY: isLeft ? 15 : -15 },
            {
              x: 0, y: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'elastic.out(1, 0.75)',
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
            }
          );
        });
        // ==========================================
        // 4. OTHER SECTIONS SCROLL TRIGGERS
        // ==========================================

        // ✨ RARE: 3D Cinematic Billboard Flip Entrance ✨
        gsap.utils.toArray('.carousel-row').forEach((row, i) => {
          gsap.fromTo(row,
            {
              opacity: 0,
              rotateX: -80, // Flipped completely backward
              z: -800,      // Pushed deep into the background
              y: 200,       // Dropped down slightly
              scale: 0.8,
              transformOrigin: "50% 50% -200px", // Rotates around a deep 3D pivot
              filter: "blur(20px)" // Camera focus-pull effect
            },
            {
              opacity: 1,
              rotateX: 0,
              z: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.5,
              delay: i * 0.2, // Row 1 drops in, then Row 2, then Row 3
              ease: "expo.out",
              scrollTrigger: {
                trigger: '.gallery-section',
                start: 'top 75%',
                // 'play' on scroll down, 'reverse' beautifully on scroll up!
                toggleActions: 'play none none reverse'
              }
            }
          );
        });

        gsap.utils.toArray('.memory-pill').forEach((pill, i) => {
          gsap.fromTo(pill,
            { x: i % 2 === 0 ? -80 : 80, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
              scrollTrigger: { trigger: '.memories-section', start: 'top 80%', toggleActions: 'play none none reverse' }
            }
          );
        });

        const pinTimeline = gsap.timeline({ scrollTrigger: { trigger: '.promise-section', start: 'top 80%', end: 'bottom bottom', scrub: 1 } });
        pinTimeline
          .fromTo('.promise-crown', { scale: 0, rotation: -360, y: -100 }, { scale: 1, rotation: 0, y: 0, duration: 1 })
          .fromTo('.promise-content h2', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.5')
          .fromTo('.promise-content p', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, '-=0.5');

        gsap.fromTo('.closing-card',
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.6)',
            scrollTrigger: { trigger: '.closing-section', start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );

      }, appRef);

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timer);
  }, [appRef, isReady]);
}