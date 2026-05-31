# 📚 Cosmic Book Reader

A beautiful React-based book reader with **3D page-flip animation** and a full **Admin Panel** to edit your book live.

---

## ✨ Features

### Reader
- 🌌 Animated star-field background
- 📖 3D page-flip with gold particle burst on every turn
- ↔ Click page edges or press **arrow keys** to navigate
- 🎨 Five distinct text styles per page
- 🖼 Per-page image support with captions
- 💾 All changes saved to `localStorage` automatically

### Admin Panel  
- 📝 Add / Edit / Delete / Reorder pages
- 🖊 Fields: Chapter label, Title, Content, Pull Quote
- 🎨 5 text style presets (Normal / Elegant / Bold / Spaced / Condensed)
- 🖼 Image upload per page (PNG, JPG, WebP, max 2 MB)
- 📷 Image caption
- 📋 Book metadata: Title, Subtitle, Author, Cover colour
- 🔄 Reset to demo content

---

## 🚀 Quick Start

```bash
# 1 — Install dependencies
npm install

# 2 — Start dev server
npm start

# 3 — Open in browser
http://localhost:3000        ← Reader
http://localhost:3000/admin  ← Admin Panel
```

---

## 📁 Project Structure

```
src/
├── App.jsx                 # Router (Reader / Admin)
├── index.js                # Entry point
├── styles/
│   └── global.css          # CSS variables + resets
├── context/
│   └── BookContext.jsx      # Global book state + localStorage
├── components/
│   ├── Book.jsx             # Book + flip animation + controls
│   ├── PageContent.jsx      # Single page renderer
│   ├── CoverPage.jsx        # Animated cover
│   └── StarField.jsx        # Background star animation
└── pages/
    ├── ReaderPage.jsx       # "/" route
    └── AdminPage.jsx        # "/admin" route
```

---

## 🎨 Text Styles

| Style | Font | Effect |
|-------|------|--------|
| Normal | Cormorant Garamond Light | Clean literary default |
| Elegant | IM Fell English Italic | Antique manuscript feel |
| Bold | Cinzel Semibold | Strong, ceremonial |
| Spaced | Cormorant Garamond Wide | Airy, spaced-out |
| Condensed | Cormorant Garamond Tight | Dense, efficient |

---

## 🛠 Customisation Tips

- **Add more text styles**: extend `TEXT_STYLES` and `STYLE_CSS` in `AdminPage.jsx` and `styleMap` in `PageContent.jsx`
- **Change fonts**: edit the `<link>` in `public/index.html`
- **Persistent storage**: swap `localStorage` in `BookContext.jsx` for a backend API call

---

## 📦 Dependencies

- `react` 18 + `react-dom`
- `react-router-dom` 6
- Google Fonts (Cinzel, Cormorant Garamond, IM Fell English, JetBrains Mono)

No other runtime dependencies — animations are pure CSS.
