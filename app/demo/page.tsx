import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-brand-gradient-soft to-background">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Demo Coming Soon!
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            We're crafting an amazing interactive demo to showcase our platform's powerful features. 
            In the meantime, why not explore everything for free?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            href="/auth/signup" 
            className="btn btn-primary px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300"
          >
            Start Free Trial
          </Link>
          <Link 
            href="/track-finder" 
            className="btn btn-ghost px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300"
          >
            Find Your Track
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-card-border">
            <div className="text-3xl mb-3">💼</div>
            <h3 className="font-semibold mb-2">Career Readiness</h3>
            <p className="text-sm text-muted-foreground">Resume building, interviews, job prep</p>
          </div>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-card-border">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-semibold mb-2">Entrepreneurship</h3>
            <p className="text-sm text-muted-foreground">Mentorship, validation, MVP building</p>
          </div>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-card-border">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold mb-2">Exam Preparation</h3>
            <p className="text-sm text-muted-foreground">Structured roadmaps, mock tests, AI plans</p>
          </div>
        </div>
      </div>
    </div>
  );
}