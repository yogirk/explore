---
title: "Explore Theme Features"
date: 2025-08-19T10:00:00+05:30
draft: false
description: "A detailed overview of the features and configuration options of the Explore theme for Hugo."
author: "Rain Doctor"
categories: ["Theme Guide"]
tags: ["features", "documentation", "hugo"]
toc: true
summary: "Explore is a minimal, text-heavy theme for Hugo, designed for academic sites, personal blogs, and essays. This post provides a detailed overview of its features and configuration."
---

**Explore** is a minimal, text-heavy theme for Hugo, designed for academic sites, personal blogs, and essays. It prioritizes readability, performance, accessibility, and maintainability. Explore is built with Gemini Code Assist.


## Features

- **High Performance:** Minimal CSS and JS, with performance budgets in mind.
- **Accessible:** WCAG 2.1 AA compliant, with full keyboard navigation and screen-reader support.
- **Responsive & Modern:** Looks great on all devices, with a clean, modern aesthetic.
- **Dark Mode:** Automatic and manual dark mode switching.
- **Configurable Search:** Choose between client-side search with Fuse.js or Pagefind.
- **Widgets:** Server-rendered widgets for recent posts, categories, and tags.
- **SEO Optimized:** Includes JSON-LD, OpenGraph, and Twitter Card metadata.
- **Hugo Pipes:** Uses Hugo's asset pipeline for CSS processing.

## Configuration

All theme options are configured in your site's `config.toml` under the `[params]` section. Below is a breakdown of the available parameters, matching the `exampleSite/config.toml`.

### UI Parameters

These settings control the behavior of user interface elements.

```toml
[params.ui]
stickyHeader = true
showSearch = true # Show search icon in header
searchEngine = "fuse" # options: fuse, pagefind
homeView = "default" # options: "default", "compact"
```

### Style Parameters

These settings control the visual appearance of the theme.

```toml
[params.style]
primary = "#6C3DBF"
accent  = "#5FA8A3"
containerMaxWidth = "1280px"  # Max width of the site container
maxWidthCh = 75               # Max width of readable content in 'ch' units
```

### Sidebar & Widgets

Control the global sidebar position and which widgets are displayed.

```toml
[params.sidebar]
globalPosition = "right" # Options: "left", "right", "bottom", "off"
widgets = ["recent", "categories", "tags"]
recentCount = 5
```

### Homepage Hero

Configure the hero section that can be displayed at the top of the homepage.

```toml
[params.hero]
show = false # Set to true to show the hero section
title = "Explore Theme"
tagline = "A minimal, text-heavy theme for Hugo, designed for academic sites, personal blogs, and essays."
buttonText = "Learn More"
buttonURL = "/pages/about/"
```

### Single Page & ToC Parameters

Control elements on single post pages.

```toml
[params.single]
showPrevNext = true   # Show previous/next post navigation
showRelated = true    # Show related posts
relatedCount = 4      # Number of related posts to show

[params.single.toc]
  enable = true       # Enable the ToC. Can be disabled per-page with `toc: false`
  position = "right" # ToC position. Options: "inline", "left", "right", "off"
```

