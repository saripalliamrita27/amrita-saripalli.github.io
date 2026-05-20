# Amrita Saripalli — UX Portfolio

Personal portfolio website built for deployment on GitHub Pages.

---

## 🚀 Deploying to GitHub Pages (Step-by-Step)

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click the **+** icon → **New repository**
3. Name it exactly: `amrita-saripalli.github.io`
   - _(Replace `amrita-saripalli` with your actual GitHub username)_
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload Your Files

**Option A: Upload via browser (easiest)**
1. In your new repo, click **Add file → Upload files**
2. Drag and drop the entire `amrita-portfolio` folder contents:
   - `index.html`
   - `README.md`
   - `images/` folder (with all subfolders)
3. Click **Commit changes**

**Option B: Use Git (recommended for future updates)**
```bash
git clone https://github.com/YOUR_USERNAME/amrita-saripalli.github.io
cd amrita-saripalli.github.io
# Copy all portfolio files here
git add .
git commit -m "Initial portfolio launch"
git push origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings** tab
2. Scroll down to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Set Branch to **main** and folder to **/ (root)**
5. Click **Save**

### Step 4 — Your Site is Live! 🎉

After 1–2 minutes, your portfolio will be live at:
```
https://YOUR_USERNAME.github.io
```

---

## 📁 File Structure

```
amrita-portfolio/
├── index.html              ← Main portfolio file
├── README.md               ← This file
└── images/
    ├── allied/             ← Allied Solutions project images
    │   ├── hifi-1.jpg
    │   ├── hifi-2.jpg
    │   └── ...
    ├── innovatemap/        ← Innovatemap / Backstroke images
    │   ├── research-1.jpg
    │   ├── sketch-1.jpg
    │   └── ...
    └── museum/             ← Children's Museum images
        ├── hifi-1.jpg
        ├── midfi-1.jpg
        └── ...
```

---

## ✏️ Customizing Your Portfolio

### Update contact links
In `index.html`, find the `#contact` section and update:
- Email: `saripall@purdue.edu` → your email
- LinkedIn URL → your LinkedIn profile URL
- GitHub URL → your GitHub profile URL

### Add/change images
Replace any `.jpg` file in the `images/` folders with your own — just keep the same filename, or update the `src` attribute in the HTML.

### Update the About section
Search for `<!-- ═══════════════════════ ABOUT ═══════════════════════ -->` and edit the text content.

---

## 🎨 Design System

| Token | Value | Use |
|-------|-------|-----|
| `--crimson` | `#c0392b` | Primary accent |
| `--blood` | `#8b1a1a` | Deep accent |
| `--gold` | `#c9a84c` | Logo & highlights |
| `--canvas` | `#e8ddd0` | Primary text |
| `--ash` | `#8a7a6e` | Secondary text |
| `--ink` | `#0a0806` | Page background |

**Fonts:** Cinzel (display) · Crimson Pro (body) · Share Tech Mono (labels)

---

Built with ❤️ · Amrita Saripalli · Purdue UXD
