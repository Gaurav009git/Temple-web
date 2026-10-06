/**
 * SectionTitle — Reusable section heading
 *
 * Props:
 *  - badge     : string   (small uppercase pill text, e.g. "🪔 Our Story")
 *  - title     : string   (main heading)
 *  - subtitle  : string   (optional description)
 *  - align     : "center" | "left"   (default: "center")
 *  - divider   : boolean             (show gradient line, default: true)
 *  - className : string
 *  - children  : node                (extra content under subtitle)
 */
const SectionTitle = ({
  badge,
  title,
  subtitle,
  align = "center",
  divider = true,
  className = "",
  children,
}) => {
  return (
    <>
      <style>{`
        .section-title {
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;

          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          max-width: 720px;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
        }

        .section-title--center {
          text-align: center;
          align-items: center;
          margin: 0 auto 3rem;
        }

        .section-title--left {
          text-align: left;
          align-items: flex-start;
          margin: 0 0 2.5rem;
        }

        /* ---------- Badge ---------- */
        .section-title__badge {
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
          line-height: 1.4;
          max-width: 100%;
        }

        /* ---------- Title ---------- */
        .section-title__title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.3px;
          max-width: 100%;
          word-wrap: break-word;
        }

        /* ---------- Divider ---------- */
        .section-title__divider {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          border-radius: 3px;
        }

        /* ---------- Subtitle ---------- */
        .section-title__subtitle {
          font-size: 0.98rem;
          line-height: 1.7;
          color: #5a4530;
          margin: 0;
          max-width: 100%;
        }

        /* ---------- Extra content ---------- */
        .section-title__extra {
          margin-top: 0.3rem;
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .section-title--center .section-title__extra {
          justify-content: center;
        }

        /* ================= RESPONSIVE ================= */
        @media (max-width: 1024px) {
          .section-title__title { font-size: 1.75rem; }
        }

        @media (max-width: 640px) {
          .section-title { gap: 0.7rem; margin-bottom: 2rem; }
          .section-title__badge { font-size: 0.72rem; padding: 0.4rem 0.85rem; }
          .section-title__title { font-size: 1.45rem; }
          .section-title__subtitle { font-size: 0.88rem; line-height: 1.65; }
          .section-title__divider { width: 60px; height: 3px; }
        }

        @media (max-width: 425px) {
          .section-title__title { font-size: 1.3rem; }
          .section-title__subtitle { font-size: 0.84rem; }
          .section-title__badge { font-size: 0.68rem; padding: 0.35rem 0.75rem; }
        }

        @media (max-width: 375px) {
          .section-title { gap: 0.6rem; margin-bottom: 1.8rem; }
          .section-title__title { font-size: 1.15rem; }
          .section-title__subtitle { font-size: 0.8rem; }
          .section-title__divider { width: 52px; }
        }

        @media (max-width: 340px) {
          .section-title__title { font-size: 1.05rem; }
          .section-title__subtitle { font-size: 0.75rem; }
          .section-title__badge { font-size: 0.62rem; padding: 0.3rem 0.65rem; }
        }
      `}</style>

      <header
        className={`section-title section-title--${align} ${className}`}
      >
        {badge && <span className="section-title__badge">{badge}</span>}
        {title && <h2 className="section-title__title">{title}</h2>}
        {divider && <span className="section-title__divider" />}
        {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
        {children && <div className="section-title__extra">{children}</div>}
      </header>
    </>
  );
};

export default SectionTitle;