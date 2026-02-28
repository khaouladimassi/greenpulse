import { Zap, Battery, Thermometer, Droplets, Wind, Gauge } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import MetricCard from "@/components/MetricCard";
import CircularProgress from "@/components/CircularProgress";
import { hourlyData, weeklyData, monthlyTrend } from "@/lib/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
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
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">{t("dashboard.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard title={t("dashboard.currentUsage")} value="34.2" unit="kWh" icon={Zap} variant="primary" trend={{ value: "5.2%", positive: false }} />
        <MetricCard title={t("dashboard.dailyTotal")} value="412" unit="kWh" icon={Battery} variant="accent" trend={{ value: "8.1%", positive: false }} />
        <MetricCard title={t("dashboard.temperature")} value="23.5" unit="°C" icon={Thermometer} />
        <MetricCard title={t("dashboard.humidity")} value="48" unit="%" icon={Droplets} />
        <MetricCard title={t("dashboard.hvacStatus")} value={t("dashboard.active")} icon={Wind} variant="primary" />
        <MetricCard title={t("dashboard.peakLoad")} value="58.3" unit="kWh" icon={Gauge} trend={{ value: "3.1%", positive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col items-center justify-center green">
          <CircularProgress value={87} label={t("dashboard.efficiencyScore")} />
          <p className="text-xs text-muted-foreground mt-3 text-center">{t("dashboard.improvement")}</p>
        </div>

        <div className="lg:col-span-3 glass-card p-6">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4">{t("dashboard.liveConsumption")}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(122 39% 49%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(122 39% 49%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="consumption" stroke="hsl(122 39% 49%)" fill="url(#colorConsumption)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4">{t("dashboard.weeklyComparison")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="thisWeek" name={t("dashboard.thisWeek")} fill="hsl(122 39% 49%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lastWeek" name={t("dashboard.lastWeek")} fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4">{t("dashboard.historicalTrend")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Line type="monotone" dataKey="usage" stroke="hsl(45 100% 51%)" strokeWidth={2} dot={{ fill: "hsl(45 100% 51%)", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
