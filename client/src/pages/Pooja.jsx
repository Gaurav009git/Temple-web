import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PoojaCard from "../components/pooja/PoojaCard";

import pooja1Img from "../assets/pooja1.jpeg";
import pooja2Img from "../assets/pooja2.jpeg";
import pooja3Img from "../assets/pooja3.jpeg";
import pooja4Img from "../assets/pooja4.jpg";
import pooja5Img from "../assets/pooja5.jpg";
import pooja6Img from "../assets/pooja6.jpg";

const Pooja = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");

  // Categories: daily | special | family | festival
  const poojas = [
    { id: 1, image: pooja1Img, icon: "🪔", popular: true,  category: "special"  },
    { id: 2, image: pooja2Img, icon: "🕉️", category: "daily"    },
    { id: 3, image: pooja3Img, icon: "🍛", category: "daily"    },
    { id: 4, image: pooja4Img, icon: "🙏", popular: true,  category: "family"   },
    { id: 5, image: pooja5Img, icon: "🏠", category: "family"   },
    { id: 6, image: pooja6Img, icon: "🌸", category: "festival" },
  ];

  const filters = [
    { key: "all",      label: t("poojaPage.filterAll")      },
    { key: "daily",    label: t("poojaPage.filterDaily")    },
    { key: "special",  label: t("poojaPage.filterSpecial")  },
    { key: "family",   label: t("poojaPage.filterFamily")   },
    { key: "festival", label: t("poojaPage.filterFestival") },
  ];

  const visiblePoojas =
    activeFilter === "all"
      ? poojas
      : poojas.filter((p) => p.category === activeFilter);

  const steps = [
    { num: "1", title: t("poojaPage.step1Title"), text: t("poojaPage.step1Text"), icon: "📖" },
    { num: "2", title: t("poojaPage.step2Title"), text: t("poojaPage.step2Text"), icon: "📝" },
    { num: "3", title: t("poojaPage.step3Title"), text: t("poojaPage.step3Text"), icon: "🙏" },
  ];

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        .pooja-page {
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

        .pooja-page *,
        .pooja-page *::before,
        .pooja-page *::after { box-sizing: border-box; }

        /* ================ BREADCRUMB ================ */
        .pooja-crumb {
          background: var(--nav-bg);
          border-bottom: 1px solid var(--border);
          padding: 1rem 1rem;
        }

        .pooja-crumb__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #6b5440;
          flex-wrap: wrap;
        }

        .pooja-crumb__link {
          color: var(--saffron);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }
        .pooja-crumb__link:hover { color: var(--text-dark); }

        .pooja-crumb__sep { color: var(--gold); font-weight: 800; }

        .pooja-crumb__current {
          color: var(--text-dark);
          font-weight: 700;
        }

        /* ================ HERO ================ */
        .pooja-hero {
          padding: 4rem 1rem 3.5rem;
          text-align: center;
          background: linear-gradient(180deg, #FFF8E7 0%, #FFFDF7 100%);
          position: relative;
          overflow: hidden;
        }

        .pooja-hero::before {
          content: "";
          position: absolute;
          top: -120px; right: -120px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(232, 138, 5, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .pooja-hero::after {
          content: "";
          position: absolute;
          bottom: -120px; left: -120px;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(201, 154, 46, 0.12) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .pooja-hero__inner {
          max-width: 820px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .pooja-hero__badge {
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

        .pooja-hero__title {
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

        .pooja-hero__divider {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          border-radius: 3px;
        }

        .pooja-hero__subtitle {
          font-size: 1.05rem;
          line-height: 1.75;
          color: #5a4530;
          margin: 0;
          max-width: 720px;
        }

        /* ================ SECTION BASE ================ */
        .pooja-section {
          padding: 3.5rem 1rem;
          position: relative;
          overflow: hidden;
        }

        .pooja-section--alt {
          background: var(--nav-bg);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .pooja-section__container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ================ FILTERS ================ */
        .pooja-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
        }

        .pooja-filter {
          padding: 0.55rem 1.15rem;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-dark);
          cursor: pointer;
          font-family: inherit;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
          white-space: nowrap;
        }

        .pooja-filter:hover {
          border-color: var(--saffron);
          color: var(--saffron);
          transform: translateY(-1px);
        }

        .pooja-filter--active {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          border-color: transparent;
          box-shadow: 0 6px 14px rgba(232, 138, 5, 0.3);
        }

        /* ================ GRID ================ */
        .pooja-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem;
        }

        /* ================ EMPTY STATE ================ */
        .pooja-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: #6b5440;
          font-size: 1rem;
        }

        /* ================ SECTION HEADINGS ================ */
        .pooja-head {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
        }

        .pooja-head__badge {
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

        .pooja-head__title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }

        .pooja-head__divider {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          border-radius: 3px;
        }

        .pooja-head__subtitle {
          font-size: 0.98rem;
          line-height: 1.7;
          color: #5a4530;
          margin: 0;
        }

        /* ================ STEPS ================ */
        .pooja-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          position: relative;
        }

        .pooja-step {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 1.8rem 1.4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .pooja-step:hover {
          transform: translateY(-6px);
          border-color: var(--saffron);
          box-shadow: 0 18px 34px rgba(201, 154, 46, 0.22);
        }

        .pooja-step__num {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 0.95rem;
          font-weight: 800;
          border-radius: 50%;
          box-shadow: 0 6px 14px rgba(232, 138, 5, 0.4);
          z-index: 2;
        }

        .pooja-step__icon {
          width: 68px;
          height: 68px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(232, 138, 5, 0.12);
          border-radius: 50%;
          font-size: 1.9rem;
          margin-top: 0.4rem;
        }

        .pooja-step__title {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0;
        }

        .pooja-step__text {
          font-size: 0.88rem;
          line-height: 1.65;
          color: #5a4530;
          margin: 0;
        }

        /* ================ CTA BANNER ================ */
        .pooja-cta {
          padding: 4rem 1rem;
          background: linear-gradient(135deg, #3B2414 0%, #6B3D1B 55%, #8B4E1F 100%);
          position: relative;
          overflow: hidden;
        }

        .pooja-cta::before {
          content: "";
          position: absolute;
          top: -120px; right: -120px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(232, 138, 5, 0.35) 0%, transparent 70%);
          border-radius: 50%;
        }

        .pooja-cta::after {
          content: "";
          position: absolute;
          bottom: -140px; left: -140px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(201, 154, 46, 0.25) 0%, transparent 70%);
          border-radius: 50%;
        }

        .pooja-cta__inner {
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

        .pooja-cta__badge {
          display: inline-block;
          padding: 0.45rem 1rem;
          background: rgba(255, 248, 231, 0.12);
          border: 1px solid rgba(232, 138, 5, 0.5);
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #FFD89B;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          backdrop-filter: blur(4px);
        }

        .pooja-cta__title {
          font-size: 2.1rem;
          font-weight: 800;
          color: #FFF8E7;
          line-height: 1.2;
          letter-spacing: -0.3px;
          margin: 0;
        }

        .pooja-cta__text {
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(255, 248, 231, 0.85);
          margin: 0;
          max-width: 660px;
        }

        .pooja-cta__buttons {
          display: flex;
          gap: 0.7rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }

        .pooja-cta__btn {
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

        .pooja-cta__btn--primary {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          box-shadow: 0 8px 22px rgba(232, 138, 5, 0.5);
        }
        .pooja-cta__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(232, 138, 5, 0.6);
        }

        .pooja-cta__btn--ghost {
          background: transparent;
          color: #FFF8E7;
          border-color: rgba(255, 248, 231, 0.4);
        }
        .pooja-cta__btn--ghost:hover {
          background: rgba(255, 248, 231, 0.1);
          border-color: #FFD89B;
          transform: translateY(-2px);
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1024px) {
          .pooja-hero { padding: 3.2rem 1rem 2.8rem; }
          .pooja-hero__title { font-size: 2.2rem; }

          .pooja-section { padding: 2.8rem 1rem; }

          .pooja-grid { gap: 1.3rem; }

          .pooja-head__title { font-size: 1.75rem; }

          .pooja-cta { padding: 3.2rem 1rem; }
          .pooja-cta__title { font-size: 1.75rem; }
        }

        @media (max-width: 860px) {
          .pooja-grid { grid-template-columns: repeat(2, 1fr); }

          .pooja-steps {
            grid-template-columns: 1fr;
            gap: 2.2rem;
          }
        }

        @media (max-width: 640px) {
          .pooja-hero { padding: 2.4rem 0.9rem 2.2rem; }
          .pooja-hero__title { font-size: 1.7rem; }
          .pooja-hero__subtitle { font-size: 0.92rem; line-height: 1.65; }
          .pooja-hero__badge { font-size: 0.75rem; }

          .pooja-section { padding: 2.4rem 0.9rem; }
          .pooja-head { margin-bottom: 2rem; }
          .pooja-head__title { font-size: 1.45rem; }
          .pooja-head__subtitle { font-size: 0.88rem; }

          .pooja-filter { padding: 0.5rem 0.95rem; font-size: 0.78rem; }
          .pooja-filters { gap: 0.4rem; margin-bottom: 2rem; }

          .pooja-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
            max-width: 460px;
            margin: 0 auto;
          }

          .pooja-step { padding: 1.5rem 1.1rem; }
          .pooja-step__icon { width: 58px; height: 58px; font-size: 1.6rem; }
          .pooja-step__title { font-size: 0.98rem; }
          .pooja-step__text { font-size: 0.84rem; }

          .pooja-cta { padding: 2.6rem 0.9rem; }
          .pooja-cta__title { font-size: 1.5rem; }
          .pooja-cta__text { font-size: 0.92rem; }
        }

        @media (max-width: 425px) {
          .pooja-hero__title { font-size: 1.5rem; }
          .pooja-hero__subtitle { font-size: 0.85rem; }

          .pooja-head__title { font-size: 1.3rem; }
          .pooja-head__subtitle { font-size: 0.82rem; }

          .pooja-filter { padding: 0.45rem 0.85rem; font-size: 0.74rem; }

          .pooja-cta__title { font-size: 1.3rem; }
          .pooja-cta__text { font-size: 0.85rem; }
          .pooja-cta__btn {
            flex: 1 1 auto;
            min-width: 130px;
            padding: 0.75rem 1.15rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 375px) {
          .pooja-crumb { padding: 0.75rem 0.75rem; }
          .pooja-crumb__inner { font-size: 0.78rem; }

          .pooja-hero { padding: 2rem 0.75rem 1.9rem; }
          .pooja-hero__title { font-size: 1.32rem; }
          .pooja-hero__subtitle { font-size: 0.8rem; }

          .pooja-section { padding: 2rem 0.75rem; }
          .pooja-head__title { font-size: 1.15rem; }

          .pooja-filter { padding: 0.4rem 0.75rem; font-size: 0.7rem; }

          .pooja-step { padding: 1.3rem 1rem; }
          .pooja-step__icon { width: 52px; height: 52px; font-size: 1.4rem; }

          .pooja-cta__title { font-size: 1.15rem; }
          .pooja-cta__btn {
            padding: 0.65rem 0.95rem;
            font-size: 0.78rem;
            min-width: 110px;
          }
        }

        @media (max-width: 340px) {
          .pooja-hero__title { font-size: 1.15rem; }
          .pooja-head__title { font-size: 1.05rem; }

          .pooja-filter { padding: 0.38rem 0.65rem; font-size: 0.66rem; }

          .pooja-cta__title { font-size: 1.05rem; }
          .pooja-cta__text { font-size: 0.78rem; }
        }
      `}</style>

      {/* ================= PAGE MARKUP ================= */}
      <div className="pooja-page">

        {/* ---------- BREADCRUMB ---------- */}
        <div className="pooja-crumb">
          <div className="pooja-crumb__inner">
            <Link to="/" className="pooja-crumb__link">
              {t("poojaPage.breadcrumbHome")}
            </Link>
            <span className="pooja-crumb__sep">›</span>
            <span className="pooja-crumb__current">
              {t("poojaPage.breadcrumbCurrent")}
            </span>
          </div>
        </div>

        {/* ---------- HERO ---------- */}
        <section className="pooja-hero">
          <div className="pooja-hero__inner">
            <span className="pooja-hero__badge">{t("poojaPage.heroBadge")}</span>
            <h1 className="pooja-hero__title">{t("poojaPage.heroTitle")}</h1>
            <span className="pooja-hero__divider" />
            <p className="pooja-hero__subtitle">{t("poojaPage.heroSubtitle")}</p>
          </div>
        </section>

        {/* ---------- POOJAS GRID ---------- */}
        <section className="pooja-section">
          <div className="pooja-section__container">
            {/* Filters */}
            <div className="pooja-filters">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={`pooja-filter ${
                    activeFilter === f.key ? "pooja-filter--active" : ""
                  }`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            {visiblePoojas.length > 0 ? (
              <div className="pooja-grid">
                {visiblePoojas.map((p) => (
                  <PoojaCard
                    key={p.id}
                    id={p.id}
                    image={p.image}
                    icon={p.icon}
                    popular={p.popular}
                  />
                ))}
              </div>
            ) : (
              <div className="pooja-empty">🪔 No poojas in this category.</div>
            )}
          </div>
        </section>

        {/* ---------- HOW IT WORKS ---------- */}
        <section className="pooja-section pooja-section--alt">
          <div className="pooja-section__container">
            <header className="pooja-head">
              <span className="pooja-head__badge">{t("poojaPage.infoBadge")}</span>
              <h2 className="pooja-head__title">{t("poojaPage.infoTitle")}</h2>
              <span className="pooja-head__divider" />
              <p className="pooja-head__subtitle">{t("poojaPage.infoSubtitle")}</p>
            </header>

            <div className="pooja-steps">
              {steps.map((s) => (
                <div key={s.num} className="pooja-step">
                  <span className="pooja-step__num">{s.num}</span>
                  <span className="pooja-step__icon" aria-hidden="true">
                    {s.icon}
                  </span>
                  <h3 className="pooja-step__title">{s.title}</h3>
                  <p className="pooja-step__text">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA BANNER ---------- */}
        <section className="pooja-cta">
          <div className="pooja-cta__inner">
            <span className="pooja-cta__badge">{t("poojaPage.ctaBadge")}</span>
            <h2 className="pooja-cta__title">{t("poojaPage.ctaTitle")}</h2>
            <p className="pooja-cta__text">{t("poojaPage.ctaText")}</p>

            <div className="pooja-cta__buttons">
              <Link to="/contact" className="pooja-cta__btn pooja-cta__btn--primary">
                {t("poojaPage.ctaContactBtn")} →
              </Link>
              <Link to="/donate" className="pooja-cta__btn pooja-cta__btn--ghost">
                {t("poojaPage.ctaDonateBtn")}
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Pooja;