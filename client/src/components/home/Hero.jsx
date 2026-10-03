import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroImage from "../../assets/hero.jpeg"; // place hero.png in src/assets/

const Hero = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        /* ---------- Variables ---------- */
        .hero {
          --nav-bg: #FFF8E7;
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;

          width: 100%;
          background: linear-gradient(180deg, #FFF8E7 0%, #FFFDF7 100%);
          padding: 3rem 1rem 3.5rem;
          position: relative;
          overflow: hidden;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
        }

        /* Decorative glow */
        .hero::before {
          content: "";
          position: absolute;
          top: -120px;
          right: -120px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(232, 138, 5, 0.18) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero::after {
          content: "";
          position: absolute;
          bottom: -120px;
          left: -120px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(201, 154, 46, 0.14) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero *,
        .hero *::before,
        .hero *::after {
          box-sizing: border-box;
        }

        /* ================= CONTAINER ================= */
        .hero__container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 3rem;
          position: relative;
          z-index: 1;
        }

        /* ================= IMAGE SIDE ================= */
        .hero__imageWrap {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .hero__imageRing {
          position: relative;
          width: 100%;
          max-width: 420px;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          padding: 8px;
          box-shadow:
            0 20px 50px rgba(201, 154, 46, 0.35),
            0 0 0 8px rgba(255, 248, 231, 0.6),
            0 0 0 16px rgba(232, 138, 5, 0.12);
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        .hero__image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          background: var(--white);
        }

        /* Decorative diyas */
        .hero__diya {
          position: absolute;
          font-size: 1.8rem;
          animation: flicker 2s ease-in-out infinite;
          filter: drop-shadow(0 0 8px rgba(232, 138, 5, 0.6));
        }

        .hero__diya--top {
          top: 4%;
          right: 8%;
          animation-delay: 0.2s;
        }

        .hero__diya--bottom {
          bottom: 6%;
          left: 6%;
          animation-delay: 0.8s;
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.75; transform: scale(1.08); }
        }

        /* ================= TEXT SIDE ================= */
        .hero__content {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          text-align: left;
          min-width: 0;
        }

        .hero__badge {
          display: inline-block;
          align-self: flex-start;
          padding: 0.45rem 1rem;
          background: rgba(232, 138, 5, 0.12);
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--saffron);
          letter-spacing: 0.3px;
          white-space: nowrap;
        }

        .hero__title {
          font-size: 2.6rem;
          line-height: 1.15;
          font-weight: 800;
          color: var(--text-dark);
          letter-spacing: -0.5px;
          margin: 0;
          background: linear-gradient(135deg, var(--text-dark) 30%, var(--saffron) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero__subtitle {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #5a4530;
          margin: 0;
          max-width: 560px;
        }

        /* ================= BUTTONS ================= */
        .hero__buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.6rem;
        }

        .hero__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1.7rem;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 999px;
          text-decoration: none;
          cursor: pointer;
          border: 2px solid transparent;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
        }

        .hero__btn--primary {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          box-shadow: 0 6px 16px rgba(232, 138, 5, 0.35);
        }

        .hero__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(232, 138, 5, 0.45);
        }

        .hero__btn--secondary {
          background: transparent;
          color: var(--text-dark);
          border-color: var(--gold);
        }

        .hero__btn--secondary:hover {
          background: var(--text-dark);
          color: #fff;
          border-color: var(--text-dark);
          transform: translateY(-2px);
        }

        /* ================= RESPONSIVE ================= */

        /* Small Desktop (≤ 1024px) */
        @media (max-width: 1024px) {
          .hero { padding: 2.5rem 1rem 3rem; }
          .hero__container { gap: 2rem; }
          .hero__imageRing { max-width: 340px; }
          .hero__title { font-size: 2.1rem; }
          .hero__subtitle { font-size: 1rem; }
        }

        /* Tablet (≤ 860px) — switch to stacked layout */
        @media (max-width: 860px) {
          .hero { padding: 2.2rem 1rem 2.8rem; }

          .hero__container {
            grid-template-columns: 1fr;   /* single column */
            gap: 2rem;
            text-align: center;
          }

          .hero__imageWrap { order: 1; }
          .hero__content   { order: 2; text-align: center; align-items: center; }

          .hero__badge     { align-self: center; }
          .hero__subtitle  { max-width: 100%; }
          .hero__buttons   { justify-content: center; }

          .hero__imageRing { max-width: 300px; }
        }

        /* Mobile (≤ 640px) */
        @media (max-width: 640px) {
          .hero { padding: 1.8rem 0.9rem 2.4rem; }
          .hero__container { gap: 1.6rem; }

          .hero__imageRing {
            max-width: 260px;
            padding: 6px;
            box-shadow:
              0 14px 34px rgba(201, 154, 46, 0.3),
              0 0 0 6px rgba(255, 248, 231, 0.6),
              0 0 0 12px rgba(232, 138, 5, 0.1);
          }

          .hero__badge { font-size: 0.82rem; padding: 0.4rem 0.85rem; }
          .hero__title { font-size: 1.8rem; }
          .hero__subtitle { font-size: 0.95rem; line-height: 1.65; }

          .hero__btn {
            padding: 0.75rem 1.4rem;
            font-size: 0.9rem;
          }

          .hero__diya { font-size: 1.4rem; }
        }

        /* Mobile (≤ 425px) */
        @media (max-width: 425px) {
          .hero__imageRing { max-width: 220px; }
          .hero__title { font-size: 1.55rem; }
          .hero__subtitle { font-size: 0.9rem; }
          .hero__buttons { gap: 0.55rem; }

          .hero__btn {
            flex: 1 1 auto;
            min-width: 130px;
            padding: 0.7rem 1rem;
            font-size: 0.85rem;
          }
        }

        /* Small Mobile (≤ 375px) */
        @media (max-width: 375px) {
          .hero { padding: 1.5rem 0.75rem 2rem; }
          .hero__imageRing { max-width: 190px; }
          .hero__badge { font-size: 0.78rem; padding: 0.35rem 0.7rem; }
          .hero__title { font-size: 1.35rem; }
          .hero__subtitle { font-size: 0.85rem; line-height: 1.6; }

          .hero__btn {
            padding: 0.65rem 0.9rem;
            font-size: 0.8rem;
            min-width: 120px;
          }

          .hero__diya { font-size: 1.2rem; }
        }

        /* Extra Small (≤ 340px) */
        @media (max-width: 340px) {
          .hero__imageRing { max-width: 165px; }
          .hero__title { font-size: 1.2rem; }
          .hero__subtitle { font-size: 0.8rem; }

          .hero__btn {
            padding: 0.6rem 0.75rem;
            font-size: 0.75rem;
            min-width: 105px;
          }
        }
      `}</style>

      {/* ================= HERO MARKUP ================= */}
      <section className="hero">
        <div className="hero__container">
          {/* ---------- IMAGE SIDE ---------- */}
          <div className="hero__imageWrap">
            <div className="hero__imageRing">
              <img
                src={heroImage}
                alt={t("hero.imageAlt")}
                className="hero__image"
              />
            </div>
            <span className="hero__diya hero__diya--top" aria-hidden="true">🪔</span>
            <span className="hero__diya hero__diya--bottom" aria-hidden="true">🪔</span>
          </div>

          {/* ---------- TEXT SIDE ---------- */}
          <div className="hero__content">
            <span className="hero__badge">{t("hero.badge")}</span>

            <h1 className="hero__title">{t("hero.title")}</h1>

            <p className="hero__subtitle">{t("hero.subtitle")}</p>

            <div className="hero__buttons">
              <Link to="/contact" className="hero__btn hero__btn--primary">
                {t("hero.visitBtn")}
              </Link>
              <Link to="/events" className="hero__btn hero__btn--secondary">
                {t("hero.eventsBtn")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;