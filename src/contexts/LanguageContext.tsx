import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

const translations = {
  // Navigation
  "nav.dashboard": { fr: "Tableau de bord", en: "Dashboard" },
  "nav.aiAnalysis": { fr: "Analyse IA", en: "AI Analysis" },
  "nav.sustainability": { fr: "Durabilité", en: "Sustainability" },
  "nav.predictions": { fr: "Prédictions", en: "Predictions" },
  "nav.anomalies": { fr: "Anomalies", en: "Anomalies" },
  "nav.reports": { fr: "Rapports", en: "Reports" },
  "nav.logout": { fr: "Déconnexion", en: "Log Out" },
  "nav.systemOnline": { fr: "Système en ligne", en: "System Online" },

  // Login
  "login.title": { fr: "GreenPulse", en: "GreenPulse" },
  "login.subtitle": { fr: "Intelligence Énergétique par IA", en: "AI-Powered Energy Intelligence" },
  "login.description": { fr: "Surveillez, optimisez et prédisez l'empreinte énergétique de votre bâtiment avec des analyses IA en temps réel.", en: "Monitor, optimize, and predict your building's energy footprint with real-time AI analytics and smart automation." },
  "login.enter": { fr: "Accéder au tableau de bord", en: "Enter Dashboard" },
  "login.monitoring": { fr: "Suivi en temps réel", en: "Real-time Monitoring" },
  "login.aiPredictions": { fr: "Prédictions IA", en: "AI Predictions" },
  "login.automation": { fr: "Automatisation intelligente", en: "Smart Automation" },

  // Dashboard
  "dashboard.title": { fr: "Tableau de bord énergétique", en: "Energy Dashboard" },
  "dashboard.subtitle": { fr: "Suivi énergétique du bâtiment en temps réel", en: "Real-time building energy monitoring" },
  "dashboard.currentUsage": { fr: "Consommation actuelle", en: "Current Usage" },
  "dashboard.dailyTotal": { fr: "Total journalier", en: "Daily Total" },
  "dashboard.temperature": { fr: "Température", en: "Temperature" },
  "dashboard.humidity": { fr: "Humidité", en: "Humidity" },
  "dashboard.hvacStatus": { fr: "État HVAC", en: "HVAC Status" },
  "dashboard.active": { fr: "Actif", en: "Active" },
  "dashboard.peakLoad": { fr: "Charge de pointe", en: "Peak Load" },
  "dashboard.efficiencyScore": { fr: "Score d'efficacité énergétique", en: "Energy Efficiency Score" },
  "dashboard.improvement": { fr: "Amélioration de 12% par rapport au mois dernier", en: "12% improvement from last month" },
  "dashboard.liveConsumption": { fr: "Consommation en temps réel", en: "Live Energy Consumption" },
  "dashboard.weeklyComparison": { fr: "Comparaison hebdomadaire", en: "Weekly Comparison" },
  "dashboard.thisWeek": { fr: "Cette semaine", en: "This Week" },
  "dashboard.lastWeek": { fr: "Semaine dernière", en: "Last Week" },
  "dashboard.historicalTrend": { fr: "Tendance historique", en: "Historical Trend" },

  // AI Analysis
  "ai.title": { fr: "Analyse IA", en: "AI Analysis" },
  "ai.subtitle": { fr: "Informations intelligentes et recommandations", en: "Intelligent insights & smart recommendations" },
  "ai.vsLastWeek": { fr: "vs Semaine dernière", en: "vs Last Week" },
  "ai.vsLastMonth": { fr: "vs Mois dernier", en: "vs Last Month" },
  "ai.peakDetected": { fr: "Pic détecté à", en: "Peak Detected At" },
  "ai.insights": { fr: "Informations IA", en: "AI Insights" },
  "ai.recommendations": { fr: "Recommandations intelligentes", en: "Smart Recommendations" },

  // Sustainability
  "sust.title": { fr: "Impact durabilité", en: "Sustainability Impact" },
  "sust.subtitle": { fr: "Métriques environnementales et suivi des objectifs", en: "Environmental metrics & goals tracking" },
  "sust.co2Emissions": { fr: "Émissions CO₂", en: "CO₂ Emissions" },
  "sust.co2Saved": { fr: "CO₂ économisé", en: "CO₂ Saved" },
  "sust.treesEquivalent": { fr: "Équivalent arbres", en: "Trees Equivalent" },
  "sust.greenScore": { fr: "Score vert", en: "Green Score" },
  "sust.carbonSummary": { fr: "Résumé de l'impact carbone", en: "Carbon Impact Summary" },
  "sust.emitted": { fr: "Émis", en: "Emitted" },
  "sust.saved": { fr: "Économisé", en: "Saved" },
  "sust.ecoEquivalence": { fr: "Équivalence écologique", en: "Eco Equivalence" },
  "sust.ecoSubtitle": { fr: "Ce que vos économies représentent", en: "What your savings represent" },
  "sust.treesSaved": { fr: "Équivalent arbres sauvés", en: "Trees saved equivalent" },
  "sust.carMiles": { fr: "Kilomètres voiture compensés", en: "Car miles offset" },
  "sust.homesPowered": { fr: "Foyers alimentés (1 jour)", en: "Homes powered (1 day)" },
  "sust.waterSaved": { fr: "Litres d'eau économisés", en: "Water gallons saved" },
  "sust.monthlyGoals": { fr: "Objectifs environnementaux mensuels", en: "Monthly Environmental Goals" },
  "sust.carbonNeutral": { fr: "Objectif neutralité carbone", en: "Carbon Neutral Target" },
  "sust.renewableEnergy": { fr: "Mix énergie renouvelable", en: "Renewable Energy Mix" },
  "sust.wasteReduction": { fr: "Réduction des déchets", en: "Waste Reduction" },
  "sust.waterEfficiency": { fr: "Efficacité hydrique", en: "Water Efficiency" },

  // Predictions
  "pred.title": { fr: "Prédictions et prévisions", en: "Prediction & Forecast" },
  "pred.subtitle": { fr: "Prévisions énergétiques par IA", en: "AI-powered energy forecasting" },
  "pred.monthlyBill": { fr: "Facture mensuelle est.", en: "Est. Monthly Bill" },
  "pred.predictedPeak": { fr: "Pic prévu", en: "Predicted Peak" },
  "pred.overloadRisk": { fr: "Risque de surcharge", en: "Overload Risk" },
  "pred.low": { fr: "Faible", en: "Low" },
  "pred.autoOptimize": { fr: "Auto-optimisation IA", en: "AI Auto-Optimize" },
  "pred.active": { fr: "Actif", en: "Active" },
  "pred.off": { fr: "Désactivé", en: "Off" },
  "pred.enabled": { fr: "Auto-optimisation IA activée", en: "AI Auto-Optimization enabled" },
  "pred.disabled": { fr: "Auto-optimisation IA désactivée", en: "AI Auto-Optimization disabled" },
  "pred.forecastChart": { fr: "Prévision énergétique 24h", en: "24-Hour Energy Forecast" },
  "pred.standardForecast": { fr: "Prévision standard", en: "Standard Forecast" },
  "pred.aiOptimized": { fr: "Optimisé par IA", en: "AI Optimized" },

  // Anomalies
  "anom.title": { fr: "Détection d'anomalies", en: "Anomaly Detection" },
  "anom.subtitle": { fr: "Schémas de consommation inhabituels détectés par IA", en: "AI-detected unusual consumption patterns" },
  "anom.analyze": { fr: "Analyser", en: "Analyze" },
  "anom.spike": { fr: "Pic", en: "Spike" },
  "anom.severity": { fr: "Sévérité", en: "Severity" },
  "anom.rootCause": { fr: "Analyse des causes", en: "Root Cause Analysis" },
  "anom.suggestedAction": { fr: "Action suggérée", en: "Suggested Action" },

  // Reports
  "rep.title": { fr: "Rapports", en: "Reports" },
  "rep.subtitle": { fr: "Résumés mensuels et rapports exportables", en: "Monthly summaries & exportable reports" },
  "rep.summary": { fr: "Résumé février 2026", en: "February 2026 Summary" },
  "rep.totalConsumption": { fr: "Consommation totale", en: "Total Consumption" },
  "rep.peakDemand": { fr: "Demande de pointe", en: "Peak Demand" },
  "rep.co2Emissions": { fr: "Émissions CO₂", en: "CO₂ Emissions" },
  "rep.costSavings": { fr: "Économies", en: "Cost Savings" },
  "rep.vsLastMonth": { fr: "vs mois dernier", en: "vs last month" },
  "rep.availableReports": { fr: "Rapports disponibles", en: "Available Reports" },
  "rep.generateNew": { fr: "Générer nouveau", en: "Generate New" },
  "rep.generating": { fr: "Génération du rapport... (simulé)", en: "Generating full report... (simulated)" },
  "rep.downloading": { fr: "Téléchargement de", en: "Downloading" },
} as const;

type TranslationKey = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: TranslationKey): string => {
    return translations[key]?.[language] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
