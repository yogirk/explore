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
        var isOpen = siteNav.classList.toggle('is-open');
        navToggle.classList.toggle('is-active', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
        htmlEl.classList.toggle('is-menu-open', isOpen);
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

  /**
   * Code Copy Button
   * Adds a copy button and language label to fenced code blocks.
   * Injects a .code-header bar above each .highlight block.
   */
  function initCodeCopy() {
    var highlights = document.querySelectorAll('.highlight');
    highlights.forEach(function(block) {
      var codeEl = block.querySelector('code');
      if (!codeEl) return;

      // Extract language from class (e.g., "language-go" -> "go")
      var langMatch = codeEl.className.match(/language-(\w+)/);
      var lang = langMatch ? langMatch[1] : '';

      // Create the header bar
      var header = document.createElement('div');
      header.className = 'code-header';

      // Language label (only if language is detected)
      if (lang) {
        var langSpan = document.createElement('span');
        langSpan.className = 'code-lang';
        langSpan.textContent = lang.toUpperCase();
        header.appendChild(langSpan);
      }

      // Copy button
      var btn = document.createElement('button');
      btn.className = 'copy-code';
      btn.textContent = 'Copy';
      btn.type = 'button';
      header.appendChild(btn);

      // Insert header as first child of .highlight
      block.insertBefore(header, block.firstChild);

      // Click handler
      btn.addEventListener('click', function() {
        navigator.clipboard.writeText(codeEl.textContent).then(function() {
          btn.textContent = 'Copied!';
          btn.classList.add('is-copied');
          setTimeout(function() {
            btn.textContent = 'Copy';
            btn.classList.remove('is-copied');
          }, 2000);
        });
      });
    });
  }

  /**
   * Scroll Spy for Table of Contents
   * Highlights the active section in the ToC as the user scrolls.
   */
  function initScrollSpy() {
    var tocLinks = document.querySelectorAll('.toc nav a');
    var headings = document.querySelectorAll('.post-content h2, .post-content h3');
    if (!tocLinks.length || !headings.length) return;

    var observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          if (!id) return;

          tocLinks.forEach(function(link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, observerOptions);

    headings.forEach(function(heading) {
      observer.observe(heading);
    });
  }

  /**
   * Reading Progress Bar
   * Shows a thin progress bar at the top of the viewport on single posts,
   * filling from 0% to 100% as the user scrolls through the article.
   */
  function initReadingProgress() {
    var progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    var ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var scrollTop = window.scrollY || document.documentElement.scrollTop;
          var docHeight = document.body.scrollHeight - window.innerHeight;
          var pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
          progressBar.style.width = pct + '%';
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Initialize all modules when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileNav();
    initStickyHeader();
    initScrollSpy();
    initCodeCopy();
    initReadingProgress();
  });
})();
