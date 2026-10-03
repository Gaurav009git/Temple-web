import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import aboutImage from "../../assets/about.jpeg"; // place about.png in src/assets/

const AboutPreview = () => {
  const { t } = useTranslation();

  const points = [
    t("aboutPreview.point1"),
    t("aboutPreview.point2"),
    t("aboutPreview.point3"),
    t("aboutPreview.point4"),
  ];

  const stats = [
    { value: t("aboutPreview.stat1Value"), label: t("aboutPreview.stat1Label") },
    { value: t("aboutPreview.stat2Value"), label: t("aboutPreview.stat2Label") },
    { value: t("aboutPreview.stat3Value"), label: t("aboutPreview.stat3Label") },
  ];

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        /* ---------- Variables ---------- */
        .about {
          --nav-bg: #FFF8E7;
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;

          width: 100%;
          background: #FFFDF7;
          padding: 4rem 1rem;
          position: relative;
          overflow: hidden;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
        }

        /* Soft decorative corner glow */
        .about::before {
          content: "";
          position: absolute;
          top: -100px;
          left: -100px;
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(232, 138, 5, 0.12) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .about::after {
          content: "";
          position: absolute;
          bottom: -120px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(201, 154, 46, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .about *,
        .about *::before,
        .about *::after {
          box-sizing: border-box;
        }

        /* ================= CONTAINER ================= */
        .about__container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          align-items: center;
          gap: 3.5rem;
          position: relative;
          z-index: 1;
        }

        /* ================= IMAGE SIDE ================= */
        .about__imageWrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .about__imageFrame {
          position: relative;
          width: 100%;
          max-width: 460px;
          aspect-ratio: 4 / 5;
          border-radius: 22px;
          overflow: hidden;
          box-shadow:
            0 24px 50px rgba(59, 36, 20, 0.18),
            0 0 0 6px rgba(255, 248, 231, 0.9),
            0 0 0 8px rgba(201, 154, 46, 0.35);
          background: var(--white);
        }

        .about__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .about__imageFrame:hover .about__image {
          transform: scale(1.05);
        }

        /* Floating stat card over image (desktop only) */
        .about__floatCard {
          position: absolute;
          bottom: -22px;
          right: -18px;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          padding: 1rem 1.3rem;
          border-radius: 14px;
          box-shadow: 0 12px 28px rgba(232, 138, 5, 0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 130px;
        }

        .about__floatValue {
          font-size: 1.6rem;
          font-weight: 800;
          line-height: 1;
        }

        .about__floatLabel {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          opacity: 0.95;
          margin-top: 0.25rem;
          text-align: center;
        }

        /* Small diya decoration */
        .about__diya {
          position: absolute;
          top: 8%;
          left: 8%;
          font-size: 1.6rem;
          filter: drop-shadow(0 0 8px rgba(232, 138, 5, 0.6));
          animation: flicker 2.2s ease-in-out infinite;
          z-index: 2;
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.7; transform: scale(1.1); }
        }

        /* ================= TEXT SIDE ================= */
        .about__content {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          min-width: 0;
        }

        .about__badge {
          display: inline-block;
          align-self: flex-start;
          padding: 0.45rem 1rem;
          background: rgba(232, 138, 5, 0.12);
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--saffron);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .about__title {
          font-size: 2.1rem;
          line-height: 1.2;
          font-weight: 800;
          color: var(--text-dark);
          letter-spacing: -0.3px;
          margin: 0;
        }

        .about__divider {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          border-radius: 3px;
        }

        .about__description {
          font-size: 1rem;
          line-height: 1.75;
          color: #5a4530;
          margin: 0;
        }

        /* ================= POINTS LIST ================= */
        .about__points {
          list-style: none;
          margin: 0.4rem 0 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem 1rem;
        }

        .about__point {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-size: 0.95rem;
          color: var(--text-dark);
          line-height: 1.45;
        }

        .about__tick {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: 800;
          margin-top: 2px;
        }

        /* ================= STATS ROW ================= */
        .about__stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 0.9rem;
          padding: 1.1rem 0.6rem;
          background: var(--nav-bg);
          border: 1px solid var(--border);
          border-radius: 14px;
        }

        .about__stat {
          text-align: center;
          padding: 0 0.4rem;
        }

        .about__statValue {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--saffron);
          line-height: 1;
        }

        .about__statLabel {
          font-size: 0.72rem;
          font-weight: 600;
          color: #6b5440;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          margin-top: 0.35rem;
        }

        /* ================= BUTTON ================= */
        .about__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          align-self: flex-start;
          margin-top: 0.7rem;
          padding: 0.85rem 1.6rem;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 999px;
          border: 1px solid var(--gold);
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.25s ease;
        }

        .about__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(232, 138, 5, 0.42);
        }

        .about__btnArrow {
          transition: transform 0.25s ease;
          font-size: 1rem;
        }
        .about__btn:hover .about__btnArrow {
          transform: translateX(4px);
        }

        /* ================= RESPONSIVE ================= */

        /* ===== Tablet & Small Desktop (≤ 1024px) ===== */
        @media (max-width: 1024px) {
          .about { padding: 3.2rem 1rem; }
          .about__container { gap: 2.5rem; }
          .about__imageFrame { max-width: 380px; }
          .about__title { font-size: 1.8rem; }
          .about__description { font-size: 0.95rem; }
          .about__floatCard { padding: 0.85rem 1.1rem; min-width: 115px; }
          .about__floatValue { font-size: 1.4rem; }
          .about__floatLabel { font-size: 0.7rem; }
        }

        /* ===== Stacked Layout (≤ 860px) ===== */
        @media (max-width: 860px) {
          .about { padding: 2.6rem 1rem; }

          .about__container {
            grid-template-columns: 1fr;
            gap: 2.4rem;
          }

          .about__imageWrap {
            order: 1;
            max-width: 420px;
            margin: 0 auto;
            width: 100%;
          }

          .about__content {
            order: 2;
            align-items: center;
            text-align: center;
          }

          .about__badge { align-self: center; }
          .about__divider { align-self: center; }
          .about__btn { align-self: center; }

          .about__description { text-align: center; }

          .about__imageFrame { max-width: 340px; aspect-ratio: 1 / 1; }
          .about__floatCard { bottom: -14px; right: -8px; }
        }

        /* ===== Mobile (≤ 640px) ===== */
        @media (max-width: 640px) {
          .about { padding: 2rem 0.9rem; }
          .about__container { gap: 2rem; }

          .about__imageFrame { max-width: 280px; }

          .about__title { font-size: 1.5rem; }
          .about__description { font-size: 0.92rem; line-height: 1.65; }

          .about__points {
            grid-template-columns: 1fr;    /* stack points on mobile */
            text-align: left;
            width: 100%;
          }

          .about__stats {
            grid-template-columns: repeat(3, 1fr);
            padding: 0.9rem 0.4rem;
            gap: 0.5rem;
            width: 100%;
          }

          .about__statValue { font-size: 1.2rem; }
          .about__statLabel { font-size: 0.65rem; }

          .about__floatCard {
            padding: 0.7rem 0.9rem;
            min-width: 100px;
            bottom: -12px;
            right: -4px;
          }
          .about__floatValue { font-size: 1.2rem; }
          .about__floatLabel { font-size: 0.65rem; }

          .about__btn {
            padding: 0.75rem 1.4rem;
            font-size: 0.9rem;
          }

          .about__diya { font-size: 1.3rem; }
        }

        /* ===== Mobile (≤ 425px) ===== */
        @media (max-width: 425px) {
          .about__imageFrame { max-width: 240px; }
          .about__title { font-size: 1.32rem; }
          .about__description { font-size: 0.88rem; }

          .about__points { gap: 0.5rem; }
          .about__point { font-size: 0.88rem; }

          .about__stats { padding: 0.8rem 0.3rem; gap: 0.3rem; }
          .about__statValue { font-size: 1.05rem; }
          .about__statLabel { font-size: 0.6rem; letter-spacing: 0.2px; }

          .about__btn {
            padding: 0.7rem 1.2rem;
            font-size: 0.85rem;
          }
        }

        /* ===== Small Mobile (≤ 375px) ===== */
        @media (max-width: 375px) {
          .about { padding: 1.6rem 0.75rem; }
          .about__imageFrame { max-width: 210px; }
          .about__title { font-size: 1.18rem; }
          .about__description { font-size: 0.83rem; line-height: 1.6; }

          .about__badge { font-size: 0.72rem; padding: 0.35rem 0.75rem; }
          .about__point { font-size: 0.82rem; }

          .about__statValue { font-size: 0.95rem; }
          .about__statLabel { font-size: 0.55rem; }

          .about__btn { padding: 0.65rem 1.05rem; font-size: 0.8rem; }
          .about__diya { font-size: 1.1rem; }
        }

        /* ===== Extra Small (≤ 340px) ===== */
        @media (max-width: 340px) {
          .about__imageFrame { max-width: 180px; }
          .about__title { font-size: 1.05rem; }
          .about__description { font-size: 0.78rem; }

          .about__floatCard {
            padding: 0.55rem 0.75rem;
            min-width: 85px;
          }
          .about__floatValue { font-size: 1rem; }
          .about__floatLabel { font-size: 0.58rem; }

          .about__statValue { font-size: 0.85rem; }
          .about__statLabel { font-size: 0.5rem; }

          .about__btn { padding: 0.6rem 0.9rem; font-size: 0.75rem; }
        }
      `}</style>

      {/* ================= ABOUT MARKUP ================= */}
      <section className="about">
        <div className="about__container">
          {/* ---------- IMAGE SIDE ---------- */}
          <div className="about__imageWrap">
            <div className="about__imageFrame">
              <img
                src={aboutImage}
                alt={t("aboutPreview.imageAlt")}
                className="about__image"
              />
            </div>

            <span className="about__diya" aria-hidden="true">🪔</span>

            <div className="about__floatCard">
              <span className="about__floatValue">
                {t("aboutPreview.stat1Value")}
              </span>
              <span className="about__floatLabel">
                {t("aboutPreview.stat1Label")}
              </span>
            </div>
          </div>

          {/* ---------- TEXT SIDE ---------- */}
          <div className="about__content">
            <span className="about__badge">{t("aboutPreview.badge")}</span>

            <h2 className="about__title">{t("aboutPreview.title")}</h2>

            <span className="about__divider" />

            <p className="about__description">
              {t("aboutPreview.description")}
            </p>

            <ul className="about__points">
              {points.map((point, i) => (
                <li key={i} className="about__point">
                  <span className="about__tick">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="about__stats">
              {stats.map((s, i) => (
                <div key={i} className="about__stat">
                  <div className="about__statValue">{s.value}</div>
                  <div className="about__statLabel">{s.label}</div>
                </div>
              ))}
            </div>

            <Link to="/about" className="about__btn">
              {t("aboutPreview.btn")}
              <span className="about__btnArrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPreview;