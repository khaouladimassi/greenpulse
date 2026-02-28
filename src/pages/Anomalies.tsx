import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Clock, MapPin, TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { anomalies } from "@/lib/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const severityConfig = {
  high: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  medium: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  low: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
};

const Anomalies = () => {
  const [selectedAnomaly, setSelectedAnomaly] = useState<typeof anomalies[0] | null>(null);
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">{t("anom.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("anom.subtitle")}</p>
      </div>

      <div className="space-y-4">
        {anomalies.map((anomaly, i) => {
          const config = severityConfig[anomaly.severity];
          return (
            <motion.div
              key={anomaly.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-5 border ${config.border} cursor-pointer hover:bg-secondary/30 transition-colors`}
              onClick={() => setSelectedAnomaly(anomaly)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                  <AlertTriangle className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">{anomaly.zone}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color} uppercase`}>
                      {anomaly.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{anomaly.timestamp}</span>
                    <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />{anomaly.spike} {t("anom.spike").toLowerCase()}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="shrink-0 text-xs border-border text-muted-foreground hover:text-foreground">
                  {t("anom.analyze")}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedAnomaly && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedAnomaly(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="p-6 max-w-lg w-full border border-green-500 bg-green-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${severityConfig[selectedAnomaly.severity].bg} flex items-center justify-center`}>
                    <AlertTriangle className={`w-5 h-5 ${severityConfig[selectedAnomaly.severity].color}`} />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-foreground">{selectedAnomaly.zone}</h2>
                    <p className="text-xs text-muted-foreground">{selectedAnomaly.timestamp}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedAnomaly(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("anom.spike")}</p>
                    <p className="text-xl font-display font-bold text-destructive">{selectedAnomaly.spike}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("anom.severity")}</p>
                    <p className={`text-xl font-display font-bold ${severityConfig[selectedAnomaly.severity].color} capitalize`}>
                      {selectedAnomaly.severity}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <p className="text-sm font-semibold text-foreground">{t("anom.rootCause")}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedAnomaly.description}</p>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    <p className="text-sm font-semibold text-primary">{t("anom.suggestedAction")}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedAnomaly.suggestion}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Anomalies;
