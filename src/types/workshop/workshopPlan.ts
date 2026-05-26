export interface WorkshopPlan {
  _id?: string;
  title: string;
  months: string;
  duration: string;
  price: string;
  highlight: boolean;
  totalSessions: string;
  ageGroups: string[];
  features: string[];
  materials: string[];
  mode: string[];
}
