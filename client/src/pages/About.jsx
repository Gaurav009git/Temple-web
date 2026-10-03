import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import aboutImg from "../assets/about.jpeg";
import heroImg from "../assets/hero.jpeg";
import templeImg from "../assets/event1.jpeg"; // reuse as temple image

const About = () => {
  const { t } = useTranslation();

  const values = [
    { icon: "🕉️", title: t("aboutPage.value1Title"), text: t("aboutPage.value1Text") },
    { icon: "🤲", title: t("aboutPage.value2Title"), text: t("aboutPage.value2Text") },
    { icon: "👥", title: t("aboutPage.value3Title"), text: t("aboutPage.value3Text") },
    { icon: "🪔", title: t("aboutPage.value4Title"), text: t("aboutPage.value4Text") },
  ];

  const timeline = [
    { year: t("aboutPage.timeline1Year"), title: t("aboutPage.timeline1Title"), text: t("aboutPage.timeline1Text") },
    { year: t("aboutPage.timeline2Year"), title: t("aboutPage.timeline2Title"), text: t("aboutPage.timeline2Text") },
    { year: t("aboutPage.timeline3Year"), title: t("aboutPage.timeline3Title"), text: t("aboutPage.timeline3Text") },
    { year: t("aboutPage.timeline4Year"), title: t("aboutPage.timeline4Title"), text: t("aboutPage.timeline4Text") },
    { year: t("aboutPage.timeline5Year"), title: t("aboutPage.timeline5Title"), text: t("aboutPage.timeline5Text") },
  ];

  const priests = [
    { name: t("aboutPage.priest1Name"), role: t("aboutPage.priest1Role"), initial: "🙏" },
    { name: t("aboutPage.priest2Name"), role: t("aboutPage.priest2Role"), initial: "🕉️" },
    { name: t("aboutPage.priest3Name"), role: t("aboutPage.priest3Role"), initial: "🪔" },
    { name: t("aboutPage.priest4Name"), role: t("aboutPage.priest4Role"), initial: "🌸" },
  ];

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        .about-page {
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

        .about-page *,
        .about-page *::before,
        .about-page *::after { box-sizing: border-box; }

        /* ================ BREADCRUMB ================ */
        .about-crumb {
          background: var(--nav-bg);
          border-bottom: 1px solid var(--border);
          padding: 1rem 1rem;
        }

        .about-crumb__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #6b5440;
          flex-wrap: wrap;
        }

        .about-crumb__link {
          color: var(--saffron);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }
        .about-crumb__link:hover { color: var(--text-dark); }

        .about-crumb__sep { color: var(--gold); font-weight: 800; }

        .about-crumb__current {
          color: var(--text-dark);
          font-weight: 700;
        }

        /* ================ HERO BANNER ================ */
        .about-hero {
          padding: 4rem 1rem 3.5rem;
          text-align: center;
          background: linear-gradient(180deg, #FFF8E7 0%, #FFFDF7 100%);
          position: relative;
          overflow: hidden;
        }

        .about-hero::before {
          content: "";
          position: absolute;
          top: -120px; right: -120px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(232, 138, 5, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .about-hero::after {
          content: "";
          position: absolute;
          bottom: -120px; left: -120px;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(201, 154, 46, 0.12) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .about-hero__inner {
          max-width: 820px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .about-hero__badge {
          display: inline-block;
          padding: 0.45rem 1rem;
          background: rgba(232, 138, 5, 0.12);
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--saffron);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .about-hero__title {
          font-size: 2.6rem;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin: 0;
          background: linear-gradient(135deg, var(--text-dark) 30%, var(--saffron) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-hero__divider {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          border-radius: 3px;
        }

        .about-hero__subtitle {
          font-size: 1.05rem;
          line-height: 1.75;
          color: #5a4530;
          margin: 0;
          max-width: 720px;
        }

        /* ================ SECTION BASE ================ */
        .about-section {
          padding: 4rem 1rem;
          position: relative;
          overflow: hidden;
        }

        .about-section--alt {
          background: var(--nav-bg);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .about-section__container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ================ STORY GRID ================ */
        .about-story {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          align-items: center;
          gap: 3.5rem;
        }

        .about-story__imgWrap {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .about-story__frame {
          width: 100%;
          max-width: 460px;
          aspect-ratio: 4 / 5;
          border-radius: 22px;
          overflow: hidden;
          box-shadow:
            0 24px 50px rgba(59, 36, 20, 0.18),
            0 0 0 6px rgba(255, 248, 231, 0.9),
            0 0 0 8px rgba(201, 154, 46, 0.35);
        }

        .about-story__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .about-story__diya {
          position: absolute;
          top: 6%;
          left: 6%;
          font-size: 1.6rem;
          filter: drop-shadow(0 0 8px rgba(232, 138, 5, 0.6));
          animation: flicker 2.4s ease-in-out infinite;
          z-index: 2;
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.75; transform: scale(1.1); }
        }

        .about-story__content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 0;
        }

        .about-story__title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }

        .about-story__divider {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          border-radius: 3px;
        }

        .about-story__p {
          font-size: 1rem;
          line-height: 1.8;
          color: #5a4530;
          margin: 0;
        }

        /* ================ MISSION & VISION ================ */
        .about-mvGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.6rem;
        }

        .about-mvCard {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 1.8rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          box-shadow: 0 6px 18px rgba(59, 36, 20, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .about-mvCard::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
        }

        .about-mvCard:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 38px rgba(201, 154, 46, 0.22);
        }

        .about-mvCard__icon {
          width: 54px;
          height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(232, 138, 5, 0.15), rgba(201, 154, 46, 0.2));
          border-radius: 14px;
          font-size: 1.6rem;
        }

        .about-mvCard__title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0;
        }

        .about-mvCard__text {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #5a4530;
          margin: 0;
        }

        /* ================ SECTION HEADINGS ================ */
        .about-head {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
        }

        .about-head__badge {
          display: inline-block;
          padding: 0.45rem 1rem;
          background: rgba(232, 138, 5, 0.12);
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--saffron);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .about-head__title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }

        .about-head__divider {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          border-radius: 3px;
        }

        .about-head__subtitle {
          font-size: 0.98rem;
          line-height: 1.7;
          color: #5a4530;
          margin: 0;
        }

        /* ================ VALUES GRID ================ */
        .about-values {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.3rem;
        }

        .about-value {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.6rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.7rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .about-value:hover {
          transform: translateY(-6px);
          border-color: var(--saffron);
          box-shadow: 0 18px 34px rgba(232, 138, 5, 0.18);
        }

        .about-value__icon {
          width: 58px;
          height: 58px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          border-radius: 50%;
          font-size: 1.5rem;
          box-shadow: 0 8px 18px rgba(232, 138, 5, 0.35);
        }

        .about-value__title {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0;
        }

        .about-value__text {
          font-size: 0.88rem;
          line-height: 1.65;
          color: #5a4530;
          margin: 0;
        }

        /* ================ TIMELINE ================ */
        .about-timeline {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          padding: 1rem 0;
        }

        .about-timeline::before {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          background: linear-gradient(180deg, var(--saffron), var(--gold), var(--saffron));
          border-radius: 3px;
          opacity: 0.4;
        }

        .about-tlItem {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 60px 1fr;
          align-items: center;
          margin-bottom: 2rem;
        }

        .about-tlItem:last-child { margin-bottom: 0; }

        .about-tlItem__card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.1rem 1.2rem;
          box-shadow: 0 6px 16px rgba(59, 36, 20, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .about-tlItem__card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 28px rgba(201, 154, 46, 0.2);
        }

        .about-tlItem__title {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0 0 0.3rem;
        }

        .about-tlItem__text {
          font-size: 0.86rem;
          line-height: 1.6;
          color: #5a4530;
          margin: 0;
        }

        .about-tlItem__dotWrap {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .about-tlItem__dot {
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 0.82rem;
          font-weight: 800;
          border-radius: 50%;
          box-shadow: 0 0 0 6px var(--cream), 0 0 0 8px var(--border), 0 8px 18px rgba(232, 138, 5, 0.3);
          z-index: 2;
        }

        .about-section--alt .about-tlItem__dot {
          box-shadow: 0 0 0 6px var(--nav-bg), 0 0 0 8px var(--border), 0 8px 18px rgba(232, 138, 5, 0.3);
        }

        .about-tlItem__empty { /* placeholder for grid symmetry */ }

        /* ================ PRIESTS ================ */
        .about-priests {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.4rem;
        }

        .about-priest {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 1.8rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.7rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .about-priest:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 34px rgba(201, 154, 46, 0.22);
        }

        .about-priest__avatar {
          width: 78px;
          height: 78px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(232, 138, 5, 0.15), rgba(201, 154, 46, 0.25));
          border: 2px solid var(--border);
          border-radius: 50%;
          font-size: 2rem;
          box-shadow: inset 0 0 0 4px var(--white);
        }

        .about-priest__name {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0;
        }

        .about-priest__role {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--saffron);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }

        /* ================ CTA BANNER ================ */
        .about-cta {
          padding: 4rem 1rem;
          background: linear-gradient(135deg, #3B2414 0%, #6B3D1B 55%, #8B4E1F 100%);
          position: relative;
          overflow: hidden;
        }

        .about-cta::before {
          content: "";
          position: absolute;
          top: -120px; right: -120px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(232, 138, 5, 0.35) 0%, transparent 70%);
          border-radius: 50%;
        }

        .about-cta::after {
          content: "";
          position: absolute;
          bottom: -140px; left: -140px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(201, 154, 46, 0.25) 0%, transparent 70%);
          border-radius: 50%;
        }

        .about-cta__inner {
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .about-cta__title {
          font-size: 2.1rem;
          font-weight: 800;
          color: #FFF8E7;
          line-height: 1.2;
          letter-spacing: -0.3px;
          margin: 0;
        }

        .about-cta__text {
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(255, 248, 231, 0.85);
          margin: 0;
          max-width: 660px;
        }

        .about-cta__buttons {
          display: flex;
          gap: 0.7rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }

        .about-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 1.7rem;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 999px;
          text-decoration: none;
          cursor: pointer;
          border: 2px solid transparent;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
        }

        .about-cta__btn--primary {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          box-shadow: 0 8px 22px rgba(232, 138, 5, 0.5);
        }
        .about-cta__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(232, 138, 5, 0.6);
        }

        .about-cta__btn--ghost {
          background: transparent;
          color: #FFF8E7;
          border-color: rgba(255, 248, 231, 0.4);
        }
        .about-cta__btn--ghost:hover {
          background: rgba(255, 248, 231, 0.1);
          border-color: #FFD89B;
          transform: translateY(-2px);
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1024px) {
          .about-hero { padding: 3.2rem 1rem 2.8rem; }
          .about-hero__title { font-size: 2.2rem; }
          .about-hero__subtitle { font-size: 1rem; }

          .about-section { padding: 3.2rem 1rem; }
          .about-story { gap: 2.5rem; }
          .about-story__frame { max-width: 380px; }
          .about-story__title { font-size: 1.75rem; }
          .about-story__p { font-size: 0.95rem; }

          .about-head__title { font-size: 1.75rem; }

          .about-values, .about-priests {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-cta { padding: 3.2rem 1rem; }
          .about-cta__title { font-size: 1.75rem; }
        }

        @media (max-width: 860px) {
          .about-story {
            grid-template-columns: 1fr;
            gap: 2.4rem;
          }
          .about-story__imgWrap { order: 1; max-width: 420px; margin: 0 auto; width: 100%; }
          .about-story__content { order: 2; align-items: center; text-align: center; }
          .about-story__divider { align-self: center; }
          .about-story__frame { aspect-ratio: 1 / 1; max-width: 340px; }

          .about-mvGrid { grid-template-columns: 1fr; gap: 1.2rem; }
        }

        @media (max-width: 640px) {
          .about-hero { padding: 2.4rem 0.9rem 2.2rem; }
          .about-hero__title { font-size: 1.7rem; }
          .about-hero__subtitle { font-size: 0.92rem; line-height: 1.65; }
          .about-hero__badge { font-size: 0.75rem; }

          .about-section { padding: 2.4rem 0.9rem; }
          .about-head { margin-bottom: 2rem; }
          .about-head__title { font-size: 1.45rem; }
          .about-head__subtitle { font-size: 0.88rem; }

          .about-story__frame { max-width: 280px; }
          .about-story__title { font-size: 1.45rem; }
          .about-story__p { font-size: 0.9rem; line-height: 1.7; }

          .about-mvCard { padding: 1.4rem 1.1rem; }
          .about-mvCard__title { font-size: 1.1rem; }
          .about-mvCard__text { font-size: 0.88rem; }

          .about-values, .about-priests {
            grid-template-columns: 1fr;
            gap: 1rem;
            max-width: 420px;
            margin: 0 auto;
          }

          /* Timeline → single-side vertical */
          .about-timeline::before { left: 22px; transform: none; }
          .about-tlItem {
            grid-template-columns: 48px 1fr;
            gap: 0.9rem;
            align-items: flex-start;
          }
          .about-tlItem__dotWrap { justify-content: flex-start; padding-top: 0.4rem; }
          .about-tlItem__empty { display: none; }
          .about-tlItem__card { grid-column: 2; }
          .about-tlItem__dot { width: 42px; height: 42px; font-size: 0.72rem; }

          .about-cta { padding: 2.6rem 0.9rem; }
          .about-cta__title { font-size: 1.5rem; }
          .about-cta__text { font-size: 0.92rem; }
        }

        @media (max-width: 425px) {
          .about-hero__title { font-size: 1.5rem; }
          .about-hero__subtitle { font-size: 0.85rem; }

          .about-head__title { font-size: 1.3rem; }
          .about-head__subtitle { font-size: 0.82rem; }

          .about-story__frame { max-width: 240px; }
          .about-story__title { font-size: 1.3rem; }
          .about-story__p { font-size: 0.85rem; }

          .about-value { padding: 1.3rem 1rem; }
          .about-value__icon { width: 50px; height: 50px; font-size: 1.3rem; }
          .about-value__title { font-size: 0.95rem; }
          .about-value__text { font-size: 0.82rem; }

          .about-priest { padding: 1.4rem 1rem; }
          .about-priest__avatar { width: 66px; height: 66px; font-size: 1.7rem; }
          .about-priest__name { font-size: 0.92rem; }

          .about-cta__title { font-size: 1.3rem; }
          .about-cta__text { font-size: 0.85rem; }
          .about-cta__btn {
            flex: 1 1 auto;
            min-width: 130px;
            padding: 0.75rem 1.15rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 375px) {
          .about-crumb { padding: 0.75rem 0.75rem; }
          .about-crumb__inner { font-size: 0.78rem; }

          .about-hero { padding: 2rem 0.75rem 1.9rem; }
          .about-hero__title { font-size: 1.32rem; }
          .about-hero__subtitle { font-size: 0.8rem; }

          .about-section { padding: 2rem 0.75rem; }
          .about-head__title { font-size: 1.15rem; }

          .about-story__frame { max-width: 210px; }
          .about-story__title { font-size: 1.15rem; }
          .about-story__p { font-size: 0.8rem; }

          .about-tlItem__card { padding: 0.9rem 1rem; }
          .about-tlItem__title { font-size: 0.92rem; }
          .about-tlItem__text { font-size: 0.78rem; }

          .about-cta__title { font-size: 1.15rem; }
          .about-cta__btn {
            padding: 0.65rem 0.95rem;
            font-size: 0.78rem;
            min-width: 110px;
          }
        }

        @media (max-width: 340px) {
          .about-hero__title { font-size: 1.15rem; }
          .about-head__title { font-size: 1.05rem; }
          .about-story__title { font-size: 1.05rem; }

          .about-value__title { font-size: 0.88rem; }
          .about-value__text { font-size: 0.75rem; }

          .about-cta__title { font-size: 1.05rem; }
          .about-cta__text { font-size: 0.78rem; }
        }
      `}</style>

      {/* ================= PAGE MARKUP ================= */}
      <div className="about-page">

        {/* ---------- BREADCRUMB ---------- */}
        <div className="about-crumb">
          <div className="about-crumb__inner">
            <Link to="/" className="about-crumb__link">
              {t("aboutPage.breadcrumbHome")}
            </Link>
            <span className="about-crumb__sep">›</span>
            <span className="about-crumb__current">
              {t("aboutPage.breadcrumbCurrent")}
            </span>
          </div>
        </div>

        {/* ---------- HERO BANNER ---------- */}
        <section className="about-hero">
          <div className="about-hero__inner">
            <span className="about-hero__badge">{t("aboutPage.heroBadge")}</span>
            <h1 className="about-hero__title">{t("aboutPage.heroTitle")}</h1>
            <span className="about-hero__divider" />
            <p className="about-hero__subtitle">{t("aboutPage.heroSubtitle")}</p>
          </div>
        </section>

        {/* ---------- STORY ---------- */}
        <section className="about-section">
          <div className="about-section__container">
            <div className="about-story">
              <div className="about-story__imgWrap">
                <div className="about-story__frame">
                  <img
                    src={aboutImg}
                    alt={t("aboutPage.imageAlt1")}
                    className="about-story__img"
                  />
                </div>
                <span className="about-story__diya" aria-hidden="true">🪔</span>
              </div>

              <div className="about-story__content">
                <h2 className="about-story__title">{t("aboutPage.storyTitle")}</h2>
                <span className="about-story__divider" />
                <p className="about-story__p">{t("aboutPage.storyP1")}</p>
                <p className="about-story__p">{t("aboutPage.storyP2")}</p>
                <p className="about-story__p">{t("aboutPage.storyP3")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MISSION & VISION ---------- */}
        <section className="about-section about-section--alt">
          <div className="about-section__container">
            <div className="about-mvGrid">
              <div className="about-mvCard">
                <span className="about-mvCard__icon" aria-hidden="true">🎯</span>
                <h3 className="about-mvCard__title">{t("aboutPage.missionTitle")}</h3>
                <p className="about-mvCard__text">{t("aboutPage.missionText")}</p>
              </div>
              <div className="about-mvCard">
                <span className="about-mvCard__icon" aria-hidden="true">👁️</span>
                <h3 className="about-mvCard__title">{t("aboutPage.visionTitle")}</h3>
                <p className="about-mvCard__text">{t("aboutPage.visionText")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CORE VALUES ---------- */}
        <section className="about-section">
          <div className="about-section__container">
            <header className="about-head">
              <span className="about-head__badge">🙏 Our Foundation</span>
              <h2 className="about-head__title">{t("aboutPage.valuesTitle")}</h2>
              <span className="about-head__divider" />
            </header>

            <div className="about-values">
              {values.map((v, i) => (
                <div key={i} className="about-value">
                  <span className="about-value__icon" aria-hidden="true">{v.icon}</span>
                  <h3 className="about-value__title">{v.title}</h3>
                  <p className="about-value__text">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- TIMELINE ---------- */}
        <section className="about-section about-section--alt">
          <div className="about-section__container">
            <header className="about-head">
              <span className="about-head__badge">📜 Our History</span>
              <h2 className="about-head__title">{t("aboutPage.timelineTitle")}</h2>
              <span className="about-head__divider" />
              <p className="about-head__subtitle">{t("aboutPage.timelineSubtitle")}</p>
            </header>

            <div className="about-timeline">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className="about-tlItem">
                    {isLeft ? (
                      <>
                        <div className="about-tlItem__card">
                          <h4 className="about-tlItem__title">{item.title}</h4>
                          <p className="about-tlItem__text">{item.text}</p>
                        </div>
                        <div className="about-tlItem__dotWrap">
                          <span className="about-tlItem__dot">{item.year}</span>
                        </div>
                        <div className="about-tlItem__empty" />
                      </>
                    ) : (
                      <>
                        <div className="about-tlItem__empty" />
                        <div className="about-tlItem__dotWrap">
                          <span className="about-tlItem__dot">{item.year}</span>
                        </div>
                        <div className="about-tlItem__card">
                          <h4 className="about-tlItem__title">{item.title}</h4>
                          <p className="about-tlItem__text">{item.text}</p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- PRIESTS & TRUSTEES ---------- */}
        <section className="about-section">
          <div className="about-section__container">
            <header className="about-head">
              <span className="about-head__badge">🕉️ Our Servants</span>
              <h2 className="about-head__title">{t("aboutPage.priestTitle")}</h2>
              <span className="about-head__divider" />
              <p className="about-head__subtitle">{t("aboutPage.priestSubtitle")}</p>
            </header>

            <div className="about-priests">
              {priests.map((p, i) => (
                <div key={i} className="about-priest">
                  <span className="about-priest__avatar" aria-hidden="true">{p.initial}</span>
                  <h4 className="about-priest__name">{p.name}</h4>
                  <p className="about-priest__role">{p.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA BANNER ---------- */}
        <section className="about-cta">
          <div className="about-cta__inner">
            <h2 className="about-cta__title">{t("aboutPage.ctaTitle")}</h2>
            <p className="about-cta__text">{t("aboutPage.ctaText")}</p>
            <div className="about-cta__buttons">
              <Link to="/contact" className="about-cta__btn about-cta__btn--primary">
                {t("aboutPage.ctaVisitBtn")} →
              </Link>
              <Link to="/donate" className="about-cta__btn about-cta__btn--ghost">
                {t("aboutPage.ctaDonateBtn")}
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;