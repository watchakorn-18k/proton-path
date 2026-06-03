// Theme switcher logic
const STORAGE_KEY = 'proton-path-theme';
const THEMES = ['system', 'dark', 'oled-dark', 'light'] as const;
type Theme = typeof THEMES[number];

function getTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && THEMES.includes(stored as Theme)) {
    return stored as Theme;
  }
  return 'system';
}

function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
}

function initThemeSwitcher() {
  const toggle = document.querySelector('.theme-toggle');
  const menu = document.querySelector('.theme-menu');
  const buttons = document.querySelectorAll('.theme-menu button');

  if (!toggle || !menu) return;

  // Apply stored theme on load
  const currentTheme = getTheme();
  setTheme(currentTheme);

  // Update active state
  function updateActive(theme: Theme) {
    buttons.forEach((btn) => {
      const btnTheme = btn.getAttribute('data-theme-value');
      btn.setAttribute('data-active', String(btnTheme === theme));
    });
  }

  updateActive(currentTheme);

  // Toggle menu
  toggle.addEventListener('click', () => {
    const isOpen = menu.getAttribute('data-open') === 'true';
    menu.setAttribute('data-open', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target as Node;
    const switcher = document.querySelector('.theme-switcher');
    if (switcher && !switcher.contains(target)) {
      menu.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Theme selection
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme-value') as Theme;
      if (theme && THEMES.includes(theme)) {
        setTheme(theme);
        updateActive(theme);
        menu.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.getAttribute('data-open') === 'true') {
      menu.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      (toggle as HTMLElement).focus();
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeSwitcher);
} else {
  initThemeSwitcher();
}
