/**
 * Main JavaScript for the Explore theme.
 * Handles theme toggling, mobile navigation, and sticky header shadow.
 */
;(function() {
  'use strict';

  /**
   * Theme Toggle
   * Manages light/dark theme switching with localStorage persistence
   * and prefers-color-scheme detection.
   */
  function initThemeToggle() {
    var themeToggle = document.getElementById('theme-toggle');
    var userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var currentTheme = localStorage.getItem('theme');

    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', theme === 'dark');
      }
    }

    if (currentTheme) {
      setTheme(currentTheme);
    } else if (userPrefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }

    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        var newTheme = document.documentElement.getAttribute('data-theme') === 'dark'
          ? 'light' : 'dark';
        setTheme(newTheme);
      });
    }
  }

  /**
   * Mobile Navigation
   * Toggles mobile menu visibility and prevents body scroll when open.
   */
  function initMobileNav() {
    var navToggle = document.getElementById('nav-toggle');
    var siteNav = document.getElementById('site-nav');
    var htmlEl = document.documentElement;

    if (navToggle && siteNav) {
      navToggle.addEventListener('click', function() {
        var isActive = navToggle.classList.toggle('is-active');
        siteNav.classList.toggle('is-active');
        navToggle.setAttribute('aria-expanded', isActive);
        htmlEl.classList.toggle('is-menu-open', isActive);
      });
    }
  }

  /**
   * Sticky Header Shadow
   * Uses IntersectionObserver with a sentinel element to detect scroll
   * position and toggle a shadow class on the sticky header.
   * Replaces the previous window.scroll listener for better performance.
   */
  function initStickyHeader() {
    var header = document.querySelector('.site-header.is-sticky');
    if (!header) return;

    // Create an invisible sentinel at the top of the page.
    // When it scrolls out of view, the header gets a shadow.
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;pointer-events:none;';
    document.body.insertBefore(sentinel, document.body.firstChild);

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        header.classList.toggle('has-shadow', !entry.isIntersecting);
      });
    });

    observer.observe(sentinel);
  }

  // Initialize all modules when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileNav();
    initStickyHeader();
  });
})();
