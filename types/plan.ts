export interface DailyTask {
    day: number;
    topic: string;
    action: string;
    resources: string[]; // URLs or Titles
}

export interface PrepPlan {
    programName: string;
    durationWeeks: number;
    schedule: DailyTask[];
}
