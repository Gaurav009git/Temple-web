import { useTranslation } from "react-i18next";

/**
 * Loader — Animated loading spinner
 *
 * Props:
 *  - variant   : "spinner" | "dots" | "pulse"   (default: "spinner")
 *  - size      : "sm" | "md" | "lg"             (default: "md")
 *  - text      : string                          (optional message)
 *  - fullscreen: boolean                         (covers entire viewport)
 *  - inline    : boolean                         (fits inside buttons/cards)
 */
const Loader = ({
  variant = "spinner",
  size = "md",
  text,
  fullscreen = false,
  inline = false,
}) => {
  const { t } = useTranslation();

  const displayText = text !== undefined ? text : t("loader.loading", "Loading...");

  const classes = [
    "loader",
    `loader--${variant}`,
    `loader--${size}`,
    fullscreen ? "loader--fullscreen" : "",
    inline ? "loader--inline" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <style>{`
        .loader {
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.9rem;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
          color: var(--text-dark);
        }

        .loader--inline {
          flex-direction: row;
          gap: 0.6rem;
        }

        .loader--fullscreen {
          position: fixed;
          inset: 0;
          z-index: 3000;
          background: rgba(255, 253, 247, 0.92);
          backdrop-filter: blur(6px);
        }

        /* ---------- Sizes ---------- */
        .loader--sm { --loader-size: 26px; }
        .loader--md { --loader-size: 44px; }
        .loader--lg { --loader-size: 68px; }

        /* ---------- SPINNER ---------- */
        .loader--spinner .loader__shape {
          width: var(--loader-size);
          height: var(--loader-size);
          border: 4px solid rgba(232, 138, 5, 0.2);
          border-top-color: var(--saffron);
          border-right-color: var(--gold);
          border-radius: 50%;
          animation: loaderSpin 0.9s linear infinite;
          filter: drop-shadow(0 4px 10px rgba(232, 138, 5, 0.2));
        }

        @keyframes loaderSpin {
          to { transform: rotate(360deg); }
        }

        /* ---------- DOTS ---------- */
        .loader--dots .loader__shape {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .loader--dots .loader__dot {
          width: calc(var(--loader-size) / 3);
          height: calc(var(--loader-size) / 3);
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(232, 138, 5, 0.35);
          animation: loaderBounce 0.9s ease-in-out infinite;
        }
        .loader--dots .loader__dot:nth-child(2) { animation-delay: 0.15s; }
        .loader--dots .loader__dot:nth-child(3) { animation-delay: 0.3s; }

        @keyframes loaderBounce {
          0%, 80%, 100% { transform: translateY(0) scale(0.9); opacity: 0.7; }
          40%           { transform: translateY(-10px) scale(1); opacity: 1; }
        }

        /* ---------- PULSE ---------- */
        .loader--pulse .loader__shape {
          position: relative;
          width: var(--loader-size);
          height: var(--loader-size);
        }
        .loader--pulse .loader__shape::before,
        .loader--pulse .loader__shape::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          border-radius: 50%;
          animation: loaderPulse 1.4s ease-in-out infinite;
        }
        .loader--pulse .loader__shape::after {
          animation-delay: 0.7s;
        }

        @keyframes loaderPulse {
          0%   { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(1); opacity: 0; }
        }

        /* ---------- Text ---------- */
        .loader__text {
          font-size: 0.9rem;
          font-weight: 600;
          color: #6b5440;
          letter-spacing: 0.3px;
          text-align: center;
          animation: loaderFade 1.6s ease-in-out infinite;
        }
        .loader--sm .loader__text { font-size: 0.78rem; }
        .loader--lg .loader__text { font-size: 1rem; }

        @keyframes loaderFade {
          0%, 100% { opacity: 0.75; }
          50%      { opacity: 1; }
        }

        @media (max-width: 425px) {
          .loader--md { --loader-size: 38px; }
          .loader--lg { --loader-size: 56px; }
          .loader__text { font-size: 0.82rem; }
        }
        @media (max-width: 340px) {
          .loader--md { --loader-size: 32px; }
          .loader--lg { --loader-size: 46px; }
          .loader__text { font-size: 0.75rem; }
        }
      `}</style>

      <div className={classes} role="status" aria-live="polite">
        <div className="loader__shape" aria-hidden="true">
          {variant === "dots" && (
            <>
              <span className="loader__dot" />
              <span className="loader__dot" />
              <span className="loader__dot" />
            </>
          )}
        </div>

        {displayText && (
          <p className="loader__text">
            🪔 {displayText}
          </p>
        )}
      </div>
    </>
  );
};

export default Loader;