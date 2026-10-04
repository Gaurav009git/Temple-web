import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EventCard = ({
  image,
  title,
  date,
  time,
  desc,
  tag,
  icon = "🎉",
  venue,
  daysLeft,
  featured = false,
  past = false,
}) => {
  const { t } = useTranslation();
  const [registered, setRegistered] = useState(false);

  const displayTitle = title || t("eventCard.defaultTitle");
  const displayDesc = desc || t("eventCard.defaultDesc");
  const displayDate = date || t("eventCard.defaultDate");
  const displayTime = time || t("eventCard.defaultTime");
  const displayTag = tag || t("eventCard.defaultTag");
  const displayVenue = venue || t("eventCard.venueDefault");

  let countdownLabel = null;
  if (!past && typeof daysLeft === "number") {
    if (daysLeft <= 0) {
      countdownLabel = t("eventCard.today");
    } else if (daysLeft === 1) {
      countdownLabel = t("eventCard.tomorrow");
    } else {
      countdownLabel = t("eventCard.daysLeft", { count: daysLeft });
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <>
      <style>{`
        .event-card {
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --nav-bg: #FFF8E7;
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
        .event-card *, .event-card *::before, .event-card *::after { box-sizing: border-box; }
        .event-card:not(.event-card--past):hover {
          transform: translateY(-6px);
          border-color: var(--saffron);
          box-shadow: 0 18px 38px rgba(201, 154, 46, 0.25);
        }
        .event-card--past { opacity: 0.75; }
        .event-card--past .event-card__img { filter: grayscale(0.6); }

        .event-card__imgWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--nav-bg);
        }
        .event-card__img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.6s ease;
        }
        .event-card:not(.event-card--past):hover .event-card__img { transform: scale(1.07); }

        .event-card__tag {
          position: absolute; top: 0.8rem; left: 0.8rem;
          padding: 0.35rem 0.75rem;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff; font-size: 0.72rem; font-weight: 700;
          border-radius: 999px; text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(232, 138, 5, 0.4);
          z-index: 2;
        }
        .event-card__icon {
          position: absolute; top: 0.8rem; right: 0.8rem;
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 50%; font-size: 1.15rem;
          box-shadow: 0 4px 10px rgba(59, 36, 20, 0.15);
          z-index: 2;
        }
        .event-card__featured {
          position: absolute; top: 0.8rem; left: 0.8rem;
          padding: 0.35rem 0.75rem;
          background: linear-gradient(135deg, #B45309, #E88A05);
          color: #fff; font-size: 0.68rem; font-weight: 800;
          border-radius: 999px; text-transform: uppercase;
          letter-spacing: 0.6px;
          box-shadow: 0 4px 12px rgba(180, 83, 9, 0.5);
          display: inline-flex; align-items: center; gap: 0.25rem;
          z-index: 3;
        }
        .event-card--featured .event-card__tag { top: 3rem; }

        .event-card__pastBadge {
          position: absolute; bottom: 0.8rem; left: 0.8rem;
          padding: 0.3rem 0.7rem;
          background: rgba(59, 36, 20, 0.85);
          color: #FFF8E7; font-size: 0.68rem; font-weight: 700;
          border-radius: 999px; text-transform: uppercase;
          letter-spacing: 0.4px; z-index: 2;
        }
        .event-card__countdown {
          position: absolute; bottom: 0.8rem; right: 0.8rem;
          padding: 0.35rem 0.75rem;
          background: rgba(232, 138, 5, 0.95);
          color: #fff; font-size: 0.7rem; font-weight: 800;
          border-radius: 999px; letter-spacing: 0.3px;
          box-shadow: 0 4px 12px rgba(232, 138, 5, 0.4);
          z-index: 2;
        }

        .event-card__body {
          padding: 1.15rem 1.15rem 1.25rem;
          display: flex; flex-direction: column;
          gap: 0.7rem; flex-grow: 1;
        }
        .event-card__badge {
          display: inline-flex; align-items: center; gap: 0.3rem;
          align-self: flex-start;
          padding: 0.28rem 0.7rem;
          background: rgba(232, 138, 5, 0.12);
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: 0.68rem; font-weight: 800;
          color: var(--saffron);
          letter-spacing: 0.4px; text-transform: uppercase;
        }
        .event-card__title {
          font-size: 1.1rem; line-height: 1.35; font-weight: 800;
          color: var(--text-dark); margin: 0;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .event-card__desc {
          font-size: 0.88rem; line-height: 1.6; color: #5a4530; margin: 0;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .event-card__meta {
          display: flex; flex-direction: column; gap: 0.45rem;
          padding: 0.75rem 0.85rem;
          background: var(--nav-bg);
          border: 1px solid var(--border);
          border-radius: 12px; margin-top: 0.2rem;
        }
        .event-card__metaRow {
          display: flex; align-items: center; justify-content: space-between;
          gap: 0.5rem; font-size: 0.82rem;
        }
        .event-card__metaLabel {
          display: inline-flex; align-items: center; gap: 0.4rem;
          color: #6b5440; font-weight: 600; white-space: nowrap;
        }
        .event-card__metaValue {
          color: var(--text-dark); font-weight: 700; text-align: right;
          overflow: hidden; text-overflow: ellipsis;
          white-space: nowrap; max-width: 62%;
        }

        .event-card__actions {
          display: flex; gap: 0.5rem; margin-top: auto; padding-top: 0.4rem;
        }
        .event-card__btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 0.4rem;
          padding: 0.65rem 1rem;
          font-size: 0.82rem; font-weight: 700;
          border-radius: 999px; text-decoration: none;
          cursor: pointer; border: 1.5px solid transparent;
          white-space: nowrap; font-family: inherit;
          transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
        }
        .event-card__btn--primary {
          flex: 1;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          box-shadow: 0 4px 12px rgba(232, 138, 5, 0.3);
        }
        .event-card__btn--primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(232, 138, 5, 0.45);
        }
        .event-card__btn--registered {
          flex: 1; background: #1e7c3a; color: #fff;
          box-shadow: 0 4px 12px rgba(30, 124, 58, 0.35);
          cursor: default;
        }
        .event-card__btn--secondary {
          background: transparent; color: var(--saffron);
          border-color: var(--saffron);
        }
        .event-card__btn--secondary:hover {
          background: rgba(232, 138, 5, 0.1);
          transform: translateY(-1px);
        }
        .event-card__btn:disabled { opacity: 0.7; cursor: not-allowed; }

        @media (max-width: 1024px) {
          .event-card__title { font-size: 1.02rem; }
          .event-card__desc { font-size: 0.84rem; }
          .event-card__metaRow { font-size: 0.78rem; }
          .event-card__btn { padding: 0.6rem 0.9rem; font-size: 0.78rem; }
        }
        @media (max-width: 640px) {
          .event-card { border-radius: 16px; }
          .event-card__imgWrap { aspect-ratio: 16 / 9; }
          .event-card__icon { width: 34px; height: 34px; font-size: 1rem; }
          .event-card__tag { font-size: 0.65rem; padding: 0.3rem 0.65rem; }
          .event-card__body { padding: 1rem; gap: 0.6rem; }
          .event-card__title { font-size: 1rem; }
          .event-card__desc { font-size: 0.82rem; -webkit-line-clamp: 2; }
          .event-card__meta { padding: 0.65rem 0.75rem; }
          .event-card__metaRow { font-size: 0.76rem; }
        }
        @media (max-width: 425px) {
          .event-card__body { padding: 0.95rem; }
          .event-card__title { font-size: 0.95rem; }
          .event-card__desc { font-size: 0.78rem; }
          .event-card__badge { font-size: 0.62rem; padding: 0.25rem 0.6rem; }
          .event-card__actions { flex-direction: column; gap: 0.45rem; }
          .event-card__btn { width: 100%; padding: 0.6rem 0.9rem; font-size: 0.78rem; }
        }
        @media (max-width: 375px) {
          .event-card__imgWrap { aspect-ratio: 4 / 3; }
          .event-card__icon { width: 32px; height: 32px; font-size: 0.95rem; }
          .event-card__tag { font-size: 0.6rem; padding: 0.28rem 0.6rem; }
          .event-card__countdown { font-size: 0.62rem; padding: 0.3rem 0.6rem; }
          .event-card__title { font-size: 0.9rem; }
          .event-card__desc { font-size: 0.74rem; }
          .event-card__metaRow { font-size: 0.72rem; }
          .event-card__btn { padding: 0.55rem 0.8rem; font-size: 0.74rem; }
        }
        @media (max-width: 340px) {
          .event-card__body { padding: 0.85rem; }
          .event-card__title { font-size: 0.85rem; }
          .event-card__desc { font-size: 0.7rem; }
          .event-card__badge { font-size: 0.58rem; }
          .event-card__btn { padding: 0.5rem 0.75rem; font-size: 0.7rem; }
        }
      `}</style>

      <article
        className={`event-card ${featured ? "event-card--featured" : ""} ${
          past ? "event-card--past" : ""
        }`}
      >
        <div className="event-card__imgWrap">
          <img
            src={image}
            alt={displayTitle}
            className="event-card__img"
            loading="lazy"
          />
          {featured && !past && (
            <span className="event-card__featured">
              ⭐ {t("eventCard.featured")}
            </span>
          )}
          {displayTag && <span className="event-card__tag">{displayTag}</span>}
          <span className="event-card__icon" aria-hidden="true">{icon}</span>
          {past && (
            <span className="event-card__pastBadge">{t("eventCard.past")}</span>
          )}
          {!past && countdownLabel && (
            <span className="event-card__countdown">{countdownLabel}</span>
          )}
        </div>

        <div className="event-card__body">
          <span className="event-card__badge">{t("eventCard.badge")}</span>
          <h3 className="event-card__title">{displayTitle}</h3>
          <p className="event-card__desc">{displayDesc}</p>

          <div className="event-card__meta">
            <div className="event-card__metaRow">
              <span className="event-card__metaLabel">
                📅 {t("eventCard.dateLabel")}
              </span>
              <span className="event-card__metaValue">{displayDate}</span>
            </div>
            <div className="event-card__metaRow">
              <span className="event-card__metaLabel">
                🕒 {t("eventCard.timeLabel")}
              </span>
              <span className="event-card__metaValue">{displayTime}</span>
            </div>
            <div className="event-card__metaRow">
              <span className="event-card__metaLabel">
                📍 {t("eventCard.venueLabel")}
              </span>
              <span className="event-card__metaValue">{displayVenue}</span>
            </div>
          </div>

          <div className="event-card__actions">
            {past ? (
              <Link
                to="/events"
                className="event-card__btn event-card__btn--secondary"
                style={{ flex: 1 }}
              >
                {t("eventCard.detailsBtn")}
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  className={`event-card__btn ${
                    registered
                      ? "event-card__btn--registered"
                      : "event-card__btn--primary"
                  }`}
                  onClick={handleRegister}
                  disabled={registered}
                >
                  {registered
                    ? t("eventCard.registered")
                    : t("eventCard.registerBtn")}
                </button>
                <Link
                  to="/events"
                  className="event-card__btn event-card__btn--secondary"
                >
                  {t("eventCard.detailsBtn")}
                </Link>
              </>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default EventCard;