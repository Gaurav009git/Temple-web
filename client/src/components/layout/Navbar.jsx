import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const languages = [
    { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
    { code: "mr", label: "मराठी", short: "MR", flag: "🇮🇳" },
    { code: "hi", label: "हिंदी", short: "HI", flag: "🇮🇳" },
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(false);
        setLangOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.events"), path: "/events" },
    { name: t("nav.pooja"), path: "/pooja" },
    { name: t("nav.gallery"), path: "/gallery" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        /* ---------- CSS Variables ---------- */
        .navbar {
          --nav-bg: #FFF8E7;
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;
          --shadow: 0 2px 8px rgba(201, 154, 46, 0.12);
          --shadow-lg: 0 10px 30px rgba(59, 36, 20, 0.15);
          --radius: 8px;
          --transition: 0.25s ease;

          width: 100%;
          background: var(--nav-bg);
          border-bottom: 2px solid var(--border);
          box-shadow: var(--shadow);
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
        }

        .navbar *,
        .navbar *::before,
        .navbar *::after {
          box-sizing: border-box;
        }

        /* ================= CONTAINER ================= */
        .navbar__container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0.55rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          position: relative;
          min-height: 64px;
        }

        /* ================= BRAND ================= */
        .navbar__brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--text-dark);
          flex-shrink: 1;
          min-width: 0;
          transition: opacity var(--transition);
        }
        .navbar__brand:hover { opacity: 0.85; }

        .navbar__logo {
          height: 44px;
          width: 44px;
          object-fit: contain;
          display: block;
          flex-shrink: 0;
        }

        .navbar__title {
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.2px;
          white-space: nowrap;
          color: var(--text-dark);
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 260px;
          min-width: 0;
        }

        .navbar__title--mobile { display: none; }

        /* ================= RIGHT GROUP ================= */
        .navbar__right {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
        }

        /* ================= NAV LINKS ================= */
        .navbar__nav {
          display: flex;
          align-items: center;
          margin-left: auto;
        }

        .navbar__list {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar__link {
          display: inline-block;
          padding: 0.5rem 0.7rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-dark);
          text-decoration: none;
          border-radius: 6px;
          position: relative;
          white-space: nowrap;
          transition: color var(--transition), background var(--transition);
        }

        .navbar__link:hover {
          color: var(--saffron);
          background: rgba(232, 138, 5, 0.08);
        }

        .navbar__link--active {
          color: var(--saffron);
          font-weight: 600;
        }

        .navbar__link--active::after {
          content: "";
          position: absolute;
          left: 0.7rem;
          right: 0.7rem;
          bottom: 0.25rem;
          height: 2px;
          background: var(--gold);
          border-radius: 2px;
        }

        /* ================= DONATE BUTTON ================= */
        .navbar__donate {
          display: inline-block;
          margin-left: 0.4rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 999px;
          white-space: nowrap;
          border: 1px solid var(--gold);
          transition: transform var(--transition), box-shadow var(--transition);
        }

        .navbar__donate:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(201, 154, 46, 0.45);
        }

        .navbar__donate--active {
          box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--saffron);
        }

        /* ================= LANGUAGE SWITCHER ================= */
        .lang { position: relative; flex-shrink: 0; }

        .lang__button {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.7rem;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-dark);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: border-color var(--transition), background var(--transition);
        }

        .lang__button:hover {
          border-color: var(--saffron);
          background: rgba(232, 138, 5, 0.05);
        }

        .lang__flag { font-size: 0.95rem; line-height: 1; }
        .lang__label { display: inline; }
        .lang__short { display: none; }

        .lang__arrow {
          font-size: 0.6rem;
          color: var(--saffron);
          transition: transform var(--transition);
        }
        .lang__arrow--open { transform: rotate(180deg); }

        .lang__menu {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          min-width: 150px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-lg);
          padding: 0.3rem;
          list-style: none;
          margin: 0;
          z-index: 1001;
          animation: fadeIn 0.15s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .lang__item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.5rem 0.7rem;
          background: none;
          border: none;
          text-align: left;
          font-size: 0.88rem;
          color: var(--text-dark);
          cursor: pointer;
          border-radius: 6px;
          font-weight: 500;
          transition: background var(--transition);
        }

        .lang__item:hover { background: rgba(232, 138, 5, 0.1); }

        .lang__item--active {
          background: rgba(201, 154, 46, 0.18);
          color: var(--saffron);
          font-weight: 700;
        }

        /* ================= HAMBURGER ================= */
        .navbar__toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 6px;
          transition: background var(--transition);
        }
        .navbar__toggle:hover { background: rgba(232, 138, 5, 0.08); }

        .navbar__hamburger,
        .navbar__hamburger::before,
        .navbar__hamburger::after {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-dark);
          border-radius: 2px;
          transition: transform var(--transition), opacity var(--transition);
        }

        .navbar__hamburger { position: relative; }

        .navbar__hamburger::before,
        .navbar__hamburger::after {
          content: "";
          position: absolute;
          left: 0;
        }
        .navbar__hamburger::before { top: -7px; }
        .navbar__hamburger::after  { top: 7px;  }

        .navbar__hamburger.open { background: transparent; }
        .navbar__hamburger.open::before {
          transform: rotate(45deg);
          top: 0;
        }
        .navbar__hamburger.open::after {
          transform: rotate(-45deg);
          top: 0;
        }

        /* ================= MOBILE OVERLAY ================= */
        .navbar__overlay {
          position: fixed;
          inset: 0;
          background: rgba(59, 36, 20, 0.35);
          opacity: 0;
          visibility: hidden;
          transition: opacity var(--transition), visibility var(--transition);
          z-index: 998;
        }

        .navbar__overlay--open {
          opacity: 1;
          visibility: visible;
        }

        /* ============================================================
           RESPONSIVE BREAKPOINTS
           ============================================================ */

        @media (min-width: 1280px) {
          .navbar__container { padding: 0.6rem 1.5rem; }
          .navbar__logo      { height: 48px; width: 48px; }
          .navbar__title     { font-size: 1.15rem; max-width: 320px; }
          .navbar__link      { font-size: 0.95rem; padding: 0.55rem 0.85rem; }
          .navbar__donate    { font-size: 0.92rem; padding: 0.55rem 1.1rem; }
        }

        @media (min-width: 1025px) and (max-width: 1279px) {
          .navbar__container { padding: 0.55rem 1.2rem; }
          .navbar__title     { font-size: 1.05rem; max-width: 220px; }
          .navbar__link      { font-size: 0.88rem; padding: 0.5rem 0.65rem; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .navbar__container { padding: 0.5rem 1rem; gap: 0.5rem; }
          .navbar__logo      { height: 40px; width: 40px; }
          .navbar__title     { font-size: 0.98rem; max-width: 180px; }
          .navbar__link      { font-size: 0.82rem; padding: 0.45rem 0.55rem; }
          .navbar__link--active::after { left: 0.55rem; right: 0.55rem; }
          .navbar__donate    { font-size: 0.8rem; padding: 0.45rem 0.85rem; }
          .lang__button      { font-size: 0.8rem; padding: 0.4rem 0.6rem; }
        }

        @media (max-width: 768px) {
          .navbar__container { padding: 0.5rem 0.9rem; min-height: 60px; }
          .navbar__logo      { height: 38px; width: 38px; }

          .navbar__title--desktop { display: none; }
          .navbar__title--mobile  {
            display: inline;
            font-size: 1rem;
            max-width: 190px;
          }

          .navbar__toggle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .navbar__nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            width: 100%;
            background: var(--nav-bg);
            border-bottom: 2px solid var(--border);
            flex-direction: column;
            align-items: stretch;
            padding: 0 1rem;
            max-height: 0;
            overflow: hidden;
            box-shadow: 0 12px 24px rgba(59, 36, 20, 0.12);
            transition: max-height 0.35s ease, padding 0.3s ease;
            z-index: 999;
          }

          .navbar__nav--open {
            max-height: 85vh;
            padding: 0.75rem 1rem 1rem;
            overflow-y: auto;
          }

          .navbar__list {
            flex-direction: column;
            align-items: stretch;
            gap: 0.15rem;
            width: 100%;
          }

          .navbar__list > li { width: 100%; }

          .navbar__link {
            display: block;
            padding: 0.85rem 0.9rem;
            font-size: 0.95rem;
            border-radius: 8px;
            width: 100%;
          }

          .navbar__link--active {
            background: rgba(232, 138, 5, 0.12);
          }
          .navbar__link--active::after { display: none; }

          .navbar__donate {
            display: block;
            margin: 0.6rem 0 0.2rem;
            text-align: center;
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
            width: 100%;
          }
        }

        @media (max-width: 425px) {
          .navbar__container { padding: 0.45rem 0.75rem; min-height: 58px; }
          .navbar__logo      { height: 36px; width: 36px; }
          .navbar__title--mobile { font-size: 0.95rem; max-width: 170px; }

          .lang__button { padding: 0.4rem 0.55rem; font-size: 0.78rem; gap: 0.25rem; }
          .lang__flag   { font-size: 0.85rem; }

          .navbar__link { padding: 0.8rem 0.8rem; font-size: 0.92rem; }

          .lang__menu { right: 0; min-width: 130px; }
        }

        @media (max-width: 375px) {
          .navbar__container { padding: 0.4rem 0.65rem; gap: 0.4rem; }
          .navbar__logo      { height: 34px; width: 34px; }

          .navbar__title--mobile {
            font-size: 0.88rem;
            max-width: 130px;
          }

          .lang__label { display: none; }
          .lang__short { display: inline; font-size: 0.75rem; }
          .lang__button { padding: 0.35rem 0.5rem; gap: 0.2rem; }
          .lang__flag   { font-size: 0.8rem; }

          .navbar__link { padding: 0.75rem 0.7rem; font-size: 0.9rem; }

          .lang__menu { min-width: 120px; padding: 0.25rem; }
          .lang__item { font-size: 0.82rem; padding: 0.45rem 0.6rem; }
        }

        @media (max-width: 340px) {
          .navbar__container { padding: 0.35rem 0.55rem; gap: 0.3rem; }
          .navbar__logo      { height: 30px; width: 30px; }

          .navbar__title--mobile {
            font-size: 0.8rem;
            max-width: 105px;
          }

          .lang__button { padding: 0.3rem 0.45rem; }
          .lang__flag   { font-size: 0.75rem; }
          .lang__short  { font-size: 0.7rem; }

          .navbar__toggle { padding: 0.4rem; }
          .navbar__hamburger,
          .navbar__hamburger::before,
          .navbar__hamburger::after { width: 20px; }
        }
      `}</style>

      {/* ================= NAVBAR MARKUP ================= */}
      <header className="navbar">
        <div className="navbar__container">
          {/* ---------- LEFT: Logo + Temple Name ---------- */}
          <Link to="/" className="navbar__brand" onClick={closeMenu}>
            <img
              src={logo}
              alt="Sankashta Mata Mandir Logo"
              className="navbar__logo"
            />
            <span className="navbar__title navbar__title--desktop">
              {t("brand.full")}
            </span>
            <span className="navbar__title navbar__title--mobile">
              {t("brand.short")}
            </span>
          </Link>

          <div className="navbar__right">
            {/* ---------- Language Switcher ---------- */}
            <div className="lang" ref={langRef}>
              <button
                className="lang__button"
                onClick={() => setLangOpen((p) => !p)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label="Change language"
              >
                <span className="lang__flag">{currentLang.flag}</span>
                <span className="lang__label">{currentLang.label}</span>
                <span className="lang__short">{currentLang.short}</span>
                <span
                  className={`lang__arrow ${
                    langOpen ? "lang__arrow--open" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {langOpen && (
                <ul className="lang__menu" role="listbox">
                  {languages.map((lng) => (
                    <li key={lng.code}>
                      <button
                        className={`lang__item ${
                          i18n.language === lng.code
                            ? "lang__item--active"
                            : ""
                        }`}
                        onClick={() => changeLanguage(lng.code)}
                        role="option"
                        aria-selected={i18n.language === lng.code}
                      >
                        <span className="lang__flag">{lng.flag}</span>
                        <span>{lng.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ---------- Mobile Hamburger ---------- */}
            <button
              className="navbar__toggle"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              <span
                className={`navbar__hamburger ${isOpen ? "open" : ""}`}
              />
            </button>
          </div>

          {/* ---------- RIGHT: Nav Links ---------- */}
          <nav className={`navbar__nav ${isOpen ? "navbar__nav--open" : ""}`}>
            <ul className="navbar__list">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `navbar__link ${
                        isActive ? "navbar__link--active" : ""
                      }`
                    }
                    onClick={closeMenu}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              <li>
                <NavLink
                  to="/donate"
                  className={({ isActive }) =>
                    `navbar__donate ${
                      isActive ? "navbar__donate--active" : ""
                    }`
                  }
                  onClick={closeMenu}
                >
                  {t("nav.donate")}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* ---------- Mobile Overlay ---------- */}
        <div
          className={`navbar__overlay ${
            isOpen ? "navbar__overlay--open" : ""
          }`}
          onClick={closeMenu}
        />
      </header>
    </>
  );
};

export default Navbar;