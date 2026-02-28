export const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  consumption: Math.round(20 + Math.random() * 30 + (i > 8 && i < 20 ? 25 : 0)),
  predicted: Math.round(22 + Math.random() * 25 + (i > 8 && i < 20 ? 22 : 0)),
}));

export const weeklyData = [
  { day: "Mon", thisWeek: 142, lastWeek: 158 },
  { day: "Tue", thisWeek: 135, lastWeek: 149 },
  { day: "Wed", thisWeek: 128, lastWeek: 155 },
  { day: "Thu", thisWeek: 138, lastWeek: 162 },
  { day: "Fri", thisWeek: 145, lastWeek: 170 },
  { day: "Sat", thisWeek: 98, lastWeek: 120 },
  { day: "Sun", thisWeek: 85, lastWeek: 105 },
];

export const monthlyTrend = [
  { month: "Jul", usage: 4200 },
  { month: "Aug", usage: 4500 },
  { month: "Sep", usage: 3800 },
  { month: "Oct", usage: 3500 },
  { month: "Nov", usage: 3200 },
  { month: "Dec", usage: 3900 },
  { month: "Jan", usage: 3100 },
  { month: "Feb", usage: 2850 },
];

export const anomalies = [
  {
    id: 1,
    timestamp: "2026-02-27 03:14",
    zone: "HVAC Zone B",
    spike: "+47%",
    severity: "high" as const,
    description: "Unusual HVAC activation detected during off-hours. Possible thermostat malfunction or unauthorized schedule override.",
    suggestion: "Inspect Zone B thermostat settings and verify scheduled HVAC timers. Consider resetting to default profile.",
  },
  {
    id: 2,
    timestamp: "2026-02-26 14:32",
    zone: "Lighting Floor 3",
    spike: "+28%",
    severity: "medium" as const,
    description: "Lighting consumption exceeded baseline by 28%. All floor lights remained at 100% despite occupancy sensors indicating low presence.",
    suggestion: "Recalibrate occupancy sensors on Floor 3. Enable adaptive dimming during low-occupancy periods.",
  },
  {
    id: 3,
    timestamp: "2026-02-25 09:05",
    zone: "Server Room",
    spike: "+62%",
    severity: "high" as const,
    description: "Sudden power surge in server room cooling. Likely caused by cooling unit cycling failure leading to overcompensation.",
    suggestion: "Schedule maintenance for cooling unit #3. Implement redundant temperature monitoring.",
  },
];

export const aiInsights = [
  {
    title: "Peak Usage Detected",
    description: "Energy consumption peaks between 10:00-14:00, averaging 52 kWh. Consider load shifting to off-peak hours.",
    type: "warning" as const,
  },
  {
    title: "HVAC Over-Cooling",
    description: "HVAC system is cooling 2.3°C below target. Adjusting setpoint could save 12% on cooling costs.",
    type: "optimization" as const,
  },
  {
    title: "Weekend Baseline High",
    description: "Weekend base load is 35% higher than optimal. Phantom loads from idle equipment detected.",
    type: "alert" as const,
  },
];

export const recommendations = [
  {
    title: "Reduce HVAC Temperature by 2°C",
    impact: "Save ~18% on cooling",
    action: "Apply",
  },
  {
    title: "Shift Heavy Loads to Off-Peak (22:00-06:00)",
    impact: "Reduce peak demand charges by ~25%",
    action: "Schedule",
  },
  {
    title: "Enable Adaptive Lighting on Floors 2-4",
    impact: "Cut lighting costs by ~30%",
    action: "Enable",
  },
  {
    title: "Activate Smart Standby for Idle Equipment",
    impact: "Eliminate ~15% phantom load",
    action: "Activate",
  },
];

export const forecastData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  forecast: Math.round(18 + Math.random() * 28 + (i > 7 && i < 19 ? 20 : 0)),
  optimized: Math.round(15 + Math.random() * 20 + (i > 7 && i < 19 ? 15 : 0)),
}));
