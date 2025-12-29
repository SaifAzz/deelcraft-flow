import * as React from "react";

interface MindLinksLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  variant?: "dark" | "light";
}

export const MindLinksLogo: React.FC<MindLinksLogoProps> = ({
  className = "",
  size = "md",
  showIcon = false,
  variant = "dark"
}) => {
  const heightClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="Mind Links Logo" 
        className={`${heightClasses[size]} w-auto object-contain`}
      />
    </div>
  );
};
