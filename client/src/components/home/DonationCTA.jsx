import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DonationCTA = () => {
  const { t } = useTranslation();

  const amounts = [
    { value: t("donationCTA.amount1"), label: t("donationCTA.amount1Label"), icon: "🪔" },
    { value: t("donationCTA.amount2"), label: t("donationCTA.amount2Label"), icon: "🍛" },
    { value: t("donationCTA.amount3"), label: t("donationCTA.amount3Label"), icon: "🎉" },
    { value: t("donationCTA.amount4"), label: t("donationCTA.amount4Label"), icon: "❤️" },
  ];

  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        .donation {
          --nav-bg: #FFF8E7;
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;
          --cream: #FFFDF7;

          width: 100%;
          padding: 4rem 1rem;
          background: var(--cream);
          position: relative;
          overflow: hidden;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
        }

        .donation *,
        .donation *::before,
        .donation *::after { box-sizing: border-box; }

        /* ---------- Container ---------- */
        .donation__container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ---------- Main Card ---------- */
        .donation__card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(135deg, #3B2414 0%, #6B3D1B 55%, #8B4E1F 100%);
          padding: 3.2rem 2.5rem;
          box-shadow: 0 24px 60px rgba(59, 36, 20, 0.28);
          isolation: isolate;
        }

        /* Decorative glows */
        .donation__card::before {
          content: "";
          position: absolute;
          top: -120px;
          right: -120px;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(232, 138, 5, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: -1;
        }

        .donation__card::after {
          content: "";
          position: absolute;
          bottom: -140px;
          left: -140px;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(201, 154, 46, 0.28) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: -1;
        }

        /* Floating diya */
        .donation__diya {
          position: absolute;
          top: 1.2rem;
          right: 1.6rem;
          font-size: 1.8rem;
          filter: drop-shadow(0 0 12px rgba(232, 138, 5, 0.8));
          animation: flicker 2.4s ease-in-out infinite;
          z-index: 2;
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.75; transform: scale(1.1); }
        }

        /* ---------- Grid Layout ---------- */
        .donation__grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 3rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* ---------- LEFT: Text ---------- */
        .donation__content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 0;
        }

        .donation__badge {
          display: inline-block;
          align-self: flex-start;
          padding: 0.45rem 1rem;
          background: rgba(255, 248, 231, 0.12);
          border: 1px solid rgba(232, 138, 5, 0.5);
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #FFD89B;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          backdrop-filter: blur(4px);
        }

        .donation__title {
          font-size: 2.3rem;
          line-height: 1.15;
          font-weight: 800;
          color: #FFF8E7;
          letter-spacing: -0.4px;
          margin: 0;
        }

        .donation__titleHighlight {
          background: linear-gradient(90deg, #FFB347, #FFD89B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .donation__subtitle {
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(255, 248, 231, 0.85);
          margin: 0;
          max-width: 520px;
        }

        /* ---------- Buttons ---------- */
        .donation__buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          margin-top: 0.6rem;
        }

        .donation__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 1.7rem;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 999px;
          text-decoration: none;
          cursor: pointer;
          border: 2px solid transparent;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
        }

        .donation__btn--primary {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          box-shadow: 0 8px 22px rgba(232, 138, 5, 0.5);
        }

        .donation__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(232, 138, 5, 0.6);
        }

        .donation__btn--ghost {
          background: transparent;
          color: #FFF8E7;
          border-color: rgba(255, 248, 231, 0.35);
        }

        .donation__btn--ghost:hover {
          background: rgba(255, 248, 231, 0.1);
          border-color: #FFD89B;
          transform: translateY(-2px);
        }

        .donation__btnArrow {
          transition: transform 0.25s ease;
        }

        .donation__btn:hover .donation__btnArrow {
          transform: translateX(4px);
        }

        /* Blessing text */
        .donation__blessing {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.9rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 248, 231, 0.08);
          border-left: 3px solid var(--saffron);
          border-radius: 8px;
          font-size: 0.88rem;
          color: #FFE7BE;
          font-weight: 500;
          line-height: 1.5;
        }

        /* ---------- RIGHT: Amount Cards ---------- */
        .donation__panel {
          background: rgba(255, 248, 231, 0.06);
          border: 1px solid rgba(255, 248, 231, 0.15);
          border-radius: 20px;
          padding: 1.6rem;
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .donation__panelTitle {
          font-size: 0.8rem;
          font-weight: 700;
          color: #FFD89B;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-align: center;
          margin: 0 0 0.2rem;
        }

        .donation__amounts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .donation__amount {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 1rem 0.5rem;
          background: rgba(255, 248, 231, 0.08);
          border: 1.5px solid rgba(255, 248, 231, 0.2);
          border-radius: 14px;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
        }

        .donation__amount:hover {
          background: rgba(232, 138, 5, 0.22);
          border-color: var(--saffron);
          transform: translateY(-3px);
          box-shadow: 0 12px 26px rgba(232, 138, 5, 0.35);
        }

        .donation__amountIcon {
          font-size: 1.35rem;
          filter: drop-shadow(0 0 6px rgba(255, 216, 155, 0.5));
        }

        .donation__amountValue {
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFF8E7;
          letter-spacing: 0.2px;
        }

        .donation__amountLabel {
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(255, 248, 231, 0.7);
          letter-spacing: 0.3px;
          text-align: center;
          text-transform: uppercase;
        }

        /* ---------- Trust note ---------- */
        .donation__trust {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-top: 0.3rem;
          text-align: center;
          color: rgba(255, 248, 231, 0.7);
          font-size: 0.78rem;
        }

        .donation__trustLine {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          font-weight: 600;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1024px) {
          .donation { padding: 3.2rem 1rem; }
          .donation__card { padding: 2.6rem 2rem; }
          .donation__grid { gap: 2rem; }
          .donation__title { font-size: 2rem; }
          .donation__subtitle { font-size: 0.95rem; }
        }

        @media (max-width: 860px) {
          .donation__card { padding: 2.4rem 1.6rem; border-radius: 20px; }

          .donation__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .donation__content { align-items: center; text-align: center; }
          .donation__badge { align-self: center; }
          .donation__subtitle { text-align: center; }
          .donation__buttons { justify-content: center; }
          .donation__blessing { justify-content: center; text-align: left; max-width: 520px; }

          .donation__panel {
            max-width: 520px;
            width: 100%;
            margin: 0 auto;
          }
        }

        @media (max-width: 640px) {
          .donation { padding: 2.4rem 0.9rem; }
          .donation__card { padding: 2rem 1.2rem; border-radius: 18px; }

          .donation__title { font-size: 1.7rem; }
          .donation__subtitle { font-size: 0.92rem; line-height: 1.65; }

          .donation__btn {
            padding: 0.8rem 1.4rem;
            font-size: 0.9rem;
          }

          .donation__panel { padding: 1.3rem; border-radius: 16px; }
          .donation__amounts { gap: 0.6rem; }
          .donation__amount { padding: 0.9rem 0.4rem; border-radius: 12px; }
          .donation__amountValue { font-size: 0.95rem; }
          .donation__amountLabel { font-size: 0.65rem; }
          .donation__amountIcon { font-size: 1.2rem; }

          .donation__blessing { font-size: 0.82rem; padding: 0.65rem 0.85rem; }
          .donation__trust { font-size: 0.72rem; }
          .donation__diya { font-size: 1.5rem; top: 0.9rem; right: 1rem; }
        }

        @media (max-width: 425px) {
          .donation__title { font-size: 1.5rem; }
          .donation__subtitle { font-size: 0.86rem; }

          .donation__btn {
            flex: 1 1 auto;
            min-width: 130px;
            padding: 0.75rem 1.1rem;
            font-size: 0.85rem;
          }

          .donation__amounts { grid-template-columns: 1fr 1fr; }
          .donation__amountValue { font-size: 0.9rem; }
          .donation__amountLabel { font-size: 0.62rem; }
        }

        @media (max-width: 375px) {
          .donation { padding: 2rem 0.75rem; }
          .donation__card { padding: 1.7rem 1rem; }

          .donation__title { font-size: 1.3rem; }
          .donation__subtitle { font-size: 0.8rem; }

          .donation__badge { font-size: 0.72rem; padding: 0.35rem 0.75rem; }

          .donation__btn {
            padding: 0.65rem 0.95rem;
            font-size: 0.8rem;
            min-width: 115px;
          }

          .donation__panel { padding: 1.1rem; }
          .donation__panelTitle { font-size: 0.72rem; }
          .donation__amount { padding: 0.75rem 0.35rem; }
          .donation__amountValue { font-size: 0.85rem; }
          .donation__amountLabel { font-size: 0.58rem; }
          .donation__amountIcon { font-size: 1.05rem; }

          .donation__blessing { font-size: 0.76rem; padding: 0.55rem 0.7rem; }
          .donation__trust { font-size: 0.68rem; }
        }

        @media (max-width: 340px) {
          .donation__title { font-size: 1.15rem; }
          .donation__subtitle { font-size: 0.75rem; }

          .donation__btn {
            padding: 0.6rem 0.85rem;
            font-size: 0.75rem;
            min-width: 100px;
          }

          .donation__amountValue { font-size: 0.78rem; }
          .donation__amountLabel { font-size: 0.55rem; }
        }
      `}</style>

      {/* ================= DONATION MARKUP ================= */}
      <section className="donation">
        <div className="donation__container">
          <div className="donation__card">
            <span className="donation__diya" aria-hidden="true">🪔</span>

            <div className="donation__grid">
              {/* ---------- LEFT: Text ---------- */}
              <div className="donation__content">
                <span className="donation__badge">
                  {t("donationCTA.badge")}
                </span>

                <h2 className="donation__title">
                  {t("donationCTA.title")}{" "}
                  <span className="donation__titleHighlight">🙏</span>
                </h2>

                <p className="donation__subtitle">
                  {t("donationCTA.subtitle")}
                </p>

                <div className="donation__buttons">
                  <Link to="/donate" className="donation__btn donation__btn--primary">
                    {t("donationCTA.donateBtn")}
                    <span className="donation__btnArrow">→</span>
                  </Link>
                  <Link to="/about" className="donation__btn donation__btn--ghost">
                    {t("donationCTA.learnBtn")}
                  </Link>
                </div>

                <div className="donation__blessing">
                  {t("donationCTA.blessingText")}
                </div>
              </div>

              {/* ---------- RIGHT: Amount Panel ---------- */}
              <div className="donation__panel">
                <p className="donation__panelTitle">
                  {t("donationCTA.trustLine")}
                </p>

                <div className="donation__amounts">
                  {amounts.map((amt, i) => (
                    <Link
                      key={i}
                      to="/donate"
                      className="donation__amount"
                    >
                      <span className="donation__amountIcon" aria-hidden="true">
                        {amt.icon}
                      </span>
                      <span className="donation__amountValue">{amt.value}</span>
                      <span className="donation__amountLabel">{amt.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="donation__trust">
                  <span className="donation__trustLine">
                    {t("donationCTA.secureNote")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DonationCTA;