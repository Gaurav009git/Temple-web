import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * GalleryCard
 * Single photo card with hover overlay + lightbox.
 *
 * Props:
 *  - image    : string   (imported image)
 *  - title    : string   (optional)
 *  - category : string   (optional)
 *  - onClick  : function (opens lightbox in parent)
 */
const GalleryCard = ({ image, title, category, onClick }) => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  const displayTitle = title || t("galleryCard.defaultTitle");
  const displayCategory = category || t("galleryCard.defaultCategory");

  return (
    <>
      <style>{`
        .gallery-card {
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;

          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: var(--white);
          border: 1px solid var(--border);
          box-shadow: 0 6px 18px rgba(59, 36, 20, 0.08);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          aspect-ratio: 4 / 3;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
        }
        .gallery-card *,
        .gallery-card *::before,
        .gallery-card *::after { box-sizing: border-box; }

        .gallery-card:hover {
          transform: translateY(-6px);
          border-color: var(--saffron);
          box-shadow: 0 18px 38px rgba(201, 154, 46, 0.28);
        }

        /* Image */
        .gallery-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .gallery-card__img--loaded { opacity: 1; }

        .gallery-card:hover .gallery-card__img {
          transform: scale(1.08);
        }

        /* Loading shimmer */
        .gallery-card__skeleton {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            #FFF8E7 0%,
            #FBEED0 50%,
            #FFF8E7 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.4s linear infinite;
          z-index: 0;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Overlay (bottom gradient with info) */
        .gallery-card__overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem;
          background: linear-gradient(
            180deg,
            transparent 40%,
            rgba(59, 36, 20, 0.15) 65%,
            rgba(59, 36, 20, 0.85) 100%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 2;
        }
        .gallery-card:hover .gallery-card__overlay,
        .gallery-card:focus-visible .gallery-card__overlay {
          opacity: 1;
        }

        .gallery-card__category {
          display: inline-block;
          align-self: flex-start;
          padding: 0.28rem 0.7rem;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 0.68rem;
          font-weight: 800;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.4rem;
          box-shadow: 0 4px 12px rgba(232, 138, 5, 0.4);
        }

        .gallery-card__title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFF8E7;
          margin: 0;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        }

        /* View icon badge (top-right, appears on hover) */
        .gallery-card__viewIcon {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50%;
          font-size: 1.05rem;
          box-shadow: 0 6px 16px rgba(59, 36, 20, 0.25);
          z-index: 3;
          opacity: 0;
          transform: scale(0.85);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .gallery-card:hover .gallery-card__viewIcon {
          opacity: 1;
          transform: scale(1);
        }

        /* Focus ring for keyboard users */
        .gallery-card:focus-visible {
          outline: 3px solid var(--saffron);
          outline-offset: 3px;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1024px) {
          .gallery-card__title { font-size: 0.88rem; }
          .gallery-card__overlay { padding: 0.85rem; }
        }

        @media (max-width: 640px) {
          .gallery-card { border-radius: 14px; }
          .gallery-card__title { font-size: 0.85rem; }
          .gallery-card__category { font-size: 0.62rem; padding: 0.25rem 0.6rem; }
          .gallery-card__viewIcon { width: 34px; height: 34px; font-size: 0.95rem; }
        }

        @media (max-width: 425px) {
          .gallery-card__overlay { padding: 0.75rem; }
          .gallery-card__title { font-size: 0.8rem; }
        }

        @media (max-width: 375px) {
          .gallery-card__title { font-size: 0.76rem; }
          .gallery-card__category { font-size: 0.58rem; }
          .gallery-card__viewIcon { width: 30px; height: 30px; font-size: 0.85rem; }
        }

        @media (max-width: 340px) {
          .gallery-card { border-radius: 12px; }
          .gallery-card__title { font-size: 0.72rem; }
        }
      `}</style>

      <div
        className="gallery-card"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick && onClick();
          }
        }}
      >
        {/* Skeleton (hidden after load) */}
        {!loaded && <div className="gallery-card__skeleton" />}

        {/* Image */}
        <img
          src={image}
          alt={title || t("galleryCard.imageAlt")}
          className={`gallery-card__img ${
            loaded ? "gallery-card__img--loaded" : ""
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />

        {/* Hover overlay */}
        <div className="gallery-card__overlay">
          <span className="gallery-card__category">{displayCategory}</span>
          <p className="gallery-card__title">{displayTitle}</p>
        </div>

        {/* View icon */}
        <span className="gallery-card__viewIcon" aria-hidden="true">
          🔍
        </span>
      </div>
    </>
  );
};

export default GalleryCard;