import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const quickLinks = [
    { name: t("notFound.quickHome"),    path: "/",        icon: "🏠" },
    { name: t("notFound.quickAbout"),   path: "/about",   icon: "ℹ️" },
    { name: t("notFound.quickEvents"),  path: "/events",  icon: "📅" },
    { name: t("notFound.quickGallery"), path: "/gallery", icon: "🖼️" },
    { name: t("notFound.quickContact"), path: "/contact", icon: "📞" },
    { name: t("notFound.quickDonate"),  path: "/donate",  icon: "🪔" },
  ];

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        .nf {
          --nav-bg: #FFF8E7;
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;
          --cream: #FFFDF7;

          width: 100%;
          min-height: calc(100vh - 160px);
          background: linear-gradient(180deg, #FFF8E7 0%, #FFFDF7 100%);
          padding: 3.5rem 1rem 4rem;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
        }

        .nf *,
        .nf *::before,
        .nf *::after { box-sizing: border-box; }

        /* Decorative glows */
        .nf::before {
          content: "";
          position: absolute;
          top: -140px; right: -140px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(232, 138, 5, 0.16) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .nf::after {
          content: "";
          position: absolute;
          bottom: -160px; left: -140px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(201, 154, 46, 0.14) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* ---------- Container ---------- */
        .nf__container {
          max-width: 820px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.3rem;
        }

        /* ---------- Big 404 with diyas ---------- */
        .nf__visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-bottom: 0.4rem;
        }

        .nf__code {
          font-size: 8rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -4px;
          background: linear-gradient(135deg, var(--saffron) 0%, var(--gold) 60%, var(--saffron) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          filter: drop-shadow(0 12px 24px rgba(201, 154, 46, 0.28));
        }

        .nf__diya {
          position: absolute;
          top: -18px;
          right: 8%;
          font-size: 2.2rem;
          filter: drop-shadow(0 0 14px rgba(232, 138, 5, 0.7));
          animation: flicker 2.4s ease-in-out infinite;
        }

        .nf__diya--left {
          left: 8%;
          right: auto;
          top: auto;
          bottom: -6px;
          animation-delay: 0.6s;
          font-size: 1.9rem;
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1) rotate(-4deg); }
          50%      { opacity: 0.75; transform: scale(1.1) rotate(4deg); }
        }

        /* ---------- Badge ---------- */
        .nf__badge {
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

        /* ---------- Title & subtitle ---------- */
        .nf__title {
          font-size: 2.2rem;
          line-height: 1.2;
          font-weight: 800;
          color: var(--text-dark);
          letter-spacing: -0.4px;
          margin: 0;
        }

        .nf__divider {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          border-radius: 3px;
        }

        .nf__subtitle {
          font-size: 1rem;
          line-height: 1.75;
          color: #5a4530;
          margin: 0;
          max-width: 620px;
        }

        /* ---------- Blessing box ---------- */
        .nf__blessing {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.15rem;
          background: rgba(232, 138, 5, 0.1);
          border-left: 3px solid var(--saffron);
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-dark);
          font-style: italic;
        }

        /* ---------- Buttons ---------- */
        .nf__buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          justify-content: center;
          margin-top: 0.3rem;
        }

        .nf__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 1.7rem;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 999px;
          text-decoration: none;
          cursor: pointer;
          border: 2px solid transparent;
          white-space: nowrap;
          font-family: inherit;
          transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
        }

        .nf__btn--primary {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          box-shadow: 0 8px 20px rgba(232, 138, 5, 0.4);
        }

        .nf__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(232, 138, 5, 0.5);
        }

        .nf__btn--secondary {
          background: transparent;
          color: var(--text-dark);
          border-color: var(--gold);
        }

        .nf__btn--secondary:hover {
          background: var(--text-dark);
          color: #fff;
          border-color: var(--text-dark);
          transform: translateY(-2px);
        }

        .nf__btnArrow {
          transition: transform 0.25s ease;
        }
        .nf__btn:hover .nf__btnArrow {
          transform: translateX(4px);
        }

        /* ---------- Quick links ---------- */
        .nf__quickWrap {
          margin-top: 1.6rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .nf__quickTitle {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--saffron);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0;
        }

        .nf__quickDivider {
          width: 100%;
          max-width: 500px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
        }

        .nf__quickGrid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.6rem;
          width: 100%;
          max-width: 720px;
        }

        .nf__quick {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          padding: 0.9rem 0.5rem;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          text-decoration: none;
          color: var(--text-dark);
          font-size: 0.8rem;
          font-weight: 600;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .nf__quick:hover {
          transform: translateY(-4px);
          border-color: var(--saffron);
          background: rgba(232, 138, 5, 0.05);
          box-shadow: 0 12px 24px rgba(201, 154, 46, 0.22);
        }

        .nf__quickIcon {
          font-size: 1.35rem;
          line-height: 1;
        }

        .nf__quickLabel {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1024px) {
          .nf { padding: 3rem 1rem 3.5rem; }
          .nf__code { font-size: 7rem; }
          .nf__title { font-size: 2rem; }
          .nf__quickGrid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 640px) {
          .nf { padding: 2.4rem 0.9rem 3rem; }

          .nf__code { font-size: 5.4rem; letter-spacing: -3px; }
          .nf__diya { font-size: 1.7rem; top: -12px; }
          .nf__diya--left { font-size: 1.5rem; bottom: -4px; }

          .nf__badge { font-size: 0.75rem; padding: 0.4rem 0.85rem; }
          .nf__title { font-size: 1.55rem; }
          .nf__subtitle { font-size: 0.92rem; line-height: 1.65; }
          .nf__blessing { font-size: 0.82rem; padding: 0.6rem 0.95rem; }

          .nf__btn {
            padding: 0.8rem 1.4rem;
            font-size: 0.9rem;
          }

          .nf__quickGrid { grid-template-columns: repeat(2, 1fr); gap: 0.55rem; }
          .nf__quick { padding: 0.8rem 0.5rem; font-size: 0.75rem; }
          .nf__quickIcon { font-size: 1.2rem; }
        }

        @media (max-width: 425px) {
          .nf { padding: 2rem 0.75rem 2.5rem; }

          .nf__code { font-size: 4.4rem; letter-spacing: -2px; }
          .nf__diya { font-size: 1.4rem; top: -10px; right: 4%; }
          .nf__diya--left { font-size: 1.25rem; left: 4%; }

          .nf__title { font-size: 1.32rem; }
          .nf__subtitle { font-size: 0.86rem; line-height: 1.6; }

          .nf__btn {
            flex: 1 1 auto;
            min-width: 130px;
            padding: 0.75rem 1.1rem;
            font-size: 0.85rem;
          }

          .nf__quickGrid { gap: 0.5rem; }
          .nf__quick { padding: 0.7rem 0.4rem; font-size: 0.72rem; border-radius: 12px; }
          .nf__quickIcon { font-size: 1.1rem; }
        }

        @media (max-width: 375px) {
          .nf { padding: 1.8rem 0.65rem 2.2rem; }

          .nf__code { font-size: 3.8rem; letter-spacing: -1.5px; }
          .nf__title { font-size: 1.18rem; }
          .nf__subtitle { font-size: 0.82rem; }

          .nf__badge { font-size: 0.7rem; padding: 0.35rem 0.75rem; }
          .nf__blessing { font-size: 0.76rem; }

          .nf__btn {
            padding: 0.65rem 0.95rem;
            font-size: 0.8rem;
            min-width: 115px;
          }

          .nf__quickGrid { grid-template-columns: repeat(2, 1fr); gap: 0.45rem; }
          .nf__quick { padding: 0.65rem 0.35rem; font-size: 0.7rem; }
          .nf__quickIcon { font-size: 1rem; }
        }

        @media (max-width: 340px) {
          .nf__code { font-size: 3.4rem; }
          .nf__title { font-size: 1.05rem; }
          .nf__subtitle { font-size: 0.76rem; }

          .nf__btn {
            padding: 0.6rem 0.85rem;
            font-size: 0.75rem;
            min-width: 100px;
          }

          .nf__quick { padding: 0.6rem 0.3rem; font-size: 0.65rem; }
          .nf__quickIcon { font-size: 0.95rem; }
        }
      `}</style>

      {/* ================= NOT FOUND MARKUP ================= */}
      <section className="nf">
        <div className="nf__container">
          {/* ---------- Big 404 with diyas ---------- */}
          <div className="nf__visual">
            <span className="nf__diya" aria-hidden="true">🪔</span>
            <span className="nf__code">{t("notFound.code")}</span>
            <span className="nf__diya nf__diya--left" aria-hidden="true">🪔</span>
          </div>

          {/* ---------- Badge ---------- */}
          <span className="nf__badge">{t("notFound.badge")}</span>

          {/* ---------- Title ---------- */}
          <h1 className="nf__title">{t("notFound.title")}</h1>

          {/* ---------- Divider ---------- */}
          <span className="nf__divider" />

          {/* ---------- Subtitle ---------- */}
          <p className="nf__subtitle">{t("notFound.subtitle")}</p>

          {/* ---------- Blessing ---------- */}
          <div className="nf__blessing">{t("notFound.blessing")}</div>

          {/* ---------- Buttons ---------- */}
          <div className="nf__buttons">
            <Link to="/" className="nf__btn nf__btn--primary">
              {t("notFound.homeBtn")}
              <span className="nf__btnArrow">→</span>
            </Link>
            <button
              type="button"
              className="nf__btn nf__btn--secondary"
              onClick={() => navigate(-1)}
            >
              {t("notFound.backBtn")}
            </button>
          </div>

          {/* ---------- Quick Links ---------- */}
          <div className="nf__quickWrap">
            <p className="nf__quickTitle">{t("notFound.quickLinksTitle")}</p>
            <span className="nf__quickDivider" />

            <div className="nf__quickGrid">
              {quickLinks.map((link) => (
                <Link key={link.path} to={link.path} className="nf__quick">
                  <span className="nf__quickIcon" aria-hidden="true">
                    {link.icon}
                  </span>
                  <span className="nf__quickLabel">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;