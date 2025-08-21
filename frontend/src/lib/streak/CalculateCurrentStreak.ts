export const calculateCurrentStreak = (dates: string[]): number => {
    if (dates.length === 0) return 0;
  
    const dateSet = new Set(dates.map(d => d.split("T")[0]));
    let streak = 0;
    let current = new Date();
  
    while (true) {
      const dateStr = current.toISOString().split("T")[0];
      if (dateSet.has(dateStr)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }
  
    return streak;
  };
  