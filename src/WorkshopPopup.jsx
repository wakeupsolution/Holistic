import React, { useEffect, useState } from "react";

const WorkshopPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically open popup
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // ESC key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
  

      {/* POPUP MODAL */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[99999] flex items-center
          justify-center bg-black/80 p-3 backdrop-blur-sm
          animate-[fadeIn_0.3s_ease]"
        >
          {/* POPUP CONTENT */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[95vh] w-full max-w-[650px]
            overflow-hidden rounded-2xl bg-white shadow-2xl
            animate-[zoomIn_0.35s_ease]"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close popup"
              className="absolute right-3 top-3 z-20 flex h-10
              w-10 items-center justify-center rounded-full
              bg-black/70 text-2xl text-white shadow-lg
              transition hover:rotate-90 hover:bg-red-600"
            >
              &times;
            </button>

            {/* WORKSHOP POSTER */}
            <div className="max-h-[95vh] overflow-y-auto">
              <img
                src="/popup.png"
                alt="Kavitha Ganeshraja Relationship Workshop"
                className="block h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.90);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </>
  );
};

export default WorkshopPopup;