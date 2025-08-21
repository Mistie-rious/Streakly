import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          Today's Habits
        </h1>
        <p className="text-gray-600">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => navigate(`/manage`)}>Manage Habits</Button>
        <Button
          variant="destructive"
          onClick={() => {
            sessionStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
