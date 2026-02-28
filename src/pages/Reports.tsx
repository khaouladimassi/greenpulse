import { motion } from "framer-motion";
import { FileText, Download, Calendar, TrendingDown, Zap, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const reports = [
  { name: "February 2026 Energy Report", date: "Feb 27, 2026", size: "2.4 MB" },
  { name: "January 2026 Energy Report", date: "Jan 31, 2026", size: "2.1 MB" },
  { name: "Q4 2025 Quarterly Summary", date: "Dec 31, 2025", size: "4.8 MB" },
  { name: "December 2025 Energy Report", date: "Dec 31, 2025", size: "2.3 MB" },
  { name: "November 2025 Energy Report", date: "Nov 30, 2025", size: "2.0 MB" },
];

const Reports = () => {
  const { t } = useLanguage();

  const monthlySummary = [
    { label: t("rep.totalConsumption"), value: "2,850 kWh", icon: Zap, change: "-8.7%" },
    { label: t("rep.peakDemand"), value: "58.3 kWh", icon: TrendingDown, change: "-3.1%" },
    { label: t("rep.co2Emissions"), value: "2.4 tons", icon: Leaf, change: "-15%" },
    { label: t("rep.costSavings"), value: "$312", icon: FileText, change: "+22%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">{t("rep.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("rep.subtitle")}</p>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Calendar className="w-5 h-5 text-accent" />
          <h3 className="font-display text-sm font-semibold text-foreground">{t("rep.summary")}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {monthlySummary.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-secondary/50 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
              <p className="text-lg font-display font-bold text-foreground">{item.value}</p>
              <p className="text-xs text-primary mt-1">{item.change} {t("rep.vsLastMonth")}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-display text-sm font-semibold text-foreground">{t("rep.availableReports")}</h3>
          </div>
          <Button
            size="sm"
            onClick={() => toast.success(t("rep.generating"))}
            className="gradient-green-yellow text-primary-foreground font-display text-xs tracking-wider"
          >
            {t("rep.generateNew")}
          </Button>
        </div>
        <div className="space-y-2">
          {reports.map((report, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{report.name}</p>
                <p className="text-xs text-muted-foreground">{report.date} · {report.size}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toast.success(`${t("rep.downloading")} ${report.name}...`)}
                className="text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Download className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
