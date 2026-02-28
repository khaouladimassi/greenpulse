import { motion } from "framer-motion";
import { Leaf, TreePine, Factory, Target } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

const Sustainability = () => {
  const { t } = useLanguage();

  const goals = [
    { label: t("sust.carbonNeutral"), progress: 68, target: "Dec 2026" },
    { label: t("sust.renewableEnergy"), progress: 45, target: "60% by Q4" },
    { label: t("sust.wasteReduction"), progress: 82, target: "90% by Mar" },
    { label: t("sust.waterEfficiency"), progress: 55, target: "70% by Jun" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">{t("sust.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("sust.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title={t("sust.co2Emissions")} value="2.4" unit="tons" icon={Factory} trend={{ value: "15%", positive: false }} />
        <MetricCard title={t("sust.co2Saved")} value="1.8" unit="tons" icon={Leaf} variant="primary" trend={{ value: "22%", positive: true }} />
        <MetricCard title={t("sust.treesEquivalent")} value="142" icon={TreePine} variant="primary" />
        <MetricCard title={t("sust.greenScore")} value="B+" icon={Target} variant="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 glow-green"
        >
          <h3 className="font-display text-sm font-semibold text-foreground mb-6">{t("sust.carbonSummary")}</h3>
          <div className="flex items-center justify-center gap-12">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-destructive/10 border-2 border-destructive/30 flex items-center justify-center mb-3">
                <div>
                  <p className="text-xl font-display font-bold text-destructive">2.4</p>
                  <p className="text-[10px] text-muted-foreground">tons</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{t("sust.emitted")}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-0.5 bg-gradient-to-r from-destructive to-primary" />
              <span className="text-xs text-muted-foreground">vs</span>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-3">
                <div>
                  <p className="text-xl font-display font-bold text-primary">1.8</p>
                  <p className="text-[10px] text-muted-foreground">tons</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{t("sust.saved")}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <h3 className="font-display text-sm font-semibold text-foreground mb-2">{t("sust.ecoEquivalence")}</h3>
          <p className="text-xs text-muted-foreground mb-6">{t("sust.ecoSubtitle")}</p>
          <div className="space-y-5">
            {[
              { icon: "🌳", label: t("sust.treesSaved"), value: "142" },
              { icon: "🚗", label: t("sust.carMiles"), value: "4,320" },
              { icon: "💡", label: t("sust.homesPowered"), value: "38" },
              { icon: "🌊", label: t("sust.waterSaved"), value: "12,500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item.label}</p>
                </div>
                <span className="text-sm font-display font-semibold text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-accent" />
          <h3 className="font-display text-sm font-semibold text-foreground">{t("sust.monthlyGoals")}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">{goal.label}</span>
                <span className="text-xs text-muted-foreground">{goal.target}</span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={goal.progress} className="flex-1 h-2 bg-secondary [&>div]:gradient-green-yellow" />
                <span className="text-sm font-display font-semibold text-primary w-10 text-right">{goal.progress}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
