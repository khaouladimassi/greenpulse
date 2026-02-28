import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, AlertTriangle, Cpu } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Switch } from "@/components/ui/switch";
import MetricCard from "@/components/MetricCard";
import { forecastData } from "@/lib/mockData";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Predictions = () => {
  const [autoOptimize, setAutoOptimize] = useState(false);
  const { t } = useLanguage();

  const chartTooltipStyle = {
    contentStyle: {
      backgroundColor: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "8px",
      fontSize: "12px",
      color: "hsl(var(--foreground))",
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">{t("pred.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("pred.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title={t("pred.monthlyBill")} value="$1,247" icon={DollarSign} variant="accent" trend={{ value: "11%", positive: false }} />
        <MetricCard title={t("pred.predictedPeak")} value="62.1" unit="kWh" icon={TrendingUp} variant="primary" />
        <MetricCard title={t("pred.overloadRisk")} value={t("pred.low")} icon={AlertTriangle} />
        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card p-5 glow-yellow flex flex-col justify-between"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{t("pred.autoOptimize")}</p>
          <div className="flex items-center gap-3">
            <Switch
              checked={autoOptimize}
              onCheckedChange={(v) => {
                setAutoOptimize(v);
                toast.success(v ? t("pred.enabled") : t("pred.disabled"));
              }}
            />
            <span className={`text-sm font-display font-bold ${autoOptimize ? "text-accent" : "text-muted-foreground"}`}>
              {autoOptimize ? t("pred.active") : t("pred.off")}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display text-sm font-semibold text-foreground mb-4">{t("pred.forecastChart")}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(45 100% 51%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(45 100% 51%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(122 39% 49%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(122 39% 49%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
            <Tooltip {...chartTooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Area type="monotone" dataKey="forecast" name={t("pred.standardForecast")} stroke="hsl(45 100% 51%)" fill="url(#colorForecast)" strokeWidth={2} />
            <Area type="monotone" dataKey="optimized" name={t("pred.aiOptimized")} stroke="hsl(122 39% 49%)" fill="url(#colorOptimized)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Predictions;
