import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const quickLinks = [
    { name: t("footer.linkHome"), path: "/" },
    { name: t("footer.linkAbout"), path: "/about" },
    { name: t("footer.linkEvents"), path: "/events" },
    { name: t("footer.linkGallery"), path: "/gallery" },
    { name: t("footer.linkContact"), path: "/contact" },
    { name: t("footer.linkDonate"), path: "/donate" },
  ];

  const services = [
    t("footer.servicePooja"),
    t("footer.servicePrasad"),
    t("footer.serviceBooking"),
    t("footer.serviceFestival"),
    t("footer.serviceAnnadan"),
  ];

  const socials = [
    { name: "Facebook", icon: "📘", url: "https://facebook.com" },
    { name: "Instagram", icon: "📷", url: "https://instagram.com" },
    { name: "YouTube", icon: "▶️", url: "https://youtube.com" },
    { name: "WhatsApp", icon: "💬", url: "https://wa.me/919876543210" },
  ];

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        .footer {
          --nav-bg: #FFF8E7;
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;
          --cream: #FFFDF7;

          width: 100%;
          background: linear-gradient(180deg, #FFF8E7 0%, #FBEED0 100%);
          border-top: 3px solid var(--border);
          color: var(--text-dark);
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .footer *,
        .footer *::before,
        .footer *::after { box-sizing: border-box; }

        /* Top decorative gold line */
        .footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--saffron), var(--gold), var(--saffron));
          opacity: 0.9;
        }

        /* ================= CONTAINER ================= */
        .footer__container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 3.5rem 1rem 0;
        }

        /* ================= MAIN GRID ================= */
        .footer__grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
          gap: 2.2rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--border);
        }

        /* ================= COLUMN 1: ABOUT ================= */
        .footer__col {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          min-width: 0;
        }

        .footer__brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          color: var(--text-dark);
        }

        .footer__logo {
          height: 52px;
          width: 52px;
          object-fit: contain;
          flex-shrink: 0;
          filter: drop-shadow(0 4px 8px rgba(201, 154, 46, 0.25));
        }

        .footer__brandText {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .footer__brandName {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-dark);
          line-height: 1.2;
        }

        .footer__brandTag {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--saffron);
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }

        .footer__about {
          font-size: 0.88rem;
          line-height: 1.7;
          color: #5a4530;
          margin: 0;
        }

        /* Timings pill */
        .footer__timings {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          align-self: flex-start;
          padding: 0.5rem 0.9rem;
          background: rgba(232, 138, 5, 0.12);
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--saffron);
          margin-top: 0.3rem;
        }

        /* ================= COLUMN HEADINGS ================= */
        .footer__heading {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0 0 0.3rem;
          position: relative;
          padding-bottom: 0.5rem;
          letter-spacing: 0.2px;
        }

        .footer__heading::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 36px;
          height: 2px;
          background: linear-gradient(90deg, var(--saffron), var(--gold));
          border-radius: 2px;
        }

        /* ================= LINK LISTS ================= */
        .footer__list {
          list-style: none;
          margin: 0.4rem 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .footer__link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: #5a4530;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          width: fit-content;
          max-width: 100%;
        }

        .footer__link::before {
          content: "›";
          color: var(--saffron);
          font-size: 1.1rem;
          font-weight: 800;
          line-height: 1;
          transition: transform 0.2s ease;
        }

        .footer__link:hover {
          color: var(--saffron);
          transform: translateX(3px);
        }

        .footer__link:hover::before {
          transform: translateX(2px);
        }

        .footer__serviceItem {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: #5a4530;
        }

        .footer__serviceItem::before {
          content: "◆";
          color: var(--gold);
          font-size: 0.6rem;
          line-height: 1;
        }

        /* ================= COLUMN 4: CONTACT + NEWSLETTER ================= */
        .footer__contactItem {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.86rem;
          color: #5a4530;
          line-height: 1.55;
        }

        .footer__contactIcon {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(232, 138, 5, 0.15);
          border-radius: 50%;
          font-size: 0.8rem;
          color: var(--saffron);
        }

        .footer__contactItem a {
          color: #5a4530;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer__contactItem a:hover {
          color: var(--saffron);
        }

        /* ---------- Newsletter ---------- */
        .footer__newsletter {
          margin-top: 0.4rem;
          padding: 1rem;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .footer__newsletterTitle {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .footer__newsletterText {
          font-size: 0.75rem;
          color: #6b5440;
          margin: 0;
          line-height: 1.55;
        }

        .footer__form {
          display: flex;
          gap: 0.4rem;
          margin-top: 0.2rem;
        }

        .footer__input {
          flex: 1;
          min-width: 0;
          padding: 0.6rem 0.75rem;
          font-size: 0.82rem;
          font-family: inherit;
          color: var(--text-dark);
          background: var(--cream);
          border: 1px solid var(--border);
          border-radius: 8px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .footer__input::placeholder {
          color: #a08d78;
        }

        .footer__input:focus {
          border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(232, 138, 5, 0.15);
        }

        .footer__submit {
          flex-shrink: 0;
          padding: 0.6rem 0.95rem;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 0.82rem;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.25s ease;
        }

        .footer__submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(232, 138, 5, 0.35);
        }

        .footer__success {
          font-size: 0.78rem;
          font-weight: 600;
          color: #1e7c3a;
          background: rgba(30, 124, 58, 0.08);
          border: 1px solid rgba(30, 124, 58, 0.25);
          padding: 0.4rem 0.6rem;
          border-radius: 6px;
          margin-top: 0.15rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ================= SOCIAL ROW ================= */
        .footer__socials {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.9rem;
        }

        .footer__social {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 50%;
          font-size: 1rem;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.25s ease, box-shadow 0.25s ease;
        }

        .footer__social:hover {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(232, 138, 5, 0.35);
        }

        /* ================= BOTTOM BAR ================= */
        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          padding: 1.2rem 0 1.5rem;
          font-size: 0.82rem;
          color: #6b5440;
        }

        .footer__copy {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .footer__copy strong {
          color: var(--text-dark);
          font-weight: 700;
        }

        .footer__legalLinks {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .footer__legalLink {
          color: #6b5440;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer__legalLink:hover {
          color: var(--saffron);
        }

        .footer__dividerDot {
          color: var(--border);
          font-weight: 800;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1024px) {
          .footer__container { padding: 3rem 1rem 0; }
          .footer__grid {
            grid-template-columns: 1.3fr 1fr 1fr;
            gap: 1.8rem;
          }
          /* Newsletter column drops to second row */
          .footer__col--newsletter {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
            gap: 1.6rem 1.4rem;
            padding-bottom: 2rem;
          }

          .footer__col--newsletter {
            grid-column: 1 / -1;
          }

          .footer__heading { font-size: 0.95rem; }
          .footer__link, .footer__serviceItem, .footer__contactItem {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 640px) {
          .footer__container { padding: 2.5rem 0.9rem 0; }
          .footer__grid { gap: 1.5rem 1rem; padding-bottom: 1.8rem; }

          .footer__logo { height: 46px; width: 46px; }
          .footer__brandName { font-size: 1rem; }

          .footer__bottom {
            flex-direction: column;
            text-align: center;
            gap: 0.6rem;
            padding: 1.1rem 0 1.4rem;
          }

          .footer__copy { justify-content: center; }
          .footer__legalLinks { justify-content: center; }
        }

        @media (max-width: 425px) {
          .footer__grid {
            grid-template-columns: 1fr;
            gap: 1.6rem;
          }

          .footer__col--newsletter { grid-column: auto; }

          .footer__logo { height: 42px; width: 42px; }
          .footer__brandName { font-size: 0.95rem; }

          .footer__heading { font-size: 0.92rem; }
          .footer__about { font-size: 0.84rem; }

          .footer__form { flex-direction: column; }
          .footer__submit { width: 100%; padding: 0.65rem 0.95rem; }

          .footer__social { width: 36px; height: 36px; font-size: 0.95rem; }

          .footer__bottom { font-size: 0.76rem; }
        }

        @media (max-width: 375px) {
          .footer__container { padding: 2.1rem 0.75rem 0; }
          .footer__grid { gap: 1.4rem; }

          .footer__logo { height: 38px; width: 38px; }
          .footer__brandName { font-size: 0.88rem; }
          .footer__brandTag { font-size: 0.66rem; }

          .footer__heading { font-size: 0.88rem; }
          .footer__about { font-size: 0.8rem; line-height: 1.65; }
          .footer__link, .footer__serviceItem, .footer__contactItem {
            font-size: 0.8rem;
          }

          .footer__timings { font-size: 0.72rem; padding: 0.4rem 0.7rem; }
          .footer__newsletter { padding: 0.85rem; }

          .footer__social { width: 34px; height: 34px; font-size: 0.9rem; }
        }

        @media (max-width: 340px) {
          .footer__brandName { font-size: 0.82rem; }
          .footer__heading { font-size: 0.82rem; }
          .footer__about { font-size: 0.76rem; }
          .footer__link, .footer__serviceItem, .footer__contactItem {
            font-size: 0.75rem;
          }

          .footer__social { width: 32px; height: 32px; font-size: 0.85rem; }
          .footer__bottom { font-size: 0.7rem; }
        }
      `}</style>

      {/* ================= FOOTER MARKUP ================= */}
      <footer className="footer">
        <div className="footer__container">
          {/* ---------- MAIN GRID ---------- */}
          <div className="footer__grid">
            {/* ---------- COLUMN 1: About ---------- */}
            <div className="footer__col">
              <Link to="/" className="footer__brand">
                <img
                  src={logo}
                  alt={t("brand.full")}
                  className="footer__logo"
                />
                <div className="footer__brandText">
                  <span className="footer__brandName">{t("brand.full")}</span>
                  <span className="footer__brandTag">🪔 Temple</span>
                </div>
              </Link>

              <p className="footer__about">{t("footer.aboutText")}</p>

              <span className="footer__timings">
                🕉️ {t("footer.timings")}
              </span>
            </div>

            {/* ---------- COLUMN 2: Quick Links ---------- */}
            <div className="footer__col">
              <h4 className="footer__heading">
                {t("footer.quickLinksTitle")}
              </h4>
              <ul className="footer__list">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer__link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------- COLUMN 3: Services ---------- */}
            <div className="footer__col">
              <h4 className="footer__heading">
                {t("footer.servicesTitle")}
              </h4>
              <ul className="footer__list">
                {services.map((s, i) => (
                  <li key={i} className="footer__serviceItem">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------- COLUMN 4: Contact + Newsletter ---------- */}
            <div className="footer__col footer__col--newsletter">
              <h4 className="footer__heading">
                {t("footer.contactTitle")}
              </h4>

              <div className="footer__list">
                <div className="footer__contactItem">
                  <span className="footer__contactIcon">📍</span>
                  <span>{t("footer.address")}</span>
                </div>
                <div className="footer__contactItem">
                  <span className="footer__contactIcon">📞</span>
                  <a href={`tel:${t("footer.phone").replace(/\s/g, "")}`}>
                    {t("footer.phone")}
                  </a>
                </div>
                <div className="footer__contactItem">
                  <span className="footer__contactIcon">✉️</span>
                  <a href={`mailto:${t("footer.email")}`}>
                    {t("footer.email")}
                  </a>
                </div>
              </div>

              {/* Social icons */}
              <div className="footer__socials">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    className="footer__social"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="footer__newsletter">
                <p className="footer__newsletterTitle">
                  🪔 {t("footer.newsletterTitle")}
                </p>
                <p className="footer__newsletterText">
                  {t("footer.newsletterText")}
                </p>
                <form className="footer__form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    className="footer__input"
                    placeholder={t("footer.newsletterPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="footer__submit">
                    {t("footer.newsletterBtn")}
                  </button>
                </form>
                {subscribed && (
                  <span className="footer__success">
                    {t("footer.newsletterSuccess")}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ---------- BOTTOM BAR ---------- */}
          <div className="footer__bottom">
            <div className="footer__copy">
              © {new Date().getFullYear()}{" "}
              <strong>{t("brand.full")}</strong>
              <span className="footer__dividerDot">•</span>
              <span>{t("footer.rights")}</span>
            </div>

            <div className="footer__legalLinks">
              <Link to="/privacy" className="footer__legalLink">
                {t("footer.privacy")}
              </Link>
              <span className="footer__dividerDot">•</span>
              <Link to="/terms" className="footer__legalLink">
                {t("footer.terms")}
              </Link>
              <span className="footer__dividerDot">•</span>
              <span>{t("footer.madeWith")}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;