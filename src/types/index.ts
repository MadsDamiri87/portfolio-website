export type NavItem = {
  label: string;
  href: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type Project = {
  title: string;
  slug: string;
  category: string;
  description: string;
  tags: string[];
  accent: "blue" | "violet" | "green";
  image: string;
  screenshots?: string[];
  detail?: ProjectDetail;
  status?: "Featured" | "In progress" | "Learning lab";
  type?: string;
  year?: string;
  progress?: number;
  source?: string;
  semester?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

export type ProjectDetail = {
  displayTitle?: string;
  subtitle: string;
  githubUrl?: string;
  liveUrl?: string;
  timeline?: string;
  duration?: string;
  role?: string;
  codeSize?: string;
  teamSize?: string;
  facts?: Array<{
    label: string;
    value: string;
  }>;
  about: string[];
  technicalChoices?: Array<{
    category?: string;
    slide?: number;
    title: string;
    description: string;
  }>;
  documentation?: Array<{
    title: string;
    description: string;
    type?: string;
    image?: string;
  }>;
};

export type ExperienceItem = {
  title: string;
  detail: string;
};
