import { motion } from "framer-motion";
import { Brain, AlertTriangle, TrendingDown, Lightbulb, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { aiInsights, recommendations } from "@/lib/mockData";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const typeConfig = {
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  optimization: { icon: TrendingDown, color: "text-primary", bg: "bg-primary/10" },
  alert: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
};

const AIAnalysis = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">{t("ai.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("ai.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: t("ai.vsLastWeek"), value: "-12.4%", positive: true },
          { label: t("ai.vsLastMonth"), value: "-8.7%", positive: true },
          { label: t("ai.peakDetected"), value: "11:30 AM", positive: false },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 text-center"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{stat.label}</p>
            <p className={`text-2xl font-display font-bold ${stat.positive ? "text-primary" : "text-accent"}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-accent" />
          <h2 className="font-display text-lg font-semibold text-foreground">{t("ai.insights")}</h2>
        </div>
        <div className="space-y-3">
          {aiInsights.map((insight, i) => {
            const config = typeConfig[insight.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-5 flex items-start gap-4"
              >
                <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">{t("ai.recommendations")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card p-5 flex items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">{rec.title}</h3>
                <p className="text-xs text-primary">{rec.impact}</p>
              </div>
              <Button
                size="sm"
                onClick={() => toast.success(`${rec.action}: ${rec.title}`)}
                className="text-xs font-display tracking-wider shrink-0 text-black"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                {rec.action}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
