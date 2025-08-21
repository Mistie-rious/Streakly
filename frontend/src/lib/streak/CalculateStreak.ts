export function calculateStreak(dates: string[]): number {
    if (dates.length === 0) return 0;
  
    const sorted = dates.map(d => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
  
    let streak = 1;
    let best = 1;
  
    for (let i = 1; i < sorted.length; i++) {
      const diff = (sorted[i - 1].getTime() - sorted[i].getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
        best = Math.max(best, streak);
      } else {
        streak = 1;
      }
    }
  
    return best;
  }