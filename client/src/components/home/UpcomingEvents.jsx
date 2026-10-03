import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import event1Img from "../../assets/event1.jpeg";
import event2Img from "../../assets/event2.jpeg";
import event3Img from "../../assets/event3.jpeg";

const UpcomingEvents = () => {
  const { t } = useTranslation();

  const events = [
    {
      id: 1,
      image: event1Img,
      title: t("upcomingEvents.event1Title"),
      date: t("upcomingEvents.event1Date"),
      time: t("upcomingEvents.event1Time"),
      desc: t("upcomingEvents.event1Desc"),
      tag: t("upcomingEvents.event1Tag"),
      icon: "🪔",
    },
    {
      id: 2,
      image: event2Img,
      title: t("upcomingEvents.event2Title"),
      date: t("upcomingEvents.event2Date"),
      time: t("upcomingEvents.event2Time"),
      desc: t("upcomingEvents.event2Desc"),
      tag: t("upcomingEvents.event2Tag"),
      icon: "🎉",
    },
    {
      id: 3,
      image: event3Img,
      title: t("upcomingEvents.event3Title"),
      date: t("upcomingEvents.event3Date"),
      time: t("upcomingEvents.event3Time"),
      desc: t("upcomingEvents.event3Desc"),
      tag: t("upcomingEvents.event3Tag"),
      icon: "🍛",
    },
  ];

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        .events {
          --nav-bg: #FFF8E7;
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;

          width: 100%;
          background: linear-gradient(180deg, #FFFDF7 0%, #FFF8E7 100%);
          padding: 4rem 1rem;
          position: relative;
          overflow: hidden;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
        }

        .events::before {
          content: "";
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(232, 138, 5, 0.12) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .events::after {
          content: "";
          position: absolute;
          bottom: -140px;
          left: -100px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(201, 154, 46, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .events *,
        .events *::before,
        .events *::after { box-sizing: border-box; }

        /* ================= CONTAINER ================= */
        .events__container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ================= HEADER ================= */
        .events__header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
        }

        .events__badge {
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

        .events__title {
          font-size: 2.1rem;
          line-height: 1.2;
          font-weight: 800;
          color: var(--text-dark);
          letter-spacing: -0.3px;
          margin: 0;
        }

        .events__divider {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          border-radius: 3px;
        }

        .events__subtitle {
          font-size: 1rem;
          line-height: 1.7;
          color: #5a4530;
          margin: 0;
        }

        /* ================= GRID ================= */
        .events__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem;
        }

        /* ================= CARD ================= */
        .events__card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 6px 18px rgba(59, 36, 20, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .events__card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 38px rgba(201, 154, 46, 0.25);
        }

        /* ---------- Image ---------- */
        .events__imageWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--nav-bg);
        }

        .events__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .events__card:hover .events__image {
          transform: scale(1.07);
        }

        /* Tag pill */
        .events__tag {
          position: absolute;
          top: 0.8rem;
          left: 0.8rem;
          padding: 0.35rem 0.75rem;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(232, 138, 5, 0.4);
        }

        /* Icon badge top-right */
        .events__icon {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 50%;
          font-size: 1.15rem;
          box-shadow: 0 4px 10px rgba(59, 36, 20, 0.15);
        }

        /* ---------- Body ---------- */
        .events__body {
          padding: 1.15rem 1.15rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          flex-grow: 1;
        }

        .events__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem 1rem;
          font-size: 0.8rem;
          color: #6b5440;
          font-weight: 600;
        }

        .events__metaItem {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .events__metaIcon {
          font-size: 0.85rem;
          color: var(--saffron);
        }

        .events__cardTitle {
          font-size: 1.1rem;
          line-height: 1.35;
          font-weight: 700;
          color: var(--text-dark);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .events__cardDesc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #5a4530;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ---------- Card button ---------- */
        .events__cardBtn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          align-self: flex-start;
          margin-top: auto;
          padding: 0.55rem 1rem;
          background: transparent;
          color: var(--saffron);
          border: 1.5px solid var(--saffron);
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }

        .events__cardBtn:hover {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          border-color: transparent;
          transform: translateX(3px);
        }

        .events__cardArrow {
          transition: transform 0.25s ease;
        }
        .events__cardBtn:hover .events__cardArrow {
          transform: translateX(3px);
        }

        /* ================= BOTTOM CTA ================= */
        .events__cta {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }

        .events__ctaBtn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 1.8rem;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: 999px;
          border: 1px solid var(--gold);
          white-space: nowrap;
          box-shadow: 0 6px 16px rgba(232, 138, 5, 0.35);
          transition: transform 0.2s ease, box-shadow 0.25s ease;
        }

        .events__ctaBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(232, 138, 5, 0.45);
        }

        .events__ctaArrow {
          transition: transform 0.25s ease;
        }
        .events__ctaBtn:hover .events__ctaArrow {
          transform: translateX(4px);
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1024px) {
          .events { padding: 3.2rem 1rem; }
          .events__grid { gap: 1.3rem; }
          .events__title { font-size: 1.8rem; }
          .events__cardTitle { font-size: 1rem; }
          .events__cardDesc { font-size: 0.85rem; }
        }

        @media (max-width: 860px) {
          .events__grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .events { padding: 2.4rem 0.9rem; }
          .events__header { margin-bottom: 2rem; }
          .events__title { font-size: 1.5rem; }
          .events__subtitle { font-size: 0.92rem; }

          .events__grid {
            grid-template-columns: 1fr;   /* stack cards */
            gap: 1.2rem;
            max-width: 460px;
            margin: 0 auto;
          }

          .events__imageWrap { aspect-ratio: 16 / 9; }
          .events__cardTitle { font-size: 1.05rem; }
          .events__cardDesc { font-size: 0.88rem; -webkit-line-clamp: 2; }

          .events__cta { margin-top: 2.2rem; }
          .events__ctaBtn { padding: 0.8rem 1.5rem; font-size: 0.9rem; }
        }

        @media (max-width: 425px) {
          .events__title { font-size: 1.32rem; }
          .events__subtitle { font-size: 0.85rem; }
          .events__badge { font-size: 0.75rem; padding: 0.35rem 0.8rem; }

          .events__body { padding: 1rem; }
          .events__cardTitle { font-size: 1rem; }
          .events__cardDesc { font-size: 0.82rem; }

          .events__meta { font-size: 0.74rem; gap: 0.3rem 0.75rem; }

          .events__cardBtn { font-size: 0.78rem; padding: 0.5rem 0.9rem; }
          .events__ctaBtn { padding: 0.75rem 1.3rem; font-size: 0.85rem; }
        }

        @media (max-width: 375px) {
          .events { padding: 2rem 0.75rem; }
          .events__title { font-size: 1.18rem; }
          .events__subtitle { font-size: 0.8rem; }

          .events__grid { gap: 1rem; }
          .events__body { padding: 0.9rem; }
          .events__cardTitle { font-size: 0.95rem; }
          .events__cardDesc { font-size: 0.78rem; }

          .events__cardBtn { font-size: 0.74rem; padding: 0.45rem 0.8rem; }
          .events__ctaBtn { padding: 0.7rem 1.15rem; font-size: 0.8rem; }
        }

        @media (max-width: 340px) {
          .events__title { font-size: 1.05rem; }
          .events__subtitle { font-size: 0.75rem; }

          .events__cardTitle { font-size: 0.9rem; }
          .events__cardDesc { font-size: 0.74rem; }

          .events__tag { font-size: 0.65rem; padding: 0.28rem 0.6rem; }
          .events__icon { width: 32px; height: 32px; font-size: 1rem; }

          .events__ctaBtn { padding: 0.6rem 1rem; font-size: 0.75rem; }
        }
      `}</style>

      {/* ================= EVENTS MARKUP ================= */}
      <section className="events">
        <div className="events__container">
          {/* ---------- Header ---------- */}
          <header className="events__header">
            <span className="events__badge">{t("upcomingEvents.badge")}</span>
            <h2 className="events__title">{t("upcomingEvents.title")}</h2>
            <span className="events__divider" />
            <p className="events__subtitle">{t("upcomingEvents.subtitle")}</p>
          </header>

          {/* ---------- Grid ---------- */}
          <div className="events__grid">
            {events.map((ev) => (
              <article key={ev.id} className="events__card">
                <div className="events__imageWrap">
                  <img
                    src={ev.image}
                    alt={t("upcomingEvents.eventImageAlt")}
                    className="events__image"
                    loading="lazy"
                  />
                  <span className="events__tag">{ev.tag}</span>
                  <span className="events__icon" aria-hidden="true">
                    {ev.icon}
                  </span>
                </div>

                <div className="events__body">
                  <div className="events__meta">
                    <span className="events__metaItem">
                      <span className="events__metaIcon">📅</span>
                      {ev.date}
                    </span>
                    <span className="events__metaItem">
                      <span className="events__metaIcon">🕒</span>
                      {ev.time}
                    </span>
                  </div>

                  <h3 className="events__cardTitle">{ev.title}</h3>
                  <p className="events__cardDesc">{ev.desc}</p>

                  <Link to="/events" className="events__cardBtn">
                    {t("upcomingEvents.detailsBtn")}
                    <span className="events__cardArrow">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* ---------- Bottom CTA ---------- */}
          <div className="events__cta">
            <Link to="/events" className="events__ctaBtn">
              {t("upcomingEvents.viewAllBtn")}
              <span className="events__ctaArrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpcomingEvents;