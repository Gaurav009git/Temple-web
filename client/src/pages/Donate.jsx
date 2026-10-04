import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Donate = () => {
  const { t } = useTranslation();

  const presetAmounts = [501, 1100, 2500, 5100];
  const [selectedAmount, setSelectedAmount] = useState(1100);
  const [customAmount, setCustomAmount] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "general",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePresetClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) return;
    setStatus("sending");
    // Replace with real API call
    setTimeout(() => {
      setStatus("success");
      setCustomAmount("");
      setSelectedAmount(1100);
      setFormData({ name: "", email: "", phone: "", type: "general", message: "" });
      setAnonymous(false);
      setTimeout(() => setStatus("idle"), 6000);
    }, 1500);
  };

  const toggleFaq = (i) => setOpenFaq((p) => (p === i ? null : i));

  const whyCards = [
    { icon: "🛕", title: t("donatePage.why1Title"), text: t("donatePage.why1Text") },
    { icon: "🍛", title: t("donatePage.why2Title"), text: t("donatePage.why2Text") },
    { icon: "🎉", title: t("donatePage.why3Title"), text: t("donatePage.why3Text") },
    { icon: "🙏", title: t("donatePage.why4Title"), text: t("donatePage.why4Text") },
  ];

  const donateTypes = [
    { value: "general",     label: t("donatePage.donateTypeGeneral") },
    { value: "annadan",     label: t("donatePage.donateTypeAnnadan") },
    { value: "pooja",       label: t("donatePage.donateTypePooja") },
    { value: "festival",    label: t("donatePage.donateTypeFestival") },
    { value: "temple",      label: t("donatePage.donateTypeTemple") },
    { value: "education",   label: t("donatePage.donateTypeEducation") },
  ];

  const impacts = [
    { amount: t("donatePage.impact1Amount"), text: t("donatePage.impact1Text"), icon: "🪔" },
    { amount: t("donatePage.impact2Amount"), text: t("donatePage.impact2Text"), icon: "🍛" },
    { amount: t("donatePage.impact3Amount"), text: t("donatePage.impact3Text"), icon: "🌾" },
    { amount: t("donatePage.impact4Amount"), text: t("donatePage.impact4Text"), icon: "🎉" },
    { amount: t("donatePage.impact5Amount"), text: t("donatePage.impact5Text"), icon: "🛕" },
    { amount: t("donatePage.impact6Amount"), text: t("donatePage.impact6Text"), icon: "💛" },
  ];

  const otherWays = [
    { icon: "🏦", title: t("donatePage.bankTitle"), text: t("donatePage.bankText"), line: t("donatePage.bankDetailsLine") },
    { icon: "📱", title: t("donatePage.upiTitle"), text: t("donatePage.upiText"), line: t("donatePage.upiIdLine") },
    { icon: "📝", title: t("donatePage.chequeTitle"), text: t("donatePage.chequeText"), line: t("donatePage.chequeLine") },
    { icon: "🎁", title: t("donatePage.inKindTitle"), text: t("donatePage.inKindText"), line: t("donatePage.inKindLine") },
  ];

  const faqs = [
    { q: t("donatePage.faq1Q"), a: t("donatePage.faq1A") },
    { q: t("donatePage.faq2Q"), a: t("donatePage.faq2A") },
    { q: t("donatePage.faq3Q"), a: t("donatePage.faq3A") },
    { q: t("donatePage.faq4Q"), a: t("donatePage.faq4A") },
    { q: t("donatePage.faq5Q"), a: t("donatePage.faq5A") },
    { q: t("donatePage.faq6Q"), a: t("donatePage.faq6A") },
  ];

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        .donate-page {
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
        .donate-page *, .donate-page *::before, .donate-page *::after { box-sizing: border-box; }

        /* ================ BREADCRUMB ================ */
        .d-crumb { background: var(--nav-bg); border-bottom: 1px solid var(--border); padding: 1rem 1rem; }
        .d-crumb__inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #6b5440; flex-wrap: wrap; }
        .d-crumb__link { color: var(--saffron); text-decoration: none; font-weight: 600; transition: color 0.2s ease; }
        .d-crumb__link:hover { color: var(--text-dark); }
        .d-crumb__sep { color: var(--gold); font-weight: 800; }
        .d-crumb__current { color: var(--text-dark); font-weight: 700; }

        /* ================ HERO ================ */
        .d-hero { padding: 4rem 1rem 3.5rem; text-align: center; background: linear-gradient(180deg, #FFF8E7 0%, #FFFDF7 100%); position: relative; overflow: hidden; }
        .d-hero::before { content: ""; position: absolute; top: -120px; right: -120px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(232, 138, 5, 0.15) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .d-hero::after { content: ""; position: absolute; bottom: -120px; left: -120px; width: 340px; height: 340px; background: radial-gradient(circle, rgba(201, 154, 46, 0.12) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .d-hero__inner { max-width: 820px; margin: 0 auto; position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        .d-hero__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.82rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.5px; text-transform: uppercase; }
        .d-hero__title { font-size: 2.6rem; line-height: 1.15; font-weight: 800; letter-spacing: -0.5px; margin: 0; background: linear-gradient(135deg, var(--text-dark) 30%, var(--saffron) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .d-hero__divider { width: 80px; height: 3px; background: linear-gradient(90deg, var(--saffron), var(--gold)); border-radius: 3px; }
        .d-hero__subtitle { font-size: 1.05rem; line-height: 1.75; color: #5a4530; margin: 0; max-width: 720px; }

        /* ================ SECTION BASE ================ */
        .d-section { padding: 3.5rem 1rem; position: relative; overflow: hidden; }
        .d-section--alt { background: var(--nav-bg); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .d-section__container { max-width: 1200px; width: 100%; margin: 0 auto; position: relative; z-index: 1; }

        /* ================ HEADINGS ================ */
        .d-head { text-align: center; max-width: 720px; margin: 0 auto 3rem; display: flex; flex-direction: column; align-items: center; gap: 0.85rem; }
        .d-head__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.78rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.5px; text-transform: uppercase; }
        .d-head__title { font-size: 2rem; font-weight: 800; color: var(--text-dark); margin: 0; line-height: 1.2; letter-spacing: -0.3px; }
        .d-head__divider { width: 70px; height: 3px; background: linear-gradient(90deg, var(--saffron), var(--gold)); border-radius: 3px; }
        .d-head__subtitle { font-size: 0.98rem; line-height: 1.7; color: #5a4530; margin: 0; }

        /* ================ WHY CARDS ================ */
        .d-whyGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.3rem; }
        .d-why {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 1.7rem 1.3rem;
          display: flex; flex-direction: column;
          align-items: center; text-align: center; gap: 0.7rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .d-why:hover {
          transform: translateY(-6px);
          border-color: var(--saffron);
          box-shadow: 0 18px 34px rgba(201, 154, 46, 0.22);
        }
        .d-why__icon {
          width: 60px; height: 60px;
          display: inline-flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff; border-radius: 50%;
          font-size: 1.6rem;
          box-shadow: 0 8px 18px rgba(232, 138, 5, 0.35);
        }
        .d-why__title { font-size: 1rem; font-weight: 800; color: var(--text-dark); margin: 0; }
        .d-why__text { font-size: 0.85rem; line-height: 1.65; color: #5a4530; margin: 0; }

        /* ================ DONATION FORM ================ */
        .d-formWrap { max-width: 820px; margin: 0 auto; background: var(--white); border: 1px solid var(--border); border-radius: 22px; padding: 2.2rem 2rem; box-shadow: 0 16px 40px rgba(201, 154, 46, 0.15); }
        .d-formHead { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.6rem; margin-bottom: 1.8rem; }
        .d-formHead__badge { display: inline-block; padding: 0.4rem 0.9rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.72rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.4px; text-transform: uppercase; }
        .d-formHead__title { font-size: 1.6rem; font-weight: 800; color: var(--text-dark); margin: 0; line-height: 1.25; }
        .d-formHead__subtitle { font-size: 0.9rem; color: #5a4530; margin: 0; line-height: 1.6; max-width: 560px; }

        .d-form { display: flex; flex-direction: column; gap: 1.3rem; }

        .d-label { font-size: 0.82rem; font-weight: 800; color: var(--text-dark); letter-spacing: 0.2px; text-transform: uppercase; }

        /* Preset amounts */
        .d-presets { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.7rem; }
        .d-preset {
          padding: 1rem 0.6rem;
          background: var(--cream);
          border: 1.5px solid var(--border);
          border-radius: 14px;
          cursor: pointer;
          font-family: inherit;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.35rem;
          transition: transform 0.2s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .d-preset:hover {
          border-color: var(--saffron);
          transform: translateY(-2px);
        }
        .d-preset--active {
          background: linear-gradient(135deg, rgba(232, 138, 5, 0.15), rgba(201, 154, 46, 0.2));
          border-color: var(--saffron);
          box-shadow: 0 8px 18px rgba(232, 138, 5, 0.25);
        }
        .d-preset__value { font-size: 1.15rem; font-weight: 800; color: var(--text-dark); }
        .d-preset--active .d-preset__value { color: var(--saffron); }
        .d-preset__label { font-size: 0.7rem; font-weight: 700; color: #6b5440; text-transform: uppercase; letter-spacing: 0.3px; }

        /* Fields */
        .d-field { display: flex; flex-direction: column; gap: 0.5rem; }
        .d-input, .d-select, .d-textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          font-size: 0.9rem;
          font-family: inherit;
          color: var(--text-dark);
          background: var(--cream);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .d-input::placeholder, .d-textarea::placeholder { color: #a08d78; }
        .d-input:focus, .d-select:focus, .d-textarea:focus {
          border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(232, 138, 5, 0.15);
        }
        .d-textarea { resize: vertical; min-height: 100px; }
        .d-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23E88A05' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.9rem center;
          background-size: 16px;
          padding-right: 2.5rem;
        }

        .d-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        /* Custom amount */
        .d-customWrap { position: relative; }
        .d-customSymbol {
          position: absolute;
          top: 50%; left: 1rem;
          transform: translateY(-50%);
          font-size: 1rem;
          font-weight: 800;
          color: var(--saffron);
          pointer-events: none;
        }
        .d-input--amount {
          padding-left: 2.2rem;
          font-weight: 700;
        }

        /* Anonymous checkbox */
        .d-checkbox {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-dark);
          user-select: none;
        }
        .d-checkbox input { display: none; }
        .d-checkbox__box {
          width: 20px; height: 20px;
          border: 1.5px solid var(--border);
          background: var(--white);
          border-radius: 5px;
          display: inline-flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .d-checkbox input:checked + .d-checkbox__box {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          border-color: transparent;
        }
        .d-checkbox input:checked + .d-checkbox__box::after {
          content: "✓";
          color: #fff;
          font-size: 0.8rem;
          font-weight: 900;
        }

        /* Secure notes */
        .d-secure {
          display: flex; gap: 0.7rem; flex-wrap: wrap;
          justify-content: center;
          padding: 0.9rem 0.5rem;
          background: var(--nav-bg);
          border: 1px dashed var(--border);
          border-radius: 12px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #6b5440;
        }
        .d-secure__item { display: inline-flex; align-items: center; gap: 0.35rem; }

        /* Submit */
        .d-submit {
          margin-top: 0.4rem;
          display: inline-flex; align-items: center; justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 1rem; font-weight: 800;
          border: none; border-radius: 999px;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 10px 26px rgba(232, 138, 5, 0.42);
          transition: transform 0.2s ease, box-shadow 0.25s ease, opacity 0.25s ease;
          letter-spacing: 0.3px;
        }
        .d-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(232, 138, 5, 0.55);
        }
        .d-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .d-submit__arrow { transition: transform 0.25s ease; }
        .d-submit:hover:not(:disabled) .d-submit__arrow { transform: translateX(4px); }

        /* Status messages */
        .d-status {
          font-size: 0.9rem;
          font-weight: 700;
          padding: 0.85rem 1.1rem;
          border-radius: 12px;
          animation: dFade 0.3s ease;
          text-align: center;
        }
        .d-status--success { color: #1e7c3a; background: rgba(30, 124, 58, 0.1); border: 1px solid rgba(30, 124, 58, 0.3); }
        .d-status--error { color: #b91c1c; background: rgba(185, 28, 28, 0.08); border: 1px solid rgba(185, 28, 28, 0.25); }
        @keyframes dFade { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

        /* ================ IMPACT ================ */
        .d-impactGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.3rem; }
        .d-impact {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 1.5rem 1.3rem;
          display: flex;
          gap: 0.9rem;
          align-items: flex-start;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .d-impact::before {
          content: "";
          position: absolute; top: 0; left: 0;
          width: 100%; height: 4px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .d-impact:hover {
          transform: translateY(-6px);
          border-color: var(--saffron);
          box-shadow: 0 18px 34px rgba(201, 154, 46, 0.22);
        }
        .d-impact:hover::before { opacity: 1; }
        .d-impact__icon {
          flex-shrink: 0;
          width: 48px; height: 48px;
          display: inline-flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(232, 138, 5, 0.15), rgba(201, 154, 46, 0.2));
          border-radius: 12px;
          font-size: 1.35rem;
        }
        .d-impact__content { display: flex; flex-direction: column; gap: 0.3rem; min-width: 0; }
        .d-impact__amount { font-size: 1.35rem; font-weight: 800; color: var(--saffron); line-height: 1.1; }
        .d-impact__text { font-size: 0.85rem; line-height: 1.6; color: #5a4530; margin: 0; }

        /* ================ OTHER WAYS ================ */
        .d-otherGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.3rem; }
        .d-other {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 1.6rem 1.3rem;
          display: flex; flex-direction: column; gap: 0.7rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .d-other:hover {
          transform: translateY(-6px);
          border-color: var(--saffron);
          box-shadow: 0 18px 34px rgba(201, 154, 46, 0.22);
        }
        .d-other__icon {
          width: 52px; height: 52px;
          display: inline-flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff; border-radius: 14px;
          font-size: 1.45rem;
          box-shadow: 0 8px 18px rgba(232, 138, 5, 0.35);
        }
        .d-other__title { font-size: 1rem; font-weight: 800; color: var(--text-dark); margin: 0; }
        .d-other__text { font-size: 0.85rem; line-height: 1.6; color: #5a4530; margin: 0; }
        .d-other__line {
          display: inline-block;
          margin-top: auto;
          padding: 0.45rem 0.75rem;
          background: var(--nav-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--saffron);
          letter-spacing: 0.2px;
          word-break: break-word;
        }

        /* ================ FAQ ================ */
        .d-faqList { max-width: 860px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.75rem; }
        .d-faq { background: var(--white); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        .d-faq--open { border-color: var(--saffron); box-shadow: 0 12px 26px rgba(201, 154, 46, 0.18); }
        .d-faq__btn {
          width: 100%; padding: 1.1rem 1.2rem;
          background: none; border: none; cursor: pointer;
          font-family: inherit; text-align: left;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem;
          font-size: 0.95rem; font-weight: 700;
          color: var(--text-dark);
          transition: color 0.2s ease;
        }
        .d-faq__btn:hover { color: var(--saffron); }
        .d-faq__q { display: inline-flex; align-items: center; gap: 0.6rem; text-align: left; }
        .d-faq__icon {
          flex-shrink: 0;
          width: 26px; height: 26px;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(232, 138, 5, 0.12);
          color: var(--saffron);
          border-radius: 50%;
          font-size: 0.85rem; font-weight: 800;
        }
        .d-faq__toggle { flex-shrink: 0; font-size: 1rem; color: var(--saffron); transition: transform 0.25s ease; }
        .d-faq--open .d-faq__toggle { transform: rotate(180deg); }
        .d-faq__answer { max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.3s ease; padding: 0 1.2rem; }
        .d-faq--open .d-faq__answer { max-height: 400px; padding: 0 1.2rem 1.1rem; }
        .d-faq__answerText { font-size: 0.88rem; line-height: 1.75; color: #5a4530; margin: 0; border-top: 1px solid var(--border); padding-top: 0.9rem; }

        /* ================ CTA ================ */
        .d-cta { padding: 4rem 1rem; background: linear-gradient(135deg, #3B2414 0%, #6B3D1B 55%, #8B4E1F 100%); position: relative; overflow: hidden; }
        .d-cta::before { content: ""; position: absolute; top: -120px; right: -120px; width: 380px; height: 380px; background: radial-gradient(circle, rgba(232, 138, 5, 0.35) 0%, transparent 70%); border-radius: 50%; }
        .d-cta::after { content: ""; position: absolute; bottom: -140px; left: -140px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(201, 154, 46, 0.25) 0%, transparent 70%); border-radius: 50%; }
        .d-cta__inner { max-width: 820px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; position: relative; z-index: 1; }
        .d-cta__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(255, 248, 231, 0.12); border: 1px solid rgba(232, 138, 5, 0.5); border-radius: 999px; font-size: 0.82rem; font-weight: 700; color: #FFD89B; letter-spacing: 0.5px; text-transform: uppercase; backdrop-filter: blur(4px); }
        .d-cta__title { font-size: 2.1rem; font-weight: 800; color: #FFF8E7; line-height: 1.2; letter-spacing: -0.3px; margin: 0; }
        .d-cta__text { font-size: 1rem; line-height: 1.75; color: rgba(255, 248, 231, 0.85); margin: 0; max-width: 660px; }
        .d-cta__buttons { display: flex; gap: 0.7rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem; }
        .d-cta__btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.9rem 1.7rem; font-size: 0.95rem; font-weight: 700; border-radius: 999px; text-decoration: none; cursor: pointer; border: 2px solid transparent; white-space: nowrap; transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease; }
        .d-cta__btn--primary { background: linear-gradient(135deg, var(--saffron), var(--gold)); color: #fff; box-shadow: 0 8px 22px rgba(232, 138, 5, 0.5); }
        .d-cta__btn--primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(232, 138, 5, 0.6); }
        .d-cta__btn--ghost { background: transparent; color: #FFF8E7; border-color: rgba(255, 248, 231, 0.4); }
        .d-cta__btn--ghost:hover { background: rgba(255, 248, 231, 0.1); border-color: #FFD89B; transform: translateY(-2px); }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1024px) {
          .d-hero { padding: 3.2rem 1rem 2.8rem; }
          .d-hero__title { font-size: 2.2rem; }
          .d-section { padding: 2.8rem 1rem; }
          .d-head__title { font-size: 1.75rem; }

          .d-whyGrid { grid-template-columns: repeat(2, 1fr); }
          .d-impactGrid { grid-template-columns: repeat(2, 1fr); }
          .d-otherGrid { grid-template-columns: repeat(2, 1fr); }

          .d-formWrap { padding: 1.8rem 1.5rem; }
          .d-presets { grid-template-columns: repeat(2, 1fr); }

          .d-cta { padding: 3.2rem 1rem; }
          .d-cta__title { font-size: 1.75rem; }
        }

        @media (max-width: 640px) {
          .d-hero { padding: 2.4rem 0.9rem 2.2rem; }
          .d-hero__title { font-size: 1.7rem; }
          .d-hero__subtitle { font-size: 0.92rem; line-height: 1.65; }
          .d-hero__badge { font-size: 0.75rem; }
          .d-section { padding: 2.4rem 0.9rem; }
          .d-head { margin-bottom: 2rem; }
          .d-head__title { font-size: 1.45rem; }
          .d-head__subtitle { font-size: 0.88rem; }

          .d-whyGrid { grid-template-columns: 1fr; gap: 1rem; }
          .d-why { padding: 1.3rem 1.1rem; }
          .d-why__icon { width: 54px; height: 54px; font-size: 1.4rem; }

          .d-formWrap { padding: 1.5rem 1.1rem; border-radius: 18px; }
          .d-formHead__title { font-size: 1.3rem; }
          .d-presets { grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
          .d-preset { padding: 0.85rem 0.5rem; }
          .d-preset__value { font-size: 1rem; }

          .d-row { grid-template-columns: 1fr; }

          .d-impactGrid { grid-template-columns: 1fr; gap: 1rem; }
          .d-otherGrid { grid-template-columns: 1fr; gap: 1rem; }

          .d-faq__btn { font-size: 0.88rem; padding: 1rem 1rem; }

          .d-cta { padding: 2.6rem 0.9rem; }
          .d-cta__title { font-size: 1.5rem; }
          .d-cta__text { font-size: 0.92rem; }
        }

        @media (max-width: 425px) {
          .d-hero__title { font-size: 1.5rem; }
          .d-hero__subtitle { font-size: 0.85rem; }
          .d-head__title { font-size: 1.3rem; }
          .d-head__subtitle { font-size: 0.82rem; }
          .d-preset__value { font-size: 0.95rem; }
          .d-preset__label { font-size: 0.62rem; }
          .d-impact__amount { font-size: 1.2rem; }
          .d-cta__title { font-size: 1.3rem; }
          .d-cta__text { font-size: 0.85rem; }
          .d-cta__btn { flex: 1 1 auto; min-width: 130px; padding: 0.75rem 1.15rem; font-size: 0.85rem; }
        }

        @media (max-width: 375px) {
          .d-crumb { padding: 0.75rem 0.75rem; }
          .d-crumb__inner { font-size: 0.78rem; }
          .d-hero { padding: 2rem 0.75rem 1.9rem; }
          .d-hero__title { font-size: 1.32rem; }
          .d-hero__subtitle { font-size: 0.8rem; }
          .d-section { padding: 2rem 0.75rem; }
          .d-head__title { font-size: 1.15rem; }

          .d-formWrap { padding: 1.3rem 1rem; }
          .d-formHead__title { font-size: 1.15rem; }
          .d-input, .d-select, .d-textarea { padding: 0.7rem 0.85rem; font-size: 0.86rem; }
          .d-presets { gap: 0.5rem; }
          .d-preset { padding: 0.75rem 0.4rem; }
          .d-preset__value { font-size: 0.88rem; }
          .d-preset__label { font-size: 0.58rem; }
          .d-submit { padding: 0.85rem 1.6rem; font-size: 0.9rem; }

          .d-faq__btn { font-size: 0.82rem; padding: 0.9rem 0.9rem; }
          .d-faq__answerText { font-size: 0.8rem; }

          .d-cta__title { font-size: 1.15rem; }
          .d-cta__btn { padding: 0.65rem 0.95rem; font-size: 0.78rem; min-width: 110px; }
        }

        @media (max-width: 340px) {
          .d-hero__title { font-size: 1.15rem; }
          .d-head__title { font-size: 1.05rem; }
          .d-why { padding: 1.1rem 0.95rem; }
          .d-impact { padding: 1.2rem 1rem; }
          .d-other { padding: 1.2rem 1rem; }
          .d-cta__title { font-size: 1.05rem; }
          .d-cta__text { font-size: 0.78rem; }
        }
      `}</style>

      {/* ================= PAGE MARKUP ================= */}
      <div className="donate-page">

        {/* Breadcrumb */}
        <div className="d-crumb">
          <div className="d-crumb__inner">
            <Link to="/" className="d-crumb__link">
              {t("donatePage.breadcrumbHome")}
            </Link>
            <span className="d-crumb__sep">›</span>
            <span className="d-crumb__current">
              {t("donatePage.breadcrumbCurrent")}
            </span>
          </div>
        </div>

        {/* Hero */}
        <section className="d-hero">
          <div className="d-hero__inner">
            <span className="d-hero__badge">{t("donatePage.heroBadge")}</span>
            <h1 className="d-hero__title">{t("donatePage.heroTitle")}</h1>
            <span className="d-hero__divider" />
            <p className="d-hero__subtitle">{t("donatePage.heroSubtitle")}</p>
          </div>
        </section>

        {/* Why Donate */}
        <section className="d-section">
          <div className="d-section__container">
            <header className="d-head">
              <span className="d-head__badge">{t("donatePage.whyBadge")}</span>
              <h2 className="d-head__title">{t("donatePage.whyTitle")}</h2>
              <span className="d-head__divider" />
              <p className="d-head__subtitle">{t("donatePage.whySubtitle")}</p>
            </header>

            <div className="d-whyGrid">
              {whyCards.map((c, i) => (
                <div key={i} className="d-why">
                  <span className="d-why__icon" aria-hidden="true">{c.icon}</span>
                  <h3 className="d-why__title">{c.title}</h3>
                  <p className="d-why__text">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <section className="d-section d-section--alt">
          <div className="d-section__container">
            <div className="d-formWrap">
              <div className="d-formHead">
                <span className="d-formHead__badge">{t("donatePage.formBadge")}</span>
                <h2 className="d-formHead__title">{t("donatePage.formTitle")}</h2>
                <p className="d-formHead__subtitle">{t("donatePage.formSubtitle")}</p>
              </div>

              <form className="d-form" onSubmit={handleSubmit}>
                {/* Presets */}
                <div className="d-field">
                  <span className="d-label">{t("donatePage.selectAmountLabel")}</span>
                  <div className="d-presets">
                    {presetAmounts.map((amount, i) => {
                      const labels = [
                        t("donatePage.amount1Label"),
                        t("donatePage.amount2Label"),
                        t("donatePage.amount3Label"),
                        t("donatePage.amount4Label"),
                      ];
                      return (
                        <button
                          type="button"
                          key={amount}
                          className={`d-preset ${
                            selectedAmount === amount && !customAmount
                              ? "d-preset--active"
                              : ""
                          }`}
                          onClick={() => handlePresetClick(amount)}
                        >
                          <span className="d-preset__value">₹{amount.toLocaleString("en-IN")}</span>
                          <span className="d-preset__label">{labels[i]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom amount */}
                <div className="d-field">
                  <label className="d-label" htmlFor="customAmount">
                    {t("donatePage.customAmountLabel")}
                  </label>
                  <div className="d-customWrap">
                    <span className="d-customSymbol">₹</span>
                    <input
                      id="customAmount"
                      type="number"
                      min="1"
                      className="d-input d-input--amount"
                      placeholder={t("donatePage.customAmountPlaceholder")}
                      value={customAmount}
                      onChange={handleCustomChange}
                    />
                  </div>
                </div>

                {/* Name + Email */}
                <div className="d-row">
                  <div className="d-field">
                    <label className="d-label" htmlFor="d-name">
                      {t("donatePage.nameLabel")} *
                    </label>
                    <input
                      id="d-name"
                      name="name"
                      type="text"
                      required
                      className="d-input"
                      placeholder={t("donatePage.namePlaceholder")}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-field">
                    <label className="d-label" htmlFor="d-email">
                      {t("donatePage.emailLabel")} *
                    </label>
                    <input
                      id="d-email"
                      name="email"
                      type="email"
                      required
                      className="d-input"
                      placeholder={t("donatePage.emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Phone + Type */}
                <div className="d-row">
                  <div className="d-field">
                    <label className="d-label" htmlFor="d-phone">
                      {t("donatePage.phoneLabel")}
                    </label>
                    <input
                      id="d-phone"
                      name="phone"
                      type="tel"
                      className="d-input"
                      placeholder={t("donatePage.phonePlaceholder")}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-field">
                    <label className="d-label" htmlFor="d-type">
                      {t("donatePage.donateTypeLabel")}
                    </label>
                    <select
                      id="d-type"
                      name="type"
                      className="d-select"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      {donateTypes.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="d-field">
                  <label className="d-label" htmlFor="d-message">
                    {t("donatePage.messageLabel")}
                  </label>
                  <textarea
                    id="d-message"
                    name="message"
                    className="d-textarea"
                    placeholder={t("donatePage.messagePlaceholder")}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Anonymous */}
                <label className="d-checkbox">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                  />
                  <span className="d-checkbox__box" />
                  {t("donatePage.anonymousLabel")}
                </label>

                {/* Secure notes */}
                <div className="d-secure">
                  <span className="d-secure__item">{t("donatePage.secureNote")}</span>
                  <span className="d-secure__item">📜 {t("donatePage.taxNote")}</span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="d-submit"
                  disabled={status === "sending" || !finalAmount}
                >
                  {status === "sending"
                    ? t("donatePage.processingBtn")
                    : `${t("donatePage.submitBtn")} · ₹${(finalAmount || 0).toLocaleString("en-IN")}`}
                  {status !== "sending" && (
                    <span className="d-submit__arrow">→</span>
                  )}
                </button>

                {status === "success" && (
                  <p className="d-status d-status--success">
                    {t("donatePage.successMsg")}
                  </p>
                )}
                {status === "error" && (
                  <p className="d-status d-status--error">
                    {t("donatePage.errorMsg")}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="d-section">
          <div className="d-section__container">
            <header className="d-head">
              <span className="d-head__badge">{t("donatePage.impactBadge")}</span>
              <h2 className="d-head__title">{t("donatePage.impactTitle")}</h2>
              <span className="d-head__divider" />
              <p className="d-head__subtitle">{t("donatePage.impactSubtitle")}</p>
            </header>

            <div className="d-impactGrid">
              {impacts.map((im, i) => (
                <div key={i} className="d-impact">
                  <span className="d-impact__icon" aria-hidden="true">{im.icon}</span>
                  <div className="d-impact__content">
                    <span className="d-impact__amount">{im.amount}</span>
                    <p className="d-impact__text">{im.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Ways */}
        <section className="d-section d-section--alt">
          <div className="d-section__container">
            <header className="d-head">
              <span className="d-head__badge">{t("donatePage.otherBadge")}</span>
              <h2 className="d-head__title">{t("donatePage.otherTitle")}</h2>
              <span className="d-head__divider" />
              <p className="d-head__subtitle">{t("donatePage.otherSubtitle")}</p>
            </header>

            <div className="d-otherGrid">
              {otherWays.map((w, i) => (
                <div key={i} className="d-other">
                  <span className="d-other__icon" aria-hidden="true">{w.icon}</span>
                  <h3 className="d-other__title">{w.title}</h3>
                  <p className="d-other__text">{w.text}</p>
                  <span className="d-other__line">{w.line}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="d-section">
          <div className="d-section__container">
            <header className="d-head">
              <span className="d-head__badge">{t("donatePage.faqBadge")}</span>
              <h2 className="d-head__title">{t("donatePage.faqTitle")}</h2>
              <span className="d-head__divider" />
              <p className="d-head__subtitle">{t("donatePage.faqSubtitle")}</p>
            </header>

            <div className="d-faqList">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className={`d-faq ${isOpen ? "d-faq--open" : ""}`}
                  >
                    <button
                      type="button"
                      className="d-faq__btn"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={isOpen}
                    >
                      <span className="d-faq__q">
                        <span className="d-faq__icon">?</span>
                        {faq.q}
                      </span>
                      <span className="d-faq__toggle">▾</span>
                    </button>
                    <div className="d-faq__answer">
                      <p className="d-faq__answerText">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="d-cta">
          <div className="d-cta__inner">
            <span className="d-cta__badge">{t("donatePage.ctaBadge")}</span>
            <h2 className="d-cta__title">{t("donatePage.ctaTitle")}</h2>
            <p className="d-cta__text">{t("donatePage.ctaText")}</p>

            <div className="d-cta__buttons">
              <Link to="/contact" className="d-cta__btn d-cta__btn--primary">
                {t("donatePage.ctaContactBtn")} →
              </Link>
              <Link to="/" className="d-cta__btn d-cta__btn--ghost">
                {t("donatePage.ctaHomeBtn")}
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Donate;