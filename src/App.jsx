// src/App.jsx — fully responsive book with proper closing covers

import { useState, useRef, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";

import { DEFAULT_PAGES } from "./data/pages.js";
import BookPage from "./components/BookPage.jsx";
import BookIndex from "./components/BookIndex.jsx";
import ReferencePanel from "./components/ReferencePanel.jsx";
import KeyboardNav from "./components/KeyboardNav.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

function useBookDimensions() {
  const [dim, setDim] = useState({ w: 1400, h: 1000, portrait: false });

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const portrait = vw < 768;
      const targetHeight = Math.floor(vh * 0.97);

      if (portrait) {
        // Single-page mode — fill the full horizontal space
        let w = Math.floor(vw);
        let h = Math.floor(w / 0.72);
        if (h > targetHeight) {
          h = targetHeight;
          w = Math.floor(h * 0.90);
        }
        setDim({ w, h, portrait: true });
      } else {
       
        let w = Math.floor(vw / 2);
        let h = Math.floor(w / 0.75);
        if (h > targetHeight) {
          h = targetHeight;
          w = Math.floor(h * 0.98);
        }
        // No artificial minimum that would cause overflow
        w = Math.max(w, 300);
        h = Math.max(h, 400);
        setDim({ w, h, portrait: false });
      }
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return dim;
}

// Front Cover component with image
function FrontCover({ pageW, pageH }) {
  return (
    <div
      style={{
        width: pageW,
        height: pageH,
        backgroundImage: "url('/Images/frontCover.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: "12px 4px 4px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.5), 4px 0 12px rgba(0,0,0,0.3)",
        border: "3px solid rgba(0,0,0)",
      }}
    >
      <div style={{ position: "absolute", inset: 12, borderRadius: "8px", pointerEvents: "none" }} />
    </div>
  );
}

// End Cover component
function EndCover({ pageW, pageH }) {
  return (
    <div
      style={{
        width: pageW,
        height: pageH,
        background: "linear-gradient(225deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        borderRadius: "4px 12px 12px 4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.5), -4px 0 12px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ position: "absolute", inset: 12, borderRadius: "8px", pointerEvents: "none" }} />

      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${10 + Math.random() * 80}%`,
            left: `${10 + Math.random() * 80}%`,
            fontSize: `${16 + Math.random() * 20}px`,
            opacity: 0.3 + Math.random() * 0.5,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            pointerEvents: "none",
          }}
        >
          {["✨", "⭐", "🌟", "💫"][Math.floor(Math.random() * 4)]}
        </div>
      ))}

      <div
        style={{
          width: Math.min(pageW * 0.35, 150),
          height: Math.min(pageW * 0.35, 150),
          background: "url('https://cdn.pixabay.com/photo/2016/01/19/17/07/book-1149369_640.jpg') center/cover",
          borderRadius: "24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 0 4px rgba(255,215,0,0.3)",
          marginBottom: 24,
        }}
      />

      <h1 style={{
        fontFamily: "'Bubblegum Sans', cursive",
        fontSize: `${Math.min(pageW * 0.1, 44)}px`,
        color: "#FFD700",
        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        margin: "10px 0 6px",
        textAlign: "center",
        padding: "0 15px",
      }}>
        The End
      </h1>

      <p style={{
        fontFamily: "'Nunito', sans-serif",
        fontSize: `${Math.min(pageW * 0.04, 18)}px`,
        color: "rgba(255,255,255,0.8)",
        textAlign: "center",
        margin: "6px 0",
        padding: "0 20px",
      }}>
        Thank you for reading!
      </p>

      <p style={{
        fontFamily: "'Nunito', sans-serif",
        fontSize: `${Math.min(pageW * 0.035, 15)}px`,
        color: "rgba(255,255,255,0.65)",
        textAlign: "center",
        margin: 0,
        padding: "0 20px",
      }}>
        May magic stay with you always.
      </p>

      <div style={{
        position: "absolute",
        bottom: 24,
        fontSize: `${Math.min(pageW * 0.08, 32)}px`,
        color: "rgba(255,215,0,0.4)",
      }}>
        🌙✨📖
      </div>
    </div>
  );
}

// Table of Contents Page (First page after cover)
function TableOfContentsPage({ pages, pageW, pageH, onGoToPage }) {
  return (
    <div
      style={{
        width: pageW,
        height: pageH,
        background: "#fffef7",
        borderRadius: "4px",
        padding: "40px 30px",
        overflowY: "auto",
        fontFamily: "'Nunito', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{
        fontSize: `${Math.min(pageW * 0.07, 34)}px`,
        color: "#4c1d95",
        textAlign: "center",
        marginBottom: "30px",
        fontFamily: "'Bubblegum Sans', cursive",
        borderBottom: "3px solid #e0d5f5",
        paddingBottom: "15px",
      }}>
        📚 Table of Contents
      </h2>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        {pages.map((page, idx) => (
          <button
            key={page.id}
            onClick={() => onGoToPage(idx)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px 20px",
              background: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
              border: "none",
              borderRadius: "16px",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              fontFamily: "'Nunito', sans-serif",
              fontSize: `${Math.min(pageW * 0.04, 18)}px`,
              fontWeight: 700,
              color: "#4c1d95",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(10px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(76, 29, 149, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span>{page.title || `Page ${idx + 1}`}</span>
            <span style={{ fontSize: "18px", opacity: 0.7 }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Custom Navigation Button Component
function NavArrow({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "clamp(55px, 7vw, 75px)",
        height: "clamp(55px, 7vw, 75px)",
        borderRadius: "50%",
        background: disabled
          ? "linear-gradient(135deg, #4a4a6a, #3a3a5a)"
          : direction === "left"
            ? "linear-gradient(135deg, #7c3aed, #a855f7)"
            : "linear-gradient(135deg, #06b6d4, #22d3ee)",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "clamp(32px, 5vw, 42px)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.3 : 1,
        boxShadow: disabled
          ? "none"
          : direction === "left"
            ? "0 8px 32px rgba(124, 58, 237, 0.5), 0 0 0 2px rgba(255,255,255,0.2)"
            : "0 8px 32px rgba(6, 182, 212, 0.5), 0 0 0 2px rgba(255,255,255,0.2)",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: "blur(4px)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "scale(1.12)";
          e.currentTarget.style.background = direction === "left"
            ? "linear-gradient(135deg, #8b5cf6, #c084fc)"
            : "linear-gradient(135deg, #22d3ee, #67e8f9)";
          e.currentTarget.style.boxShadow = direction === "left"
            ? "0 12px 40px rgba(124, 58, 237, 0.7), 0 0 0 3px rgba(255,255,255,0.3)"
            : "0 12px 40px rgba(6, 182, 212, 0.7), 0 0 0 3px rgba(255,255,255,0.3)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = direction === "left"
            ? "linear-gradient(135deg, #7c3aed, #a855f7)"
            : "linear-gradient(135deg, #06b6d4, #22d3ee)";
          e.currentTarget.style.boxShadow = direction === "left"
            ? "0 8px 32px rgba(124, 58, 237, 0.5), 0 0 0 2px rgba(255,255,255,0.2)"
            : "0 8px 32px rgba(6, 182, 212, 0.5), 0 0 0 2px rgba(255,255,255,0.2)";
        }
      }}
      title={direction === "left" ? "Previous Page" : "Next Page"}
    >
      {direction === "left" ? "◀" : "▶"}
    </button>
  );
}

export default function App() {
  const [pages, setPages] = useState(DEFAULT_PAGES);
  const [currentPage, setCurrentPage] = useState(0);
  const [showRef, setShowRef] = useState(false);
  const [showIndex, setShowIndex] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookKey, setBookKey] = useState(0);
  const flipRef = useRef(null);
  const { w: pageW, h: pageH, portrait } = useBookDimensions();

  // Book structure: Front Cover -> Table of Contents -> Content Pages -> End Cover
  const bookPages = [
    { id: "front-cover", isCover: true, isFrontCover: true },
    { id: "toc", isTOC: true },
    ...pages.filter(p => !p.isCover),
    { id: "end-cover", isCover: true, isFrontCover: false }
  ];

  const totalPages = bookPages.length;
  const activeItem = bookPages[currentPage];

  // Rebuild the book on every resize so dimensions stay accurate
  useEffect(() => {
    const handleResize = () => setBookKey(prev => prev + 1);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onPage = useCallback((e) => {
    setCurrentPage(e.data);
    setShowRef(false);
  }, []);

  const prevPage = () => {
    if (flipRef.current && currentPage > 0) {
      flipRef.current.pageFlip().flipPrev();
    }
  };

  const nextPage = () => {
    if (flipRef.current && currentPage < totalPages - 1) {
      flipRef.current.pageFlip().flipNext();
    }
  };

  const goToPage = (pageIndex) => {
    const targetPage = pageIndex + 2;
    if (flipRef.current && targetPage >= 0 && targetPage < totalPages) {
      flipRef.current.pageFlip().flip(targetPage);
      setCurrentPage(targetPage);
      setShowIndex(false);
    }
  };

  const getPageDisplayText = () => {
    if (currentPage === 0) return "📖 Front Cover";
    if (currentPage === 1) return "📚 Table of Contents";
    if (currentPage === totalPages - 1) return "📘 Back Cover - Book Closed";
    return `📄 Page ${currentPage - 1} of ${totalPages - 3}`;
  };

  const isSinglePageMode = portrait;

  // In desktop mode: two pages each = vw/2, so together = exactly 100vw
  // In portrait mode: single page = 100vw (or height-constrained)
  const bookSpreadW = isSinglePageMode ? pageW : pageW * 2;

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        background: "linear-gradient(145deg, #0a0a1a 0%, #1a0a3c 40%, #0c1a3c 70%, #060414 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        margin: "0",
        fontFamily: "'Nunito', sans-serif",
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
        width: "100vw",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Nunito:wght@400;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow: hidden; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }

        .flip-book { margin: 0 auto; }
        .flip-book .page {
          border-radius: 4px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        }
      `}</style>

      {/* Background glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: "-20%", left: "-10%",
          width: "60vw", height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-15%", right: "-10%",
          width: "55vw", height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
        }} />
      </div>

      {/* Floating stars */}
      {["⭐", "🌟", "✨", "💫", "🌙", "⭐", "✨", "🌟"].map((star, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            top: `${5 + i * 10}%`,
            left: i % 2 === 0 ? `${2 + i * 5}%` : `${88 - i * 3}%`,
            fontSize: `clamp(10px, ${1 + i * 0.15}vw, 22px)`,
            animation: `twinkle ${2 + i * 0.35}s ease-in-out infinite`,
            animationDelay: `${i * 0.25}s`,
            pointerEvents: "none",
            opacity: 0.35,
          }}
        >
          {star}
        </div>
      ))}

      {/* Book wrapper — spans full viewport width */}
      <div
        style={{
          width: bookSpreadW,
          maxWidth: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 25px rgba(124,58,237,0.25))",
          flexShrink: 0,
        }}
      >
        <HTMLFlipBook
          key={bookKey}
          ref={flipRef}
          width={pageW}
          height={pageH}
          minWidth={pageW}
          maxWidth={pageW}
          minHeight={pageH}
          maxHeight={pageH}
          drawShadow={true}
          flippingTime={600}
          usePortrait={isSinglePageMode}
          startZIndex={10}
          autoSize={false}
          mobileScrollSupport={true}
          showCover={true}
          onFlip={onPage}
          className="flip-book"
          style={{ margin: "0 auto" }}
        >
          {bookPages.map((item, idx) => (
            <div
              key={`${item.id || idx}-${pageW}-${pageH}`}
              style={{
                width: pageW,
                height: pageH,
                background: item.isCover ? "transparent" : "#fffef7",
                borderRadius: "4px",
              }}
            >
              {item.isCover ? (
                item.isFrontCover ? (
                  <FrontCover pageW={pageW} pageH={pageH} />
                ) : (
                  <EndCover pageW={pageW} pageH={pageH} />
                )
              ) : item.isTOC ? (
                <TableOfContentsPage
                  pages={pages}
                  pageW={pageW}
                  pageH={pageH}
                  onGoToPage={goToPage}
                />
              ) : (
                <BookPage
                  page={item}
                  pageNum={idx - 1}
                  total={totalPages - 2}
                  pageW={pageW}
                  pageH={pageH}
                  onShowRef={item.reference ? () => setShowRef(true) : null}
                />
              )}
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Page indicator row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          marginTop: "8px",
        }}
      />

      <KeyboardNav onPrev={prevPage} onNext={nextPage} />

      {/* Modals */}
      {showIndex && (
        <BookIndex
          pages={pages}
          currentPage={currentPage - 2}
          onGoTo={(pageIdx) => goToPage(pageIdx)}
          onClose={() => setShowIndex(false)}
        />
      )}

      {showRef && activeItem && !activeItem.isCover && !activeItem.isTOC && activeItem.reference && (
        <ReferencePanel
          reference={activeItem.reference}
          onClose={() => setShowRef(false)}
        />
      )}

      {showLogin && (
        <LoginScreen
          onLogin={() => {
            setIsLoggedIn(true);
            setShowLogin(false);
            setShowAdmin(true);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showAdmin && (
        <AdminPanel
          pages={pages}
          setPages={setPages}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}