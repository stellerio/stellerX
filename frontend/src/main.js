import "../styles/app.css";
import "../animations/motion.css";

const state = {
  games: [],
  selectedGame: null,
  sidebarOpen: true,
  query: "",
  view: "home",
  recent: JSON.parse(localStorage.getItem("stellerx-recent") || "[]")
};

const icons = {
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
  external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-9 9"/><path d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/></svg>',
  reload: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 1 0 1 4"/><path d="M20 5v6h-6"/></svg>',
  fullscreen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H4v4M16 4h4v4M20 16v4h-4M4 16v4h4"/></svg>',
  minimize: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 10 8-6 8 6v9H4z"/><path d="M9 19v-5h6v5"/></svg>',
  layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg>',
  gamepad: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8h10a4 4 0 0 1 3.8 5.3l-1.1 3.2a2.5 2.5 0 0 1-4.5.3l-1-1.8H9.8l-1 1.8a2.5 2.5 0 0 1-4.5-.3l-1.1-3.2A4 4 0 0 1 7 8Z"/><path d="M7 11v4M5 13h4M16 12h.01M19 14h.01"/></svg>',
  spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></svg>'
};

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="shell">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-glow"></div>

      <div class="sidebar-top">
        <button class="brand brand-button" id="goHome" aria-label="Go home">
          <div class="brand-mark"><span class="brand-mark-core">S</span></div>
          <span>
            <span class="brand-name">StellerXlets</span>
            <span class="brand-subtitle">Game launcher</span>
          </span>
        </button>

        <button class="icon-button mobile-toggle" id="closeSidebar" aria-label="Close menu">
          ${icons.close}
        </button>
      </div>

      <nav class="main-nav" aria-label="Main navigation">
        <button class="nav-item is-active" id="navHome">
          <span class="nav-item-icon">${icons.home}</span>
          <span>Home</span>
        </button>

        <button class="nav-item" id="navLibrary">
          <span class="nav-item-icon">${icons.layers}</span>
          <span>Library</span>
          <span class="nav-count" id="navCount">0</span>
        </button>
      </nav>

      <div class="library-heading">
        <div class="library-heading-main">
          <span class="library-heading-icon">${icons.layers}</span>
          <span>Games</span>
        </div>
        <span class="library-count" id="libraryCount">0</span>
      </div>

      <label class="search-box">
        ${icons.search}
        <input id="gameSearch" autocomplete="off" placeholder="Search your library..." />
      </label>

      <div class="library-divider"></div>
      <div class="game-list" id="gameList"></div>

      <div class="sidebar-footer">
        <div class="footer-status">
          <span class="status-dot"></span>
          <span>Library online</span>
        </div>
        <span class="footer-version">1.0</span>
      </div>
    </aside>

    <main class="content">
      <header class="topbar">
        <div class="topbar-left">
          <button class="icon-button top-menu-button" id="toggleSidebar" aria-label="Toggle menu">
            ${icons.menu}
          </button>

          <div class="breadcrumbs">
            <span class="crumb-root">StellerXlets</span>
            <span class="crumb-divider">/</span>
            <span id="currentTitle">Home</span>
          </div>
        </div>

        <div class="top-actions">
          <button class="top-action" id="openNewTab">
            ${icons.external}
            <span>Open</span>
          </button>
        </div>
      </header>

      <section class="viewer-wrap">
        <div class="ambient ambient-one"></div>
        <div class="ambient ambient-two"></div>

        <div class="home-screen" id="homeScreen">
          <section class="hero-panel">
            <div class="hero-copy">
              <div class="hero-kicker">
                <span class="kicker-icon">${icons.spark}</span>
                STELLERXLETS
              </div>
              <h1>Everything you play,<br><em>one place.</em></h1>
              <p>Browse your library, jump into a game, and keep the whole experience inside one clean player.</p>

              <div class="hero-actions">
                <button class="primary-button" id="heroBrowse">
                  <span>Browse games</span>
                  ${icons.chevron}
                </button>
                <div class="hero-note">
                  <span class="hero-note-dot"></span>
                  <span>Ready to play</span>
                </div>
              </div>
            </div>

            <div class="hero-visual" aria-hidden="true">
              <div class="hero-grid"></div>
              <div class="hero-orbit orbit-a"></div>
              <div class="hero-orbit orbit-b"></div>
              <div class="hero-console">
                <div class="console-top">
                  <span class="console-dot"></span>
                  <span class="console-dot"></span>
                  <span class="console-dot"></span>
                </div>
                <div class="console-screen">
                  <span class="console-screen-glow"></span>
                  <span class="console-symbol">${icons.gamepad}</span>
                </div>
                <div class="console-foot">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </section>

          <section class="home-section">
            <div class="section-heading">
              <div>
                <div class="section-eyebrow">FEATURED</div>
                <h2>Pick your next game</h2>
              </div>
              <button class="ghost-link" id="homeSeeAll">View library ${icons.chevron}</button>
            </div>

            <div class="featured-grid" id="featuredGrid"></div>
          </section>

          <section class="home-section recent-section" id="recentSection">
            <div class="section-heading compact">
              <div>
                <div class="section-eyebrow">RECENT</div>
                <h2>Jump back in</h2>
              </div>
            </div>
            <div class="recent-grid" id="recentGrid"></div>
          </section>
        </div>

        <div class="library-screen hidden" id="libraryScreen">
          <div class="library-header">
            <div>
              <div class="section-eyebrow">YOUR LIBRARY</div>
              <h1>Games</h1>
              <p id="librarySummary">Choose a title to start playing.</p>
            </div>
            <div class="library-header-badge">
              <span class="status-dot"></span>
              <span><strong id="libraryHeaderCount">0</strong> titles</span>
            </div>
          </div>

          <div class="library-grid" id="libraryGrid"></div>
        </div>

        <div class="viewer hidden" id="viewer">
          <div class="viewer-head">
            <div class="game-meta">
              <div class="game-mini-icon" id="currentIcon">S</div>
              <div class="viewer-title-wrap">
                <div class="current-game-name" id="viewerTitle">Game</div>
                <div class="current-game-description" id="viewerDescription">Ready</div>
              </div>
            </div>
            <div class="viewer-controls">
              <button class="control-button" id="backHome" title="Home">${icons.home}</button>
              <button class="control-button" id="reloadFrame" title="Reload">${icons.reload}</button>
              <button class="control-button" id="fullscreenFrame" title="Fullscreen">${icons.fullscreen}</button>
              <button class="control-button" id="minimizeFrame" title="Minimize">${icons.minimize}</button>
            </div>
          </div>

          <div class="frame-stage" id="frameStage">
            <div class="frame-loading" id="frameLoading">
              <div class="loader-orb"><span></span></div>
              <div class="frame-loading-copy">
                <strong>Opening game</strong>
                <span>Connecting to the selected embed...</span>
              </div>
            </div>

            <iframe
              id="gameFrame"
              title="Game"
              allow="fullscreen; autoplay; gamepad"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>

            <div class="frame-vignette"></div>
          </div>
        </div>
      </section>

      <div class="mobile-overlay" id="mobileOverlay"></div>
    </main>
  </div>
`;

const els = {
  sidebar: document.querySelector("#sidebar"),
  list: document.querySelector("#gameList"),
  count: document.querySelector("#libraryCount"),
  navCount: document.querySelector("#navCount"),
  search: document.querySelector("#gameSearch"),
  home: document.querySelector("#homeScreen"),
  featuredGrid: document.querySelector("#featuredGrid"),
  recentSection: document.querySelector("#recentSection"),
  recentGrid: document.querySelector("#recentGrid"),
  libraryScreen: document.querySelector("#libraryScreen"),
  libraryGrid: document.querySelector("#libraryGrid"),
  librarySummary: document.querySelector("#librarySummary"),
  libraryHeaderCount: document.querySelector("#libraryHeaderCount"),
  viewer: document.querySelector("#viewer"),
  frame: document.querySelector("#gameFrame"),
  stage: document.querySelector("#frameStage"),
  loading: document.querySelector("#frameLoading"),
  title: document.querySelector("#viewerTitle"),
  description: document.querySelector("#viewerDescription"),
  currentTitle: document.querySelector("#currentTitle"),
  currentIcon: document.querySelector("#currentIcon"),
  overlay: document.querySelector("#mobileOverlay"),
  openNewTab: document.querySelector("#openNewTab"),
  navHome: document.querySelector("#navHome"),
  navLibrary: document.querySelector("#navLibrary")
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function artMarkup(game, large = false) {
  const type = game.art || "blocks";
  const sizeClass = large ? "game-art-large" : "";

  const shapes = {
    blocks: `
      <div class="art-block block-a">2</div>
      <div class="art-block block-b">0</div>
      <div class="art-block block-c">4</div>
      <div class="art-block block-d">8</div>
    `,
    maze: `
      <div class="art-maze"><span></span><span></span><span></span><span></span></div>
      <div class="art-pac"></div>
    `,
    pong: `
      <div class="art-paddle left"></div>
      <div class="art-paddle right"></div>
      <div class="art-ball"></div>
    `,
    snake: `
      <div class="art-snake"><span></span><span></span><span></span><span></span><i></i></div>
      <div class="art-food"></div>
    `
  };

  return `
    <span class="game-art ${sizeClass}" style="--card-accent:${escapeHtml(game.accent || "#8b5cf6")}">
      <span class="game-art-noise"></span>
      ${shapes[type] || shapes.blocks}
    </span>
  `;
}

function gameCard(game, mode = "sidebar") {
  if (mode === "featured") {
    return `
      <button class="featured-card" data-game-id="${escapeHtml(game.id)}" style="--featured-accent:${escapeHtml(game.accent || "#8b5cf6")}">
        ${artMarkup(game, true)}
        <span class="featured-overlay"></span>
        <span class="featured-copy">
          <span class="featured-tag">${escapeHtml(game.category || "Game")}</span>
          <strong>${escapeHtml(game.title)}</strong>
          <span>${escapeHtml(game.description || "Ready to launch")}</span>
        </span>
        <span class="featured-arrow">${icons.chevron}</span>
      </button>
    `;
  }

  if (mode === "library") {
    return `
      <button class="library-card" data-game-id="${escapeHtml(game.id)}" style="--featured-accent:${escapeHtml(game.accent || "#8b5cf6")}">
        ${artMarkup(game, true)}
        <span class="library-card-body">
          <span class="library-card-topline">
            <span class="featured-tag">${escapeHtml(game.category || "Game")}</span>
            <span class="library-card-arrow">${icons.chevron}</span>
          </span>
          <strong>${escapeHtml(game.title)}</strong>
          <span>${escapeHtml(game.description || "Ready to launch")}</span>
        </span>
      </button>
    `;
  }

  return `
    <button class="game-card ${state.selectedGame?.id === game.id ? "is-active" : ""}" data-game-id="${escapeHtml(game.id)}">
      ${artMarkup(game)}
      <span class="game-card-copy">
        <span class="game-card-title">${escapeHtml(game.title)}</span>
        <span class="game-card-description">${escapeHtml(game.description || "Ready to launch")}</span>
      </span>
      <span class="game-card-arrow">${icons.chevron}</span>
    </button>
  `;
}

function filteredGames() {
  const q = state.query.trim().toLowerCase();
  if (!q) return state.games;

  return state.games.filter((game) =>
    [game.title, game.description, game.category].some((value) =>
      String(value || "").toLowerCase().includes(q)
    )
  );
}

function bindGameButtons(root) {
  root.querySelectorAll("[data-game-id]").forEach((button) => {
    button.addEventListener("click", () => selectGame(button.dataset.gameId));
  });
}

function renderSidebarGames() {
  const visible = filteredGames();
  els.count.textContent = state.games.length;
  els.navCount.textContent = state.games.length;

  if (!visible.length) {
    els.list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${icons.search}</div>
        <strong>No games found</strong>
        <span>Try a different search.</span>
      </div>
    `;
    return;
  }

  const categories = [...new Set(visible.map((game) => game.category || "Other"))];

  els.list.innerHTML = categories.map((category) => `
    <div class="category-block">
      <div class="category-label">${escapeHtml(category)}</div>
      ${visible.filter((game) => (game.category || "Other") === category).map(gameCard).join("")}
    </div>
  `).join("");

  bindGameButtons(els.list);
}

function renderHome() {
  const featured = state.games.slice(0, 3);
  els.featuredGrid.innerHTML = featured.length
    ? featured.map((game) => gameCard(game, "featured")).join("")
    : '<div class="empty-state"><strong>Your library is empty</strong><span>Add games to data/games.json.</span></div>';
  bindGameButtons(els.featuredGrid);

  const recentGames = state.recent
    .map((id) => state.games.find((game) => game.id === id))
    .filter(Boolean)
    .slice(0, 3);

  els.recentGrid.innerHTML = recentGames.length
    ? recentGames.map((game) => gameCard(game, "sidebar")).join("")
    : '<div class="recent-placeholder"><span class="placeholder-icon">${icons.gamepad}</span><div><strong>No recent games yet</strong><span>Pick a title and it will appear here.</span></div></div>';
  bindGameButtons(els.recentGrid);

  els.recentSection.classList.toggle("hidden", !recentGames.length);
}

function renderLibrary() {
  const visible = filteredGames();
  els.libraryHeaderCount.textContent = visible.length;
  els.librarySummary.textContent = state.query
    ? `Showing results for “${state.query}”.`
    : "Choose a title to start playing.";

  els.libraryGrid.innerHTML = visible.length
    ? visible.map((game) => gameCard(game, "library")).join("")
    : '<div class="empty-state library-empty"><strong>No games found</strong><span>Try another search.</span></div>';

  bindGameButtons(els.libraryGrid);
}

function setView(view) {
  state.view = view;

  els.home.classList.toggle("hidden", view !== "home");
  els.libraryScreen.classList.toggle("hidden", view !== "library");
  els.viewer.classList.toggle("hidden", view !== "game");

  els.navHome.classList.toggle("is-active", view === "home");
  els.navLibrary.classList.toggle("is-active", view === "library");

  els.currentTitle.textContent =
    view === "home" ? "Home" :
    view === "library" ? "Library" :
    state.selectedGame?.title || "Game";

  if (view === "home") renderHome();
  if (view === "library") renderLibrary();

  if (view !== "game") {
    els.openNewTab.classList.add("is-disabled");
  } else {
    els.openNewTab.classList.remove("is-disabled");
  }
}

function updateRecent(game) {
  state.recent = [game.id, ...state.recent.filter((id) => id !== game.id)].slice(0, 6);
  localStorage.setItem("stellerx-recent", JSON.stringify(state.recent));
}

function selectGame(id) {
  const game = state.games.find((item) => item.id === id);
  if (!game) return;

  state.selectedGame = game;
  updateRecent(game);

  els.title.textContent = game.title;
  els.description.textContent = game.description || "Ready to play";
  els.currentTitle.textContent = game.title;
  els.currentIcon.textContent = "";
  els.currentIcon.innerHTML = artMarkup(game);
  els.currentIcon.className = "game-mini-icon game-mini-art";
  els.currentIcon.style.setProperty("--card-accent", game.accent || "#8b5cf6");

  els.loading.classList.remove("hidden");
  els.frame.classList.remove("is-loaded");
  els.frame.src = game.url;

  setView("game");
  renderSidebarGames();
  closeMobileSidebar();
}

function openSidebar() {
  state.sidebarOpen = true;

  if (window.innerWidth <= 900) {
    els.sidebar.classList.add("is-open");
    els.overlay.classList.add("is-visible");
  } else {
    els.sidebar.classList.remove("is-collapsed");
  }
}

function closeMobileSidebar() {
  if (window.innerWidth <= 900) {
    state.sidebarOpen = false;
    els.sidebar.classList.remove("is-open");
    els.overlay.classList.remove("is-visible");
  }
}

function toggleSidebar() {
  if (window.innerWidth <= 900) {
    if (state.sidebarOpen) closeMobileSidebar();
    else openSidebar();
    return;
  }

  state.sidebarOpen = !state.sidebarOpen;
  els.sidebar.classList.toggle("is-collapsed", !state.sidebarOpen);
}

function home() {
  state.selectedGame = null;
  setView("home");
}

document.querySelector("#toggleSidebar").addEventListener("click", toggleSidebar);
document.querySelector("#closeSidebar").addEventListener("click", closeMobileSidebar);
document.querySelector("#goHome").addEventListener("click", home);
document.querySelector("#navHome").addEventListener("click", home);
document.querySelector("#navLibrary").addEventListener("click", () => {
  openSidebar();
  setView("library");
});
document.querySelector("#heroBrowse").addEventListener("click", () => {
  openSidebar();
  setView("library");
});
document.querySelector("#homeSeeAll").addEventListener("click", () => {
  openSidebar();
  setView("library");
});
document.querySelector("#backHome").addEventListener("click", home);

els.overlay.addEventListener("click", closeMobileSidebar);

els.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderSidebarGames();

  if (state.view === "library") renderLibrary();
});

els.frame.addEventListener("load", () => {
  els.loading.classList.add("hidden");
  els.frame.classList.add("is-loaded");
});

document.querySelector("#reloadFrame").addEventListener("click", () => {
  if (!state.selectedGame) return;
  els.loading.classList.remove("hidden");
  els.frame.classList.remove("is-loaded");
  els.frame.src = state.selectedGame.url;
});

document.querySelector("#fullscreenFrame").addEventListener("click", async () => {
  try {
    await els.stage.requestFullscreen();
  } catch (error) {
    console.error(error);
  }
});

document.querySelector("#minimizeFrame").addEventListener("click", () => {
  els.viewer.classList.toggle("viewer-minimized");
});

els.openNewTab.addEventListener("click", () => {
  if (state.selectedGame?.url) {
    window.open(state.selectedGame.url, "_blank", "noopener,noreferrer");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    els.overlay.classList.remove("is-visible");
    els.sidebar.classList.remove("is-open");
  }
});

fetch("../data/games.json")
  .then((response) => {
    if (!response.ok) throw new Error("Failed to load game library");
    return response.json();
  })
  .then((games) => {
    state.games = Array.isArray(games) ? games : [];
    renderSidebarGames();
    renderHome();
  })
  .catch((error) => {
    console.error(error);
    els.list.innerHTML = `
      <div class="empty-state error-state">
        <strong>Game library unavailable</strong>
        <span>Check data/games.json.</span>
      </div>
    `;
  });
