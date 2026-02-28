import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  variant?: "default" | "primary" | "accent";
}

const MetricCard = ({ title, value, unit, icon: Icon, trend, variant = "default" }: MetricCardProps) => {
  const glowClass = variant === "primary" ? "glow-green" : variant === "accent" ? "glow-cyan" : "";
  const iconBg = variant === "primary"
    ? "bg-primary/10 text-primary"
    : variant === "accent"
    ? "bg-accent/10 text-accent"
    : "bg-secondary text-muted-foreground";

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className={`glass-card p-5 ${glowClass} transition-shadow duration-300`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            trend.positive ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
          }`}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-display font-bold text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
    </motion.div>
  );
};

export default MetricCard;
