import React, { useEffect } from 'react';
import './editor-portfolio.css';
import EditorNav from './EditorNav';
import EditorHero from './EditorHero';
import EditorSpotlight from './EditorSpotlight';
import EditorWork from './EditorWork';
import { EditorTheCraft, EditorServices, EditorProcess, EditorAbout, EditorContact } from './EditorSections';
import EditorFooter from './EditorFooter';

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
        <EditorSpotlight />
        <EditorTheCraft />
        <EditorServices />
        <EditorProcess />
        <EditorWork />
        <EditorAbout />
        <EditorContact />
      </main>
      <EditorFooter />
    </div>
  );
}
