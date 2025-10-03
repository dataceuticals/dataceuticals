import Link from "next/link";
import Section from "./components/Section";
import EnhancedHero from "./components/EnhancedHero";
import InteractiveFeatures from "./components/InteractiveFeatures";
import TestimonialCarousel from "./components/TestimonialCarousel";
import GamifiedProgress from "./components/GamifiedProgress";
import MindBlowingStats from "./components/MindBlowingStats";
import ParallaxSection from "./components/ParallaxSection";
import HypnoticCTA from "./components/HypnoticCTA";
import TrustSignals from "./components/TrustSignals";
import FeatureShowcase from "./components/FeatureShowcase";
import { getHomepageSections } from "./config/navigation";

export default function Home() {
  const sections = getHomepageSections();
  return (
    <div className="pt-16">
      {/* Hero Section with Animations */}
      <div className="-mt-16">
        <EnhancedHero />
      </div>

      {/* Interactive Features */}
      <InteractiveFeatures />

      {/* Trust Signals */}
      <TrustSignals />

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Mind-Blowing Stats */}
      <MindBlowingStats />

      {/* Parallax Experience */}
      <ParallaxSection />

      {/* Gamified Progress */}
      <GamifiedProgress />

      {/* Success Stories */}
      <TestimonialCarousel />

      {/* Hypnotic CTA */}
      <HypnoticCTA />

      {/* Three Core Tracks */}
      <Section title="Choose Your Success Track" background="bg-gradient-to-b from-background via-brand-gradient-soft to-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link href="/guidance/career" className="group relative block p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-card-border hover:border-brand-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-accent/10 transform hover:-translate-y-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl">
                💼
              </div>
              <div className="text-sm font-medium text-blue-600 uppercase tracking-wider">Track 1</div>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">Career Readiness</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">Resume building, mock interviews, skill bootcamps, and job readiness certificates</p>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              Start Journey
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/guidance/entrepreneurship" className="group relative block p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-card-border hover:border-brand-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-accent/10 transform hover:-translate-y-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-2xl">
                🚀
              </div>
              <div className="text-sm font-medium text-green-600 uppercase tracking-wider">Track 2</div>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">Entrepreneurship</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">Mentorship, idea validation, MVP building, pitch practice, and investor connects</p>
            <div className="flex items-center text-green-600 text-sm font-medium">
              Start Journey
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/guidance/exams" className="group relative block p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-card-border hover:border-brand-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-accent/10 transform hover:-translate-y-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl">
                📚
              </div>
              <div className="text-sm font-medium text-purple-600 uppercase tracking-wider">Track 3</div>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">Exam Preparation</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">Structured roadmaps, mock tests, AI-personalized study plans, and doubt-solving guidance</p>
            <div className="flex items-center text-purple-600 text-sm font-medium">
              Start Journey
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* How It Works */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">How Your Journey Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-primary text-brand-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
              <p className="text-sm font-medium">Assessment</p>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <svg className="w-8 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-primary text-brand-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
              <p className="text-sm font-medium">Guided Path</p>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <svg className="w-8 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-primary text-brand-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
              <p className="text-sm font-medium">Achievement</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Community & Support */}
      <Section title="Community & Support" background="bg-gradient-to-b from-background to-brand-gradient-soft">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.slice(0, 4).map((s, index) => (
            <Link key={s.key} href={s.href} className="group relative block p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-card-border hover:border-brand-accent/50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-accent transition-colors">{s.label}</h3>
              <p className="text-muted-foreground text-sm">Connect, learn, and grow with our community</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
