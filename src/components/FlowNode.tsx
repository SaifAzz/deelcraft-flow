import * as React from "react";
import { cn } from "@/lib/utils";

interface FlowNodeProps {
  title: string;
  color: "client" | "contractor" | "admin" | "system" | "backend" | "database" | "frontend";
  realWorld: string;
  underHood: string;
  example: string;
  modularAdvantage?: string;
  className?: string;
}

const colorClasses = {
  client: "bg-client hover:bg-client/90 border-client",
  contractor: "bg-contractor hover:bg-contractor/90 border-contractor",
  admin: "bg-admin hover:bg-admin/90 border-admin",
  system: "bg-primary hover:bg-primary/90 border-primary",
  backend: "bg-backend-service hover:bg-backend-service/90 border-backend-service",
  database: "bg-database hover:bg-database/90 border-database",
  frontend: "bg-secondary hover:bg-secondary/90 border-secondary",
};

export const FlowNode = ({ title, color, realWorld, underHood, example, modularAdvantage, className }: FlowNodeProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={cn(
          "px-4 py-3 rounded-lg text-white font-medium text-sm border-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg",
          colorClasses[color],
          className
        )}
      >
        {title}
      </div>
      
      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-96 p-4 bg-card border border-border rounded-lg shadow-lg">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-base">{title}</h4>
            
            <div>
              <p className="text-xs font-semibold text-primary mb-1">🌍 Real World:</p>
              <p className="text-sm text-muted-foreground">{realWorld}</p>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-secondary mb-1">⚙️ Under the Hood:</p>
              <p className="text-sm text-muted-foreground">{underHood}</p>
            </div>
            
            <div className="pt-2 border-t border-border">
              <p className="text-xs font-semibold text-accent mb-1">💡 Example:</p>
              <p className="text-sm text-muted-foreground italic">{example}</p>
            </div>
            
            {modularAdvantage && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-semibold text-backend-service mb-1">🔧 Modular Advantage:</p>
                <p className="text-sm text-muted-foreground">{modularAdvantage}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
