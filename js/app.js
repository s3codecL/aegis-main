// =============================================
// OSINT Dashboard - Main Application Logic
// =============================================

const App = {
  // Configuration
  config: {
    storageVersion: "v1",
    currentLanguage: localStorage.getItem("osintLanguage") || "es",
    currentTheme: localStorage.getItem("osintTheme") || "dark",
  },

  // Data storage
  state: {
    tools: [],
    favorites: JSON.parse(localStorage.getItem("osintFavorites")) || [],
    searchHistory: JSON.parse(localStorage.getItem("osintHistory")) || [],
    searches: JSON.parse(localStorage.getItem("osintSearches")) || 0,
  },

  // Initialize the application
  init: function () {
    this.loadTools();
    this.loadCustomTools(); // Load custom tools
    this.validateFavorites(); // Sincronizar favoritos
    this.setupEventListeners();
    this.setupTheme();
    this.setupLanguage();
    // Show all tools on initial load
    this.renderTools();
    this.updateStats();
  },

  // Load tools from embedded data
  loadTools: function () {
    this.state.tools = toolsData; // From tools-config.js
  },

  // Validate and clean favorites (remove IDs that don't exist in tools)
  validateFavorites: function () {
    const validToolIds = this.state.tools.map((t) => t.id);
    this.state.favorites = this.state.favorites.filter((fav) =>
      validToolIds.includes(fav)
    );
    localStorage.setItem(
      "osintFavorites",
      JSON.stringify(this.state.favorites)
    );
  },

  // Setup all event listeners
  setupEventListeners: function () {
    // Search form
    document
      .querySelector(".search-form")
      ?.addEventListener("submit", (e) => this.handleSearch(e));

    // Filter input
    document.getElementById("filter-input")?.addEventListener("input", (e) =>
      this.filterTools(e.target.value)
    );

    // Theme toggle
    document.getElementById("theme-toggle")?.addEventListener("click", () =>
      this.toggleTheme()
    );

    // Language toggle
    document.getElementById("language-toggle")?.addEventListener("click", () =>
      this.toggleLanguage()
    );

    // View tabs
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.switchView(e.target));
    });

    // Setup categories
    this.setupCategories();

    // Setup scroll handlers (back-to-top button and sticky behaviors)
    this.setupScrollHandlers();
  },

  // Setup scroll handlers: show/hide back-to-top button
  setupScrollHandlers: function () {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const onScroll = () => {
      try {
        const y = window.scrollY || window.pageYOffset;
        if (y > 300) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.scrollToTop();
    });
  },

  // Smooth scroll to top
  scrollToTop: function () {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      // fallback
      window.scrollTo(0, 0);
    }
  },

  // Setup categories dropdown and sidebar
  setupCategories: function () {
    const lang = this.config.currentLanguage;
    
    // Get unique categories
    const allCategories = [...new Set(this.state.tools.map((t) => t.category))];
    const categories = allCategories.sort();

    // Fill dropdown menu
    const dropdown = document.getElementById("categories-dropdown");
    if (dropdown) {
      let html = `<a class="dropdown-item" onclick="App.filterByCategory(null)">${t("ALL_CATEGORIES", lang)}</a>`;
      categories.forEach((cat) => {
        html += `<a class="dropdown-item" onclick="App.filterByCategory('${cat}')">${t(cat, lang) || cat}</a>`;
      });
      dropdown.innerHTML = html;
    }

    // Fill sidebar categories
    const sidebar = document.getElementById("categories-sidebar");
    if (sidebar) {
      let html = `<a class="category-item active" onclick="App.filterByCategory(null)">${t("ALL", lang)}</a>`;
      categories.forEach((cat) => {
        const count = this.state.tools.filter((t) => t.category === cat).length;
        html += `<a class="category-item" onclick="App.filterByCategory('${cat}')">${t(cat, lang) || cat} <span class="category-count">${count}</span></a>`;
      });
      sidebar.innerHTML = html;
    }
  },

  // Filter tools by category
  filterByCategory: function (category) {
    // Update active state
    document.querySelectorAll(".category-item").forEach((item) => {
      item.classList.remove("active");
    });
    
    if (category === null) {
      document.querySelector(".category-item")?.classList.add("active");
      this.renderTools();
    } else {
      event.target.classList.add("active");
      const filtered = this.state.tools.filter((t) => t.category === category);
      this.renderTools(filtered);
    }
  },

  // Handle search form submission
  handleSearch: function (e) {
    e.preventDefault();
    const query = document.getElementById("search-input")?.value.trim();

    if (!query) {
      this.showError(t("NO_SEARCH_TERM", this.config.currentLanguage));
      return;
    }

    // Add to history
    this.addToHistory(query);

    // Process search with tools
    this.processSearch(query);

    // Show results view
    this.switchView(document.querySelector('[data-view="results"]'));
  },

  // Process search and generate results
  processSearch: function (query) {
    const resultsContainer = document.getElementById("results-container");

    // Detect query type
    const queryType = this.detectQueryType(query);

    // Get relevant tools
    const relevantTools = this.state.tools.filter((tool) =>
      this.isToolRelevant(tool, queryType)
    );

    // Generate result links
    const detectedTypeLabel = translations[this.config.currentLanguage]?.DETECTED_TYPE || 'Tipo detectado:';
    const queryTypeUpper = queryType.toUpperCase();
    const typeTranslation = translations[this.config.currentLanguage]?.[queryTypeUpper] || queryType;
    
    let resultsHTML = `<div class="search-results">
      <div class="alert alert-info">
        <strong>${detectedTypeLabel}</strong> ${typeTranslation}
      </div>
      <div class="results-list">`;

    relevantTools.forEach((tool) => {
      const url = this.buildToolUrl(tool, query);
      resultsHTML += `
        <div class="result-item">
          <div class="result-header">
            <h6>${tool.name}</h6>
          </div>
          <p class="text-muted small">${t('DESC_' + tool.id)}</p>
          <a href="${url}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
            Ir
          </a>
          <button class="btn btn-sm btn-outline-warning" onclick="App.addFavorite('${tool.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"></path>
            </svg>
            Favorito
          </button>
        </div>`;
    });

    resultsHTML += `</div></div>`;
    resultsContainer.innerHTML = resultsHTML;
  },

  // Detect query type (IP, domain, hash, email)
  detectQueryType: function (query) {
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(query)) return "ip";
    if (/^[a-zA-Z0-9-]{1,63}(\.[a-zA-Z0-9-]{1,63})*\.[a-zA-Z]{2,}$/.test(query))
      return "domain";
    if (/^[a-f0-9]{32}$|^[a-f0-9]{40}$|^[a-f0-9]{64}$/.test(query))
      return "hash";
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query)) return "email";
    return "general";
  },

  // Check if tool is relevant to query type
  isToolRelevant: function (tool, queryType) {
    const relevantCategories = {
      "ip": ["IP_INFO", "THREAT_INTELLIGENCE", "SEARCH_TOOLS"],
      "domain": ["SEARCH_TOOLS", "WEBSITE_OSINT_TOOLS", "THREAT_INTELLIGENCE"],
      "hash": ["FILE_MALWARE_ANALYSIS", "THREAT_INTELLIGENCE", "HASH_LOOKUP"],
      "email": ["EMAIL", "EMAIL_HEADER_ANALYSIS", "USERNAME_PEOPLE_OSINT"],
      "general": [],
    };

    if (queryType === "general") return true;
    return relevantCategories[queryType]?.includes(tool.category);
  },

  // Build URL for tool with query
  buildToolUrl: function (tool, query) {
    if (tool.template) {
      return tool.template.replace("{{query}}", encodeURIComponent(query));
    }
    return tool.url + encodeURIComponent(query);
  },

  // Open tool with search input (for favorites view)
  openToolSearch: function (toolId) {
    const tool = this.state.tools.find((t) => t.id === toolId);
    if (!tool) return;

    // Store tool ID for later use
    this.pendingToolId = toolId;
    
    // Show modal for search term
    const modal = new bootstrap.Modal(document.getElementById("searchModal"));
    modal.show();
    
    // Focus input field
    setTimeout(() => {
      document.getElementById("searchModalInput").focus();
    }, 100);
  },

  // Execute search from modal
  executeToolSearch: function () {
    const query = document.getElementById("searchModalInput").value.trim();
    
    if (!query) {
      this.showError(t("NO_SEARCH_TERM", this.config.currentLanguage));
      return;
    }

    const toolId = this.pendingToolId;
    const tool = this.state.tools.find((t) => t.id === toolId);
    if (!tool) return;

    const url = this.buildToolUrl(tool, query);
    window.open(url, "_blank");
    
    // Add to history
    this.addToHistory(query);
    
    // Clear input and close modal
    document.getElementById("searchModalInput").value = "";
    bootstrap.Modal.getInstance(document.getElementById("searchModal")).hide();
  },

  // Add search to history
  addToHistory: function (query) {
    const now = new Date().toLocaleString();
    this.state.searchHistory.unshift({ query, date: now });

    // Keep only last 50 searches
    this.state.searchHistory = this.state.searchHistory.slice(0, 50);
    localStorage.setItem(
      "osintHistory",
      JSON.stringify(this.state.searchHistory)
    );

    // Update search count
    this.state.searches = (this.state.searches || 0) + 1;
    localStorage.setItem("osintSearches", JSON.stringify(this.state.searches));
  },

  // Filter tools by name/description
  filterTools: function (query) {
    const filtered = this.state.tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        t('DESC_' + tool.id).toLowerCase().includes(query.toLowerCase())
    );

    this.renderTools(filtered);
  },

  // Render tools grid
  renderTools: function (tools = this.state.tools) {
    const content = document.getElementById("content");
    if (!content) return;

    // Group by category
    const grouped = {};
    tools.forEach((tool) => {
      if (!grouped[tool.category]) {
        grouped[tool.category] = [];
      }
      grouped[tool.category].push(tool);
    });

    let html = "";
    Object.entries(grouped).forEach(([category, items]) => {
      html += `
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">${t(category)}</h3>
            </div>
            <div class="table-responsive">
              <table class="table table-vcenter">
                <tbody>`;

      items.forEach((tool) => {
        const isFavorite = this.state.favorites.includes(tool.id);
        html += `
                  <tr>
                    <td width="80%">
                      <div class="text-heading font-weight-bold">${tool.name}</div>
                      <div class="text-muted">${t('DESC_' + tool.id)}</div>
                    </td>
                    <td class="text-end">
                      <a href="${tool.url || "#"}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
                        Ir
                      </a>
                      <button class="btn btn-sm btn-${
                        isFavorite ? "warning" : "outline-warning"
                      }" onclick="App.toggleFavorite('${tool.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>`;
      });

      html += `
                </tbody>
              </table>
            </div>
          </div>
        </div>`;
    });

    content.innerHTML = html;
  },

  // Toggle favorite
  toggleFavorite: function (toolId) {
    const index = this.state.favorites.indexOf(toolId);
    if (index > -1) {
      this.state.favorites.splice(index, 1);
    } else {
      this.state.favorites.push(toolId);
    }

    // Guardar en localStorage
    localStorage.setItem(
      "osintFavorites",
      JSON.stringify(this.state.favorites)
    );

    // Actualizar el badge con el contador correcto
    const badge = document.getElementById("favorites-count");
    if (badge) {
      badge.textContent = this.state.favorites.length;
    }

    // Re-renderizar tools y favoritos
    this.renderTools();
    
    // Si la vista de favoritos está activa, actualizar también
    const favView = document.getElementById("favorites-view");
    if (favView && favView.classList.contains("active")) {
      this.renderFavoritesView();
    }
  },

  // Add to favorites
  addFavorite: function (toolId) {
    if (!this.state.favorites.includes(toolId)) {
      this.state.favorites.push(toolId);
      localStorage.setItem(
        "osintFavorites",
        JSON.stringify(this.state.favorites)
      );
      const badge = document.getElementById("favorites-count");
      if (badge) {
        badge.textContent = this.state.favorites.length;
      }
      this.showSuccess("Agregado a favoritos");
    }
  },

  // Switch view
  switchView: function (tab) {
    // Remove active from all tabs
    document.querySelectorAll(".tab-btn").forEach((t) => {
      t.classList.remove("active");
    });

    // Hide all views
    document.querySelectorAll(".view-content").forEach((v) => {
      v.classList.remove("active");
    });

    // Add active to clicked tab
    tab.classList.add("active");

    // Show corresponding view
    const viewId = tab.getAttribute("data-view") + "-view";
    const view = document.getElementById(viewId);
    if (view) {
      view.classList.add("active");

      // Load specific view content if needed
      if (viewId === "history-view") {
        this.renderHistory();
      } else if (viewId === "favorites-view") {
        this.renderFavoritesView();
      }
    }
  },

  // Render search history
  renderHistory: function () {
    const container = document.getElementById("history-container");
    if (!container) return;

    if (this.state.searchHistory.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none">
            <path d="M12 3c-4.97 0 -9 4.03 -9 9s4.03 9 9 9s9 -4.03 9 -9s-4.03 -9 -9 -9m0 2v6l5.25 3.15"></path>
          </svg>
          <h5>Sin historial</h5>
          <p class="text-muted">Tus búsquedas aparecerán aquí</p>
        </div>`;
      return;
    }

    let html = '<div class="list-group">';
    this.state.searchHistory.forEach((item, index) => {
      html += `
        <a href="#" class="list-group-item list-group-item-action" onclick="App.repeatSearch('${item.query}'); return false;">
          <div class="text-truncate">
            <strong>${item.query}</strong>
            <span class="text-muted ms-2">${item.date}</span>
          </div>
        </a>`;
    });
    html += "</div>";

    container.innerHTML = html;
  },

  // Render history in right panel
  renderHistoryPanel: function () {
    const container = document.getElementById("panel-list");
    if (!container) return;

    if (this.state.searchHistory.length === 0) {
      container.innerHTML =
        '<p class="text-muted">No hay historial de búsquedas</p>';
      return;
    }

    let html = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <strong>Búsquedas recientes</strong>
        <button class="btn btn-sm btn-outline-danger" onclick="App.clearHistory()" title="Borrar historial">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
            <path d="M4 7l16 0"></path>
            <path d="M10 11l0 6"></path>
            <path d="M14 11l0 6"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v1"></path>
          </svg>
          Limpiar
        </button>
      </div>
      <div class="list-group">`;
    
    this.state.searchHistory.forEach((item, index) => {
      html += `
        <a href="#" class="list-group-item list-group-item-action text-start" onclick="App.repeatSearch('${item.query}'); return false;">
          <div class="text-truncate">
            <strong>${item.query}</strong>
          </div>
          <small class="text-muted">${item.date}</small>
        </a>`;
    });
    html += "</div>";

    container.innerHTML = html;
  },

  // Clear search history
  clearHistory: function () {
    if (!confirm(t("CONFIRM_DELETE_HISTORY", this.config.currentLanguage))) {
      return;
    }

    this.state.searchHistory = [];
    this.state.searches = 0;
    localStorage.setItem("osintHistory", JSON.stringify(this.state.searchHistory));
    localStorage.setItem("osintSearches", JSON.stringify(this.state.searches));
    this.updateStats();
    this.renderHistoryPanel();
    this.renderHistory();
  },

  // Render favorites view with all favorite tools
  renderFavoritesView: function () {
    const container = document.getElementById("favorites-container");
    if (!container) return;

    if (this.state.favorites.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"></path>
          </svg>
          <h5>Sin favoritos</h5>
          <p class="text-muted">Haz clic en la estrella para agregar herramientas a favoritos</p>
        </div>`;
      return;
    }

    // Get favorite tools
    const favoriteTools = this.state.tools.filter((t) =>
      this.state.favorites.includes(t.id)
    );

    // Group by category
    const grouped = {};
    favoriteTools.forEach((tool) => {
      if (!grouped[tool.category]) grouped[tool.category] = [];
      grouped[tool.category].push(tool);
    });

    // Render tools by category
    let html = "";
    Object.entries(grouped).forEach(([category, items]) => {
      html += `
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">${t(category)}</h3>
            </div>
            <div class="table-responsive">
              <table class="table table-vcenter">
                <tbody>`;

      items.forEach((tool) => {
        const isFavorite = this.state.favorites.includes(tool.id);
        html += `
                  <tr>
                    <td width="80%">
                      <div class="text-heading font-weight-bold">${tool.name}</div>
                      <div class="text-muted">${t('DESC_' + tool.id)}</div>
                    </td>
                    <td class="text-end">
                      <button class="btn btn-sm btn-ghost-warning btn-icon" onclick="App.toggleFavorite('${tool.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon ${
          isFavorite ? "fill-current" : ""
        }" width="18" height="18" viewBox="0 0 24 24" fill="${
          isFavorite ? "currentColor" : "none"
        }" stroke="currentColor">
                          <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"></path>
                        </svg>
                      </button>
                      <button class="btn btn-sm btn-primary" onclick="App.openToolSearch('${tool.id}')">
                        Ir
                      </button>
                    </td>
                  </tr>`;
      });

      html += `
                </tbody>
              </table>
            </div>
          </div>
        </div>`;
    });

    container.innerHTML = `<div class="row g-3">${html}</div>`;
  },

  // Repeat a search
  repeatSearch: function (query) {
    document.getElementById("search-input").value = query;
    this.handleSearch(new Event("submit"));
  },

  // Toggle theme
  toggleTheme: function () {
    const newTheme = this.config.currentTheme === "dark" ? "light" : "dark";
    this.config.currentTheme = newTheme;
    document.body.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("osintTheme", newTheme);
    
    // Cambiar iconos
    const moonIcon = document.querySelector('.icon-moon');
    const sunIcon = document.querySelector('.icon-sun');
    if (newTheme === 'dark') {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  },

  // Setup theme on load
  setupTheme: function () {
    document.body.setAttribute("data-bs-theme", this.config.currentTheme);
    
    // Establecer iconos correctos
    const moonIcon = document.querySelector('.icon-moon');
    const sunIcon = document.querySelector('.icon-sun');
    if (this.config.currentTheme === 'dark') {
      if (moonIcon) moonIcon.style.display = 'none';
      if (sunIcon) sunIcon.style.display = 'block';
    } else {
      if (moonIcon) moonIcon.style.display = 'block';
      if (sunIcon) sunIcon.style.display = 'none';
    }
  },

  // Toggle language
  toggleLanguage: function () {
    this.config.currentLanguage =
      this.config.currentLanguage === "es" ? "en" : "es";
    document.getElementById("current-lang").textContent =
      this.config.currentLanguage.toUpperCase();
    localStorage.setItem("osintLanguage", this.config.currentLanguage);
    this.applyLanguage();
  },

  // Setup language
  setupLanguage: function () {
    document.getElementById("current-lang").textContent =
      this.config.currentLanguage.toUpperCase();
    this.applyLanguage();
  },

  // Apply language
  applyLanguage: function () {
    const lang = this.config.currentLanguage;

    // Update navbar labels
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key, lang);
    });

    // Update placeholders
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.placeholder = t("ENTER_PLACEHOLDER", lang);

    const filterInput = document.getElementById("filter-input");
    if (filterInput) filterInput.placeholder = t("FILTER_PLACEHOLDER", lang);

    const searchModalInput = document.getElementById("searchModalInput");
    if (searchModalInput) searchModalInput.placeholder = t("SEARCH_PLACEHOLDER", lang);

    const favSearchInput = document.getElementById("favorite-search-input");
    if (favSearchInput) favSearchInput.placeholder = t("FAVORITE_PLACEHOLDER", lang);

    // Update modal titles and buttons
    const searchModalTitle = document.querySelector("#searchModal .modal-title");
    if (searchModalTitle) searchModalTitle.textContent = t("ENTER_SEARCH_TERM", lang);

    // Update all buttons with data-i18n
    document.querySelectorAll("button[data-i18n]").forEach((btn) => {
      const key = btn.getAttribute("data-i18n");
      btn.textContent = t(key, lang);
    });

    // Update footer
    const footerInfo = document.getElementById("footer-info");
    if (footerInfo) footerInfo.textContent = t("PRIVACY_NOTICE", lang);

    // Re-render current views
    this.renderTools();
    this.renderFavoritesView();
    this.renderHistory();
    this.setupCategories();
    
    // Update sidebar header
    const sidebarHeader = document.querySelector(".sidebar-header h5");
    if (sidebarHeader) sidebarHeader.textContent = t("TOOLS", lang);

    // Update stats labels
    const statsLabels = document.querySelectorAll(".sidebar-footer small");
    if (statsLabels.length >= 2) {
      statsLabels[0].textContent = t("STATISTICS", lang);
    }

    const statsSmall = document.querySelectorAll(".stats-mini small");
    if (statsSmall.length >= 2) {
      statsSmall[0].textContent = t("TOOLS_COUNT", lang);
      statsSmall[1].textContent = t("SEARCHES_COUNT", lang);
    }

    // Update tab buttons
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabLabels = ["TOOLS", "FAVORITES", "RESULTS", "HISTORY"];
    tabButtons.forEach((btn, index) => {
      const label = btn.querySelector("svg + *") || btn;
      if (label && index < tabLabels.length) {
        const text = label.textContent.split(/\n|\s{2,}/)[0]; // Get first text node
        label.textContent = t(tabLabels[index], lang);
      }
    });

    // Update main content headers for empty states
    this.updateEmptyStatesLanguage(lang);
  },

  // Update empty state messages language
  updateEmptyStatesLanguage: function (lang) {
    document.querySelectorAll(".empty-state").forEach((state) => {
      const h5 = state.querySelector("h5");
      const p = state.querySelector("p");

      if (h5 && p) {
        const parent = state.parentElement;

        // Favorites view
        if (parent.id === "favorites-container") {
          h5.textContent = t("NO_FAVORITES", lang);
          p.textContent = t("ADD_TO_FAVORITES", lang);
        }

        // Results view
        if (parent.id === "results-container") {
          h5.textContent = t("NO_RESULTS", lang);
          p.textContent = t("PERFORM_SEARCH", lang);
        }

        // History view
        if (parent.id === "history-container") {
          h5.textContent = t("NO_HISTORY", lang);
          p.textContent = t("SEARCHES_APPEAR_HERE", lang);
        }
      }
    });
  },

  // Show error message
  showError: function (message) {
    const modal = new bootstrap.Modal(document.getElementById("errorModal"));
    document.getElementById("errorModalText").textContent = message;
    modal.show();
  },

  // Show success message
  showSuccess: function (message) {
    const modal = new bootstrap.Modal(document.getElementById("successModal"));
    document.getElementById("successModalText").textContent = message;
    modal.show();
  },

  // Update statistics
  updateStats: function () {
    const totalToolsEl = document.getElementById("total-tools");
    const totalSearchesEl = document.getElementById("total-searches");
    const favoritesCountEl = document.getElementById("favorites-count");

    if (totalToolsEl) {
      // Contar todas las herramientas
      totalToolsEl.textContent = this.state.tools.length;
    }
    if (totalSearchesEl) {
      // If history is empty, ensure searches counter is zero and persist
      if (this.state.searchHistory && Array.isArray(this.state.searchHistory) && this.state.searchHistory.length === 0) {
        this.state.searches = 0;
        try {
          localStorage.setItem("osintSearches", JSON.stringify(this.state.searches));
        } catch (e) {
          // ignore storage errors
        }
      }
      totalSearchesEl.textContent = this.state.searches || 0;
    }
    if (favoritesCountEl) {
      // Contar solo favoritos que existen realmente
      favoritesCountEl.textContent = this.state.favorites.length;
    }
  },

  // Toggle sidebar
  toggleSidebar: function () {
    const sidebar = document.getElementById("sidebar");
    sidebar?.classList.toggle("collapsed");
  },

  // Toggle panels
  toggleHistoryPanel: function () {
    this.renderHistoryPanel();
    this.showPanel("Historial");
  },

  toggleFavoritesPanel: function () {
    // Sincronizar favoritos antes de renderizar
    this.validateFavorites();
    this.updateStats(); // Actualizar el contador
    this.renderFavorites();
    this.showPanel("Favoritos");
  },

  // Show right panel
  showPanel: function (title) {
    const panel = document.getElementById("right-panel");
    const panelTitle = document.getElementById("panel-title");
    panelTitle.textContent = title;
    panel?.classList.add("active");
  },

  // Close right panel
  closeRightPanel: function () {
    const panel = document.getElementById("right-panel");
    panel?.classList.remove("active");
  },

  // Render favorites
  renderFavorites: function () {
    const container = document.getElementById("panel-list");
    if (this.state.favorites.length === 0) {
      container.innerHTML =
        '<p class="text-muted">No hay favoritos agregados</p>';
      return;
    }

    const favTools = this.state.tools.filter((t) =>
      this.state.favorites.includes(t.id)
    );

    let html = `
      <div class="favorites-search mb-3">
        <input type="text" id="favorite-search-input" class="form-control form-control-sm" placeholder="Ingresa término de búsqueda..." />
        <small class="text-muted mt-2 d-block">Usa cualquiera de tus favoritos a continuación</small>
      </div>
      <div class="list-group">`;
    
    favTools.forEach((tool) => {
      html += `
        <button class="list-group-item list-group-item-action text-start" onclick="App.openFavoriteWithSearch('${tool.id}')">
          <div class="text-truncate">
            <strong>${tool.name}</strong>
          </div>
          <small class="text-muted">${t('DESC_' + tool.id)}</small>
        </button>`;
    });
    html += "</div>";

    container.innerHTML = html;
  },

  // Open favorite with search term
  openFavoriteWithSearch: function (toolId) {
    const searchInput = document.getElementById("favorite-search-input");
    const query = searchInput?.value.trim();

    if (!query) {
      // Use modal if no query in input
      this.pendingToolId = toolId;
      const modal = new bootstrap.Modal(document.getElementById("searchModal"));
      modal.show();
      setTimeout(() => {
        document.getElementById("searchModalInput").focus();
      }, 100);
      return;
    }

    const tool = this.state.tools.find((t) => t.id === toolId);
    if (!tool) return;

    const url = this.buildToolUrl(tool, query);
    window.open(url, "_blank");

    // Add to history
    this.addToHistory(query);
  },

  // Open Add Tool Modal
  openAddToolModal: function() {
    const modal = new bootstrap.Modal(document.getElementById("addToolModal"));
    modal.show();
    // Reset form
    document.getElementById("addToolForm").reset();
    document.getElementById("templateField").style.display = "none";
  },

  // Toggle template field
  toggleTemplateField: function() {
    const usesTemplate = document.getElementById("toolUsesTemplate").checked;
    const templateField = document.getElementById("templateField");
    templateField.style.display = usesTemplate ? "block" : "none";
  },

  // Save custom tool
  saveCustomTool: function() {
    const name = document.getElementById("toolName").value.trim();
    const id = document.getElementById("toolId").value.trim().toLowerCase();
    const url = document.getElementById("toolUrl").value.trim();
    const description = document.getElementById("toolDescription").value.trim();
    const category = document.getElementById("toolCategory").value;
    const usesTemplate = document.getElementById("toolUsesTemplate").checked;
    const template = document.getElementById("toolTemplate").value.trim();

    // Validation
    if (!name || !id || !url || !category) {
      this.showError(t("TOOL_ERROR_REQUIRED", this.config.currentLanguage));
      return;
    }

    // Check if tool ID already exists
    if (this.state.tools.find(t => t.id === id)) {
      this.showError(t("TOOL_ERROR_EXISTS", this.config.currentLanguage));
      return;
    }

    // Create new tool object
    const newTool = {
      id: id,
      name: name,
      category: category,
      description: description,
      custom: true // Mark as custom tool
    };

    if (usesTemplate && template) {
      newTool.template = template;
    } else {
      newTool.url = url;
    }

    // Add to tools array
    this.state.tools.push(newTool);

    // Save custom tools to localStorage
    const customTools = this.state.tools.filter(t => t.custom);
    localStorage.setItem("osintCustomTools", JSON.stringify(customTools));

    // Update UI
    this.renderTools();
    this.setupCategories();
    this.updateStats();

    // Close modal and show success
    const modal = bootstrap.Modal.getInstance(document.getElementById("addToolModal"));
    modal.hide();
    
    this.showSuccess(t("TOOL_SAVED_SUCCESS", this.config.currentLanguage));
  },

  // Load custom tools from localStorage
  loadCustomTools: function() {
    const customTools = localStorage.getItem("osintCustomTools");
    if (customTools) {
      try {
        const tools = JSON.parse(customTools);
        // Add custom tools to the tools array
        tools.forEach(tool => {
          if (!this.state.tools.find(t => t.id === tool.id)) {
            this.state.tools.push(tool);
          }
        });
      } catch (e) {
        console.error("Error loading custom tools:", e);
      }
    }
  },
};

// Global functions for onclick handlers
function handleSearch(e) {
  App.handleSearch(e);
}

function toggleSidebar() {
  App.toggleSidebar();
}

function toggleHistoryPanel() {
  App.toggleHistoryPanel();
}

function toggleFavoritesPanel() {
  App.toggleFavoritesPanel();
}

function closeRightPanel() {
  App.closeRightPanel();
}

// Utility function to clear corrupted data
function clearFavoritesData() {
  if (confirm("¿Deseas limpiar todos los favoritos? Esta acción no se puede deshacer.")) {
    localStorage.removeItem("osintFavorites");
    App.state.favorites = [];
    App.updateStats();
    location.reload();
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
