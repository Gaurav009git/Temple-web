import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API call — replace with real fetch() to your backend
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1200);
  };

  const toggleFaq = (i) => {
    setOpenFaq((prev) => (prev === i ? null : i));
  };

  const infoCards = [
    {
      icon: "📍",
      label: t("contactPage.addressLabel"),
      value: t("contactPage.addressValue"),
      action: null,
    },
    {
      icon: "📞",
      label: t("contactPage.phoneLabel"),
      value: t("contactPage.phoneValue"),
      action: `tel:${t("contactPage.phoneValue").replace(/\s/g, "")}`,
    },
    {
      icon: "✉️",
      label: t("contactPage.emailLabel"),
      value: t("contactPage.emailValue"),
      action: `mailto:${t("contactPage.emailValue")}`,
    },
    {
      icon: "🕉️",
      label: t("contactPage.timingsLabel"),
      value: t("contactPage.timingsValue"),
      action: null,
    },
    {
      icon: "🪔",
      label: t("contactPage.aartiLabel"),
      value: t("contactPage.aartiValue"),
      action: null,
    },
  ];

  const socials = [
    { name: "Facebook", icon: "📘", url: "https://facebook.com" },
    { name: "Instagram", icon: "📷", url: "https://instagram.com" },
    { name: "YouTube", icon: "▶️", url: "https://youtube.com" },
    { name: "WhatsApp", icon: "💬", url: "https://wa.me/919876543210" },
  ];

  const faqs = [
    { q: t("contactPage.faq1Q"), a: t("contactPage.faq1A") },
    { q: t("contactPage.faq2Q"), a: t("contactPage.faq2A") },
    { q: t("contactPage.faq3Q"), a: t("contactPage.faq3A") },
    { q: t("contactPage.faq4Q"), a: t("contactPage.faq4A") },
    { q: t("contactPage.faq5Q"), a: t("contactPage.faq5A") },
    { q: t("contactPage.faq6Q"), a: t("contactPage.faq6A") },
  ];

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        .contact-page {
          --nav-bg: #FFF8E7;
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;
          --cream: #FFFDF7;

          width: 100%;
          background: var(--cream);
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
          color: var(--text-dark);
          overflow-x: hidden;
        }
        .contact-page *, .contact-page *::before, .contact-page *::after { box-sizing: border-box; }

        /* ================ BREADCRUMB ================ */
        .c-crumb { background: var(--nav-bg); border-bottom: 1px solid var(--border); padding: 1rem 1rem; }
        .c-crumb__inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #6b5440; flex-wrap: wrap; }
        .c-crumb__link { color: var(--saffron); text-decoration: none; font-weight: 600; transition: color 0.2s ease; }
        .c-crumb__link:hover { color: var(--text-dark); }
        .c-crumb__sep { color: var(--gold); font-weight: 800; }
        .c-crumb__current { color: var(--text-dark); font-weight: 700; }

        /* ================ HERO ================ */
        .c-hero { padding: 4rem 1rem 3.5rem; text-align: center; background: linear-gradient(180deg, #FFF8E7 0%, #FFFDF7 100%); position: relative; overflow: hidden; }
        .c-hero::before { content: ""; position: absolute; top: -120px; right: -120px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(232, 138, 5, 0.15) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .c-hero::after { content: ""; position: absolute; bottom: -120px; left: -120px; width: 340px; height: 340px; background: radial-gradient(circle, rgba(201, 154, 46, 0.12) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .c-hero__inner { max-width: 820px; margin: 0 auto; position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        .c-hero__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.82rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.5px; text-transform: uppercase; }
        .c-hero__title { font-size: 2.6rem; line-height: 1.15; font-weight: 800; letter-spacing: -0.5px; margin: 0; background: linear-gradient(135deg, var(--text-dark) 30%, var(--saffron) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .c-hero__divider { width: 80px; height: 3px; background: linear-gradient(90deg, var(--saffron), var(--gold)); border-radius: 3px; }
        .c-hero__subtitle { font-size: 1.05rem; line-height: 1.75; color: #5a4530; margin: 0; max-width: 720px; }

        /* ================ SECTION BASE ================ */
        .c-section { padding: 3.5rem 1rem; position: relative; overflow: hidden; }
        .c-section--alt { background: var(--nav-bg); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .c-section__container { max-width: 1200px; width: 100%; margin: 0 auto; position: relative; z-index: 1; }

        /* ================ SECTION HEADINGS ================ */
        .c-head { text-align: center; max-width: 720px; margin: 0 auto 3rem; display: flex; flex-direction: column; align-items: center; gap: 0.85rem; }
        .c-head__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.78rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.5px; text-transform: uppercase; }
        .c-head__title { font-size: 2rem; font-weight: 800; color: var(--text-dark); margin: 0; line-height: 1.2; letter-spacing: -0.3px; }
        .c-head__divider { width: 70px; height: 3px; background: linear-gradient(90deg, var(--saffron), var(--gold)); border-radius: 3px; }
        .c-head__subtitle { font-size: 0.98rem; line-height: 1.7; color: #5a4530; margin: 0; }

        /* ================ INFO CARDS ================ */
        .c-infoGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.4rem;
        }
        .c-infoCard {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 1.7rem 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: flex-start;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
        }
        .c-infoCard::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 4px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .c-infoCard:hover {
          transform: translateY(-6px);
          border-color: var(--saffron);
          box-shadow: 0 18px 34px rgba(201, 154, 46, 0.22);
        }
        .c-infoCard:hover::before { opacity: 1; }
        .c-infoCard__icon {
          width: 54px; height: 54px;
          display: inline-flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(232, 138, 5, 0.15), rgba(201, 154, 46, 0.2));
          border-radius: 14px;
          font-size: 1.5rem;
        }
        .c-infoCard__label {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--saffron);
          letter-spacing: 0.6px;
          text-transform: uppercase;
          margin: 0;
        }
        .c-infoCard__value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.55;
          margin: 0;
        }

        /* ================ CONTACT FORM + MAP ================ */
        .c-mainGrid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        /* ---------- FORM ---------- */
        .c-formWrap {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem 1.8rem;
          box-shadow: 0 12px 30px rgba(201, 154, 46, 0.12);
        }
        .c-formHead { margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .c-formHead__badge { display: inline-block; align-self: flex-start; padding: 0.4rem 0.9rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.72rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.4px; text-transform: uppercase; }
        .c-formHead__title { font-size: 1.5rem; font-weight: 800; color: var(--text-dark); margin: 0; line-height: 1.25; }
        .c-formHead__subtitle { font-size: 0.88rem; color: #5a4530; margin: 0; line-height: 1.6; }

        .c-form { display: flex; flex-direction: column; gap: 1rem; }
        .c-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .c-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .c-field__label { font-size: 0.8rem; font-weight: 700; color: var(--text-dark); letter-spacing: 0.2px; }
        .c-field__label span { color: var(--saffron); }
        .c-input, .c-select, .c-textarea {
          width: 100%;
          padding: 0.75rem 0.95rem;
          font-size: 0.9rem;
          font-family: inherit;
          color: var(--text-dark);
          background: var(--cream);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .c-input::placeholder, .c-textarea::placeholder { color: #a08d78; }
        .c-input:focus, .c-select:focus, .c-textarea:focus {
          border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(232, 138, 5, 0.15);
        }
        .c-textarea { resize: vertical; min-height: 130px; }
        .c-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23E88A05' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.9rem center;
          background-size: 16px;
          padding-right: 2.5rem;
        }

        .c-submit {
          margin-top: 0.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 1.7rem;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 0.95rem;
          font-weight: 700;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 8px 20px rgba(232, 138, 5, 0.4);
          transition: transform 0.2s ease, box-shadow 0.25s ease, opacity 0.25s ease;
        }
        .c-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(232, 138, 5, 0.5);
        }
        .c-submit:disabled { opacity: 0.75; cursor: not-allowed; }
        .c-submit__arrow { transition: transform 0.25s ease; }
        .c-submit:hover:not(:disabled) .c-submit__arrow { transform: translateX(4px); }

        .c-required { font-size: 0.75rem; color: #6b5440; margin: 0; }

        .c-status {
          font-size: 0.86rem;
          font-weight: 600;
          padding: 0.7rem 1rem;
          border-radius: 10px;
          animation: cFade 0.3s ease;
          margin-top: 0.4rem;
        }
        .c-status--success { color: #1e7c3a; background: rgba(30, 124, 58, 0.08); border: 1px solid rgba(30, 124, 58, 0.25); }
        .c-status--error { color: #b91c1c; background: rgba(185, 28, 28, 0.08); border: 1px solid rgba(185, 28, 28, 0.25); }
        @keyframes cFade { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

        /* ---------- MAP ---------- */
        .c-mapWrap {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1.6rem;
          box-shadow: 0 12px 30px rgba(201, 154, 46, 0.12);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .c-mapHead { display: flex; flex-direction: column; gap: 0.4rem; }
        .c-mapHead__title { font-size: 1.25rem; font-weight: 800; color: var(--text-dark); margin: 0; }
        .c-mapHead__subtitle { font-size: 0.86rem; color: #5a4530; margin: 0; line-height: 1.6; }

        /* 🆕 Real Google Map iframe */
        .c-map__iframe {
          width: 100%;
          aspect-ratio: 4 / 3;
          border: 1px solid var(--border);
          border-radius: 14px;
          display: block;
          box-shadow: 0 8px 22px rgba(201, 154, 46, 0.15);
          background: var(--nav-bg);
        }

        .c-directions {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          align-self: center;
          padding: 0.7rem 1.4rem;
          background: var(--text-dark);
          color: #FFF8E7;
          font-size: 0.86rem;
          font-weight: 700;
          border-radius: 999px;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.25s ease;
        }
        .c-directions:hover {
          background: var(--saffron);
          transform: translateY(-2px);
        }

        /* ================ SOCIALS ================ */
        .c-socials {
          display: flex;
          justify-content: center;
          gap: 0.7rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }
        .c-social {
          width: 52px;
          height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 50%;
          font-size: 1.4rem;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .c-social:hover {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          border-color: transparent;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(232, 138, 5, 0.35);
        }

        /* ================ FAQ ================ */
        .c-faqList {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .c-faq {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .c-faq--open {
          border-color: var(--saffron);
          box-shadow: 0 12px 26px rgba(201, 154, 46, 0.18);
        }
        .c-faq__btn {
          width: 100%;
          padding: 1.1rem 1.2rem;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-dark);
          transition: color 0.2s ease;
        }
        .c-faq__btn:hover { color: var(--saffron); }
        .c-faq__q { display: inline-flex; align-items: center; gap: 0.6rem; text-align: left; }
        .c-faq__icon {
          flex-shrink: 0;
          width: 26px; height: 26px;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(232, 138, 5, 0.12);
          color: var(--saffron);
          border-radius: 50%;
          font-size: 0.85rem;
          font-weight: 800;
        }
        .c-faq__toggle {
          flex-shrink: 0;
          font-size: 1rem;
          color: var(--saffron);
          transition: transform 0.25s ease;
        }
        .c-faq--open .c-faq__toggle { transform: rotate(180deg); }
        .c-faq__answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.3s ease;
          padding: 0 1.2rem;
        }
        .c-faq--open .c-faq__answer {
          max-height: 400px;
          padding: 0 1.2rem 1.1rem;
        }
        .c-faq__answerText {
          font-size: 0.88rem;
          line-height: 1.75;
          color: #5a4530;
          margin: 0;
          border-top: 1px solid var(--border);
          padding-top: 0.9rem;
        }

        /* ================ CTA BANNER ================ */
        .c-cta { padding: 4rem 1rem; background: linear-gradient(135deg, #3B2414 0%, #6B3D1B 55%, #8B4E1F 100%); position: relative; overflow: hidden; }
        .c-cta::before { content: ""; position: absolute; top: -120px; right: -120px; width: 380px; height: 380px; background: radial-gradient(circle, rgba(232, 138, 5, 0.35) 0%, transparent 70%); border-radius: 50%; }
        .c-cta::after { content: ""; position: absolute; bottom: -140px; left: -140px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(201, 154, 46, 0.25) 0%, transparent 70%); border-radius: 50%; }
        .c-cta__inner { max-width: 820px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; position: relative; z-index: 1; }
        .c-cta__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(255, 248, 231, 0.12); border: 1px solid rgba(232, 138, 5, 0.5); border-radius: 999px; font-size: 0.82rem; font-weight: 700; color: #FFD89B; letter-spacing: 0.5px; text-transform: uppercase; backdrop-filter: blur(4px); }
        .c-cta__title { font-size: 2.1rem; font-weight: 800; color: #FFF8E7; line-height: 1.2; letter-spacing: -0.3px; margin: 0; }
        .c-cta__text { font-size: 1rem; line-height: 1.75; color: rgba(255, 248, 231, 0.85); margin: 0; max-width: 660px; }
        .c-cta__buttons { display: flex; gap: 0.7rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem; }
        .c-cta__btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.9rem 1.7rem; font-size: 0.95rem; font-weight: 700; border-radius: 999px; text-decoration: none; cursor: pointer; border: 2px solid transparent; white-space: nowrap; transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease; }
        .c-cta__btn--primary { background: linear-gradient(135deg, var(--saffron), var(--gold)); color: #fff; box-shadow: 0 8px 22px rgba(232, 138, 5, 0.5); }
        .c-cta__btn--primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(232, 138, 5, 0.6); }
        .c-cta__btn--ghost { background: transparent; color: #FFF8E7; border-color: rgba(255, 248, 231, 0.4); }
        .c-cta__btn--ghost:hover { background: rgba(255, 248, 231, 0.1); border-color: #FFD89B; transform: translateY(-2px); }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1024px) {
          .c-hero { padding: 3.2rem 1rem 2.8rem; }
          .c-hero__title { font-size: 2.2rem; }
          .c-section { padding: 2.8rem 1rem; }
          .c-head__title { font-size: 1.75rem; }

          .c-infoGrid { grid-template-columns: repeat(2, 1fr); }
          .c-mainGrid { grid-template-columns: 1fr; gap: 1.8rem; }

          .c-cta { padding: 3.2rem 1rem; }
          .c-cta__title { font-size: 1.75rem; }
        }

        @media (max-width: 640px) {
          .c-hero { padding: 2.4rem 0.9rem 2.2rem; }
          .c-hero__title { font-size: 1.7rem; }
          .c-hero__subtitle { font-size: 0.92rem; line-height: 1.65; }
          .c-hero__badge { font-size: 0.75rem; }
          .c-section { padding: 2.4rem 0.9rem; }
          .c-head { margin-bottom: 2rem; }
          .c-head__title { font-size: 1.45rem; }
          .c-head__subtitle { font-size: 0.88rem; }

          .c-infoGrid { grid-template-columns: 1fr; gap: 1rem; }
          .c-infoCard { padding: 1.3rem 1.1rem; }

          .c-formWrap { padding: 1.5rem 1.1rem; }
          .c-formHead__title { font-size: 1.25rem; }
          .c-form__row { grid-template-columns: 1fr; }

          .c-mapWrap { padding: 1.2rem; }
          .c-map__iframe { aspect-ratio: 3 / 4; border-radius: 12px; }

          .c-faq__btn { font-size: 0.88rem; padding: 1rem 1rem; }

          .c-cta { padding: 2.6rem 0.9rem; }
          .c-cta__title { font-size: 1.5rem; }
          .c-cta__text { font-size: 0.92rem; }
        }

        @media (max-width: 425px) {
          .c-hero__title { font-size: 1.5rem; }
          .c-hero__subtitle { font-size: 0.85rem; }
          .c-head__title { font-size: 1.3rem; }
          .c-head__subtitle { font-size: 0.82rem; }

          .c-infoCard__icon { width: 48px; height: 48px; font-size: 1.3rem; }
          .c-infoCard__value { font-size: 0.88rem; }

          .c-social { width: 46px; height: 46px; font-size: 1.2rem; }

          .c-cta__title { font-size: 1.3rem; }
          .c-cta__text { font-size: 0.85rem; }
          .c-cta__btn { flex: 1 1 auto; min-width: 130px; padding: 0.75rem 1.15rem; font-size: 0.85rem; }
        }

        @media (max-width: 375px) {
          .c-crumb { padding: 0.75rem 0.75rem; }
          .c-crumb__inner { font-size: 0.78rem; }
          .c-hero { padding: 2rem 0.75rem 1.9rem; }
          .c-hero__title { font-size: 1.32rem; }
          .c-hero__subtitle { font-size: 0.8rem; }
          .c-section { padding: 2rem 0.75rem; }
          .c-head__title { font-size: 1.15rem; }

          .c-formWrap { padding: 1.3rem 1rem; }
          .c-input, .c-select, .c-textarea { padding: 0.65rem 0.85rem; font-size: 0.86rem; }
          .c-submit { padding: 0.75rem 1.3rem; font-size: 0.86rem; }

          .c-map__iframe { aspect-ratio: 1 / 1; }

          .c-faq__btn { font-size: 0.82rem; padding: 0.9rem 0.9rem; }
          .c-faq__answerText { font-size: 0.8rem; }

          .c-cta__title { font-size: 1.15rem; }
          .c-cta__btn { padding: 0.65rem 0.95rem; font-size: 0.78rem; min-width: 110px; }
        }

        @media (max-width: 340px) {
          .c-hero__title { font-size: 1.15rem; }
          .c-head__title { font-size: 1.05rem; }
          .c-infoCard { padding: 1.1rem 0.95rem; }
          .c-social { width: 42px; height: 42px; font-size: 1.05rem; }
          .c-cta__title { font-size: 1.05rem; }
          .c-cta__text { font-size: 0.78rem; }
        }
      `}</style>

      {/* ================= PAGE MARKUP ================= */}
      <div className="contact-page">

        {/* Breadcrumb */}
        <div className="c-crumb">
          <div className="c-crumb__inner">
            <Link to="/" className="c-crumb__link">
              {t("contactPage.breadcrumbHome")}
            </Link>
            <span className="c-crumb__sep">›</span>
            <span className="c-crumb__current">
              {t("contactPage.breadcrumbCurrent")}
            </span>
          </div>
        </div>

        {/* Hero */}
        <section className="c-hero">
          <div className="c-hero__inner">
            <span className="c-hero__badge">{t("contactPage.heroBadge")}</span>
            <h1 className="c-hero__title">{t("contactPage.heroTitle")}</h1>
            <span className="c-hero__divider" />
            <p className="c-hero__subtitle">{t("contactPage.heroSubtitle")}</p>
          </div>
        </section>

        {/* Info Cards */}
        <section className="c-section">
          <div className="c-section__container">
            <header className="c-head">
              <h2 className="c-head__title">{t("contactPage.infoTitle")}</h2>
              <span className="c-head__divider" />
              <p className="c-head__subtitle">{t("contactPage.infoSubtitle")}</p>
            </header>

            <div className="c-infoGrid">
              {infoCards.map((info, i) => {
                const content = (
                  <>
                    <span className="c-infoCard__icon" aria-hidden="true">{info.icon}</span>
                    <p className="c-infoCard__label">{info.label}</p>
                    <p className="c-infoCard__value">{info.value}</p>
                  </>
                );
                return info.action ? (
                  <a key={i} href={info.action} className="c-infoCard">
                    {content}
                  </a>
                ) : (
                  <div key={i} className="c-infoCard">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Form + Map */}
        <section className="c-section c-section--alt">
          <div className="c-section__container">
            <div className="c-mainGrid">
              {/* Form */}
              <div className="c-formWrap">
                <div className="c-formHead">
                  <span className="c-formHead__badge">
                    {t("contactPage.formBadge")}
                  </span>
                  <h2 className="c-formHead__title">
                    {t("contactPage.formTitle")}
                  </h2>
                  <p className="c-formHead__subtitle">
                    {t("contactPage.formSubtitle")}
                  </p>
                </div>

                <form className="c-form" onSubmit={handleSubmit}>
                  <div className="c-form__row">
                    <div className="c-field">
                      <label className="c-field__label" htmlFor="name">
                        {t("contactPage.nameLabel")} <span>*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="c-input"
                        placeholder={t("contactPage.namePlaceholder")}
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="c-field">
                      <label className="c-field__label" htmlFor="email">
                        {t("contactPage.emailFieldLabel")} <span>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="c-input"
                        placeholder={t("contactPage.emailPlaceholder")}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="c-form__row">
                    <div className="c-field">
                      <label className="c-field__label" htmlFor="phone">
                        {t("contactPage.phoneFieldLabel")}
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="c-input"
                        placeholder={t("contactPage.phonePlaceholder")}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="c-field">
                      <label className="c-field__label" htmlFor="subject">
                        {t("contactPage.subjectLabel")} <span>*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="c-select"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">{t("contactPage.subjectPlaceholder")}</option>
                        <option value="pooja">{t("contactPage.subjectPooja")}</option>
                        <option value="donation">{t("contactPage.subjectDonation")}</option>
                        <option value="event">{t("contactPage.subjectEvent")}</option>
                        <option value="volunteer">{t("contactPage.subjectVolunteer")}</option>
                        <option value="general">{t("contactPage.subjectGeneral")}</option>
                        <option value="other">{t("contactPage.subjectOther")}</option>
                      </select>
                    </div>
                  </div>

                  <div className="c-field">
                    <label className="c-field__label" htmlFor="message">
                      {t("contactPage.messageLabel")} <span>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      className="c-textarea"
                      placeholder={t("contactPage.messagePlaceholder")}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <p className="c-required">{t("contactPage.requiredNote")}</p>

                  <button
                    type="submit"
                    className="c-submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending"
                      ? t("contactPage.sendingBtn")
                      : t("contactPage.submitBtn")}
                    {status !== "sending" && (
                      <span className="c-submit__arrow">→</span>
                    )}
                  </button>

                  {status === "success" && (
                    <p className="c-status c-status--success">
                      {t("contactPage.successMsg")}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="c-status c-status--error">
                      {t("contactPage.errorMsg")}
                    </p>
                  )}
                </form>
              </div>

              {/* Map */}
              <div className="c-mapWrap">
                <div className="c-mapHead">
                  <h2 className="c-mapHead__title">{t("contactPage.mapTitle")}</h2>
                  <p className="c-mapHead__subtitle">{t("contactPage.mapSubtitle")}</p>
                </div>

                {/* ✅ Real Google Maps iframe */}
                <iframe
                  className="c-map__iframe"
                  title="Sankashta Mata Mandir Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.22942115219672!2d74.23795647919175!3d21.363478887734523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdf09c1d4298001%3A0xdde0f313d4183cc0!2sSankashta%20Mata%20Mandir!5e0!3m2!1sen!2sin!4v1791121801699!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Sankashta+Mata+Mandir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="c-directions"
                >
                  🗺️ {t("contactPage.directionsBtn")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Follow Us */}
        <section className="c-section">
          <div className="c-section__container">
            <header className="c-head">
              <span className="c-head__badge">{t("contactPage.followBadge")}</span>
              <h2 className="c-head__title">{t("contactPage.followTitle")}</h2>
              <span className="c-head__divider" />
              <p className="c-head__subtitle">{t("contactPage.followSubtitle")}</p>
            </header>

            <div className="c-socials">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="c-social"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="c-section c-section--alt">
          <div className="c-section__container">
            <header className="c-head">
              <span className="c-head__badge">{t("contactPage.faqBadge")}</span>
              <h2 className="c-head__title">{t("contactPage.faqTitle")}</h2>
              <span className="c-head__divider" />
              <p className="c-head__subtitle">{t("contactPage.faqSubtitle")}</p>
            </header>

            <div className="c-faqList">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className={`c-faq ${isOpen ? "c-faq--open" : ""}`}
                  >
                    <button
                      type="button"
                      className="c-faq__btn"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={isOpen}
                    >
                      <span className="c-faq__q">
                        <span className="c-faq__icon">?</span>
                        {faq.q}
                      </span>
                      <span className="c-faq__toggle">▾</span>
                    </button>
                    <div className="c-faq__answer">
                      <p className="c-faq__answerText">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="c-cta">
          <div className="c-cta__inner">
            <span className="c-cta__badge">{t("contactPage.ctaBadge")}</span>
            <h2 className="c-cta__title">{t("contactPage.ctaTitle")}</h2>
            <p className="c-cta__text">{t("contactPage.ctaText")}</p>

            <div className="c-cta__buttons">
              <a
                href={`tel:${t("contactPage.phoneValue").replace(/\s/g, "")}`}
                className="c-cta__btn c-cta__btn--primary"
              >
                📞 {t("contactPage.ctaCallBtn")}
              </a>
              <Link to="/donate" className="c-cta__btn c-cta__btn--ghost">
                {t("contactPage.ctaDonateBtn")}
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Contact;