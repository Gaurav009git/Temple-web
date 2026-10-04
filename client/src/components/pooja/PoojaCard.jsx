import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * PoojaCard
 * Reusable card for a single Pooja / Seva.
 *
 * Props:
 *  - id       : number  (1-6, used to pick i18n keys)
 *  - image    : string  (imported image)
 *  - icon     : string  (emoji shown on image badge)
 *  - popular  : boolean (optional - shows "Popular" ribbon)
 */
const PoojaCard = ({ id = 1, image, icon = "🪔", popular = false }) => {
  const { t } = useTranslation();

  // Build i18n keys dynamically from id
  const title    = t(`poojaCard.pooja${id}Title`);
  const desc     = t(`poojaCard.pooja${id}Desc`);
  const duration = t(`poojaCard.pooja${id}Duration`);
  const price    = t(`poojaCard.pooja${id}Price`);
  const priest   = t(`poojaCard.pooja${id}Priest`);

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        .pooja-card {
          --nav-bg: #FFF8E7;
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;

          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 6px 18px rgba(59, 36, 20, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          position: relative;
          height: 100%;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
        }

        .pooja-card *,
        .pooja-card *::before,
        .pooja-card *::after { box-sizing: border-box; }

        .pooja-card:hover {
          transform: translateY(-6px);
          border-color: var(--saffron);
          box-shadow: 0 18px 38px rgba(201, 154, 46, 0.25);
        }

        /* ---------- Image ---------- */
        .pooja-card__imgWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--nav-bg);
        }

        .pooja-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .pooja-card:hover .pooja-card__img {
          transform: scale(1.07);
        }

        /* Icon badge top-left */
        .pooja-card__icon {
          position: absolute;
          top: 0.8rem;
          left: 0.8rem;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50%;
          font-size: 1.25rem;
          box-shadow: 0 4px 12px rgba(59, 36, 20, 0.18);
          z-index: 2;
        }

        /* Popular ribbon top-right */
        .pooja-card__popular {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          padding: 0.35rem 0.75rem;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 0.7rem;
          font-weight: 800;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(232, 138, 5, 0.4);
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          z-index: 2;
        }

        /* ---------- Body ---------- */
        .pooja-card__body {
          padding: 1.15rem 1.15rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          flex-grow: 1;
        }

        /* Badge */
        .pooja-card__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          align-self: flex-start;
          padding: 0.28rem 0.7rem;
          background: rgba(232, 138, 5, 0.12);
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--saffron);
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }

        /* Title */
        .pooja-card__title {
          font-size: 1.1rem;
          line-height: 1.35;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Description */
        .pooja-card__desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #5a4530;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ---------- Meta list ---------- */
        .pooja-card__meta {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 0.75rem 0.85rem;
          background: var(--nav-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-top: 0.2rem;
        }

        .pooja-card__metaRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          font-size: 0.82rem;
        }

        .pooja-card__metaLabel {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #6b5440;
          font-weight: 600;
        }

        .pooja-card__metaValue {
          color: var(--text-dark);
          font-weight: 700;
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 60%;
        }

        .pooja-card__metaValue--price {
          color: var(--saffron);
          font-size: 0.95rem;
        }

        /* ---------- Buttons ---------- */
        .pooja-card__actions {
          display: flex;
          gap: 0.5rem;
          margin-top: auto;
          padding-top: 0.4rem;
        }

        .pooja-card__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.65rem 1rem;
          font-size: 0.82rem;
          font-weight: 700;
          border-radius: 999px;
          text-decoration: none;
          cursor: pointer;
          border: 1.5px solid transparent;
          white-space: nowrap;
          font-family: inherit;
          transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
        }

        .pooja-card__btn--primary {
          flex: 1;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          box-shadow: 0 4px 12px rgba(232, 138, 5, 0.3);
        }

        .pooja-card__btn--primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(232, 138, 5, 0.45);
        }

        .pooja-card__btn--secondary {
          background: transparent;
          color: var(--saffron);
          border-color: var(--saffron);
        }

        .pooja-card__btn--secondary:hover {
          background: rgba(232, 138, 5, 0.1);
          transform: translateY(-1px);
        }

        .pooja-card__btnArrow {
          transition: transform 0.25s ease;
        }

        .pooja-card__btn:hover .pooja-card__btnArrow {
          transform: translateX(3px);
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1024px) {
          .pooja-card__title { font-size: 1.02rem; }
          .pooja-card__desc { font-size: 0.84rem; }
          .pooja-card__metaRow { font-size: 0.78rem; }
          .pooja-card__btn { padding: 0.6rem 0.9rem; font-size: 0.78rem; }
        }

        @media (max-width: 640px) {
          .pooja-card { border-radius: 16px; }
          .pooja-card__imgWrap { aspect-ratio: 16 / 9; }
          .pooja-card__icon { width: 38px; height: 38px; font-size: 1.1rem; }
          .pooja-card__popular { font-size: 0.65rem; padding: 0.3rem 0.65rem; }

          .pooja-card__body { padding: 1rem; gap: 0.6rem; }
          .pooja-card__title { font-size: 1rem; }
          .pooja-card__desc { font-size: 0.82rem; -webkit-line-clamp: 2; }
          .pooja-card__meta { padding: 0.65rem 0.75rem; }
          .pooja-card__metaRow { font-size: 0.76rem; }
        }

        @media (max-width: 425px) {
          .pooja-card__body { padding: 0.95rem; }
          .pooja-card__title { font-size: 0.95rem; }
          .pooja-card__desc { font-size: 0.78rem; }
          .pooja-card__badge { font-size: 0.62rem; padding: 0.25rem 0.6rem; }

          .pooja-card__actions { flex-direction: column; gap: 0.45rem; }
          .pooja-card__btn { width: 100%; padding: 0.6rem 0.9rem; font-size: 0.78rem; }
        }

        @media (max-width: 375px) {
          .pooja-card__imgWrap { aspect-ratio: 4 / 3; }
          .pooja-card__icon { width: 34px; height: 34px; font-size: 1rem; }
          .pooja-card__popular { font-size: 0.6rem; }

          .pooja-card__title { font-size: 0.9rem; }
          .pooja-card__desc { font-size: 0.74rem; }
          .pooja-card__metaRow { font-size: 0.72rem; }
          .pooja-card__metaValue--price { font-size: 0.85rem; }

          .pooja-card__btn { padding: 0.55rem 0.8rem; font-size: 0.74rem; }
        }

        @media (max-width: 340px) {
          .pooja-card__body { padding: 0.85rem; }
          .pooja-card__title { font-size: 0.85rem; }
          .pooja-card__desc { font-size: 0.7rem; }

          .pooja-card__badge { font-size: 0.58rem; }
          .pooja-card__btn { padding: 0.5rem 0.75rem; font-size: 0.7rem; }
        }
      `}</style>

      {/* ================= CARD MARKUP ================= */}
      <article className="pooja-card">
        {/* ---------- Image ---------- */}
        <div className="pooja-card__imgWrap">
          <img
            src={image}
            alt={title}
            className="pooja-card__img"
            loading="lazy"
          />

          <span className="pooja-card__icon" aria-hidden="true">
            {icon}
          </span>

          {popular && (
            <span className="pooja-card__popular">
              ⭐ {t("poojaCard.popular")}
            </span>
          )}
        </div>

        {/* ---------- Body ---------- */}
        <div className="pooja-card__body">
          <span className="pooja-card__badge">{t("poojaCard.badge")}</span>

          <h3 className="pooja-card__title">{title}</h3>
          <p className="pooja-card__desc">{desc}</p>

          {/* Meta */}
          <div className="pooja-card__meta">
            <div className="pooja-card__metaRow">
              <span className="pooja-card__metaLabel">
                ⏱️ {t("poojaCard.durationLabel")}
              </span>
              <span className="pooja-card__metaValue">{duration}</span>
            </div>
            <div className="pooja-card__metaRow">
              <span className="pooja-card__metaLabel">
                🙏 {t("poojaCard.priestLabel")}
              </span>
              <span className="pooja-card__metaValue">{priest}</span>
            </div>
            <div className="pooja-card__metaRow">
              <span className="pooja-card__metaLabel">
                💰 {t("poojaCard.priceLabel")}
              </span>
              <span className="pooja-card__metaValue pooja-card__metaValue--price">
                {price}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pooja-card__actions">
            <Link
              to="/contact"
              className="pooja-card__btn pooja-card__btn--primary"
            >
              {t("poojaCard.bookBtn")}
              <span className="pooja-card__btnArrow">→</span>
            </Link>
            <Link
              to="/pooja"
              className="pooja-card__btn pooja-card__btn--secondary"
            >
              {t("poojaCard.detailsBtn")}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default PoojaCard;