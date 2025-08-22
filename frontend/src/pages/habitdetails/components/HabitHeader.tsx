import { Link } from "react-router-dom";

export default function HabitHeader({ name }: { name: string }) {
  return (
    <div className="mb-8">
      <Link
        to="/manage"
        className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </Link>

      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              {name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your progress and build consistency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
