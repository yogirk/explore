/**
 * Main JavaScript file for the Explore theme.
 * Handles theme toggling and mobile navigation.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = localStorage.getItem('theme');

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark');
    }
  };

  if (currentTheme) {
    setTheme(currentTheme);
  } else if (userPrefersDark) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // --- Mobile Navigation ---
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const htmlEl = document.documentElement;

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isActive = navToggle.classList.toggle('is-active');
      siteNav.classList.toggle('is-active');
      navToggle.setAttribute('aria-expanded', isActive);

      // Use a class on the <html> element to prevent body scroll
      // and avoid layout shift.
      htmlEl.classList.toggle('is-menu-open', isActive);
    });
  }

  // --- Sticky Header with Shadow ---
  const header = document.querySelector('.site-header.is-sticky');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('has-shadow');
      } else {
        header.classList.remove('has-shadow');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Check on load
  }
});