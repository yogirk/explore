---
title: "Hello World: A Guide to Getting Started"
date: 2025-08-20T10:00:00+05:30
draft: false
description: "A step-by-step guide to setting up your new Hugo site with the Explore theme, from installation to running the server."
author: "Rain Doctor"
categories: ["Getting Started", "Hugo"]
tags: ["welcome", "demo", "hugo", "guide"]
toc: true
summary: "This guide will walk you through the entire process of setting up a new Hugo site and installing the Explore theme. We'll cover installing Hugo, creating a site, adding the theme, and basic configuration to get you up and running quickly."
---

Welcome to the **Explore** theme for Hugo! This guide will walk you through the steps to get your site up and running with this theme. Whether you're new to Hugo or an experienced user, you'll find everything you need to get started.

## Prerequisites

Before we begin, you need to have [Git](https://git-scm.com/) installed on your machine to manage the theme as a submodule.

## Step 1: Install Hugo

If you don't have Hugo installed, you'll need to install it first. Hugo provides an official installation guide for all major operating systems.

A quick way to install it on macOS is with [Homebrew](https://brew.sh/):
```bash
brew install hugo
```

For other systems, please refer to the [Official Hugo Installation Guide](https://gohugo.io/installation/).

## Step 2: Create a New Hugo Site

Once Hugo is installed, you can create a new site. Open your terminal, navigate to where you want to create your project, and run:

```bash
hugo new site my-awesome-site
cd my-awesome-site
```

This will create a new directory named `my-awesome-site` with the basic Hugo site structure.

## Step 3: Install the Explore Theme

The best way to add a theme to your Hugo site is by using Git submodules. This makes it easy to get theme updates in the future.

From the root of your new site (`my-awesome-site`), initialize a Git repository and add the Explore theme as a submodule:

```bash
git init
git submodule add https://github.com/yogirk/explore.git themes/explore
```

## Step 4: Configure Your Site

The Explore theme comes with a detailed `config.toml` in its `exampleSite` directory. It's the fastest way to get started.

Copy the example configuration file to the root of your site:

```bash
cp themes/explore/exampleSite/config.toml .
```

Now, open the `config.toml` file in your favorite text editor. You'll need to make sure the theme is set correctly. The example file should already have this, but it's good to verify:

```toml
# config.toml
theme = "explore"
```

You should also update the `baseURL` to your site's URL and change other parameters like `title`, `author`, and `description` to match your site's details.

## Step 5: Add Some Content

You can create a new post using the `hugo new` command:

```bash
hugo new posts/my-first-post.md
```

This will create a new Markdown file in `content/posts/my-first-post.md` with some pre-filled front matter from the theme's archetype. Open it and add your content.

## Step 6: Run the Hugo Server

You're all set! Now, you can run the local Hugo server to see your site in action:

```bash
hugo server
```

This will start a local server, usually at `http://localhost:1313/`. Open this URL in your browser, and you should see your new site with the Explore theme!

## What's Next?

Congratulations! Your site is live locally. From here, you can:

- Explore the `config.toml` file to customize the theme's features, colors, and layout.
- Read the [Markdown & Typography Guide]({{< relref "markdown-and-typography.md" >}}) to see how to style your content.
- Check out the [Explore Theme Features]({{< relref "theme-features.md" >}}) post for a deep dive into all configuration options.
