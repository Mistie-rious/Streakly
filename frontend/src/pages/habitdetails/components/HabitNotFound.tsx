import { Link } from "react-router-dom";

export default function HabitNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <div className="bg-card rounded-lg shadow-sm border border-border p-12 text-center max-w-md">
        <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Habit Not Found
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          The habit you're looking for doesn't exist or may have been deleted.
        </p>
        <Link to="/dashboard">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
