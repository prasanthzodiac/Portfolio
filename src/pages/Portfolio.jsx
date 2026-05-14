import React from 'react';
import CustomCursor from '../components/portfolio/CustomCursor';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import TimelineSection from '../components/portfolio/TimelineSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import ContactSection from '../components/portfolio/ContactSection';
import NavBar from '../components/portfolio/NavBar';
import FloatingContact from '../components/portfolio/FloatingContact';
import ScrollReveal from '../components/portfolio/ScrollReveal';

export default function Portfolio() {
  return (
    <div className="noise-overlay bg-void min-h-screen overflow-x-hidden">
      <CustomCursor />
      <NavBar />

      {/* Hero — no reveal, it's the landing view */}
      <HeroSection />

      {/* About — slides in from left */}
      <ScrollReveal variant="slide-left" delay={0.05} duration={1}>
        <AboutSection />
      </ScrollReveal>

      {/* Timeline — blurs in */}
      <ScrollReveal variant="blur" delay={0.05} duration={1}>
        <TimelineSection />
      </ScrollReveal>

      {/* Skills — scales up */}
      <ScrollReveal variant="scale" delay={0.05} duration={0.95}>
        <SkillsSection />
      </ScrollReveal>

      {/* Projects — slides up with slight extra travel */}
      <ScrollReveal variant="slide-up" delay={0.05} duration={1}>
        <ProjectsSection />
      </ScrollReveal>

      {/* Contact — slides from right */}
      <ScrollReveal variant="slide-right" delay={0.05} duration={1}>
        <ContactSection />
      </ScrollReveal>

      <FloatingContact />
    </div>
  );
}