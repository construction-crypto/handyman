export interface Project {
  id: string;
  title: string;
  date: string;
  status: string;
  description: string;
}

export interface CustomerData {
  id: string;
  tier: string;
  spend: number;
  projects: {
    current: Project[];
  };
}
