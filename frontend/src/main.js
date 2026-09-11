import "../styles/app.css";
import "../animations/motion.css";

const state = {
  games: [],
  selectedGame: null,
  sidebarOpen: true,
  query: ""
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
  layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg>',
  gamepad: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8h10a4 4 0 0 1 3.8 5.3l-1.1 3.2a2.5 2.5 0 0 1-4.5.3l-1-1.8H9.8l-1 1.8a2.5 2.5 0 0 1-4.5-.3l-1.1-3.2A4 4 0 0 1 7 8Z"/><path d="M7 11v4M5 13h4M16 12h.01M19 14h.01"/></svg>'
};

const app = document.querySelector("#app");

app.innerHTML = \`
  <div class="shell">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-glow"></div>

      <div class="sidebar-top">
        <div class="brand">
          <div class="brand-mark"><span class="brand-mark-core">S</span></div>
          <div>
            <div class="brand-name">StellerXlets</div>
            <div class="brand-subtitle">Game launcher</div>
          </div>
        </div>

        <button class="icon-button mobile-toggle" id="closeSidebar" aria-label="Close menu">
          \${icons.close}
        </button>
      </div>

      <div class="library-heading">
        <div class="library-heading-main">
          <span class="library-heading-icon">\${icons.layers}</span>
          <span>Library</span>
        </div>
        <span class="library-count" id="libraryCount">0</span>
      </div>

      <label class="search-box">
        \${icons.search}
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
            \${icons.menu}
          </button>

          <div class="breadcrumbs">
            <span class="crumb-root">StellerXlets</span>
            <span class="crumb-divider">/</span>
            <span id="currentTitle">Library</span>
          </div>
        </div>

        <div class="top-actions">
          <button class="top-action" id="openNewTab">
            \${icons.external}
            <span>Open</span>
          </button>
        </div>
      </header>

      <section class="viewer-wrap">
        <div class="ambient ambient-one"></div>
        <div class="ambient ambient-two"></div>

        <div class="welcome" id="welcome">
          <div class="welcome-orbit">
            <div class="welcome-ring ring-one"></div>
            <div class="welcome-ring ring-two"></div>
            <div class="welcome-icon">\${icons.gamepad}</div>
          </div>

          <div class="welcome-eyebrow">STELLERXLETS</div>
          <h1>Choose something to play</h1>
          <p>Your library lives here. Pick a title and the player takes over.</p>

          <div class="welcome-actions">
            <button class="primary-button" id="welcomeMenu">
              <span>Open library</span>
              \${icons.chevron}
            </button>
          </div>
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
              <button class="control-button" id="reloadFrame" title="Reload">
                \${icons.reload}
              </button>
              <button class="control-button" id="fullscreenFrame" title="Fullscreen">
                \${icons.fullscreen}
              </button>
              <button class="control-button" id="minimizeFrame" title="Minimize">
                \${icons.minimize}
              </button>
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
\`;

const els = {
  sidebar: document.querySelector("#sidebar"),
  list: document.querySelector("#gameList"),
  count: document.querySelector("#libraryCount"),
  search: document.querySelector("#gameSearch"),
  welcome: document.querySelector("#welcome"),
  viewer: document.querySelector("#viewer"),
  frame: document.querySelector("#gameFrame"),
  stage: document.querySelector("#frameStage"),
  loading: document.querySelector("#frameLoading"),
  title: document.querySelector("#viewerTitle"),
  description: document.querySelector("#viewerDescription"),
  currentTitle: document.querySelector("#currentTitle"),
  currentIcon: document.querySelector("#currentIcon"),
  overlay: document.querySelector("#mobileOverlay"),
  openNewTab: document.querySelector("#openNewTab")
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function gameCard(game) {
  const active = state.selectedGame?.id === game.id ? "is-active" : "";
  const initials = String(game.title || "Game").slice(0, 1).toUpperCase();

  return \`
    <button class="game-card \${active}" data-game-id="\${escapeHtml(game.id)}">
      <span class="game-art" style="--card-accent:\${escapeHtml(game.accent || "#8b5cf6")}">
        <span class="game-art-shine"></span>
        <span class="game-art-letter">\${escapeHtml(game.icon || initials)}</span>
      </span>

      <span class="game-card-copy">
        <span class="game-card-title">\${escapeHtml(game.title)}</span>
        <span class="game-card-description">\${escapeHtml(game.description || "Ready to launch")}</span>
      </span>

      <span class="game-card-arrow">\${icons.chevron}</span>
    </button>
  \`;
}

function renderGames() {
  const visible = filteredGames();
  els.count.textContent = state.games.length;

  if (!visible.length) {
    els.list.innerHTML = \`
      <div class="empty-state">
        <div class="empty-icon">\${icons.search}</div>
        <strong>No games found</strong>
        <span>Try a different search.</span>
      </div>
    \`;
    return;
  }

  const categories = [...new Set(
    visible.map((game) => game.category || "Other")
  )];

  els.list.innerHTML = categories.map((category) => {
    const categoryGames = visible.filter(
      (game) => (game.category || "Other") === category
    );

    return \`
      <div class="category-block">
        <div class="category-label">\${escapeHtml(category)}</div>
        \${categoryGames.map(gameCard).join("")}
      </div>
    \`;
  }).join("");

  els.list.querySelectorAll("[data-game-id]").forEach((button) => {
    button.addEventListener("click", () => selectGame(button.dataset.gameId));
  });
}

function selectGame(id) {
  const game = state.games.find((item) => item.id === id);
  if (!game) return;

  state.selectedGame = game;
  els.welcome.classList.add("hidden");
  els.viewer.classList.remove("hidden");

  els.title.textContent = game.title;
  els.description.textContent = game.description || "Ready to play";
  els.currentTitle.textContent = game.title;
  els.currentIcon.textContent = game.icon || game.title.slice(0, 1);
  els.currentIcon.style.background = game.accent || "#8b5cf6";

  els.loading.classList.remove("hidden");
  els.frame.classList.remove("is-loaded");
  els.frame.src = game.url;

  renderGames();
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

document.querySelector("#toggleSidebar").addEventListener("click", toggleSidebar);
document.querySelector("#closeSidebar").addEventListener("click", closeMobileSidebar);
document.querySelector("#welcomeMenu").addEventListener("click", openSidebar);
els.overlay.addEventListener("click", closeMobileSidebar);

els.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderGames();
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
    renderGames();
  })
  .catch((error) => {
    console.error(error);
    els.list.innerHTML = \`
      <div class="empty-state error-state">
        <strong>Game library unavailable</strong>
        <span>Check data/games.json.</span>
      </div>
    \`;
  });
