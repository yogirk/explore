---
title: "Interactive Features"
date: 2025-08-16T10:00:00+05:30
draft: false
description: "A hands-on tour of Explore's interactive features: reading progress bar, code copy button, ScrollSpy table of contents, theme toggle, card hover effects, and breadcrumbs."
author: "Rain Doctor"
categories: ["Features"]
tags: ["features", "demo", "documentation"]
toc: true
summary: "This post is a self-demonstrating showcase of Explore's interactive features. Scroll to see the reading progress bar. Copy the code blocks. Watch the table of contents track your position. Every feature described here is active on this very page."
---

This post is its own demonstration. Every interactive feature described below is active right now, on this page. Scroll, click, hover — the best way to understand these features is to use them.

> "I hear and I forget. I see and I remember. I do and I understand."
>
> -- Confucius (attributed)

## Reading Progress Bar

Look at the very top of your browser window. There's a thin colored bar stretching across the viewport. As you scroll down this page, it fills from left to right, showing how far you've read.

The bar uses `requestAnimationFrame` for smooth, jank-free updates. It appears on all single post pages automatically — no configuration needed. The color follows your theme's primary color, so it adapts to whichever palette you've chosen.

Scroll down to watch it grow. Scroll back up to watch it shrink.

## Code Copy Button

Every fenced code block on the site includes a **Copy** button in the top-right corner. Hover over any of the blocks below to see it appear.

### Go

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello from Explore!")
}
```

### Python

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(greet("Explore"))
```

### JavaScript

```javascript
const greet = (name) => `Hello, ${name}!`;
console.log(greet("Explore"));
```

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Explore</title>
</head>
<body>
  <h1>Hello, Explore!</h1>
</body>
</html>
```

Click **Copy** on any block above. The button text changes to "Copied!" for two seconds as confirmation, then resets. The language label (Go, Python, JavaScript, HTML) is detected automatically from the code fence.

## Theme Toggle

Find the sun/moon icon in the site header. Click it.

The entire page transitions smoothly between light and dark modes — no flash, no repaint glitch. The theme applies CSS transitions to background colors, text colors, borders, and shadows so the switch feels deliberate rather than jarring.

Your preference is saved to `localStorage`, so it persists across page loads and sessions. On first visit, the theme respects your operating system's `prefers-color-scheme` setting.

Try toggling a few times. Notice how the reading progress bar, code blocks, cards, and even the callout boxes all adapt their colors.

## ScrollSpy Table of Contents

If you're reading this on a wide enough screen, there's a table of contents in the sidebar. Watch it as you scroll — the currently visible section is highlighted, and the highlight moves as you pass from one heading to the next.

The ScrollSpy uses `IntersectionObserver` to detect which heading is in view, avoiding the performance cost of scroll event listeners. It activates automatically when the ToC is placed in the `left` or `right` position.

This section is deliberately placed in the middle of the post so you can observe the ToC tracking your position as you continue reading.

## Card Hover Effects

This feature is visible on list pages (the homepage, category pages, tag pages) rather than on this single post. Navigate to the [Posts]({{< relref "/" >}}) page and hover over any post card.

You'll see:

- The card lifts slightly (a 4px vertical translation)
- A larger shadow appears beneath it
- The post title changes to the primary color

The entire card is clickable — not just the title — thanks to an invisible overlay link. The effect is subtle but gives the interface a tactile, responsive quality.

## Breadcrumb Navigation

Look at the top of this page, just below the header. You should see a breadcrumb trail like:

**Home > Posts > Interactive Features**

Breadcrumbs appear on all inner pages and provide a clear path back to parent sections. They use semantic `<nav>` markup with `aria-label="breadcrumb"` for accessibility.

## Everything at Once

If you've followed along, you've now experienced all six interactive features on a single page visit:

1. **Reading progress** — the bar at the top has been tracking your scroll position this entire time
2. **Code copy** — you (hopefully) tried copying at least one code block
3. **Theme toggle** — the sun/moon icon in the header
4. **ScrollSpy** — the sidebar ToC has been highlighting sections as you passed them
5. **Card hover** — visible on any list page
6. **Breadcrumbs** — the navigation trail at the top

None of these features require configuration. They activate automatically. And because the JavaScript is wrapped in an IIFE and uses modern APIs like `IntersectionObserver` and `requestAnimationFrame`, they add minimal overhead to page load.

> "Simplicity is the ultimate sophistication."
>
> -- Leonardo da Vinci (attributed)
