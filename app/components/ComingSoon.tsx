export default function ComingSoon({ title }: { title?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-brand-gradient-soft to-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        <div className="relative w-32 h-32 mx-auto">
          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 dark:from-purple-300 dark:to-blue-300 rounded-full animate-ping opacity-20 scale-110"></div>
          
          {/* Middle pulse ring */}
          <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 rounded-full animate-pulse opacity-40"></div>
          
          {/* Main circle with enhanced gradient */}
          <div className="relative w-full h-full bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 dark:from-purple-500 dark:via-purple-600 dark:to-blue-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 dark:border-gray-800/30">
            {/* Inner highlight */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent dark:from-white/20 dark:to-transparent rounded-full"></div>
            
            {/* Icon */}
            <span className="relative text-5xl text-white drop-shadow-lg animate-bounce" style={{animationDuration: '3s'}}>🔬</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Coming Soon</h1>
        {title && <h2 className="text-xl font-semibold text-brand-accent">{title}</h2>}
        <p className="text-muted-foreground leading-relaxed">
          We're crafting an exceptional learning experience for pharmaceutical students. 
          This section will be available soon with comprehensive resources and guidance.
        </p>
        <div className="pt-4">
          <div className="inline-flex items-center px-4 py-2 bg-card/80 backdrop-blur-sm border border-card-border text-foreground rounded-full text-sm font-medium">
            📚 Stay tuned for updates
          </div>
        </div>
      </div>
    </div>
  );
}