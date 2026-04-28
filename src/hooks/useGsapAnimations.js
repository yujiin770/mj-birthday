import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations(appRef, isReady) {
  useLayoutEffect(() => {
    if (!isReady) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // ENTRANCE ANIMATIONS
        gsap.from('.hero-title span', {
          y: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'back.out(1.2)'
        });
        
        gsap.from('.hero-subtitle', {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'power3.out'
        });
        
        gsap.from('.hero-buttons a', {
          scale: 0,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          delay: 0.6,
          ease: 'back.out(1.2)'
        });
        
        gsap.from('.floating-balloon', {
          y: 100,
          opacity: 0,
          duration: 1,
          delay: 0.8,
          stagger: 0.1
        });
        
        // MORPHING CANDLE
        gsap.to('.morph-candle', {
          scale: 1.2,
          rotate: 360,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
        
        gsap.to('.candle-flame', {
          scale: 1.3,
          opacity: 0.7,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        
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
        });
        
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
        });
        
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
        });
        
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
          });
        });
        
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
          });
          
          gsap.to(card, {
            y: -15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2
          });
        });
        
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
          });
        });
        
        // PROMISE SECTION
        const pinTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.promise-section',
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
            pin: false
          }
        });
        
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
          );
        
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
        });
        
      }, appRef);
      
      return () => ctx.revert();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [appRef, isReady]);
}
