import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EventCard from "../components/events/EventCard";

// ✅ Match these paths EXACTLY to what's in client/src/assets/
import event1Img from "../assets/Event1.jpg";
import event2Img from "../assets/Event2.jpg";
import event3Img from "../assets/Event3.jpg";
import event4Img from "../assets/Event4.jpg";
import event5Img from "../assets/Event5.jpg";
import event6Img from "../assets/Event6.jpg";

const Events = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const events = [
    { id: 1, image: event1Img, icon: "🪔", category: "pooja",    daysLeft: 12, featured: true,
      title: t("upcomingEvents.event1Title"), date: t("upcomingEvents.event1Date"),
      time: t("upcomingEvents.event1Time"), desc: t("upcomingEvents.event1Desc"),
      tag: t("upcomingEvents.event1Tag") },
    { id: 2, image: event2Img, icon: "🎉", category: "festival", daysLeft: 28,
      title: t("upcomingEvents.event2Title"), date: t("upcomingEvents.event2Date"),
      time: t("upcomingEvents.event2Time"), desc: t("upcomingEvents.event2Desc"),
      tag: t("upcomingEvents.event2Tag") },
    { id: 3, image: event3Img, icon: "🍛", category: "mahotsav", daysLeft: 50,
      title: t("upcomingEvents.event3Title"), date: t("upcomingEvents.event3Date"),
      time: t("upcomingEvents.event3Time"), desc: t("upcomingEvents.event3Desc"),
      tag: t("upcomingEvents.event3Tag") },
    { id: 4, image: event4Img, icon: "🌸", category: "special",  daysLeft: 7,
      title: t("upcomingEvents.event1Title"), date: t("upcomingEvents.event1Date"),
      time: t("upcomingEvents.event1Time"), desc: t("upcomingEvents.event1Desc"),
      tag: t("upcomingEvents.event1Tag") },
    { id: 5, image: event5Img, icon: "🕉️", category: "pooja",    daysLeft: 20,
      title: t("upcomingEvents.event2Title"), date: t("upcomingEvents.event2Date"),
      time: t("upcomingEvents.event2Time"), desc: t("upcomingEvents.event2Desc"),
      tag: t("upcomingEvents.event2Tag") },
    { id: 6, image: event6Img, icon: "🎊", category: "festival", daysLeft: 90,
      title: t("upcomingEvents.event3Title"), date: t("upcomingEvents.event3Date"),
      time: t("upcomingEvents.event3Time"), desc: t("upcomingEvents.event3Desc"),
      tag: t("upcomingEvents.event3Tag") },
  ];

  const pastEvents = [
    { id: 101, image: event1Img, title: t("upcomingEvents.event1Title"), date: t("upcomingEvents.event1Date"), tag: t("upcomingEvents.event1Tag") },
    { id: 102, image: event2Img, title: t("upcomingEvents.event2Title"), date: t("upcomingEvents.event2Date"), tag: t("upcomingEvents.event2Tag") },
    { id: 103, image: event3Img, title: t("upcomingEvents.event3Title"), date: t("upcomingEvents.event3Date"), tag: t("upcomingEvents.event3Tag") },
  ];

  const filters = [
    { key: "all",      label: t("eventsPage.filterAll")      },
    { key: "pooja",    label: t("eventsPage.filterPooja")    },
    { key: "festival", label: t("eventsPage.filterFestival") },
    { key: "mahotsav", label: t("eventsPage.filterMahotsav") },
    { key: "special",  label: t("eventsPage.filterSpecial")  },
  ];

  const visibleEvents =
    activeFilter === "all"
      ? events
      : events.filter((e) => e.category === activeFilter);

  const stats = [
    { value: t("eventsPage.stat1Value"), label: t("eventsPage.stat1Label"), icon: "🎉" },
    { value: t("eventsPage.stat2Value"), label: t("eventsPage.stat2Label"), icon: "👥" },
    { value: t("eventsPage.stat3Value"), label: t("eventsPage.stat3Label"), icon: "🪔" },
    { value: t("eventsPage.stat4Value"), label: t("eventsPage.stat4Label"), icon: "🕉️" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <>
      <style>{`
        .events-page {
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
        .events-page *, .events-page *::before, .events-page *::after { box-sizing: border-box; }

        .ev-crumb { background: var(--nav-bg); border-bottom: 1px solid var(--border); padding: 1rem 1rem; }
        .ev-crumb__inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #6b5440; flex-wrap: wrap; }
        .ev-crumb__link { color: var(--saffron); text-decoration: none; font-weight: 600; transition: color 0.2s ease; }
        .ev-crumb__link:hover { color: var(--text-dark); }
        .ev-crumb__sep { color: var(--gold); font-weight: 800; }
        .ev-crumb__current { color: var(--text-dark); font-weight: 700; }

        .ev-hero { padding: 4rem 1rem 3.5rem; text-align: center; background: linear-gradient(180deg, #FFF8E7 0%, #FFFDF7 100%); position: relative; overflow: hidden; }
        .ev-hero::before { content: ""; position: absolute; top: -120px; right: -120px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(232, 138, 5, 0.15) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .ev-hero::after { content: ""; position: absolute; bottom: -120px; left: -120px; width: 340px; height: 340px; background: radial-gradient(circle, rgba(201, 154, 46, 0.12) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .ev-hero__inner { max-width: 820px; margin: 0 auto; position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        .ev-hero__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.82rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.5px; text-transform: uppercase; }
        .ev-hero__title { font-size: 2.6rem; line-height: 1.15; font-weight: 800; letter-spacing: -0.5px; margin: 0; background: linear-gradient(135deg, var(--text-dark) 30%, var(--saffron) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ev-hero__divider { width: 80px; height: 3px; background: linear-gradient(90deg, var(--saffron), var(--gold)); border-radius: 3px; }
        .ev-hero__subtitle { font-size: 1.05rem; line-height: 1.75; color: #5a4530; margin: 0; max-width: 720px; }

        .ev-section { padding: 3.5rem 1rem; position: relative; overflow: hidden; }
        .ev-section--alt { background: var(--nav-bg); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .ev-section__container { max-width: 1200px; width: 100%; margin: 0 auto; position: relative; z-index: 1; }

        .ev-filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-bottom: 2.5rem; }
        .ev-filter { padding: 0.55rem 1.15rem; background: var(--white); border: 1.5px solid var(--border); border-radius: 999px; font-size: 0.85rem; font-weight: 600; color: var(--text-dark); cursor: pointer; font-family: inherit; transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease; white-space: nowrap; }
        .ev-filter:hover { border-color: var(--saffron); color: var(--saffron); transform: translateY(-1px); }
        .ev-filter--active { background: linear-gradient(135deg, var(--saffron), var(--gold)); color: #fff; border-color: transparent; box-shadow: 0 6px 14px rgba(232, 138, 5, 0.3); }

        .ev-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; }
        .ev-empty { text-align: center; padding: 3rem 1rem; color: #6b5440; font-size: 1rem; }

        .ev-head { text-align: center; max-width: 720px; margin: 0 auto 3rem; display: flex; flex-direction: column; align-items: center; gap: 0.85rem; }
        .ev-head__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.78rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.5px; text-transform: uppercase; }
        .ev-head__title { font-size: 2rem; font-weight: 800; color: var(--text-dark); margin: 0; line-height: 1.2; letter-spacing: -0.3px; }
        .ev-head__divider { width: 70px; height: 3px; background: linear-gradient(90deg, var(--saffron), var(--gold)); border-radius: 3px; }
        .ev-head__subtitle { font-size: 0.98rem; line-height: 1.7; color: #5a4530; margin: 0; }

        .ev-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.3rem; }
        .ev-stat { background: var(--white); border: 1px solid var(--border); border-radius: 18px; padding: 1.7rem 1.1rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.6rem; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .ev-stat:hover { transform: translateY(-6px); border-color: var(--saffron); box-shadow: 0 18px 34px rgba(201, 154, 46, 0.22); }
        .ev-stat__icon { width: 58px; height: 58px; display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--saffron), var(--gold)); color: #fff; border-radius: 50%; font-size: 1.5rem; box-shadow: 0 8px 18px rgba(232, 138, 5, 0.35); }
        .ev-stat__value { font-size: 1.8rem; font-weight: 800; color: var(--text-dark); line-height: 1; }
        .ev-stat__label { font-size: 0.78rem; font-weight: 700; color: #6b5440; text-transform: uppercase; letter-spacing: 0.4px; }

        .ev-pastGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .ev-pastCard { background: var(--white); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .ev-pastCard:hover { transform: translateY(-4px); box-shadow: 0 14px 30px rgba(201, 154, 46, 0.22); }
        .ev-pastCard__imgWrap { position: relative; width: 100%; aspect-ratio: 16 / 10; overflow: hidden; background: var(--nav-bg); }
        .ev-pastCard__img { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(0.7) brightness(0.95); transition: transform 0.6s ease, filter 0.3s ease; }
        .ev-pastCard:hover .ev-pastCard__img { transform: scale(1.05); filter: saturate(1) brightness(1); }
        .ev-pastCard__tag { position: absolute; top: 0.7rem; left: 0.7rem; padding: 0.3rem 0.7rem; background: rgba(59, 36, 20, 0.85); color: #FFF8E7; font-size: 0.68rem; font-weight: 700; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.4px; }
        .ev-pastCard__body { padding: 1rem 1.1rem 1.15rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .ev-pastCard__title { font-size: 1rem; font-weight: 800; color: var(--text-dark); margin: 0; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .ev-pastCard__date { font-size: 0.8rem; color: #6b5440; font-weight: 600; display: inline-flex; align-items: center; gap: 0.35rem; }

        .ev-news { max-width: 720px; margin: 0 auto; background: var(--white); border: 1px solid var(--border); border-radius: 20px; padding: 2rem 1.6rem; text-align: center; box-shadow: 0 12px 30px rgba(201, 154, 46, 0.12); display: flex; flex-direction: column; align-items: center; gap: 0.85rem; }
        .ev-news__badge { display: inline-block; padding: 0.4rem 0.9rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.75rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.4px; text-transform: uppercase; }
        .ev-news__title { font-size: 1.5rem; font-weight: 800; color: var(--text-dark); margin: 0; line-height: 1.25; }
        .ev-news__text { font-size: 0.92rem; line-height: 1.7; color: #5a4530; margin: 0; max-width: 560px; }
        .ev-news__form { display: flex; gap: 0.5rem; width: 100%; max-width: 500px; margin-top: 0.4rem; }
        .ev-news__input { flex: 1; min-width: 0; padding: 0.75rem 1rem; font-size: 0.88rem; font-family: inherit; color: var(--text-dark); background: var(--cream); border: 1.5px solid var(--border); border-radius: 10px; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .ev-news__input::placeholder { color: #a08d78; }
        .ev-news__input:focus { border-color: var(--saffron); box-shadow: 0 0 0 3px rgba(232, 138, 5, 0.15); }
        .ev-news__submit { flex-shrink: 0; padding: 0.75rem 1.3rem; background: linear-gradient(135deg, var(--saffron), var(--gold)); color: #fff; font-size: 0.88rem; font-weight: 700; border: none; border-radius: 10px; cursor: pointer; font-family: inherit; transition: transform 0.2s ease, box-shadow 0.25s ease; white-space: nowrap; }
        .ev-news__submit:hover { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(232, 138, 5, 0.4); }
        .ev-news__success { font-size: 0.85rem; font-weight: 700; color: #1e7c3a; background: rgba(30, 124, 58, 0.08); border: 1px solid rgba(30, 124, 58, 0.25); padding: 0.55rem 0.9rem; border-radius: 8px; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

        .ev-cta { padding: 4rem 1rem; background: linear-gradient(135deg, #3B2414 0%, #6B3D1B 55%, #8B4E1F 100%); position: relative; overflow: hidden; }
        .ev-cta::before { content: ""; position: absolute; top: -120px; right: -120px; width: 380px; height: 380px; background: radial-gradient(circle, rgba(232, 138, 5, 0.35) 0%, transparent 70%); border-radius: 50%; }
        .ev-cta::after { content: ""; position: absolute; bottom: -140px; left: -140px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(201, 154, 46, 0.25) 0%, transparent 70%); border-radius: 50%; }
        .ev-cta__inner { max-width: 820px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; position: relative; z-index: 1; }
        .ev-cta__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(255, 248, 231, 0.12); border: 1px solid rgba(232, 138, 5, 0.5); border-radius: 999px; font-size: 0.82rem; font-weight: 700; color: #FFD89B; letter-spacing: 0.5px; text-transform: uppercase; backdrop-filter: blur(4px); }
        .ev-cta__title { font-size: 2.1rem; font-weight: 800; color: #FFF8E7; line-height: 1.2; letter-spacing: -0.3px; margin: 0; }
        .ev-cta__text { font-size: 1rem; line-height: 1.75; color: rgba(255, 248, 231, 0.85); margin: 0; max-width: 660px; }
        .ev-cta__buttons { display: flex; gap: 0.7rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem; }
        .ev-cta__btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.9rem 1.7rem; font-size: 0.95rem; font-weight: 700; border-radius: 999px; text-decoration: none; cursor: pointer; border: 2px solid transparent; white-space: nowrap; transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease; }
        .ev-cta__btn--primary { background: linear-gradient(135deg, var(--saffron), var(--gold)); color: #fff; box-shadow: 0 8px 22px rgba(232, 138, 5, 0.5); }
        .ev-cta__btn--primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(232, 138, 5, 0.6); }
        .ev-cta__btn--ghost { background: transparent; color: #FFF8E7; border-color: rgba(255, 248, 231, 0.4); }
        .ev-cta__btn--ghost:hover { background: rgba(255, 248, 231, 0.1); border-color: #FFD89B; transform: translateY(-2px); }

        @media (max-width: 1024px) {
          .ev-hero { padding: 3.2rem 1rem 2.8rem; }
          .ev-hero__title { font-size: 2.2rem; }
          .ev-section { padding: 2.8rem 1rem; }
          .ev-grid { gap: 1.3rem; }
          .ev-head__title { font-size: 1.75rem; }
          .ev-stats { grid-template-columns: repeat(2, 1fr); }
          .ev-pastGrid { grid-template-columns: repeat(2, 1fr); }
          .ev-cta { padding: 3.2rem 1rem; }
          .ev-cta__title { font-size: 1.75rem; }
        }
        @media (max-width: 860px) {
          .ev-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .ev-hero { padding: 2.4rem 0.9rem 2.2rem; }
          .ev-hero__title { font-size: 1.7rem; }
          .ev-hero__subtitle { font-size: 0.92rem; line-height: 1.65; }
          .ev-hero__badge { font-size: 0.75rem; }
          .ev-section { padding: 2.4rem 0.9rem; }
          .ev-head { margin-bottom: 2rem; }
          .ev-head__title { font-size: 1.45rem; }
          .ev-head__subtitle { font-size: 0.88rem; }
          .ev-filter { padding: 0.5rem 0.95rem; font-size: 0.78rem; }
          .ev-filters { gap: 0.4rem; margin-bottom: 2rem; }
          .ev-grid { grid-template-columns: 1fr; gap: 1.2rem; max-width: 460px; margin: 0 auto; }
          .ev-stats { grid-template-columns: repeat(2, 1fr); gap: 0.9rem; }
          .ev-stat { padding: 1.3rem 0.9rem; }
          .ev-stat__icon { width: 48px; height: 48px; font-size: 1.25rem; }
          .ev-stat__value { font-size: 1.45rem; }
          .ev-stat__label { font-size: 0.7rem; }
          .ev-pastGrid { grid-template-columns: 1fr; gap: 1.2rem; max-width: 460px; margin: 0 auto; }
          .ev-news { padding: 1.6rem 1.1rem; }
          .ev-news__title { font-size: 1.25rem; }
          .ev-news__text { font-size: 0.85rem; }
          .ev-news__form { flex-direction: column; gap: 0.5rem; }
          .ev-news__submit { width: 100%; }
          .ev-cta { padding: 2.6rem 0.9rem; }
          .ev-cta__title { font-size: 1.5rem; }
          .ev-cta__text { font-size: 0.92rem; }
        }
        @media (max-width: 425px) {
          .ev-hero__title { font-size: 1.5rem; }
          .ev-hero__subtitle { font-size: 0.85rem; }
          .ev-head__title { font-size: 1.3rem; }
          .ev-head__subtitle { font-size: 0.82rem; }
          .ev-filter { padding: 0.45rem 0.85rem; font-size: 0.74rem; }
          .ev-cta__title { font-size: 1.3rem; }
          .ev-cta__text { font-size: 0.85rem; }
          .ev-cta__btn { flex: 1 1 auto; min-width: 130px; padding: 0.75rem 1.15rem; font-size: 0.85rem; }
        }
        @media (max-width: 375px) {
          .ev-crumb { padding: 0.75rem 0.75rem; }
          .ev-crumb__inner { font-size: 0.78rem; }
          .ev-hero { padding: 2rem 0.75rem 1.9rem; }
          .ev-hero__title { font-size: 1.32rem; }
          .ev-hero__subtitle { font-size: 0.8rem; }
          .ev-section { padding: 2rem 0.75rem; }
          .ev-head__title { font-size: 1.15rem; }
          .ev-filter { padding: 0.4rem 0.75rem; font-size: 0.7rem; }
          .ev-stat { padding: 1.1rem 0.8rem; }
          .ev-stat__value { font-size: 1.3rem; }
          .ev-cta__title { font-size: 1.15rem; }
          .ev-cta__btn { padding: 0.65rem 0.95rem; font-size: 0.78rem; min-width: 110px; }
        }
        @media (max-width: 340px) {
          .ev-hero__title { font-size: 1.15rem; }
          .ev-head__title { font-size: 1.05rem; }
          .ev-filter { padding: 0.38rem 0.65rem; font-size: 0.66rem; }
          .ev-cta__title { font-size: 1.05rem; }
          .ev-cta__text { font-size: 0.78rem; }
        }
      `}</style>

      <div className="events-page">

        {/* Breadcrumb */}
        <div className="ev-crumb">
          <div className="ev-crumb__inner">
            <Link to="/" className="ev-crumb__link">
              {t("eventsPage.breadcrumbHome")}
            </Link>
            <span className="ev-crumb__sep">›</span>
            <span className="ev-crumb__current">
              {t("eventsPage.breadcrumbCurrent")}
            </span>
          </div>
        </div>

        {/* Hero */}
        <section className="ev-hero">
          <div className="ev-hero__inner">
            <span className="ev-hero__badge">{t("eventsPage.heroBadge")}</span>
            <h1 className="ev-hero__title">{t("eventsPage.heroTitle")}</h1>
            <span className="ev-hero__divider" />
            <p className="ev-hero__subtitle">{t("eventsPage.heroSubtitle")}</p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="ev-section">
          <div className="ev-section__container">
            <div className="ev-filters">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={`ev-filter ${activeFilter === f.key ? "ev-filter--active" : ""}`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {visibleEvents.length > 0 ? (
              <div className="ev-grid">
                {visibleEvents.map((ev) => (
                  <EventCard
                    key={ev.id}
                    image={ev.image}
                    title={ev.title}
                    date={ev.date}
                    time={ev.time}
                    desc={ev.desc}
                    tag={ev.tag}
                    icon={ev.icon}
                    daysLeft={ev.daysLeft}
                    featured={ev.featured}
                  />
                ))}
              </div>
            ) : (
              <div className="ev-empty">{t("eventsPage.emptyText")}</div>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="ev-section ev-section--alt">
          <div className="ev-section__container">
            <header className="ev-head">
              <span className="ev-head__badge">{t("eventsPage.statsBadge")}</span>
              <h2 className="ev-head__title">{t("eventsPage.statsTitle")}</h2>
              <span className="ev-head__divider" />
              <p className="ev-head__subtitle">{t("eventsPage.statsSubtitle")}</p>
            </header>

            <div className="ev-stats">
              {stats.map((s, i) => (
                <div key={i} className="ev-stat">
                  <span className="ev-stat__icon" aria-hidden="true">{s.icon}</span>
                  <span className="ev-stat__value">{s.value}</span>
                  <span className="ev-stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="ev-section">
          <div className="ev-section__container">
            <header className="ev-head">
              <span className="ev-head__badge">{t("eventsPage.pastBadge")}</span>
              <h2 className="ev-head__title">{t("eventsPage.pastTitle")}</h2>
              <span className="ev-head__divider" />
              <p className="ev-head__subtitle">{t("eventsPage.pastSubtitle")}</p>
            </header>

            <div className="ev-pastGrid">
              {pastEvents.map((p) => (
                <article key={p.id} className="ev-pastCard">
                  <div className="ev-pastCard__imgWrap">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="ev-pastCard__img"
                      loading="lazy"
                    />
                    <span className="ev-pastCard__tag">{p.tag}</span>
                  </div>
                  <div className="ev-pastCard__body">
                    <h3 className="ev-pastCard__title">{p.title}</h3>
                    <span className="ev-pastCard__date">📅 {p.date}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="ev-section ev-section--alt">
          <div className="ev-section__container">
            <div className="ev-news">
              <span className="ev-news__badge">
                {t("eventsPage.newsletterBadge")}
              </span>
              <h2 className="ev-news__title">
                {t("eventsPage.newsletterTitle")}
              </h2>
              <p className="ev-news__text">
                {t("eventsPage.newsletterText")}
              </p>

              <form className="ev-news__form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="ev-news__input"
                  placeholder={t("eventsPage.newsletterPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="ev-news__submit">
                  {t("eventsPage.newsletterBtn")}
                </button>
              </form>

              {subscribed && (
                <span className="ev-news__success">
                  {t("eventsPage.newsletterSuccess")}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ev-cta">
          <div className="ev-cta__inner">
            <span className="ev-cta__badge">{t("eventsPage.ctaBadge")}</span>
            <h2 className="ev-cta__title">{t("eventsPage.ctaTitle")}</h2>
            <p className="ev-cta__text">{t("eventsPage.ctaText")}</p>

            <div className="ev-cta__buttons">
              <Link to="/contact" className="ev-cta__btn ev-cta__btn--primary">
                {t("eventsPage.ctaVisitBtn")} →
              </Link>
              <Link to="/donate" className="ev-cta__btn ev-cta__btn--ghost">
                {t("eventsPage.ctaDonateBtn")}
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Events;