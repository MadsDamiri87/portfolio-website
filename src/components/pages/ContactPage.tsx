import { Mail, MessageSquare } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import contactSceneImage from "../../assets/images/hero-clean-scene-bg-extra-wide.webp";
import profileImage from "../../assets/images/mads-profile-nobg.webp";
import { profile } from "../../data/profile";

const availabilityItems = ["Internship", "Student job", "Freelance projects", "Open source"];

const statusItems = [
  { label: "Aarhus, Denmark" },
  { label: profile.role },
  { label: "Usually replies within 24h" },
];

export function ContactPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField =
    (field: keyof typeof formValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsSubmitted(false);
      setFormValues((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = formValues.subject || "Message from madsdamiri.dk";
    const body = [
      formValues.message,
      "",
      formValues.name ? `Name: ${formValues.name}` : "",
      formValues.email ? `Email: ${formValues.email}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // There is no backend behind this site, so the form hands the message to the
    // visitor's own mail client. The notice below explains that, since a mailto:
    // handoff fails silently when no client is configured.
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitted(true);
  };

  return (
    <section className="contact-page">
      <div className="contact-page__scene" aria-hidden="true">
        <img src={contactSceneImage} alt="" />
      </div>

      <div className="container contact-page__inner">
        <div className="contact-page__hero">
          <h1>Get in touch</h1>
          <p>
            I&apos;m always open to new opportunities, collaborations and interesting
            conversations.
          </p>
          <a className="button button--primary contact-page__mail" href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" size={18} strokeWidth={2.1} />
            <span>Send Email</span>
          </a>
        </div>

        <div className="contact-page__cards" aria-label="Contact overview">
          <article className="contact-info-card">
            <h2>Available for</h2>
            <ul>
              {availabilityItems.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="contact-info-card">
            <h2>Current status</h2>
            <ul>
              {statusItems.map(({ label }) => (
                <li key={label}>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="contact-info-card contact-info-card--message">
            <h2>Reach out</h2>
            <p>Feel free to reach out if you'd like to discuss an internship, student position, or an interesting project.</p>
          </article>
        </div>

        <div className="contact-page__content">
          <form className="contact-form-panel" onSubmit={handleSubmit}>
            <div className="contact-form-panel__header">
              <h2>Send a message</h2>
              <p>Fill out the form and I'll get back to you as soon as possible.</p>
            </div>

            <div className="contact-form-grid">
              <label className="contact-field">
                <span className="sr-only">Your name</span>
                <input
                  autoComplete="name"
                  onChange={updateField("name")}
                  placeholder="Your name"
                  required
                  type="text"
                  value={formValues.name}
                />
              </label>

              <label className="contact-field">
                <span className="sr-only">Your email</span>
                <input
                  autoComplete="email"
                  onChange={updateField("email")}
                  placeholder="Your email"
                  required
                  type="email"
                  value={formValues.email}
                />
              </label>

              <label className="contact-field contact-field--full">
                <span className="sr-only">Subject</span>
                <input
                  autoComplete="off"
                  onChange={updateField("subject")}
                  placeholder="Subject"
                  type="text"
                  value={formValues.subject}
                />
              </label>

              <label className="contact-field contact-field--message">
                <span className="sr-only">Your message</span>
                <textarea
                  onChange={updateField("message")}
                  placeholder="Your message"
                  required
                  value={formValues.message}
                />
              </label>
            </div>

            <button className="button button--primary contact-form-panel__submit" type="submit">
              <MessageSquare aria-hidden="true" size={18} strokeWidth={2.1} />
              <span>Send Message</span>
            </button>

            <p aria-live="polite" className="contact-form-panel__status">
              {isSubmitted ? (
                <>
                  Your mail app should have opened with the message ready to send. If nothing
                  happened, write to{" "}
                  <a href={`mailto:${profile.email}`}>{profile.email}</a> directly.
                </>
              ) : (
                <>This form opens your own mail app — nothing is sent or stored by this site.</>
              )}
            </p>
          </form>

          <aside className="contact-profile-panel" aria-label="Profile and phone">
            <div className="contact-profile-panel__image">
              <img src={profileImage} alt="Profile picture of Mads Damiri" />
            </div>
            <a className="contact-profile-panel__phone" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              <span>Phone</span>
              <strong>{profile.phone}</strong>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
