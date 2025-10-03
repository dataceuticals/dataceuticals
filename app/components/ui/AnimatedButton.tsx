"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "magnetic";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false
}: AnimatedButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 transform relative overflow-hidden group";
  
  const variants = {
    primary: "bg-brand-gradient text-white hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent/30",
    secondary: "bg-card border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white",
    ghost: "bg-transparent border border-brand-accent text-brand-accent hover:bg-brand-gradient-soft",
    magnetic: "bg-brand-gradient text-white hover:scale-110 hover:rotate-1 hover:shadow-2xl"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none" : "";

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={buttonClasses}
    >
      {content}
    </button>
  );
}