---
title: "A Post with Widgets"
date: 2025-08-14T11:00:00+05:30
draft: false
description: "This post demonstrates how a sidebar with widgets appears next to the content when the ToC is inline or disabled."
author: "Rain Doctor"
categories: ["Layouts", "Features"]
tags: ["widgets", "sidebar", "demo"]
toc: false
sidebar:
  position: "right"
---

This post demonstrates a page with a widget sidebar but no Table of Contents in the sidebar.

The theme's logic first checks if the Table of Contents is configured to display in the `left` or `right` sidebar. If it is, the ToC takes precedence.

If the ToC is set to `inline` or is disabled (like on this page with `toc: false`), the theme will then check for the `sidebar.position` setting. If that is set to `left` or `right`, the widget area will be displayed.

This allows for flexible layouts where some pages might have a ToC for navigation, while others might feature widgets for discovery.