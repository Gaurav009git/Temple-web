import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

/**
 * Modal — Accessible, animated modal dialog
 *
 * Props:
 *  - isOpen    : boolean               (controls visibility)
 *  - onClose   : function              (called when user closes)
 *  - title     : string                (header title)
 *  - subtitle  : string                (optional subtitle)
 *  - size      : "sm" | "md" | "lg" | "xl"  (default: "md")
 *  - closeOnBackdrop : boolean         (default: true)
 *  - closeOnEsc      : boolean         (default: true)
 *  - showCloseBtn    : boolean         (default: true)
 *  - children  : node                  (modal content)
 *  - footer    : node                  (optional footer)
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  size = "md",
  closeOnBackdrop = true,
  closeOnEsc = true,
  showCloseBtn = true,
  children,
  footer,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const previouslyFocused = useRef(null);

  // Handle ESC + body scroll lock + focus trap
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement;

    const onKey = (e) => {
      if (e.key === "Escape" && closeOnEsc) {
        onClose && onClose();
      }
      // Simple focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    // Auto-focus first focusable inside modal
    setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable && focusable.focus();
      }
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (previouslyFocused.current) {
        previouslyFocused.current.focus?.();
      }
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose && onClose();
    }
  };

  return (
    <>
      <style>{`
        .modal {
          --saffron: #E88A05;
          --gold: #C99A2E;
          --text-dark: #3B2414;
          --border: #E8D7B0;
          --white: #ffffff;
          --cream: #FFFDF7;
          --nav-bg: #FFF8E7;

          position: fixed;
          inset: 0;
          z-index: 2500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
          animation: modalFade 0.22s ease;
        }

        .modal__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(59, 36, 20, 0.55);
          backdrop-filter: blur(6px);
        }

        @keyframes modalFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .modal__dialog {
          position: relative;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow:
            0 30px 70px rgba(59, 36, 20, 0.35),
            0 0 0 1px rgba(232, 138, 5, 0.15);
          animation: modalScale 0.28s cubic-bezier(0.2, 0.9, 0.4, 1.05);
        }

        @keyframes modalScale {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ---------- Sizes ---------- */
        .modal__dialog--sm { max-width: 420px; }
        .modal__dialog--md { max-width: 560px; }
        .modal__dialog--lg { max-width: 760px; }
        .modal__dialog--xl { max-width: 1000px; }

        /* ---------- Header ---------- */
        .modal__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.3rem 1.5rem 1rem;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(180deg, var(--nav-bg) 0%, #FFFDF7 100%);
        }
        .modal__titles {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 0;
        }
        .modal__title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0;
          line-height: 1.3;
        }
        .modal__subtitle {
          font-size: 0.85rem;
          color: #6b5440;
          margin: 0;
          line-height: 1.5;
        }

        .modal__close {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 50%;
          font-size: 1rem;
          color: var(--text-dark);
          cursor: pointer;
          transition:
            background var(--transition, 0.22s ease),
            color 0.22s ease,
            transform 0.2s ease,
            border-color 0.22s ease;
        }
        .modal__close:hover {
          background: #B91C1C;
          color: #fff;
          border-color: transparent;
          transform: rotate(90deg);
        }
        .modal__close:focus-visible {
          outline: 3px solid rgba(232, 138, 5, 0.35);
          outline-offset: 2px;
        }

        /* ---------- Body ---------- */
        .modal__body {
          padding: 1.5rem;
          overflow-y: auto;
          color: var(--text-dark);
          font-size: 0.94rem;
          line-height: 1.75;
          background: var(--white);
        }
        .modal__body::-webkit-scrollbar { width: 8px; }
        .modal__body::-webkit-scrollbar-thumb {
          background: rgba(232, 138, 5, 0.35);
          border-radius: 4px;
        }
        .modal__body::-webkit-scrollbar-track {
          background: var(--nav-bg);
        }

        /* ---------- Footer ---------- */
        .modal__footer {
          padding: 1rem 1.5rem 1.3rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 0.6rem;
          flex-wrap: wrap;
          background: var(--nav-bg);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 640px) {
          .modal { padding: 0.85rem; align-items: flex-end; }
          .modal__dialog {
            border-radius: 18px 18px 0 0;
            max-height: 92vh;
            animation: modalSlide 0.28s ease;
          }
          @keyframes modalSlide {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .modal__header { padding: 1.1rem 1.2rem 0.9rem; }
          .modal__body { padding: 1.2rem; font-size: 0.9rem; }
          .modal__footer {
            padding: 0.9rem 1.2rem 1.1rem;
            flex-direction: column-reverse;
          }
          .modal__footer > * { width: 100%; }
          .modal__title { font-size: 1.08rem; }
        }

        @media (max-width: 375px) {
          .modal__header { padding: 1rem 1rem 0.85rem; }
          .modal__body { padding: 1rem; font-size: 0.86rem; }
          .modal__footer { padding: 0.85rem 1rem 1rem; }
          .modal__close { width: 34px; height: 34px; font-size: 0.9rem; }
          .modal__title { font-size: 1rem; }
        }

        @media (max-width: 340px) {
          .modal__body { padding: 0.9rem; font-size: 0.82rem; }
          .modal__title { font-size: 0.94rem; }
        }
      `}</style>

      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={handleBackdropClick}
      >
        <div className="modal__backdrop" />

        <div
          ref={modalRef}
          className={`modal__dialog modal__dialog--${size}`}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || showCloseBtn) && (
            <div className="modal__header">
              <div className="modal__titles">
                {title && <h2 className="modal__title">{title}</h2>}
                {subtitle && <p className="modal__subtitle">{subtitle}</p>}
              </div>

              {showCloseBtn && (
                <button
                  type="button"
                  className="modal__close"
                  onClick={() => onClose && onClose()}
                  aria-label={t("modal.close", "Close")}
                >
                  ✕
                </button>
              )}
            </div>
          )}

          <div className="modal__body">{children}</div>

          {footer && <div className="modal__footer">{footer}</div>}
        </div>
      </div>
    </>
  );
};

export default Modal;