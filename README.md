# TechNova - Responsive Landing Page

A modern, high-performance, and fully responsive enterprise landing page for **TechNova**, a fictional cloud computing and artificial intelligence solutions provider.

Built from scratch using only **semantic HTML5**, **modern CSS3**, and **Vanilla JavaScript (ES6+)** with **zero external frameworks or heavy libraries**.

---

## Project Structure

```text
01_Landing_Page/
|-- index.html        # Complete semantic HTML5 structure & content
|-- style.css         # Modern CSS3 styles, CSS variables, dark/light theme, animations & media queries
|-- script.js         # Vanilla JavaScript for menu toggling, smooth scrolling, form validation, modals & stats
\-- README.md         # Comprehensive documentation & setup guide
```

---

## Key Features

### 1. Navigation & Header
- **Fixed & Blurred Header**: Glassmorphic sticky header with dynamic scroll shadow and backdrop blur (`backdrop-filter: blur(14px)`).
- **Brand Identity**: Modern SVG-powered logo with subtle hover animations.
- **Responsive Navigation**: Desktop inline menu and mobile sliding navigation drawer with an animated 3-bar hamburger icon (`aria-expanded` accessible).
- **Dark / Light Theme Toggle**: Seamless mode switcher with persistent preference stored in `localStorage`.
- **Active Section Highlighting**: Dynamic link indicator updates as you scroll across sections.

### 2. Home / Hero Section
- **Compelling Copy**: Value proposition headline, description, and primary/secondary CTA buttons.
- **Interactive Cluster Preview**: macOS-styled live metrics dashboard showing throughput, AI inference latency, active mesh nodes, and an animated terminal stream.
- **Social Proof / Metrics**: System uptime (99.99%), 250+ enterprise clients, and 15x deployment speed badges.
- **Interactive Demo Trigger**: Button triggering an interactive cloud architecture preview modal.

### 3. About Section
- **Story & Mission**: Background on TechNova's engineering philosophy.
- **Key Checkpoints**: High-reliability scale, enterprise Zero Trust security, and continuous strategic partnership.
- **Core Pillars**: Three interactive cards showcasing Mission, Vision, and Core Values.

### 4. Services Section (6 Tailored Enterprise Offerings)
1. **Cloud Architecture & DevOps** (CI/CD, Kubernetes, multi-cloud)
2. **AI & Machine Learning Systems** (Featured badge, custom LLMs, RAG, predictive analytics)
3. **Cybersecurity & Zero Trust** (SOC2, vulnerability testing, 24/7 SIEM)
4. **Custom Software Engineering** (Reactive frontends, microservices, REST/GraphQL)
5. **Big Data & Real-Time Analytics** (Distributed streaming, Kafka, Snowflake)
6. **Digital Transformation Strategy** (Monolith modernizations, technology roadmaps)
- **Interactive "Learn Details" Modals**: Each service card opens a technical deliverables specification modal and allows one-click service pre-selection in the contact form.

### 5. Why Choose Us Section
- **Competitive Differentiators**: 4 cards highlighting High-Velocity Engineering, 99.8% Client Satisfaction, Certified Senior Specialists, and Ironclad SLAs.
- **Animated Counter Stats**: Numbers count up smoothly from 0 to targets (250+, 99.99%, 18+, 45M+) when scrolled into view using the `IntersectionObserver` API.

### 6. Contact Section with Real-Time Validation
- **Contact Details Card**: Direct email, phone, San Francisco office headquarters, engineering hours, and NDA confidentiality guarantee.
- **Robust Client-Side Validation**:
  - Full Name: Minimum 2 characters.
  - Work Email: Strict regex pattern checking (`user@domain.ext`).
  - Service Dropdown: Enforces selection of interest area.
  - Project Message: Minimum 15 characters, maximum 500 characters with live character counter.
  - Privacy Consent: Custom checkbox validation.
- **Instant Inline Feedback**: Visual red border states and clear error hints when typing or leaving fields.
- **Submission Feedback & Loading State**: Simulated network delay with a spinning loader, followed by a celebratory success banner displaying the user's name, accompanied by a "Send another message" reset action.

### 7. Footer Section
- Brand summary with live system operational status badge.
- Quick navigation links & enterprise solution directories.
- Functional newsletter subscription form with instant feedback.
- Accessible social media links (GitHub, LinkedIn, Twitter/X, Discord) with hover elevations.
- Automated copyright year.

### 8. Accessibility & Usability
- Floating **Back to Top** button with smooth scroll.
- Full keyboard navigation support (e.g. `Escape` key closes all active modals and mobile menus).
- `prefers-reduced-motion` media query support for users who have motion sensitivity.

---

## How to Run the Project in VS Code

### Option 1: Using the VS Code "Live Server" Extension (Recommended)
1. Open **Visual Studio Code**.
2. Go to **File** -> **Open Folder...** and select the folder `d:\Auspify tasks\Responsive landing page\01_Landing_Page` (or open the root folder).
3. If not already installed, install the **Live Server** extension by *Ritwick Dey* from the Extensions tab (`Ctrl+Shift+X`).
4. Right-click on `index.html` in the Explorer pane.
5. Select **"Open with Live Server"** (or click **"Go Live"** in the bottom status bar).
6. Your default web browser will open at `http://127.0.0.1:5500/01_Landing_Page/index.html` with hot-reloading enabled.

### Option 2: Direct Browser Launch (No Extensions Needed)
1. In VS Code, right-click on `index.html`.
2. Select **"Reveal in File Explorer"** (or press `Alt+Shift+R`).
3. Double-click `index.html` to open it in your browser (Chrome, Edge, Firefox, Brave, Safari).
4. All HTML, CSS, and JavaScript functions will run completely offline.

### Option 3: Using VS Code Terminal / Built-in Python or Node Static Server
Open the built-in terminal in VS Code (`Ctrl + ~`) and run either:

**Using Python 3:**
```powershell
cd 01_Landing_Page
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

**Using Node.js (`npx serve`):**
```powershell
npx serve 01_Landing_Page
```

---

## Responsive Breakpoints Tested

- **Desktop (1200px+)**: Multi-column grids, split hero layout, side-by-side contact cards, full desktop navigation.
- **Laptop / Small Desktop (1024px)**: Optimized grid spacing, centered hero visual preview, 2-column footer.
- **Tablet (768px - 1024px)**: 2-column service cards, 2-column counter grid, fluid typography.
- **Mobile Devices (<= 768px)**:
  - Collapsible slide-down navigation menu with hamburger toggle & dark overlay backdrop.
  - Stacked 1-column layouts for hero, about, contact, and footer sections.
  - Full-width mobile CTA buttons and optimized touch targets (min 44px height).
- **Small Mobile Screens (<= 480px)**: Compact padding, fluid text sizing via CSS `clamp()`, vertical counter cards.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) |
| **CSS3** | Modern CSS Variables, Flexbox, CSS Grid, Glassmorphism, Keyframe animations, Media Queries |
| **Vanilla JavaScript** | DOM manipulation, event listeners, form validation regex, IntersectionObserver, LocalStorage |
| **Google Fonts** | `Plus Jakarta Sans` typography with clean geometric readability |
| **Inline SVG Icons** | Ultra-sharp, scalable, zero-HTTP request vector iconography |

---

## License & Notes
- Built for **TechNova Inc.** (Fictional Showcase Project).
- Clean, modular, well-commented code suitable for production templates, portfolio showcases, or student reference.
