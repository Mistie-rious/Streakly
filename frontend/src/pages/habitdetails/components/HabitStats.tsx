interface HabitStatsProps {
    total: number;
    streak: number;
    completedToday: boolean;
  }
  
  export default function HabitStats({ total, streak, completedToday }: HabitStatsProps) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon="📊"
          value={total}
          label="Total completions"
        />
        <StatCard
          icon="⚡"
          value={streak}
          label="Current streak"
        />
        <StatCard
          icon="✅"
          value={completedToday ? "Yes" : "No"}
          label="Completed today"
        />
      </div>
    );
  }
  
  function StatCard({ icon, value, label }: { icon: string; value: number | string; label: string }) {
    const displayLabel =
      (label.toLowerCase().includes("completion") || label.toLowerCase().includes("streak")) && value === 1
        ? label.replace(/s$/, "")
        : label;
  
    return (
      <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 text-xl">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{displayLabel}</p>
      </div>
    );
  }
  
  