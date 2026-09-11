import "../styles/app.css";
import "../animations/motion.css";
import games from "../../data/games.json";

const state = {
  games,
  selectedGame: null,
  sidebarOpen: true,
  query: ""
};

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="shell">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-top">
        <div class="brand">
          <div class="brand-mark">S</div>
          <div>
            <div class="brand-name">StellerXlets</div>
            <div class="brand-subtitle">Game library</div>
          </div>
        </div>
        <button class="icon-button mobile-toggle" id="closeSidebar" aria-label="Close menu">×</button>
      </div>

      <div class="library-heading">
        <span>Library</span>
        <span class="library-count" id="libraryCount">0</span>
      </div>

      <label class="search-box">
        <span>⌕</span>
        <input id="gameSearch" autocomplete="off" placeholder="Search games..." />
      </label>

      <div class="game-list" id="gameList"></div>

      <div class="sidebar-footer">
        <span class="status-dot"></span>
        <span>Library ready</span>
      </div>
    </aside>

    <main class="content">
      <header class="topbar">
        <button class="icon-button" id="toggleSidebar" aria-label="Toggle menu">☰</button>

        <div class="breadcrumbs">
          <span>StellerXlets</span>
          <span class="crumb-divider">/</span>
          <span id="currentTitle">Library</span>
        </div>

        <div class="top-actions">
          <button class="top-action" id="openNewTab">↗ <span>Open</span></button>
        </div>
      </header>

      <section class="viewer-wrap">
        <div class="welcome" id="welcome">
          <div class="welcome-icon">S</div>
          <h1>Choose something to play</h1>
          <p>Select a game from the library and it will open here.</p>
          <button class="primary-button" id="welcomeMenu">Open library</button>
        </div>

        <div class="viewer hidden" id="viewer">
          <div class="viewer-head">
            <div class="game-meta">
              <div class="game-mini-icon" id="currentIcon">S</div>
              <div>
                <div class="current-game-name" id="viewerTitle">Game</div>
                <div class="current-game-description" id="viewerDescription">Ready</div>
              </div>
            </div>

            <div class="viewer-controls">
              <button class="control-button" id="reloadFrame" title="Reload">↻</button>
              <button class="control-button" id="fullscreenFrame" title="Fullscreen">⛶</button>
              <button class="control-button" id="minimizeFrame" title="Minimize">—</button>
            </div>
          </div>

          <div class="frame-stage" id="frameStage">
            <div class="frame-loading" id="frameLoading">
              <div class="spinner"></div>
              <span>Loading game...</span>
            </div>

            <iframe
              id="gameFrame"
              title="Game"
              allow="fullscreen; autoplay; gamepad"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
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

  if (!q) {
    return state.games;
  }

  return state.games.filter((game) =>
    [game.title, game.description, game.category].some((value) =>
      String(value || "").toLowerCase().includes(q)
    )
  );
}

function gameCard(game) {
  const active = state.selectedGame?.id === game.id ? "is-active" : "";

  return `
    <button class="game-card ${active}" data-game-id="${escapeHtml(game.id)}">
      <span class="game-icon" style="--card-accent:${escapeHtml(game.accent || "#8b5cf6")}">
        ${escapeHtml(game.icon || game.title?.slice(0, 1) || "G")}
      </span>

      <span class="game-card-copy">
        <span class="game-card-title">${escapeHtml(game.title)}</span>
        <span class="game-card-description">
          ${escapeHtml(game.description || "Ready to launch")}
        </span>
      </span>

      <span class="game-card-arrow">›</span>
    </button>
  `;
}

function renderGames() {
  const games = filteredGames();
  els.count.textContent = state.games.length;

  if (!games.length) {
    els.list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⌕</div>
        <strong>No games found</strong>
        <span>Try a different search.</span>
      </div>
    `;
    return;
  }

  const categories = [...new Set(
    games.map((game) => game.category || "Other")
  )];

  els.list.innerHTML = categories.map((category) => {
    const categoryGames = games.filter(
      (game) => (game.category || "Other") === category
    );

    return `
      <div class="category-block">
        <div class="category-label">${escapeHtml(category)}</div>
        ${categoryGames.map(gameCard).join("")}
      </div>
    `;
  }).join("");

  els.list.querySelectorAll("[data-game-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectGame(button.dataset.gameId);
    });
  });
}

function selectGame(id) {
  const game = state.games.find((item) => item.id === id);

  if (!game) {
    return;
  }

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
    if (state.sidebarOpen) {
      closeMobileSidebar();
    } else {
      openSidebar();
    }
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
  if (!state.selectedGame) {
    return;
  }

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

renderGames();
