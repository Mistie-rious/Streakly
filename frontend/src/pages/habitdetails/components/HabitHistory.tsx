interface HabitHistoryProps {
    tracks: { id: string; date: string }[];
  }
  
  export default function HabitHistory({ tracks }: HabitHistoryProps) {
    return (
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            ⏳
          </div>
          <h2 className="text-lg font-semibold text-foreground">Completion History</h2>
        </div>
  
        {tracks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
              📅
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No completions yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Start building your habit streak today!
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {tracks
              .slice()
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((track) => {
                const date = new Date(track.date);
                return (
                  <div
                    key={track.id}
                    className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        ✅
                      </div>
                      <span className="text-foreground font-medium">
                        {date.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }
  