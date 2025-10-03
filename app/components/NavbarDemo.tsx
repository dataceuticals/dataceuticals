"use client";

import { useEnhancedScroll } from "../hooks/useScrollDirection";

export default function NavbarDemo() {
  const { direction, isVisible, scrollY, velocity, isAtTop } = useEnhancedScroll();

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-card/90 backdrop-blur-md border border-border rounded-lg p-4 text-xs font-mono shadow-lg">
      <div className="space-y-1">
        <div>Direction: <span className="text-brand-accent">{direction}</span></div>
        <div>Visible: <span className={isVisible ? "text-green-500" : "text-red-500"}>{isVisible ? "Yes" : "No"}</span></div>
        <div>Scroll Y: <span className="text-brand-primary">{Math.round(scrollY)}px</span></div>
        <div>Velocity: <span className="text-muted-foreground">{velocity.toFixed(2)}</span></div>
        <div>At Top: <span className={isAtTop ? "text-green-500" : "text-muted-foreground"}>{isAtTop ? "Yes" : "No"}</span></div>
      </div>
    </div>
  );
}