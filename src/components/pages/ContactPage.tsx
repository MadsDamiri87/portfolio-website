import {
  BriefcaseBusiness,
  Check,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  Send,
  Tag,
  UserRound,
} from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { profile } from "../../data/profile";

const availabilityItems = ["Internship", "Student job", "Freelance projects", "Open source"];

const statusItems = [
  { label: "Aarhus, Denmark", icon: MapPin },
  { label: profile.role, icon: GraduationCap },
  { label: "Usually replies within 24h", icon: Clock3 },
];

export function ContactPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const updateField =
    (field: keyof typeof formValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact-page">
      <div className="contact-page__scene" aria-hidden="true" />
      <div className="container contact-page__inner">
        <div className="contact-page__hero">
          <p className="eyebrow">Contact</p>
          <h1>How can I help?</h1>
          <p>
            I&apos;m always open to new opportunities, collaborations and interesting
            conversations.
          </p>
          <a className="button button--primary contact-page__mail" href={`mailto:${profile.email}`}>
            <Mail size={23} strokeWidth={1.9} />
            <span>Send Email</span>
          </a>
        </div>

        <div className="contact-page__cards" aria-label="Contact overview">
          <article className="contact-info-card">
            <BriefcaseBusiness size={27} strokeWidth={1.8} />
            <h2>Available for</h2>
            <ul>
              {availabilityItems.map((item) => (
                <li key={item}>
                  <Check size={17} strokeWidth={2} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="contact-info-card">
            <MapPin size={27} strokeWidth={1.8} />
            <h2>Current status</h2>
            <ul>
              {statusItems.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Icon size={18} strokeWidth={1.9} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="contact-info-card contact-info-card--message">
            <MessageCircle size={27} strokeWidth={1.8} />
            <h2>Let&apos;s connect</h2>
            <p>I&apos;d love to hear about your project or opportunity.</p>
          </article>
        </div>

        <form className="contact-form-panel" onSubmit={handleSubmit}>
          <div className="contact-form-panel__header">
            <h2>Send a message</h2>
            <p>Fill out the form and I&apos;ll get back to you as soon as possible.</p>
          </div>

          <div className="contact-form-grid">
            <label className="contact-field">
              <UserRound size={19} strokeWidth={1.8} />
              <span className="sr-only">Your name</span>
              <input
                autoComplete="name"
                onChange={updateField("name")}
                placeholder="Your name"
                type="text"
                value={formValues.name}
              />
            </label>

            <label className="contact-field">
              <Mail size={19} strokeWidth={1.8} />
              <span className="sr-only">Your email</span>
              <input
                autoComplete="email"
                onChange={updateField("email")}
                placeholder="Your email"
                type="email"
                value={formValues.email}
              />
            </label>

            <label className="contact-field contact-field--full">
              <Tag size={19} strokeWidth={1.8} />
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
              <Pencil size={19} strokeWidth={1.8} />
              <span className="sr-only">Your message</span>
              <textarea
                onChange={updateField("message")}
                placeholder="Your message"
                value={formValues.message}
              />
            </label>
          </div>

          <button className="button button--primary contact-form-panel__submit" type="submit">
            <Send size={19} strokeWidth={1.9} />
            <span>Send Message</span>
          </button>
        </form>

        <div className="contact-page__direct" aria-label="Direct contact information">
          <a href={`mailto:${profile.email}`}>
            <Mail size={18} strokeWidth={1.8} />
            <span>Email</span>
            <strong>{profile.email}</strong>
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            <Phone size={18} strokeWidth={1.8} />
            <span>Phone</span>
            <strong>{profile.phone}</strong>
          </a>
        </div>
      </div>
    </section>
  );
}
