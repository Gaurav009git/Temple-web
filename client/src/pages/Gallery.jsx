import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GalleryCard from "../components/gallery/GalleryCard";

// ✅ Match filenames exactly to what's in client/src/assets/
import g1  from "../assets/gallery1.jpg";
import g2  from "../assets/gallery2.jpg";
import g3  from "../assets/gallery3.jpg";
import g4  from "../assets/gallery4.jpg";
import g5  from "../assets/gallery5.jpg";
import g6  from "../assets/gallery6.jpg";
import g7  from "../assets/gallery7.jpg";
import g8  from "../assets/gallery8.jpg";
import g9  from "../assets/gallery9.jpg";
import g10 from "../assets/gallery10.jpg";
import g11 from "../assets/gallery11.jpg";
import g12 from "../assets/gallery12.jpg";

const Gallery = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Categories: temple | festival | pooja | community
  const photos = [
    { id: 1,  image: g1,  title: "Temple Sanctum",         category: "temple"    },
    { id: 2,  image: g2,  title: "Daily Aarti",            category: "pooja"     },
    { id: 3,  image: g3,  title: "Diwali Celebration",     category: "festival"  },
    { id: 4,  image: g4,  title: "Devotee Gathering",      category: "community" },
    { id: 5,  image: g5,  title: "Sankashti Chaturthi",    category: "pooja"     },
    { id: 6,  image: g6,  title: "Temple Architecture",    category: "temple"    },
    { id: 7,  image: g7,  title: "Annakut Mahotsav",       category: "festival"  },
    { id: 8,  image: g8,  title: "Community Seva",         category: "community" },
    { id: 9,  image: g9,  title: "Evening Bhajan",         category: "pooja"     },
    { id: 10, image: g10, title: "Navratri Utsav",         category: "festival"  },
    { id: 11, image: g11, title: "Temple Festival",        category: "festival"  },
    { id: 12, image: g12, title: "Prasadam Distribution",  category: "community" },
  ];

  const filters = [
    { key: "all",       label: t("galleryPage.filterAll")       },
    { key: "temple",    label: t("galleryPage.filterTemple")    },
    { key: "festival",  label: t("galleryPage.filterFestival")  },
    { key: "pooja",     label: t("galleryPage.filterPooja")     },
    { key: "community", label: t("galleryPage.filterCommunity") },
  ];

  const visiblePhotos =
    activeFilter === "all"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  const stats = [
    { value: t("galleryPage.stat1Value"), label: t("galleryPage.stat1Label"), icon: "📸" },
    { value: t("galleryPage.stat2Value"), label: t("galleryPage.stat2Label"), icon: "🎉" },
    { value: t("galleryPage.stat3Value"), label: t("galleryPage.stat3Label"), icon: "🪔" },
    { value: t("galleryPage.stat4Value"), label: t("galleryPage.stat4Label"), icon: "❤️" },
  ];

  // ---------- Lightbox ----------
  const openLightbox = (photoId) => {
    const idx = visiblePhotos.findIndex((p) => p.id === photoId);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      return (i - 1 + visiblePhotos.length) % visiblePhotos.length;
    });
  }, [visiblePhotos.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      return (i + 1) % visiblePhotos.length;
    });
  }, [visiblePhotos.length]);

  // Keyboard nav + scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  const activePhoto =
    lightboxIndex !== null ? visiblePhotos[lightboxIndex] : null;

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        .gallery-page {
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
        .gallery-page *, .gallery-page *::before, .gallery-page *::after { box-sizing: border-box; }

        /* ================ BREADCRUMB ================ */
        .g-crumb { background: var(--nav-bg); border-bottom: 1px solid var(--border); padding: 1rem 1rem; }
        .g-crumb__inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #6b5440; flex-wrap: wrap; }
        .g-crumb__link { color: var(--saffron); text-decoration: none; font-weight: 600; transition: color 0.2s ease; }
        .g-crumb__link:hover { color: var(--text-dark); }
        .g-crumb__sep { color: var(--gold); font-weight: 800; }
        .g-crumb__current { color: var(--text-dark); font-weight: 700; }

        /* ================ HERO ================ */
        .g-hero { padding: 4rem 1rem 3.5rem; text-align: center; background: linear-gradient(180deg, #FFF8E7 0%, #FFFDF7 100%); position: relative; overflow: hidden; }
        .g-hero::before { content: ""; position: absolute; top: -120px; right: -120px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(232, 138, 5, 0.15) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .g-hero::after { content: ""; position: absolute; bottom: -120px; left: -120px; width: 340px; height: 340px; background: radial-gradient(circle, rgba(201, 154, 46, 0.12) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .g-hero__inner { max-width: 820px; margin: 0 auto; position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        .g-hero__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.82rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.5px; text-transform: uppercase; }
        .g-hero__title { font-size: 2.6rem; line-height: 1.15; font-weight: 800; letter-spacing: -0.5px; margin: 0; background: linear-gradient(135deg, var(--text-dark) 30%, var(--saffron) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .g-hero__divider { width: 80px; height: 3px; background: linear-gradient(90deg, var(--saffron), var(--gold)); border-radius: 3px; }
        .g-hero__subtitle { font-size: 1.05rem; line-height: 1.75; color: #5a4530; margin: 0; max-width: 720px; }

        /* ================ SECTION BASE ================ */
        .g-section { padding: 3.5rem 1rem; position: relative; overflow: hidden; }
        .g-section--alt { background: var(--nav-bg); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .g-section__container { max-width: 1200px; width: 100%; margin: 0 auto; position: relative; z-index: 1; }

        /* ================ FILTERS ================ */
        .g-filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-bottom: 2.5rem; }
        .g-filter { padding: 0.55rem 1.15rem; background: var(--white); border: 1.5px solid var(--border); border-radius: 999px; font-size: 0.85rem; font-weight: 600; color: var(--text-dark); cursor: pointer; font-family: inherit; transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease; white-space: nowrap; }
        .g-filter:hover { border-color: var(--saffron); color: var(--saffron); transform: translateY(-1px); }
        .g-filter--active { background: linear-gradient(135deg, var(--saffron), var(--gold)); color: #fff; border-color: transparent; box-shadow: 0 6px 14px rgba(232, 138, 5, 0.3); }

        /* ================ MASONRY-STYLE GRID ================ */
        .g-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.1rem;
        }
        .g-empty { text-align: center; padding: 3rem 1rem; color: #6b5440; font-size: 1rem; }

        /* ================ SECTION HEADINGS ================ */
        .g-head { text-align: center; max-width: 720px; margin: 0 auto 3rem; display: flex; flex-direction: column; align-items: center; gap: 0.85rem; }
        .g-head__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.78rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.5px; text-transform: uppercase; }
        .g-head__title { font-size: 2rem; font-weight: 800; color: var(--text-dark); margin: 0; line-height: 1.2; letter-spacing: -0.3px; }
        .g-head__divider { width: 70px; height: 3px; background: linear-gradient(90deg, var(--saffron), var(--gold)); border-radius: 3px; }
        .g-head__subtitle { font-size: 0.98rem; line-height: 1.7; color: #5a4530; margin: 0; }

        /* ================ STATS ================ */
        .g-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.3rem; }
        .g-stat { background: var(--white); border: 1px solid var(--border); border-radius: 18px; padding: 1.7rem 1.1rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.6rem; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .g-stat:hover { transform: translateY(-6px); border-color: var(--saffron); box-shadow: 0 18px 34px rgba(201, 154, 46, 0.22); }
        .g-stat__icon { width: 58px; height: 58px; display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--saffron), var(--gold)); color: #fff; border-radius: 50%; font-size: 1.5rem; box-shadow: 0 8px 18px rgba(232, 138, 5, 0.35); }
        .g-stat__value { font-size: 1.8rem; font-weight: 800; color: var(--text-dark); line-height: 1; }
        .g-stat__label { font-size: 0.78rem; font-weight: 700; color: #6b5440; text-transform: uppercase; letter-spacing: 0.4px; }

        /* ================ CTA ================ */
        .g-cta { padding: 4rem 1rem; background: linear-gradient(135deg, #3B2414 0%, #6B3D1B 55%, #8B4E1F 100%); position: relative; overflow: hidden; }
        .g-cta::before { content: ""; position: absolute; top: -120px; right: -120px; width: 380px; height: 380px; background: radial-gradient(circle, rgba(232, 138, 5, 0.35) 0%, transparent 70%); border-radius: 50%; }
        .g-cta::after { content: ""; position: absolute; bottom: -140px; left: -140px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(201, 154, 46, 0.25) 0%, transparent 70%); border-radius: 50%; }
        .g-cta__inner { max-width: 820px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; position: relative; z-index: 1; }
        .g-cta__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(255, 248, 231, 0.12); border: 1px solid rgba(232, 138, 5, 0.5); border-radius: 999px; font-size: 0.82rem; font-weight: 700; color: #FFD89B; letter-spacing: 0.5px; text-transform: uppercase; backdrop-filter: blur(4px); }
        .g-cta__title { font-size: 2.1rem; font-weight: 800; color: #FFF8E7; line-height: 1.2; letter-spacing: -0.3px; margin: 0; }
        .g-cta__text { font-size: 1rem; line-height: 1.75; color: rgba(255, 248, 231, 0.85); margin: 0; max-width: 660px; }
        .g-cta__buttons { display: flex; gap: 0.7rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem; }
        .g-cta__btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.9rem 1.7rem; font-size: 0.95rem; font-weight: 700; border-radius: 999px; text-decoration: none; cursor: pointer; border: 2px solid transparent; white-space: nowrap; transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease; }
        .g-cta__btn--primary { background: linear-gradient(135deg, var(--saffron), var(--gold)); color: #fff; box-shadow: 0 8px 22px rgba(232, 138, 5, 0.5); }
        .g-cta__btn--primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(232, 138, 5, 0.6); }
        .g-cta__btn--ghost { background: transparent; color: #FFF8E7; border-color: rgba(255, 248, 231, 0.4); }
        .g-cta__btn--ghost:hover { background: rgba(255, 248, 231, 0.1); border-color: #FFD89B; transform: translateY(-2px); }

        /* ================ LIGHTBOX ================ */
        .lb {
          position: fixed;
          inset: 0;
          background: rgba(59, 36, 20, 0.94);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1rem;
          animation: lbFade 0.25s ease;
          backdrop-filter: blur(6px);
        }
        @keyframes lbFade { from { opacity: 0; } to { opacity: 1; } }

        .lb__content {
          position: relative;
          max-width: 1100px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: lbScale 0.3s ease;
        }
        @keyframes lbScale {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }

        .lb__imgWrap {
          position: relative;
          width: 100%;
          max-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lb__img {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
          display: block;
        }

        .lb__caption {
          margin-top: 1rem;
          text-align: center;
          color: #FFF8E7;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          align-items: center;
        }
        .lb__captionCategory {
          display: inline-block;
          padding: 0.28rem 0.7rem;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 0.7rem;
          font-weight: 800;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .lb__captionTitle {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0;
        }
        .lb__captionCounter {
          font-size: 0.8rem;
          color: rgba(255, 248, 231, 0.7);
          font-weight: 600;
        }

        .lb__btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.15);
          border: 1.5px solid rgba(255, 248, 231, 0.35);
          color: #FFF8E7;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.3rem;
          transition: background 0.25s ease, transform 0.2s ease, border-color 0.25s ease;
          z-index: 2;
        }
        .lb__btn:hover {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          border-color: transparent;
          transform: translateY(-50%) scale(1.08);
        }
        .lb__btn--prev { left: 1rem; }
        .lb__btn--next { right: 1rem; }

        .lb__close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.15);
          border: 1.5px solid rgba(255, 248, 231, 0.35);
          color: #FFF8E7;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          transition: background 0.25s ease, transform 0.2s ease;
          z-index: 3;
        }
        .lb__close:hover {
          background: #B91C1C;
          border-color: transparent;
          transform: rotate(90deg);
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1024px) {
          .g-hero { padding: 3.2rem 1rem 2.8rem; }
          .g-hero__title { font-size: 2.2rem; }
          .g-section { padding: 2.8rem 1rem; }
          .g-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
          .g-head__title { font-size: 1.75rem; }
          .g-stats { grid-template-columns: repeat(2, 1fr); }
          .g-cta { padding: 3.2rem 1rem; }
          .g-cta__title { font-size: 1.75rem; }
          .lb__btn { width: 42px; height: 42px; font-size: 1.15rem; }
        }

        @media (max-width: 860px) {
          .g-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .g-hero { padding: 2.4rem 0.9rem 2.2rem; }
          .g-hero__title { font-size: 1.7rem; }
          .g-hero__subtitle { font-size: 0.92rem; line-height: 1.65; }
          .g-hero__badge { font-size: 0.75rem; }
          .g-section { padding: 2.4rem 0.9rem; }
          .g-head { margin-bottom: 2rem; }
          .g-head__title { font-size: 1.45rem; }
          .g-head__subtitle { font-size: 0.88rem; }
          .g-filter { padding: 0.5rem 0.95rem; font-size: 0.78rem; }
          .g-filters { gap: 0.4rem; margin-bottom: 2rem; }
          .g-grid { gap: 0.8rem; }
          .g-stats { grid-template-columns: repeat(2, 1fr); gap: 0.9rem; }
          .g-stat { padding: 1.3rem 0.9rem; }
          .g-stat__icon { width: 48px; height: 48px; font-size: 1.25rem; }
          .g-stat__value { font-size: 1.45rem; }
          .g-stat__label { font-size: 0.7rem; }
          .g-cta { padding: 2.6rem 0.9rem; }
          .g-cta__title { font-size: 1.5rem; }
          .g-cta__text { font-size: 0.92rem; }
          .lb__btn { width: 38px; height: 38px; font-size: 1.05rem; }
          .lb__btn--prev { left: 0.5rem; }
          .lb__btn--next { right: 0.5rem; }
          .lb__close { width: 38px; height: 38px; font-size: 1rem; top: 0.5rem; right: 0.5rem; }
          .lb__captionTitle { font-size: 0.95rem; }
        }

        @media (max-width: 425px) {
          .g-hero__title { font-size: 1.5rem; }
          .g-hero__subtitle { font-size: 0.85rem; }
          .g-head__title { font-size: 1.3rem; }
          .g-head__subtitle { font-size: 0.82rem; }
          .g-filter { padding: 0.45rem 0.85rem; font-size: 0.74rem; }
          .g-cta__title { font-size: 1.3rem; }
          .g-cta__text { font-size: 0.85rem; }
          .g-cta__btn { flex: 1 1 auto; min-width: 130px; padding: 0.75rem 1.15rem; font-size: 0.85rem; }
        }

        @media (max-width: 375px) {
          .g-crumb { padding: 0.75rem 0.75rem; }
          .g-crumb__inner { font-size: 0.78rem; }
          .g-hero { padding: 2rem 0.75rem 1.9rem; }
          .g-hero__title { font-size: 1.32rem; }
          .g-hero__subtitle { font-size: 0.8rem; }
          .g-section { padding: 2rem 0.75rem; }
          .g-head__title { font-size: 1.15rem; }
          .g-filter { padding: 0.4rem 0.75rem; font-size: 0.7rem; }
          .g-grid { grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
          .g-stat { padding: 1.1rem 0.8rem; }
          .g-stat__value { font-size: 1.3rem; }
          .g-cta__title { font-size: 1.15rem; }
          .g-cta__btn { padding: 0.65rem 0.95rem; font-size: 0.78rem; min-width: 110px; }
        }

        @media (max-width: 340px) {
          .g-hero__title { font-size: 1.15rem; }
          .g-head__title { font-size: 1.05rem; }
          .g-filter { padding: 0.38rem 0.65rem; font-size: 0.66rem; }
          .g-grid { gap: 0.5rem; }
          .g-cta__title { font-size: 1.05rem; }
          .g-cta__text { font-size: 0.78rem; }
        }
      `}</style>

      {/* ================= PAGE MARKUP ================= */}
      <div className="gallery-page">

        {/* Breadcrumb */}
        <div className="g-crumb">
          <div className="g-crumb__inner">
            <Link to="/" className="g-crumb__link">
              {t("galleryPage.breadcrumbHome")}
            </Link>
            <span className="g-crumb__sep">›</span>
            <span className="g-crumb__current">
              {t("galleryPage.breadcrumbCurrent")}
            </span>
          </div>
        </div>

        {/* Hero */}
        <section className="g-hero">
          <div className="g-hero__inner">
            <span className="g-hero__badge">{t("galleryPage.heroBadge")}</span>
            <h1 className="g-hero__title">{t("galleryPage.heroTitle")}</h1>
            <span className="g-hero__divider" />
            <p className="g-hero__subtitle">{t("galleryPage.heroSubtitle")}</p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="g-section">
          <div className="g-section__container">
            <div className="g-filters">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={`g-filter ${activeFilter === f.key ? "g-filter--active" : ""}`}
                  onClick={() => {
                    setActiveFilter(f.key);
                    setLightboxIndex(null);
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {visiblePhotos.length > 0 ? (
              <div className="g-grid">
                {visiblePhotos.map((photo) => (
                  <GalleryCard
                    key={photo.id}
                    image={photo.image}
                    title={photo.title}
                    category={photo.category}
                    onClick={() => openLightbox(photo.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="g-empty">{t("galleryPage.emptyText")}</div>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="g-section g-section--alt">
          <div className="g-section__container">
            <header className="g-head">
              <span className="g-head__badge">{t("galleryPage.statsBadge")}</span>
              <h2 className="g-head__title">{t("galleryPage.statsTitle")}</h2>
              <span className="g-head__divider" />
              <p className="g-head__subtitle">{t("galleryPage.statsSubtitle")}</p>
            </header>

            <div className="g-stats">
              {stats.map((s, i) => (
                <div key={i} className="g-stat">
                  <span className="g-stat__icon" aria-hidden="true">{s.icon}</span>
                  <span className="g-stat__value">{s.value}</span>
                  <span className="g-stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="g-cta">
          <div className="g-cta__inner">
            <span className="g-cta__badge">{t("galleryPage.ctaBadge")}</span>
            <h2 className="g-cta__title">{t("galleryPage.ctaTitle")}</h2>
            <p className="g-cta__text">{t("galleryPage.ctaText")}</p>

            <div className="g-cta__buttons">
              <Link to="/contact" className="g-cta__btn g-cta__btn--primary">
                {t("galleryPage.ctaVisitBtn")} →
              </Link>
              <Link to="/contact" className="g-cta__btn g-cta__btn--ghost">
                {t("galleryPage.ctaContactBtn")}
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* ================= LIGHTBOX ================= */}
      {activePhoto && (
        <div
          className="lb"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="lb__content">
            {/* Close */}
            <button
              className="lb__close"
              onClick={closeLightbox}
              aria-label={t("galleryPage.lightboxClose")}
            >
              ✕
            </button>

            {/* Prev */}
            {visiblePhotos.length > 1 && (
              <button
                className="lb__btn lb__btn--prev"
                onClick={goPrev}
                aria-label={t("galleryPage.lightboxPrev")}
              >
                ‹
              </button>
            )}

            {/* Image */}
            <div className="lb__imgWrap">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="lb__img"
              />
            </div>

            {/* Next */}
            {visiblePhotos.length > 1 && (
              <button
                className="lb__btn lb__btn--next"
                onClick={goNext}
                aria-label={t("galleryPage.lightboxNext")}
              >
                ›
              </button>
            )}

            {/* Caption */}
            <div className="lb__caption">
              <span className="lb__captionCategory">
                {activePhoto.category}
              </span>
              <p className="lb__captionTitle">{activePhoto.title}</p>
              <span className="lb__captionCounter">
                {lightboxIndex + 1} / {visiblePhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;