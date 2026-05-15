import React, { useEffect } from 'react';
import './editor-portfolio.css';
import EditorNav from './EditorNav';
import EditorHero from './EditorHero';
import EditorSpotlight from './EditorSpotlight';
import EditorWork from './EditorWork';
import { EditorTheCraft, EditorServices, EditorProcess, EditorAbout, EditorContact } from './EditorSections';
import EditorFooter from './EditorFooter';
import ScrollReveal from '@/components/portfolio/ScrollReveal';

/**
 * Video editor / motion portfolio — isolated route and styles.
 * Design direction: Cinematic Void — noir + neon + film grain.
 */
export default function EditorPortfolioPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Zodiac Edits — Video Editor | Prasanth Zodiac';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="editor-portfolio-root relative min-h-screen overflow-x-hidden bg-[#0A0A0F]">
      <EditorNav />
      <main className="relative z-[1]">
        <EditorHero />
        <ScrollReveal variant="slide-up" duration={0.9}>
          <EditorSpotlight />
        </ScrollReveal>
        <ScrollReveal variant="slide-left" duration={0.9}>
          <EditorTheCraft />
        </ScrollReveal>
        <ScrollReveal variant="scale" duration={0.85}>
          <EditorServices />
        </ScrollReveal>
        <ScrollReveal variant="blur" duration={0.95}>
          <EditorProcess />
        </ScrollReveal>
        <ScrollReveal variant="slide-up" duration={0.9}>
          <EditorWork />
        </ScrollReveal>
        <ScrollReveal variant="slide-right" duration={0.9}>
          <EditorAbout />
        </ScrollReveal>
        <ScrollReveal variant="fade" duration={0.85}>
          <EditorContact />
        </ScrollReveal>
      </main>
      <EditorFooter />
    </div>
  );
}
