import { ArrowRight } from "lucide-react";
import profileImage from "../../assets/images/mads-profile-nobg.webp";
import { profile } from "../../data/profile";
import { ButtonLink } from "../ui/ButtonLink";
import { LaptopScene } from "../ui/LaptopScene";

export function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero__ambient" />
      <LaptopScene />

      <div className="container hero__inner">
        <div className="hero__content">
          <h1>{profile.name}</h1>
          <p className="hero__role" aria-label={profile.role}>
            <span>Software Engineering Student</span>
          </p>
          <p className="hero__headline">{profile.headline}</p>
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__actions">
            <ButtonLink href="#/projects" variant="primary" icon={ArrowRight}>
              Explore Projects
            </ButtonLink>
            <ButtonLink href="#/cv" icon={ArrowRight}>
              Open CV
            </ButtonLink>
          </div>
        </div>

        <aside className="profile-card" aria-label={`${profile.name} profile image`}>
          <img src={profileImage} alt="Profile Picture of Mads Damiri" />
          <div className="profile-card__shade" />
        </aside>
      </div>
    </section>
  );
}
