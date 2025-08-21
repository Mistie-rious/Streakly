interface Props {
    completedCount: number;
    total: number;
    completionRate: number;
    bestStreak: number;
  }
  
  export function DashboardStats({ completedCount, total, completionRate, bestStreak }: Props) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard title="Completed today" value={`${completedCount}/${total}`}>
          <ProgressBar percent={completionRate} />
        </StatCard>
  
        <StatCard title="Success rate" value={`${completionRate}%`} />
  
        <StatCard title="Best streak" value={bestStreak} />
      </div>
    );
  }
  
  function StatCard({ title, value, children }: { title: string; value: string | number; children?: React.ReactNode }) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
        {children}
      </div>
    );
  }
  
  function ProgressBar({ percent }: { percent: number }) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  }
  