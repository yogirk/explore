---
title: "Markdown & Typography Guide"
date: 2025-08-18T10:00:00+05:30
draft: false
description: "A demonstration of all the basic Markdown elements and typographic styles available in the Explore theme."
author: "Rain Doctor"
categories: ["Demo Content"]
tags: ["typography", "markdown", "style"]
toc: true
summary: "A demonstration of all the basic Markdown elements and typographic styles available in the Explore theme, including headings, lists, blockquotes, and more."
---

This post showcases the styling of all basic Markdown elements, which can be used to format your content.

---

## Headings

The following are the six levels of headings available. Although, If you ever have to reach heading 6, you are doing something serious or funny. Or something seriously funny! 

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Paragraphs and Text Styles

This is a standard paragraph. It can contain **bold text**, *italic text*, and `inline code`. You can also create links to [other websites](https://ravana.app/).

When you have to write a paragraph but you don't want to use *lorem ipsum*, for such a lifeless text is an insult to reader's intelligence - all you need to do is summon PG Wodehouse and imagine how Jeeves would explain AI to Wooster. Here is my take - "One might think of it, sir, as an attempt to bottle my services, but with the most vital ingredients left out. This 'AI' can retrieve information with the speed of a startled gazelle and construct a plan with terrifying logic, yet it lacks the critical faculty of, shall we say, judgement. It could devise a dozen ways to extricate you from a locked room, but would be utterly flummoxed if asked to tactfully dissuade your Aunt Agatha from wearing her new hat."

---

## Blockquotes

Blockquotes are useful for highlighting sections of text. We can invoke someone more serious than Wodehouse, Mr Salinger. 

> I'm not afraid to compete. It's just the opposite. Don't you see that? I'm afraid I will compete — that's what scares me. That's why I quit the Theatre Department. Just because I'm so horribly conditioned to accept everybody else's values, and just because I like applause and people to rave about me, doesn't make it right. I'm ashamed of it. I'm sick of it. I'm sick of not having the courage to be an absolute nobody. I'm sick of myself and everybody else that wants to make some kind of a splash
>
> -- J.D. Salinger, Franny and Zooey

---

## Lists

### Unordered List

- Dust Tomes
- Sniff Pages
- Whisper secrets
  - Misplace bookmark
  - Reread footnote
- Shush loudly

### Ordered List

1. Chaos 
2. Reigns within
   1. Reflect
   2. Repent
   3. Reboot
3. Order Shall Return

### Code Snippets

The theme supports syntax highlighting for code blocks using Hugo's built-in Chroma highlighter.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Hugo!")
}
```

Hover over the code block above and you'll see a **Copy** button appear in the top-right corner. It detects the language automatically and copies the contents to your clipboard with a single click.

## Shortcodes

We've included some useful shortcodes to enhance your content.

### Figure

Use the `figure` shortcode for images with captions. It generates responsive images.

{{< figure src="placeholder.png" alt="A placeholder image" caption="This image is generated with ChatGPT." >}}


### Callout

Use the `callout` shortcode to draw attention to important information. If you want the prompt I used for generating this image, here you go. 

{{< callout type="info" >}}
**Prompt:** A majestic bald eagle flying low over a perfectly still, crystal-clear alpine lake, with its wings spread wide and just above the water's surface, creating a soft ripple. The lake reflects the eagle, the surrounding dense pine forest, and the distant snow-capped mountains. The scene is symmetrically framed with a vivid blue sky, serene and peaceful atmosphere, and cinematic depth of field. Shot from behind the eagle, centered in the frame, capturing the moment it glides gracefully into the wild.
{{< /callout >}}

{{< callout type="warning" >}}
**Warning:** This is a warning callout. Use it for important caveats or warnings.
{{< /callout >}}

That's a brief overview. Feel free to explore the [theme's features]({{< relref "theme-features.md" >}}) and customize it to your liking.