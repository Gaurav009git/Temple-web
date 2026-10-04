import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("privacyPage.section1Title"),
      text: t("privacyPage.section1Text"),
    },
    {
      title: t("privacyPage.section2Title"),
      text: t("privacyPage.section2Text"),
      list: [
        t("privacyPage.section2List1"),
        t("privacyPage.section2List2"),
        t("privacyPage.section2List3"),
        t("privacyPage.section2List4"),
      ],
    },
    {
      title: t("privacyPage.section3Title"),
      text: t("privacyPage.section3Text"),
      list: [
        t("privacyPage.section3List1"),
        t("privacyPage.section3List2"),
        t("privacyPage.section3List3"),
        t("privacyPage.section3List4"),
        t("privacyPage.section3List5"),
      ],
    },
    {
      title: t("privacyPage.section4Title"),
      text: t("privacyPage.section4Text"),
      list: [
        t("privacyPage.section4List1"),
        t("privacyPage.section4List2"),
        t("privacyPage.section4List3"),
        t("privacyPage.section4List4"),
      ],
    },
    {
      title: t("privacyPage.section5Title"),
      text: t("privacyPage.section5Text"),
      list: [
        t("privacyPage.section5List1"),
        t("privacyPage.section5List2"),
        t("privacyPage.section5List3"),
        t("privacyPage.section5List4"),
      ],
    },
    {
      title: t("privacyPage.section6Title"),
      text: t("privacyPage.section6Text"),
    },
    {
      title: t("privacyPage.section7Title"),
      text: t("privacyPage.section7Text"),
      list: [
        t("privacyPage.section7List1"),
        t("privacyPage.section7List2"),
        t("privacyPage.section7List3"),
        t("privacyPage.section7List4"),
        t("privacyPage.section7List5"),
      ],
    },
    {
      title: t("privacyPage.section8Title"),
      text: t("privacyPage.section8Text"),
    },
    {
      title: t("privacyPage.section9Title"),
      text: t("privacyPage.section9Text"),
    },
  ];

  return (
    <>
      <style>{`
        .legal-page {
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
        .legal-page *, .legal-page *::before, .legal-page *::after { box-sizing: border-box; }

        .l-crumb { background: var(--nav-bg); border-bottom: 1px solid var(--border); padding: 1rem 1rem; }
        .l-crumb__inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #6b5440; flex-wrap: wrap; }
        .l-crumb__link { color: var(--saffron); text-decoration: none; font-weight: 600; transition: color 0.2s ease; }
        .l-crumb__link:hover { color: var(--text-dark); }
        .l-crumb__sep { color: var(--gold); font-weight: 800; }
        .l-crumb__current { color: var(--text-dark); font-weight: 700; }

        .l-hero { padding: 3.5rem 1rem 3rem; text-align: center; background: linear-gradient(180deg, #FFF8E7 0%, #FFFDF7 100%); position: relative; overflow: hidden; }
        .l-hero::before { content: ""; position: absolute; top: -120px; right: -120px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(232, 138, 5, 0.15) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .l-hero__inner { max-width: 820px; margin: 0 auto; position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        .l-hero__badge { display: inline-block; padding: 0.45rem 1rem; background: rgba(232, 138, 5, 0.12); border: 1px solid var(--border); border-radius: 999px; font-size: 0.82rem; font-weight: 700; color: var(--saffron); letter-spacing: 0.5px; text-transform: uppercase; }
        .l-hero__title { font-size: 2.4rem; line-height: 1.15; font-weight: 800; letter-spacing: -0.5px; margin: 0; background: linear-gradient(135deg, var(--text-dark) 30%, var(--saffron) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .l-hero__divider { width: 80px; height: 3px; background: linear-gradient(90deg, var(--saffron), var(--gold)); border-radius: 3px; }
        .l-hero__subtitle { font-size: 1rem; line-height: 1.75; color: #5a4530; margin: 0; max-width: 700px; }
        .l-hero__updated {
          display: inline-block; padding: 0.4rem 0.9rem;
          background: var(--white); border: 1px solid var(--border);
          border-radius: 999px; font-size: 0.75rem; font-weight: 700; color: #6b5440;
        }

        .l-section { padding: 3rem 1rem 4rem; }
        .l-container { max-width: 860px; width: 100%; margin: 0 auto; }

        .l-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2.5rem 2.2rem;
          box-shadow: 0 12px 30px rgba(201, 154, 46, 0.1);
        }

        .l-block { margin-bottom: 2rem; }
        .l-block:last-child { margin-bottom: 0; }
        .l-block + .l-block { padding-top: 1.8rem; border-top: 1px solid var(--border); }

        .l-block__title {
          font-size: 1.15rem; font-weight: 800;
          color: var(--text-dark); margin: 0 0 0.7rem;
          line-height: 1.35; position: relative; padding-left: 1rem;
        }
        .l-block__title::before {
          content: ""; position: absolute;
          left: 0; top: 0.3em; bottom: 0.3em; width: 4px;
          background: linear-gradient(180deg, var(--saffron), var(--gold));
          border-radius: 3px;
        }

        .l-block__text { font-size: 0.92rem; line-height: 1.85; color: #5a4530; margin: 0; }

        .l-block__list {
          list-style: none; margin: 0.8rem 0 0; padding: 0;
          display: flex; flex-direction: column; gap: 0.55rem;
        }
        .l-block__listItem {
          display: flex; align-items: flex-start; gap: 0.65rem;
          font-size: 0.9rem; line-height: 1.7; color: #5a4530;
        }
        .l-block__listItem::before {
          content: "◆"; flex-shrink: 0; color: var(--saffron);
          font-size: 0.65rem; line-height: 1.7; margin-top: 0.15rem;
        }

        .l-contactBox {
          margin-top: 1rem; padding: 1.2rem 1.3rem;
          background: var(--nav-bg); border: 1px solid var(--border);
          border-radius: 14px; display: flex; flex-direction: column; gap: 0.6rem;
        }
        .l-contactBox__item {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-size: 0.9rem; font-weight: 600; color: var(--text-dark);
          text-decoration: none; transition: color 0.2s ease;
        }
        .l-contactBox__item:hover { color: var(--saffron); }
        .l-contactBox__icon {
          flex-shrink: 0; width: 26px; height: 26px;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(232, 138, 5, 0.15);
          border-radius: 50%; font-size: 0.8rem; color: var(--saffron);
        }

        .l-cta { padding: 3.5rem 1rem; background: linear-gradient(135deg, #3B2414 0%, #6B3D1B 55%, #8B4E1F 100%); position: relative; overflow: hidden; }
        .l-cta::before { content: ""; position: absolute; top: -120px; right: -120px; width: 380px; height: 380px; background: radial-gradient(circle, rgba(232, 138, 5, 0.35) 0%, transparent 70%); border-radius: 50%; }
        .l-cta::after { content: ""; position: absolute; bottom: -140px; left: -140px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(201, 154, 46, 0.25) 0%, transparent 70%); border-radius: 50%; }
        .l-cta__inner { max-width: 720px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; position: relative; z-index: 1; }
        .l-cta__title { font-size: 1.8rem; font-weight: 800; color: #FFF8E7; line-height: 1.2; letter-spacing: -0.3px; margin: 0; }
        .l-cta__text { font-size: 0.98rem; line-height: 1.75; color: rgba(255, 248, 231, 0.85); margin: 0; max-width: 620px; }
        .l-cta__buttons { display: flex; gap: 0.7rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem; }
        .l-cta__btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 1.6rem; font-size: 0.92rem; font-weight: 700; border-radius: 999px; text-decoration: none; cursor: pointer; border: 2px solid transparent; white-space: nowrap; transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease; }
        .l-cta__btn--primary { background: linear-gradient(135deg, var(--saffron), var(--gold)); color: #fff; box-shadow: 0 8px 22px rgba(232, 138, 5, 0.5); }
        .l-cta__btn--primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(232, 138, 5, 0.6); }
        .l-cta__btn--ghost { background: transparent; color: #FFF8E7; border-color: rgba(255, 248, 231, 0.4); }
        .l-cta__btn--ghost:hover { background: rgba(255, 248, 231, 0.1); border-color: #FFD89B; transform: translateY(-2px); }

        @media (max-width: 768px) {
          .l-hero { padding: 2.8rem 1rem 2.4rem; }
          .l-hero__title { font-size: 1.9rem; }
          .l-section { padding: 2.4rem 1rem 3rem; }
          .l-card { padding: 2rem 1.5rem; border-radius: 16px; }
          .l-block__title { font-size: 1.05rem; }
          .l-block__text { font-size: 0.88rem; line-height: 1.75; }
          .l-block__listItem { font-size: 0.86rem; }
          .l-cta { padding: 3rem 1rem; }
          .l-cta__title { font-size: 1.5rem; }
          .l-cta__text { font-size: 0.92rem; }
        }

        @media (max-width: 425px) {
          .l-hero { padding: 2.2rem 0.9rem 2rem; }
          .l-hero__title { font-size: 1.55rem; }
          .l-hero__subtitle { font-size: 0.88rem; line-height: 1.65; }
          .l-hero__badge { font-size: 0.75rem; }
          .l-section { padding: 2rem 0.85rem 2.4rem; }
          .l-card { padding: 1.6rem 1.2rem; border-radius: 14px; }
          .l-block { margin-bottom: 1.6rem; }
          .l-block + .l-block { padding-top: 1.4rem; }
          .l-block__title { font-size: 1rem; padding-left: 0.85rem; }
          .l-block__text { font-size: 0.85rem; line-height: 1.7; }
          .l-block__listItem { font-size: 0.82rem; }
          .l-contactBox { padding: 1rem 1.1rem; }
          .l-contactBox__item { font-size: 0.85rem; word-break: break-word; }
          .l-cta { padding: 2.4rem 0.9rem; }
          .l-cta__title { font-size: 1.3rem; }
          .l-cta__text { font-size: 0.86rem; }
          .l-cta__btn { flex: 1 1 auto; min-width: 130px; padding: 0.75rem 1.15rem; font-size: 0.85rem; }
        }

        @media (max-width: 375px) {
          .l-crumb { padding: 0.75rem 0.75rem; }
          .l-crumb__inner { font-size: 0.78rem; }
          .l-hero { padding: 1.8rem 0.75rem 1.7rem; }
          .l-hero__title { font-size: 1.3rem; }
          .l-hero__subtitle { font-size: 0.8rem; }
          .l-section { padding: 1.8rem 0.7rem 2.2rem; }
          .l-card { padding: 1.4rem 1rem; }
          .l-block__title { font-size: 0.92rem; }
          .l-block__text { font-size: 0.8rem; line-height: 1.65; }
          .l-block__listItem { font-size: 0.78rem; }
          .l-cta__title { font-size: 1.15rem; }
          .l-cta__btn { padding: 0.65rem 0.95rem; font-size: 0.78rem; min-width: 110px; }
        }

        @media (max-width: 340px) {
          .l-hero__title { font-size: 1.15rem; }
          .l-card { padding: 1.2rem 0.9rem; }
          .l-block__title { font-size: 0.88rem; }
          .l-block__text { font-size: 0.76rem; }
          .l-block__listItem { font-size: 0.74rem; }
          .l-cta__title { font-size: 1.05rem; }
          .l-cta__text { font-size: 0.78rem; }
        }
      `}</style>

      <div className="legal-page">

        {/* Breadcrumb */}
        <div className="l-crumb">
          <div className="l-crumb__inner">
            <Link to="/" className="l-crumb__link">
              {t("privacyPage.breadcrumbHome")}
            </Link>
            <span className="l-crumb__sep">›</span>
            <span className="l-crumb__current">
              {t("privacyPage.breadcrumbCurrent")}
            </span>
          </div>
        </div>

        {/* Hero */}
        <section className="l-hero">
          <div className="l-hero__inner">
            <span className="l-hero__badge">{t("privacyPage.heroBadge")}</span>
            <h1 className="l-hero__title">{t("privacyPage.heroTitle")}</h1>
            <span className="l-hero__divider" />
            <p className="l-hero__subtitle">{t("privacyPage.heroSubtitle")}</p>
            <span className="l-hero__updated">
              📅 {t("privacyPage.lastUpdated")}: {t("privacyPage.lastUpdatedDate")}
            </span>
          </div>
        </section>

        {/* Content */}
        <section className="l-section">
          <div className="l-container">
            <div className="l-card">
              {sections.map((s, i) => (
                <div key={i} className="l-block">
                  <h2 className="l-block__title">{s.title}</h2>
                  <p className="l-block__text">{s.text}</p>
                  {s.list && (
                    <ul className="l-block__list">
                      {s.list.map((item, j) => (
                        <li key={j} className="l-block__listItem">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Contact */}
              <div className="l-block">
                <h2 className="l-block__title">{t("privacyPage.section10Title")}</h2>
                <p className="l-block__text">{t("privacyPage.section10Text")}</p>
                <div className="l-contactBox">
                  <a
                    href={`mailto:${t("privacyPage.contactEmail")}`}
                    className="l-contactBox__item"
                  >
                    <span className="l-contactBox__icon">✉️</span>
                    {t("privacyPage.contactEmail")}
                  </a>
                  <a
                    href={`tel:${t("privacyPage.contactPhone").replace(/\s/g, "")}`}
                    className="l-contactBox__item"
                  >
                    <span className="l-contactBox__icon">📞</span>
                    {t("privacyPage.contactPhone")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="l-cta">
          <div className="l-cta__inner">
            <h2 className="l-cta__title">{t("privacyPage.ctaTitle")}</h2>
            <p className="l-cta__text">{t("privacyPage.ctaText")}</p>
            <div className="l-cta__buttons">
              <Link to="/contact" className="l-cta__btn l-cta__btn--primary">
                {t("privacyPage.ctaContactBtn")} →
              </Link>
              <Link to="/terms" className="l-cta__btn l-cta__btn--ghost">
                {t("privacyPage.ctaTermsBtn")}
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Privacy;