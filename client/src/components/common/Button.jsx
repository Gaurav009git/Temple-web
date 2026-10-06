import { Link } from "react-router-dom";

/**
 * Button — Universal button component
 *
 * Props:
 *  - children   : node               (button content)
 *  - variant    : "primary" | "secondary" | "ghost" | "dark" | "light"   (default: "primary")
 *  - size       : "sm" | "md" | "lg"  (default: "md")
 *  - to         : string             (renders <Link> if provided)
 *  - href       : string             (renders <a> if provided)
 *  - onClick    : function
 *  - type       : "button" | "submit" (default: "button")
 *  - disabled   : boolean
 *  - loading    : boolean            (shows spinner, disables)
 *  - fullWidth  : boolean            (100% width)
 *  - icon       : node               (emoji or icon on left)
 *  - iconRight  : node               (emoji or icon on right)
 *  - className  : string
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconRight,
  className = "",
  ...rest
}) => {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    loading ? "btn--loading" : "",
    disabled ? "btn--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__text">{children}</span>
      {!loading && iconRight && (
        <span className="btn__icon btn__icon--right">{iconRight}</span>
      )}
    </>
  );

  const isDisabled = disabled || loading;

  const commonProps = {
    className: classes,
    onClick: isDisabled ? undefined : onClick,
    "aria-disabled": isDisabled,
    ...rest,
  };

  return (
    <>
      <style>{`
        .btn {
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;
          --transition: 0.22s ease;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: inherit;
          font-weight: 700;
          text-decoration: none;
          border: 2px solid transparent;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          user-select: none;
          transition:
            transform var(--transition),
            box-shadow var(--transition),
            background var(--transition),
            color var(--transition),
            border-color var(--transition);
        }

        .btn:focus-visible {
          outline: 3px solid rgba(232, 138, 5, 0.35);
          outline-offset: 3px;
        }

        /* ---------- Sizes ---------- */
        .btn--sm {
          padding: 0.55rem 1.05rem;
          font-size: 0.82rem;
        }
        .btn--md {
          padding: 0.8rem 1.55rem;
          font-size: 0.92rem;
        }
        .btn--lg {
          padding: 1rem 2rem;
          font-size: 1rem;
        }

        /* ---------- Full width ---------- */
        .btn--full {
          width: 100%;
          display: flex;
        }

        /* ---------- Variants ---------- */
        .btn--primary {
          background: linear-gradient(135deg, var(--saffron), var(--gold));
          color: #fff;
          border-color: var(--gold);
          box-shadow: 0 8px 20px rgba(232, 138, 5, 0.35);
        }
        .btn--primary:hover:not(.btn--disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(232, 138, 5, 0.5);
        }

        .btn--secondary {
          background: var(--white);
          color: var(--text-dark);
          border-color: var(--border);
          box-shadow: 0 4px 12px rgba(201, 154, 46, 0.12);
        }
        .btn--secondary:hover:not(.btn--disabled) {
          color: var(--saffron);
          border-color: var(--saffron);
          transform: translateY(-2px);
        }

        .btn--ghost {
          background: transparent;
          color: var(--saffron);
          border-color: var(--saffron);
        }
        .btn--ghost:hover:not(.btn--disabled) {
          background: rgba(232, 138, 5, 0.1);
          transform: translateY(-2px);
        }

        .btn--dark {
          background: var(--text-dark);
          color: #FFF8E7;
          border-color: var(--text-dark);
        }
        .btn--dark:hover:not(.btn--disabled) {
          background: var(--saffron);
          border-color: var(--saffron);
          transform: translateY(-2px);
        }

        .btn--light {
          background: rgba(255, 248, 231, 0.15);
          color: #FFF8E7;
          border-color: rgba(255, 248, 231, 0.4);
          backdrop-filter: blur(4px);
        }
        .btn--light:hover:not(.btn--disabled) {
          background: rgba(255, 248, 231, 0.25);
          border-color: #FFD89B;
          transform: translateY(-2px);
        }

        /* ---------- Disabled ---------- */
        .btn--disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        /* ---------- Loading ---------- */
        .btn--loading {
          cursor: progress;
        }
        .btn__spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: btnSpin 0.7s linear infinite;
          flex-shrink: 0;
        }
        .btn--secondary .btn__spinner,
        .btn--ghost .btn__spinner {
          border-color: rgba(232, 138, 5, 0.3);
          border-top-color: var(--saffron);
        }
        @keyframes btnSpin {
          to { transform: rotate(360deg); }
        }

        /* ---------- Icon slots ---------- */
        .btn__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05em;
          line-height: 1;
        }
        .btn__icon--right {
          transition: transform var(--transition);
        }
        .btn:hover:not(.btn--disabled) .btn__icon--right {
          transform: translateX(3px);
        }

        /* ---------- Responsive tweaks ---------- */
        @media (max-width: 425px) {
          .btn--md { padding: 0.7rem 1.25rem; font-size: 0.86rem; }
          .btn--lg { padding: 0.85rem 1.55rem; font-size: 0.92rem; }
        }
        @media (max-width: 340px) {
          .btn--sm { padding: 0.45rem 0.85rem; font-size: 0.75rem; }
          .btn--md { padding: 0.6rem 1.05rem; font-size: 0.8rem; }
          .btn--lg { padding: 0.75rem 1.3rem; font-size: 0.85rem; }
        }
      `}</style>

      {to ? (
        <Link to={to} {...commonProps}>
          {content}
        </Link>
      ) : href ? (
        <a href={href} {...commonProps}>
          {content}
        </a>
      ) : (
        <button
          type={type}
          {...commonProps}
          disabled={isDisabled}
        >
          {content}
        </button>
      )}
    </>
  );
};

export default Button;