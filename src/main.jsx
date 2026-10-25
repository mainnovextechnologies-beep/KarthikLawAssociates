import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Scale,
  Menu,
  X,
  Phone,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Landmark,
  FileText,
  Users,
  Gavel,
  Building2,
  ChevronDown,
  Star,
  Clock3,
  Send,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import portrait from "./assets/advocate-portrait.png";
import maLogo from "./assets/ma-innovex-logo.png";
import "./styles.css";

const PHONE = "+919700087201";
const DISPLAY_PHONE = "+91 97000 87201";
const SECOND_PHONE = "+917013028727";
const DISPLAY_SECOND_PHONE = "+91 70130 28727";
const ADDRESS =
  "Flat No. 102, Lakshmi Enclave Apartment, 1st Floor, Magunta Layout, Saraswathi Nagar, Beside Brindavan Guest House, Nellore, Andhra Pradesh.";
const WA_BASE = "https://wa.me/919700087201";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Flat No. 102, Lakshmi Enclave Apartment, 1st Floor, Magunta Layout, Saraswathi Nagar, Beside Brindavan Guest House, Nellore, Andhra Pradesh",
  );
const areas = [
  {
    icon: Gavel,
    n: "01",
    title: "Criminal Law",
    desc: "Enquiries relating to criminal proceedings, legal options and the next steps for your circumstances.",
  },
  {
    icon: Scale,
    n: "02",
    title: "Civil Disputes",
    desc: "Discuss civil disputes, documentation concerns and available legal processes.",
  },
  {
    icon: Building2,
    n: "03",
    title: "Property & Land",
    desc: "Initial enquiries concerning property matters, land disputes and related documentation.",
  },
  {
    icon: Users,
    n: "04",
    title: "Family Matters",
    desc: "A confidential first conversation about family-related legal questions and possible next steps.",
  },
  {
    icon: Landmark,
    n: "05",
    title: "Bail & Proceedings",
    desc: "Enquiries about bail processes and criminal-court proceedings, subject to case review.",
  },
  {
    icon: FileText,
    n: "06",
    title: "Legal Consultation",
    desc: "Share a brief outline of your concern and ask about the appropriate consultation process.",
  },
  {
    icon: Gavel,
    n: "05",
    title: "NDPS Act Cases",
    desc: "Legal enquiries concerning matters under the Narcotic Drugs and Psychotropic Substances (NDPS) Act, including bail proceedings and related criminal-court processes, subject to case review.",
  },
];
const reviews = [
  "“Thanks to karthik ., solved my issue within limited time .”",
  "“Excellent lawyer who solved my clarifications in matter of time”",
  "“Good”",
  "“Good at NDPS ACT”",
  "“Super high court advacate”",
  "“Good service”",
];
const galleryModules = import.meta.glob("./assets/images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const galleryImages = Object.entries(galleryModules)
  .map(([path, src]) => {
    const filename = path.split("/").pop() || "";
    const match = filename.match(/^karthik(\d+)\.(png|jpe?g|webp|avif)$/i);

    if (!match) return null;

    return {
      number: Number(match[1]),
      src,
      alt: `Karthik Advocate gallery image ${match[1]}`,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.number - b.number);

function Gallery() {
  if (galleryImages.length === 0) return null;

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              <span>07</span>
              <span className="kicker-rule" />
              PHOTO GALLERY
            </div>

            <h2>
              A closer look at <em>our practice.</em>
            </h2>
          </div>

          <p>
            Explore photographs associated with Karthik Advocate and the legal
            practice in Nellore.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <a
              className="gallery-item"
              href={image.src}
              target="_blank"
              rel="noreferrer"
              key={image.number}
              aria-label={`View ${image.alt}`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
              <span className="gallery-overlay">
                <span>View image</span>
                <ArrowUpRight size={20} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    message: "",
    contact: "WhatsApp",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [faqOpen, setFaqOpen] = useState(0);
  const nav = [
    ["About", "#about"],
    ["Practice Areas", "#practice"],
    ["Reviews", "#reviews"],
    ["Gallery", "#gallery"],
    ["FAQs", "#faqs"],
    ["Contact", "#contact"],
  ];
  const whatsapp = (
    message = "Hello Karthik Advocate, I would like to enquire about legal assistance in Nellore.",
  ) => `${WA_BASE}?text=${encodeURIComponent(message)}`;
  const update = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };
  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10)))
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (!form.area) next.area = "Please choose a practice area.";
    if (!form.message.trim()) next.message = "Please add a brief enquiry.";
    if (!form.consent) next.consent = "Please confirm that we may contact you.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const msg = `Hello Karthik Advocate, I would like to make a legal enquiry.\n\nName: ${form.name.trim()}\nMobile: ${form.phone.trim()}\nEmail: ${form.email.trim() || "Not provided"}\nPractice area: ${form.area}\nPreferred contact: ${form.contact}\nBrief enquiry: ${form.message.trim()}\n\nI understand not to send confidential documents through this general enquiry.`;
    window.open(whatsapp(msg), "_blank", "noopener,noreferrer");
  };
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy the office address:", ADDRESS);
    }
  };
  return (
    <>
      <div className="topline">
        <div className="container topline-inner">
          <span>
            <MapPin size={14} /> Nellore, Andhra Pradesh
          </span>
          <span className="top-right">
            <Clock3 size={14} /> Please call to confirm availability <i />{" "}
            <a href={`tel:${PHONE}`}>{DISPLAY_PHONE}</a>
          </span>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <a href="#home" className="brand" aria-label="Karthik Advocate home">
            <span className="brand-mark">
              <Scale size={25} />
            </span>
            <span>
              <strong>
                KARTHIK <b>ADVOCATE</b>
              </strong>
              <small>LEGAL SERVICES · NELLORE</small>
            </span>
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={menuOpen ? "nav nav-open" : "nav"}>
            {nav.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a className="nav-call" href={`tel:${PHONE}`}>
              <Phone size={15} /> Call Advocate
            </a>
          </nav>
        </div>
      </header>
      <main>
        <section className="hero" id="home">
          <div className="hero-grain" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span /> LEGAL GUIDANCE IN NELLORE
              </div>
              <h1>
                Clarity in law.
                <br />
                <em>Confidence</em> in your next step.
              </h1>
              <p className="hero-lede">
                Thoughtful legal guidance begins with understanding your
                concern. Connect with Karthik Advocate in Nellore to discuss
                your enquiry and explore the next steps.
              </p>
              <div className="hero-actions">
                <a className="btn btn-gold" href={`tel:${PHONE}`}>
                  <Phone size={17} /> Call Advocate <ArrowUpRight size={16} />
                </a>
                <a
                  className="btn btn-outline"
                  href={whatsapp()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={17} /> WhatsApp Enquiry
                </a>
              </div>
              <div className="hero-foot">
                <span className="hero-foot-icon">
                  <MapPin size={16} />
                </span>
                <span>
                  <b>Serving enquiries in Nellore</b>
                  <small>Andhra Pradesh, India</small>
                </span>
                <span className="hero-divider" />
                <span className="hero-note">
                  A professional, approachable first conversation.
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="portrait-frame">
                <img
                  src={portrait}
                  alt="Professional portrait supplied for Karthik Advocate"
                />
                <div className="portrait-shade" />
              </div>
              <div className="visual-caption">
                <span className="caption-line" />
                <div>
                  <small>LEGAL SERVICES</small>
                  <strong>Professional guidance, clearly explained.</strong>
                </div>
                <Scale size={25} />
              </div>
              <div className="visual-stamp">
                <Scale size={20} />
                <span>
                  LAW
                  <br /> & JUSTICE
                </span>
              </div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>01 / PROFESSIONAL LEGAL ENQUIRIES</span>
            <span className="bottom-rule" />
            <a href="#about">
              SCROLL TO EXPLORE <ArrowRight size={14} />
            </a>
          </div>
        </section>
        <section className="trust-strip">
          <div className="container trust-grid">
            <div>
              <span className="trust-icon">
                <MapPin />
              </span>
              <span>
                <b>Local presence</b>
                <small>Nellore, Andhra Pradesh</small>
              </span>
            </div>
            <div>
              <span className="trust-icon">
                <MessageCircle />
              </span>
              <span>
                <b>Direct enquiry</b>
                <small>Call or WhatsApp</small>
              </span>
            </div>
            <div>
              <span className="trust-icon">
                <ShieldCheck />
              </span>
              <span>
                <b>Clear communication</b>
                <small>Understand your next step</small>
              </span>
            </div>
            <div>
              <span className="trust-icon">
                <Scale />
              </span>
              <span>
                <b>Legal information</b>
                <small>Discuss your concern</small>
              </span>
            </div>
          </div>
        </section>
        <section className="section about" id="about">
          <div className="container about-grid">
            <div className="section-kicker">
              <span>01</span>
              <span className="kicker-rule" /> ABOUT THE ADVOCATE
            </div>
            <div className="about-content">
              <h2>
                A professional approach
                <br />
                to <em>legal guidance.</em>
              </h2>
              <div className="about-columns">
                <p className="lead">
                  Every legal concern has its own context. A clear first
                  conversation can help you understand which information matters
                  and what questions to ask next.
                </p>
                <div>
                  <p>
                    Karthik Advocate is based in Nellore, Andhra Pradesh. Use
                    this website to explore legal enquiry categories, locate the
                    office and get in touch directly.
                  </p>
                  <p>
                    Share only a brief, non-confidential summary through the
                    general enquiry form. Any advice or representation depends
                    on a separate discussion and acceptance of the matter.
                  </p>
                  <a className="text-link" href="#contact">
                    Start an enquiry <ArrowRight size={16} />
                  </a>
                </div>
              </div>
              <div className="about-note">
                <Scale size={20} />
                <span>
                  <b>Clear information. Considered next steps.</b>
                  <small>
                    Contact the office to confirm service availability and
                    consultation arrangements.
                  </small>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="section practice" id="practice">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="section-kicker">
                  <span>02</span>
                  <span className="kicker-rule" /> PRACTICE AREAS
                </div>
                <h2>
                  Legal concerns deserve
                  <br />
                  <em>a considered response.</em>
                </h2>
              </div>
              <p>
                Explore the enquiry categories below. Please confirm directly
                with the advocate whether a particular service is available for
                your matter.
              </p>
            </div>
            <div className="practice-grid">
              {areas.map(({ icon: Icon, n, title, desc }) => (
                <article className="practice-card" key={title}>
                  <div className="card-top">
                    <span className="service-icon">
                      <Icon size={23} />
                    </span>
                    <span className="card-number">{n}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <a
                    href={whatsapp(
                      `Hello Karthik Advocate, I would like to enquire about ${title.toLowerCase()} in Nellore.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link"
                  >
                    Enquire about this <ArrowUpRight size={16} />
                  </a>
                </article>
              ))}
            </div>
            <p className="practice-disclaimer">
              Practice areas shown are enquiry categories, not a representation
              that every service is offered. Confirm availability before relying
              on this information.
            </p>
          </div>
        </section>
        <section className="approach">
          <div className="container approach-grid">
            <div>
              <div className="section-kicker light">
                <span>03</span>
                <span className="kicker-rule" /> HOW TO GET STARTED
              </div>
              <h2>
                Start with the facts.
                <br />
                <em>Understand the options.</em>
              </h2>
              <p>
                Prepare a short outline of your concern and contact the office
                to ask about the next steps. Avoid sending confidential
                documents through an initial enquiry.
              </p>
              <a className="btn btn-gold" href="#contact">
                Make an enquiry <ArrowRight size={16} />
              </a>
            </div>
            <div className="steps">
              <div className="step">
                <span>01</span>
                <div>
                  <b>Describe your concern</b>
                  <p>
                    Share a short, general summary without sensitive case
                    details.
                  </p>
                </div>
              </div>
              <div className="step">
                <span>02</span>
                <div>
                  <b>Confirm the service</b>
                  <p>
                    Ask whether your matter fits the services currently
                    available.
                  </p>
                </div>
              </div>
              <div className="step">
                <span>03</span>
                <div>
                  <b>Discuss next steps</b>
                  <p>
                    Confirm consultation arrangements and any information to
                    prepare.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section reviews" id="reviews">
          <div className="container">
            <div className="section-heading review-heading">
              <div>
                <div className="section-kicker">
                  <span>04</span>
                  <span className="kicker-rule" /> CLIENT FEEDBACK
                </div>
                <h2>
                  Reviews from <em>Google.</em>
                </h2>
              </div>
              <div className="review-count">
                <strong>7</strong>
                <span>
                  Google reviews
                  <br />
                  <small>Count supplied; verify current listing</small>
                </span>
              </div>
            </div>
            <div className="review-grid">
              {reviews.map((review, i) => (
                <article className="review-card" key={review}>
                  <div className="quote-mark">“</div>
                  <p>{review.replace(/[“”]/g, "")}</p>
                  <div className="review-source">
                    <span className="google-g">G</span>
                    <span>
                      <b>Google review excerpt</b>
                      <small>Reviewer name and star rating not displayed</small>
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <div className="review-bottom">
              <p>
                These excerpts were supplied for this website. Confirm that each
                review belongs to the correct listing before publishing them as
                verified testimonials.
              </p>
              <a
                className="btn btn-dark"
                href="https://www.google.com/search?q=karthik+advocate+nellore"
                target="_blank"
                rel="noreferrer"
              >
                View Google listing <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <Gallery />
        <section className="faq-section" id="faqs">
          <div className="container faq-grid">
            <div>
              <div className="section-kicker">
                <span>05</span>
                <span className="kicker-rule" /> FREQUENTLY ASKED QUESTIONS
              </div>
              <h2>
                Good questions are
                <br />
                <em>a good beginning.</em>
              </h2>
              <p className="faq-intro">
                A few practical points before you make an enquiry.
              </p>
              <a className="text-link" href="#contact">
                Ask a question <ArrowRight size={16} />
              </a>
            </div>
            <div className="faq-list">
              {[
                [
                  "How can I contact Karthik Advocate?",
                  "You can call +91 97000 87201 or use the WhatsApp enquiry button. Please confirm availability directly with the office.",
                ],
                [
                  "Where is the office located?",
                  `The supplied address is ${ADDRESS}. Use Get Directions to open the location in Google Maps and verify the pin before travelling.`,
                ],
                [
                  "Can I send details through this website?",
                  "The enquiry form opens WhatsApp with the information you enter. Do not include confidential case facts, identity documents or sensitive attachments in a general enquiry.",
                ],
                [
                  "Does submitting an enquiry make me a client?",
                  "No. Sending a message or using this website does not automatically establish an advocate-client relationship. This requires a separate discussion and acceptance of the matter.",
                ],
                [
                  "Are all listed practice areas confirmed?",
                  "The cards are enquiry categories. Contact the office to confirm which services are currently offered and whether your matter can be considered.",
                ],
              ].map(([q, a], i) => (
                <div
                  className={`faq-item ${faqOpen === i ? "faq-active" : ""}`}
                  key={q}
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                    aria-expanded={faqOpen === i}
                  >
                    <span>{q}</span>
                    <ChevronDown size={19} />
                  </button>
                  {faqOpen === i && <p>{a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section contact" id="contact">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="section-kicker">
                  <span>06</span>
                  <span className="kicker-rule" /> CONTACT & LOCATION
                </div>
                <h2>
                  Let’s begin with
                  <br />
                  <em>your enquiry.</em>
                </h2>
              </div>
              <p>
                Reach out to ask about service availability, consultation
                arrangements or directions to the office.
              </p>
            </div>
            <div className="contact-grid">
              <div className="contact-panel">
                <div className="contact-panel-head">
                  <span className="contact-emblem">
                    <Scale size={26} />
                  </span>
                  <h3>Karthik Advocate</h3>
                  <p>Legal services · Nellore, Andhra Pradesh</p>
                </div>
                <div className="contact-detail">
                  <span><Phone size={18} /></span>
                  <div>
                    <small>PHONE NUMBERS</small>
                    <a href={`tel:${PHONE}`}>{DISPLAY_PHONE}</a>
                    <br />
                    <a href={`tel:${SECOND_PHONE}`}>{DISPLAY_SECOND_PHONE}</a>
                  </div>
                </div>
                <div className="contact-detail">
                  <span>
                    <MapPin size={18} />
                  </span>
                  <div>
                    <small>OFFICE ADDRESS</small>
                    <p>{ADDRESS}</p>
                  </div>
                  <button
                    onClick={copyAddress}
                    aria-label="Copy address"
                    className="copy-btn"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="contact-actions">
                  <a href={`tel:${PHONE}`} className="btn btn-gold">
                    <Phone size={16} /> Call office
                  </a>
                  <a
                    href={whatsapp()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
                <a
                  className="directions-link"
                  href={MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin size={16} /> Get directions in Google Maps{" "}
                  <ArrowUpRight size={15} />
                </a>

                <div className="map-wrap">
                  <iframe
                    title="Karthik Advocate Office, Nellore - Google Maps"
                    src="https://maps.google.com/maps?output=embed&q=14.436001777648926%2C79.97120666503906&z=17"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <p className="map-note">
                  Please verify the map pin and address before visiting.
                </p>
              </div>
              <form className="enquiry-form" onSubmit={submit} noValidate>
                <div className="form-heading">
                  <span>ENQUIRY FORM</span>
                  <h3>How can we help you?</h3>
                  <p>
                    Fill in the details below. You will review and send your
                    enquiry through WhatsApp.
                  </p>
                </div>
                <div className="form-row">
                  <label>
                    Full name *
                    <input
                      name="name"
                      value={form.name}
                      onChange={update}
                      placeholder="Enter your name"
                      autoComplete="name"
                    />
                    {errors.name && (
                      <small className="error">{errors.name}</small>
                    )}
                  </label>
                  <label>
                    Mobile number *
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={update}
                      placeholder="10-digit mobile number"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <small className="error">{errors.phone}</small>
                    )}
                  </label>
                </div>
                <label>
                  Email address <span className="optional">(optional)</span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={update}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <small className="error">{errors.email}</small>
                  )}
                </label>
                <label>
                  Area of enquiry *
                  <select name="area" value={form.area} onChange={update}>
                    <option value="">Choose an enquiry category</option>
                    {areas.map((a) => (
                      <option key={a.title} value={a.title}>
                        {a.title}
                      </option>
                    ))}
                  </select>
                  {errors.area && (
                    <small className="error">{errors.area}</small>
                  )}
                </label>
                <label>
                  Brief enquiry *
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={update}
                    placeholder="Share a brief, non-confidential summary..."
                    rows="4"
                  />
                  {errors.message && (
                    <small className="error">{errors.message}</small>
                  )}
                </label>
                <fieldset>
                  <legend>Preferred contact method</legend>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="contact"
                      value="WhatsApp"
                      checked={form.contact === "WhatsApp"}
                      onChange={update}
                    />{" "}
                    WhatsApp
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="contact"
                      value="Phone call"
                      checked={form.contact === "Phone call"}
                      onChange={update}
                    />{" "}
                    Phone call
                  </label>
                </fieldset>
                <label className="consent">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={update}
                  />
                  <span>
                    I agree to be contacted about this enquiry and have read the
                    privacy notice. I will not include confidential case
                    documents. *
                  </span>
                </label>
                {errors.consent && (
                  <small className="error consent-error">
                    {errors.consent}
                  </small>
                )}
                <button className="btn btn-dark submit-btn" type="submit">
                  <Send size={16} /> Continue to WhatsApp{" "}
                  <ArrowUpRight size={16} />
                </button>
                <p className="form-privacy">
                  This form opens WhatsApp; it does not send data to a website
                  server. Your message is sent only when you press Send in
                  WhatsApp.
                </p>
              </form>
            </div>
          </div>
        </section>
        <section className="disclaimer">
          <div className="container disclaimer-inner">
            <Scale size={21} />
            <div>
              <b>Important legal notice</b>
              <p>
                Website content is general information and is not legal advice.
                Contacting the advocate does not automatically establish an
                advocate-client relationship. No case outcome is guaranteed. Do
                not submit confidential documents through the general enquiry
                form.
              </p>
              <a href="#privacy">
                Read privacy information <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer" id="privacy">
        <div className="container footer-main">
          <div className="footer-brand">
            <a href="#home" className="brand brand-light">
              <span className="brand-mark">
                <Scale size={25} />
              </span>
              <span>
                <strong>
                  KARTHIK <b>ADVOCATE</b>
                </strong>
                <small>LEGAL SERVICES · NELLORE</small>
              </span>
            </a>
            <p>
              Clear information for your first legal enquiry in Nellore, Andhra
              Pradesh.
            </p>
            <a href={`tel:${PHONE}`} className="footer-phone">
              <Phone size={15} />
              {DISPLAY_PHONE}
            </a>
          </div>
          <div>
            <h4>EXPLORE</h4>
            <a href="#about">About</a>
            <a href="#practice">Practice areas</a>
            <a href="#reviews">Google reviews</a>
            <a href="#faqs">FAQs</a>
            <a href="#gallery">Photo gallery</a>
          </div>
          <div>
            <h4>CONTACT</h4>
            <a href="#contact">Office location</a>
            <a href={`tel:${PHONE}`}>Call advocate</a>
            <a href={whatsapp()} target="_blank" rel="noreferrer">
              WhatsApp enquiry
            </a>
            <a href={MAP_URL} target="_blank" rel="noreferrer">
              Get directions
            </a>
          </div>
          <div>
            <h4>PRIVACY & DISCLAIMER</h4>
            <p className="footer-small">
              Enquiry information is used to help you contact the office. The
              form opens WhatsApp and does not store submissions on this
              website. Please avoid sharing confidential or sensitive case
              details.
            </p>
            <a
              href="#privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("privacy-modal").showModal();
              }}
            >
              Privacy information
            </a>
            <a
              href="#legal-disclaimer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("disclaimer-modal").showModal();
              }}
            >
              Legal disclaimer
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Karthik Advocate. All rights reserved.
          </span>
          <span className="footer-credit">
            Website designed & developed by{" "}
            <a
              href="https://mainnovextechnologies.lovable.app/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={maLogo} alt="MA Innovex Technologies logo" /> MA Innovex
              Technologies
            </a>
          </span>
        </div>
      </footer>
      <dialog id="privacy-modal" className="modal">
        <button
          className="modal-close"
          onClick={() => document.getElementById("privacy-modal").close()}
          aria-label="Close"
        >
          <X />
        </button>
        <h2>Privacy information</h2>
        <p>
          The enquiry form is processed in your browser and opens WhatsApp with
          the details you enter. This website does not send form data to its own
          server or store submissions. WhatsApp's own privacy terms apply after
          you open the service. Only provide information you are comfortable
          sharing, and do not include confidential case documents or sensitive
          personal information. Contact the website operator for any privacy
          questions.
        </p>
      </dialog>
      <dialog id="disclaimer-modal" className="modal">
        <button
          className="modal-close"
          onClick={() => document.getElementById("disclaimer-modal").close()}
          aria-label="Close"
        >
          <X />
        </button>
        <h2>Legal disclaimer</h2>
        <p>
          Content on this website is for general informational purposes only and
          is not legal advice. No advocate-client relationship is created by
          browsing this website or sending an enquiry. Representation and advice
          are subject to a separate discussion and acceptance of the matter. No
          outcome is promised or guaranteed. Please contact the office to
          confirm services, availability and consultation arrangements.
        </p>
      </dialog>
      <div className="floating-actions">
        <a
          className="float-call"
          href={`tel:${PHONE}`}
          aria-label="Call Karthik Advocate"
          title="Call Karthik Advocate"
        >
          <Phone size={21} />
        </a>
        <a
          className="float-wa"
          href={whatsapp()}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Karthik Advocate"
          title="WhatsApp Karthik Advocate"
        >
          <MessageCircle size={22} />
        </a>
      </div>
      <div className="mobile-bar">
        <a href={`tel:${PHONE}`}>
          <Phone size={17} /> Call Now
        </a>
        <a href={whatsapp()} target="_blank" rel="noreferrer">
          <MessageCircle size={17} /> WhatsApp
        </a>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "Karthik Advocate",
            telephone: DISPLAY_PHONE,
            address: {
              '@type': 'PostalAddress',
              streetAddress:
                'Flat No. 102, Lakshmi Enclave Apartment, 1st Floor, Magunta Layout, Saraswathi Nagar, Beside Brindavan Guest House',
              addressLocality: 'Nellore',
              addressRegion: 'Andhra Pradesh',
              addressCountry: 'IN'
            },
            areaServed: { "@type": "City", name: "Nellore" },
            url: "https://karthik-law-associates.vercel.app/",
          }),
        }}
      />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
