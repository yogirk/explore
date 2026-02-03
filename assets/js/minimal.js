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
   * Adds an inline copy button and language label overlay to fenced code blocks.
   */
  function initCodeCopy() {
    var highlights = document.querySelectorAll('.highlight');
    highlights.forEach(function(block) {
      var codeEl = block.querySelector('code');
      if (!codeEl) return;

      // Extract language from class (e.g., "language-go" -> "go")
      var langMatch = codeEl.className.match(/language-(\w+)/);
      var lang = langMatch ? langMatch[1] : '';

      // Language label (only if language is detected)
      if (lang) {
        var langSpan = document.createElement('span');
        langSpan.className = 'code-lang';
        langSpan.textContent = lang.toUpperCase();
        block.appendChild(langSpan);
      }

      // Copy button with clipboard icon
      var copyIcon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="5.5" width="8" height="9" rx="1.5"/><path d="M5.5 10.5H3.25A1.25 1.25 0 0 1 2 9.25v-7A1.25 1.25 0 0 1 3.25 1h7A1.25 1.25 0 0 1 11.5 2.25V4.5"/></svg>';
      var checkIcon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3.5 8.5 6.5 11.5 12.5 4.5"/></svg>';

      var btn = document.createElement('button');
      btn.className = 'copy-code';
      btn.innerHTML = copyIcon;
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Copy to clipboard');
      block.appendChild(btn);

      // Click handler
      btn.addEventListener('click', function() {
        navigator.clipboard.writeText(codeEl.textContent).then(function() {
          btn.innerHTML = checkIcon;
          btn.classList.add('is-copied');
          setTimeout(function() {
            btn.innerHTML = copyIcon;
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

  /**
   * Responsive Pagination
   * Collapses page numbers on smaller screens, showing a window around
   * the active page with ellipsis for hidden ranges.
   */
  function initResponsivePagination() {
    var container = document.querySelector('.pagination-pages');
    if (!container) return;

    var pages = Array.prototype.slice.call(
      container.querySelectorAll('.page-number')
    );
    var total = pages.length;
    if (total <= 1) return;

    function update() {
      // Remove previous ellipsis
      var old = container.querySelectorAll('.pagination-ellipsis');
      for (var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);

      // Reset visibility
      for (var i = 0; i < total; i++) pages[i].style.display = '';

      // Determine siblings count based on viewport width
      var width = window.innerWidth;
      var siblings;
      if (width < 640) {
        siblings = 1;
      } else if (width < 1024) {
        siblings = 2;
      } else {
        return; // Large screens show all pages
      }

      // If all pages fit, show everything
      if (total <= 2 * siblings + 3) return;

      // Find the active page index
      var activeIdx = -1;
      for (var i = 0; i < total; i++) {
        if (pages[i].classList.contains('active')) {
          activeIdx = i;
          break;
        }
      }
      if (activeIdx === -1) return;

      // Calculate visible window around active page
      var winStart = activeIdx - siblings;
      var winEnd = activeIdx + siblings;

      // Shift window to stay in bounds (between first and last)
      if (winStart < 1) {
        winEnd = Math.min(total - 2, winEnd + (1 - winStart));
        winStart = 1;
      }
      if (winEnd > total - 2) {
        winStart = Math.max(1, winStart - (winEnd - (total - 2)));
        winEnd = total - 2;
      }

      // Hide pages outside the visible set (always keep first and last)
      for (var i = 1; i < total - 1; i++) {
        if (i < winStart || i > winEnd) {
          pages[i].style.display = 'none';
        }
      }

      // Insert ellipsis after first page if there is a gap
      if (winStart > 1) {
        var dots = document.createElement('span');
        dots.className = 'pagination-ellipsis';
        dots.textContent = '\u2026';
        container.insertBefore(dots, pages[winStart]);
      }

      // Insert ellipsis before last page if there is a gap
      if (winEnd < total - 2) {
        var dots = document.createElement('span');
        dots.className = 'pagination-ellipsis';
        dots.textContent = '\u2026';
        pages[winEnd].parentNode.insertBefore(dots, pages[winEnd].nextSibling);
      }
    }

    update();

    var timer;
    window.addEventListener('resize', function() {
      clearTimeout(timer);
      timer = setTimeout(update, 150);
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
    initResponsivePagination();
  });
})();
