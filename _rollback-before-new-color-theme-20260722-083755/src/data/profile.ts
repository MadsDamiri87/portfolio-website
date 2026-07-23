import type { ExperienceItem, Feature } from "../types";

export const profile = {
  name: "Mads Damiri",
  role: "Software Engineering Student",
  status: "Currently preparing for 3rd semester",
  headline: "Learning while doing",
  intro:
    "Im currently focused on developing my skills as a coming software engineer." +
      "This Page is therefor also a learning-project for me.",
  location: "Denmark",
  email: "mads@madsdamiri.dk",
  phone: "+45 40 47 55 05",
};

export const features: Feature[] = [
  {
    title: "Readable code",
    description:
      "I try to focus on the basics because, like any craft, those who master the " +
        "fundamentals can build almost anything on top of them.",
    tone: "blue",
  },
  {
    title: "Software design",
    description:
      "I enjoy shaping flows and data models to make sure that i'm going in the direction" +
        "i want.",
    tone: "violet",
  },
  {
    title: "Joyment of growing",
    description:
      "I'm curious by nature and therefor i enjoy learning and ultimately, growing.",
    tone: "cyan",
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "Software Engineering Student",
    detail:
      "Preparing for 3rd semester with focus on fullstack development, architecture and clean implementation.",
  },
  {
    title: "React, TypeScript and databases",
    detail:
      "Building stronger foundations across frontend, backend, SQL, NoSQL and testing.",
  },
  {
    title: "Practical communication background",
    detail:
      "Years of close collaboration with people shaped a calm, responsible way of working in teams.",
  },
];
