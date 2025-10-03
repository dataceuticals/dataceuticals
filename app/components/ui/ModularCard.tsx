"use client";

import { ReactNode } from "react";

interface ModularCardProps {
  children: ReactNode;
  variant?: "default" | "glow" | "magnetic" | "neomorphic";
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  className?: string;
}

export default function ModularCard({ 
  children, 
  variant = "default", 
  size = "md", 
  interactive = true,
  className = "" 
}: ModularCardProps) {
  const baseClasses = "rounded-3xl transition-all duration-300";
  
  const variants = {
    default: "bg-card/80 backdrop-blur-sm border border-card-border",
    glow: "bg-card/90 border border-card-border shadow-lg hover:shadow-brand-accent/20",
    magnetic: "bg-card/80 border border-card-border hover:scale-105 hover:shadow-2xl",
    neomorphic: "bg-card shadow-[20px_20px_60px_var(--shadow-dark),-20px_-20px_60px_var(--shadow-light)]"
  };

  const sizes = {
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  };

  const interactiveClasses = interactive 
    ? "hover:border-brand-accent/50 hover:-translate-y-1 cursor-pointer group" 
    : "";

  return (
    <div className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${interactiveClasses} ${className}`}>
      {children}
    </div>
  );
}