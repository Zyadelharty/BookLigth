export default function BookPage({ page, pageNum, total, onShowRef, pageW, pageH }) {
  const isCover = page.type === "cover";
  const isEnd   = page.type === "end";

  const scale = Math.min(pageW / 380, pageH / 500, 1.6);
  const em = (base) => Math.round(base * scale);

  const s = page.style || {};

  // ─── fonts & alignment ────────────────────────────────────────────────────
  const fontFamily      = s.fontFamily      || "'Bubblegum Sans', cursive";
  const titleFontFamily = s.titleFontFamily || fontFamily;
  const textFontFamily  = s.textFontFamily  || fontFamily;
  const titleAlign      = s.titleAlign  || "center";
  const textAlign       = s.textAlign   || "center";
  const titleWeight     = s.titleWeight !== undefined ? s.titleWeight : 800;
  const titleItalic     = s.titleItalic || false;

  // ─── spacing ──────────────────────────────────────────────────────────────
  const gap      = s.gap !== undefined ? s.gap : 12;
  const [pV, pH] = s.padding || [24, 20];

  // ─── image ────────────────────────────────────────────────────────────────
  const imageW       = s.imageW;
  const imageH       = s.imageH;
  const imageFit     = s.imageFit;
  const imagePos     = s.imagePosition;
  const imageRepeat  = s.imageRepeat;
  const imageRadius  = s.imageRadius;
  const imageBorder  = s.imageBorder;
  const imageShadow  = s.imageShadow || "0 4px 12px rgba(0,0,0,0.15)";
  const imageMaxW    = s.imageMaxW;

  // ─── text card ────────────────────────────────────────────────────────────
  const cardBg     = s.cardBg     || "rgba(255,255,255,0.28)";
  const cardRadius  = s.cardRadius !== undefined ? s.cardRadius : 18;
  const cardBorder  = s.cardBorder || "none";
  const [cV, cH]    = s.cardPadding || [14, 18];

  // ─── facts panel container ────────────────────────────────────────────────
  const factsBg     = s.factsBg     || "rgba(255,255,255,0.25)";
  const factsRadius = s.factsRadius !== undefined ? s.factsRadius : 14;
  const factsBorder = s.factsBorder || "none";

  // ─── facts TEXT styling (new) ─────────────────────────────────────────────
  const factsFontFamily  = s.factsFontFamily  || textFontFamily;
  const factsFontSize    = s.factsFontSize    !== undefined ? s.factsFontSize    : 12;
  const factsColor       = s.factsColor       || page.textColor || "#333";
  const factsFontWeight  = s.factsFontWeight  !== undefined ? s.factsFontWeight  : 400;
  const factsFontStyle   = s.factsFontStyle   || "normal";
  const factsLineHeight  = s.factsLineHeight  !== undefined ? s.factsLineHeight  : 1.55;
  const factsTextAlign   = s.factsTextAlign   || "left";

  // ─── facts AUTHOR styling (new) ───────────────────────────────────────────
  const factsAuthorFontFamily = s.factsAuthorFontFamily || titleFontFamily;
  const factsAuthorFontSize   = s.factsAuthorFontSize   !== undefined ? s.factsAuthorFontSize   : 12;
  const factsAuthorColor      = s.factsAuthorColor      || factsColor;
  const factsAuthorFontWeight = s.factsAuthorFontWeight !== undefined ? s.factsAuthorFontWeight : 700;
  const factsAuthorFontStyle  = s.factsAuthorFontStyle  || "italic";
  const factsAuthorAlign      = s.factsAuthorAlign      || factsTextAlign;

  // ─── page chrome ──────────────────────────────────────────────────────────
  const pageBorder     = s.pageBorder     || "none";
  const overlayCircles = s.overlayCircles !== false;

  // ─── content order ────────────────────────────────────────────────────────
  const defaultOrder = ["image", "title", "subtitle", "text", "facts", "emoji", "Caption"];
  const contentOrder  = s.contentOrder || defaultOrder;

  // ─── block renderers ──────────────────────────────────────────────────────
  const blocks = {
      caption: page.reference?.caption && (
    <div>{page.reference.caption}</div> 
  ),

    // IMAGE (or emoji fallback)
    image: page.image ? (
      <img
        key="image"
        src={page.image}
        alt={page.title}
        style={{
          width: imageW,
          height: imageH,
          maxWidth: imageMaxW,
          objectFit: imageFit,
          objectPosition: imagePos,
          borderRadius: em(imageRadius),
          border: imageBorder,
          filter: imageShadow
            ? imageShadow.split(",").map(sh => `drop-shadow(${sh.trim()})`).join(" ")
            : "none",
          flexShrink: 0,
          display: "block",
          
        }}
      />
    ) : (
      <div
        key="image"
        style={{
          fontSize: em(isCover || isEnd ? 88 : 68),
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {page.emoji || "📖"}
      </div>
    ),

    // TITLE
    title: (
      <div
        key="title"
        style={{
          fontFamily: titleFontFamily,
          fontSize: em(page.titleSize || (isCover || isEnd ? page.fontSize || 32 : 24)),
          fontWeight: titleWeight,
          fontStyle: titleItalic ? "italic" : "normal",
          textAlign: titleAlign,
          lineHeight: 1.2,
          textShadow: "0 2px 10px rgba(180, 19, 19, 0.18)",
          letterSpacing: isCover ? "0.04em" : "0.01em",
          width: "100%",
          flexShrink: 0,
        }}
      >
        {page.title}
      </div>
    ),

    // SUBTITLE
    subtitle: page.subtitle ? (
      <div
        key="subtitle"
        style={{
          fontFamily,
          fontSize: em(17),
          opacity: 0.92,
          textAlign: titleAlign,
          fontStyle: "italic",
          width: "100%",
          flexShrink: 0,
        }}
      >
        {page.subtitle}
      </div>
    ) : null,

    // BODY TEXT CARD
    text: page.text ? (
      <div
        key="text"
        style={{
          fontFamily: textFontFamily,
          fontSize: em(page.fontSize || 17),
          textAlign,
          lineHeight: 1.7,
          maxWidth: em(320),
          width: "100%",
          background: cardBg,
          borderRadius: em(cardRadius),
          border: cardBorder,
          padding: `${em(cV)}px ${em(cH)}px`,
          backdropFilter: "blur(4px)",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        {page.text}
      </div>
    ) : null,

    // FACTS PANEL  ← updated with full styling + author
    facts: page.reference?.facts?.length >= 0 ? (
      <div
        key="facts"
        style={{
          background: factsBg,
          borderRadius: em(factsRadius),
          border: factsBorder,
          padding: `${em(8)}px ${em(10)}px`,
          width: "98%",
          maxWidth: "98%",
          backdropFilter: "blur(4px)",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        {/* Fact items */}
        <ul
          style={{
            margin: 0,
            paddingLeft: em(18),
            listStyle: "disc",
          }}
        >
          {page.reference.facts.map((fact, i) => (
            <li
              key={i}
              style={{
                fontFamily: factsFontFamily,
                fontSize: em(factsFontSize),
                color: factsColor,
                fontWeight: factsFontWeight,
                fontStyle: factsFontStyle,
                lineHeight: factsLineHeight,
                textAlign: factsTextAlign,
                marginBottom: em(4),
              }}
            >
              {fact}
            </li>
          ))}
        </ul>

        {/* Author / attribution label */}
        {page.reference.author && (
          <div
            style={{
              fontFamily: factsAuthorFontFamily,
              fontSize: em(factsAuthorFontSize),
              color: factsAuthorColor,
              fontWeight: factsAuthorFontWeight,
              fontStyle: factsAuthorFontStyle,
              textAlign: factsAuthorAlign,
              marginTop: em(6),
              paddingTop: em(4),
              borderTop: `1px solid ${factsAuthorColor}33`,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {page.reference.author}
          </div>
        )}
      </div>
    ) : null,

    // EMOJI
    emoji: page.emoji ? (
      <div
        key="emoji"
        style={{ fontSize: em(40), flexShrink: 0 }}
      >
        {page.emoji}
      </div>
    ) : null,
  };

  // ─── render ───────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: page.bg || "#fff",
        color: page.textColor || "#333",
        border: pageBorder,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: em(gap),
        padding: `${em(pV)}px ${em(pH)}px`,
        boxSizing: "border-box",
        fontFamily,
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Decorative corner circles */}
      {overlayCircles && (
        <>
          <div
            style={{
              position: "absolute",
              top: em(-45),
              left: em(-45),
              width: em(140),
              height: em(140),
              borderRadius: "50%",
              background: "rgba(255,255,255,0.13)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: em(-30),
              right: em(-30),
              width: em(100),
              height: em(100),
              borderRadius: "50%",
              background: "rgba(255,255,255,0.10)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* Ordered content blocks */}
      {contentOrder.map((token) => blocks[token] ?? null)}

      {/* Page number */}
      {!isCover && (
        <div
          style={{
            position: "absolute",
            bottom: em(8),
            fontSize: em(11),
            opacity: 0.5,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          {pageNum} / {total - 1}
        </div>
      )}
    </div>
  );
}