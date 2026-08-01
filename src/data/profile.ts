import { GitBranch, Mail, Network } from "lucide-react";
import type { ExperienceItem, Feature, SocialLink } from "../types";

export const profile = {
  name: "Mads Damiri",
  role: "Software Engineering Student",
  status: "Currently preparing for 3rd semester",
  headline: "Learning while doing",
  intro:
    "I'm currently focused on developing my skills as a coming software engineer." +
      " This page is therefore also a learning project for me.",
  location: "Denmark",
  email: "mads@madsdamiri.dk",
  phone: "+45 40 47 55 05",
};

export const socialProfiles = {
  github: "https://github.com/MadsDamiri87",
  linkedin: "https://www.linkedin.com/in/mads-damiri-1a2a94123/",
};

// The header and the footer render the same three icons, so the list lives here
// rather than in both of them.
export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    hint: `GitHub - ${socialProfiles.github.split("/").pop()}`,
    href: socialProfiles.github,
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    hint: `LinkedIn - ${profile.name}`,
    href: socialProfiles.linkedin,
    icon: Network,
  },
  {
    label: "Email",
    hint: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
];

export const features: Feature[] = [
  {
    title: "Site purpose",
    description:
      "This site is meant to showcase my projects and to make it easier for companies" +
        " to reach me",
  },
  {
    title: "Site consists of",
    description:
      "My project-portfolio so far, CV and relevant information about me in general",
  },
  {
    title: "Nice to know",
    description:
      "I'm curious by nature, and like to learn in general which means," +
        " my tech-stack will keep on growing",
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "Software Engineering Student",
    detail:
      "Preparing for 3rd semester with focus on backend-development, architecture and simplicity.",
  },
  {
    title: "React, TypeScript and databases",
    detail:
      "Building stronger foundations across frontend, backend, SQL, NoSQL and testing.",
  },
  {
    title: "Practical communication background",
    detail:
      "Years of close collaboration with people shaped an understanding, responsible way of working with people and" +
        " in teams.",
  },
];
