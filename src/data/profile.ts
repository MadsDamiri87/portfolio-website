import type { ExperienceItem, Feature } from "../types";
import { Brain, Code2, Lightbulb } from "lucide-react";

export const profile = {
  name: "Mads Damiri",
  role: "Software Engineering Student",
  status: "Currently preparing for 3rd semester",
  headline: "Building fullstack software.",
  intro:
    "I build fullstack solutions with a focus on clean code, solid architecture and meaningful user experiences.",
  location: "Denmark",
  email: "mads@madsdamiri.dk",
  phone: "+45 40 47 55 05",
};

export const features: Feature[] = [
  {
    title: "Clear systems",
    description:
      "I value simplicity, structure and maintainable code that solves real problems.",
    icon: Code2,
    tone: "blue",
  },
  {
    title: "Software design",
    description:
      "I prefer shaping flows, data models and interfaces before writing the first line of code.",
    icon: Brain,
    tone: "violet",
  },
  {
    title: "Always learning",
    description:
      "Curious by nature, I enjoy learning new technologies and creating working solutions.",
    icon: Lightbulb,
    tone: "cyan",
  },
];

export const experience: ExperienceItem[] = [
  {
    period: "Now",
    title: "Software Engineering Student",
    detail:
      "Preparing for 3rd semester with focus on fullstack development, architecture and clean implementation.",
  },
  {
    period: "Current focus",
    title: "React, TypeScript and databases",
    detail:
      "Building stronger foundations across frontend, backend, SQL, NoSQL and testing.",
  },
  {
    period: "Before software",
    title: "Practical communication background",
    detail:
      "Years of close collaboration with people shaped a calm, responsible way of working in teams.",
  },
];
