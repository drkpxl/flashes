# .github/workflows/gatsby.yml

```yml
# Sample workflow for building and deploying a Gatsby site to GitHub Pages
#
# To get started with Gatsby see: https://www.gatsbyjs.com/docs/quick-start/
#
name: Deploy Gatsby site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["master"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Detect package manager
        id: detect-package-manager
        run: |
          if [ -f "${{ github.workspace }}/yarn.lock" ]; then
            echo "manager=yarn" >> $GITHUB_OUTPUT
            echo "command=install" >> $GITHUB_OUTPUT
            exit 0
          elif [ -f "${{ github.workspace }}/package.json" ]; then
            echo "manager=npm" >> $GITHUB_OUTPUT
            echo "command=ci" >> $GITHUB_OUTPUT
            exit 0
          else
            echo "Unable to determine package manager"
            exit 1
          fi
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: ${{ steps.detect-package-manager.outputs.manager }}
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
        with:
          # Automatically inject pathPrefix in your Gatsby configuration file.
          #
          # You may remove this line if you want to manage the configuration yourself.
          static_site_generator: gatsby
      - name: Restore cache
        uses: actions/cache@v4
        with:
          path: |
            public
            .cache
          key: ${{ runner.os }}-gatsby-build-${{ hashFiles('public') }}
          restore-keys: |
            ${{ runner.os }}-gatsby-build-
      - name: Install dependencies
        run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}
      - name: Build with Gatsby
        env:
          PREFIX_PATHS: 'true'
        run: ${{ steps.detect-package-manager.outputs.manager }} run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

# content/blog/2025-04-15-bike-tour.mdx

```mdx
---
title: "Bike Tour Blog - Isle of Skye"
date: "2025-04-15"
---

import PhotoGrid from '../../src/components/PhotoGrid'
import PhotoCard from '../../src/components/PhotoCard'

## Photo Highlights

<PhotoGrid>
<PhotoCard
fullSrc="https://picsum.photos/id/10/1200/1200"
caption="Misty morning on the mountain trails"
src="https://picsum.photos/id/10/400/400"
alt="Misty morning on the mountain trails"
/>
...
</PhotoGrid>
```

# gatsby-browser.js

```js
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import './src/styles/global.css'
import PhotoCard from './src/components/PhotoCard'
import PhotoGrid from './src/components/PhotoGrid'

// Make components available to MDX files
export const wrapRootElement = ({ element }) => {
  return React.createElement(
    MDXProvider,
    {
      components: {
        PhotoCard,
        PhotoGrid
      }
    },
    element
  )
}
```

# gatsby-config.js

```js
module.exports = {
  siteMetadata: {
    title: `My Gatsby Blog`,
    description: `A blog powered by Gatsby and Markdown.`,
    author: `@yourhandle`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-images',
          'gatsby-remark-responsive-iframe',
        ],
        // Add this configuration to help with MDX processing
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      }
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}
```

# gatsby-node.js

```js
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `content/blog` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const result = await graphql(`
    {
      allMdx {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMdx.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

```

# gatsby-ssr.js

```js
// gatsby-ssr.js
import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="google-fonts"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="google-fonts-2"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />,
    <link
      key="google-fonts-css"
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500..700;1,500..700&display=swap"
      rel="stylesheet"
    />,
  ]);
};

```

# package.json

```json
{
  "name": "gatsby-starter-default",
  "private": true,
  "description": "A simple starter to get up and developing quickly with Gatsby",
  "version": "0.1.0",
  "author": "Kyle Mathews <mathews.kyle@gmail.com>",
  "dependencies": {
    "@mdx-js/react": "^2.3.0",
    "gatsby": "^5.13.0",
    "gatsby-plugin-image": "^3.14.0",
    "gatsby-plugin-mdx": "^5.13.0",
    "gatsby-plugin-sharp": "^5.14.0",
    "gatsby-remark-images": "^7.14.0",
    "gatsby-remark-responsive-iframe": "^6.14.0",
    "gatsby-source-filesystem": "^5.14.0",
    "gatsby-transformer-sharp": "^5.14.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "prettier": "^2.8.8"
  },
  "keywords": [
    "gatsby"
  ],
  "license": "0BSD",
  "scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md,css}\"",
    "start": "gatsby develop",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/gatsbyjs/gatsby-starter-default"
  },
  "bugs": {
    "url": "https://github.com/gatsbyjs/gatsby/issues"
  }
}

```

# README.md

```md
<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby's default starter
</h1>

Kick off your project with this default boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.com/docs/gatsby-starters/)._

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI ([install instructions](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-0/#gatsby-cli)) to create a new site, specifying the default starter.

    \`\`\`shell
    # create a new Gatsby site using the default starter
    gatsby new my-default-starter https://github.com/gatsbyjs/gatsby-starter-default
    \`\`\`

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    \`\`\`shell
    cd my-default-starter/
    gatsby develop
    \`\`\`

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-4/#use-graphiql-to-explore-the-data-layer-and-write-graphql-queries).

    Open the `my-default-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🚀 Quick start (Netlify)

Deploy this starter with one click on [Netlify](https://app.netlify.com/signup):

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a typical Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

1.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

1.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

1.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

1.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/) for more detail).

1.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

1.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

1.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

1.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

1.  **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/docs/tutorial/getting-started/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[Build, Deploy, and Host On Netlify](https://netlify.com)

The fastest way to combine your favorite tools and APIs to build the fastest sites, stores, and apps for the web. And also the best place to build, deploy, and host your Gatsby sites.

<!-- AUTO-GENERATED-CONTENT:END -->

```

# src/components/header.js

```js
import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
    }}
  >
    <Link
      to="/"
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
      }}
    >
      {siteTitle}
    </Link>
    <img
      alt="Gatsby logo"
      height={20}
      style={{ margin: 0 }}
      src="data:image/svg+xml,%3Csvg fill='none' viewBox='0 0 107 28' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3CclipPath id='a'%3E%3Cpath d='m0 0h106.1v28h-106.1z'/%3E%3C/clipPath%3E%3Cg clip-path='url(%23a)'%3E%3Cg fill='%23000'%3E%3Cpath clip-rule='evenodd' d='m89 11.7c-.8 0-2.2.2-3.2 1.6v-8.10005h-2.8v16.80005h2.7v-1.3c1.1 1.5 2.6 1.5999 3.2 1.5999 3 0 5-2.2999 5-5.2999s-2-5.3-4.9-5.3zm-.7 2.5c1.7 0 2.8 1.2 2.8 2.8s-1.2 2.8-2.8 2.8c-1.7 0-2.8-1.2-2.8-2.8s1.1-2.8 2.8-2.8z' fill-rule='evenodd'/%3E%3Cpath d='m71.2 21.9999v-7.6h1.9v-2.4h-1.9v-3.40005h-2.8v3.40005h-1.1v2.4h1.1v7.6z'/%3E%3Cpath clip-rule='evenodd' d='m65.6999 12h-2.9v1.3c-.8999-1.5-2.4-1.6-3.2-1.6-2.9 0-4.8999 2.4-4.8999 5.3s1.9999 5.2999 5.0999 5.2999c.8 0 2.1001-.0999 3.1001-1.5999v1.3h2.7999zm-5.1999 7.8c-1.7001 0-2.8-1.2-2.8-2.8s1.2-2.8 2.8-2.8c1.7 0 2.7999 1.2 2.7999 2.8s-1.1999 2.8-2.7999 2.8z' fill-rule='evenodd'/%3E%3Cpath d='m79.7001 14.4c-.7-.6-1.3-.7-1.6-.7-.7 0-1.1.3-1.1.8 0 .3.1.6.9.9l.7.2c.1261.0472.2621.0945.4037.1437.7571.2632 1.6751.5823 2.0963 1.2563.3.4.5 1 .5 1.7 0 .9-.3 1.8-1.1 2.5s-1.8 1.0999-3 1.0999c-2.1 0-3.2-.9999-3.9-1.6999l1.5-1.7c.6.6 1.4 1.2 2.2 1.2s1.4-.4 1.4-1.1c0-.6-.5-.9-.9-1l-.6-.2c-.0687-.0295-.1384-.0589-.2087-.0887l-.0011-.0004c-.6458-.2729-1.3496-.5704-1.8902-1.1109-.5-.5-.8-1.1-.8-1.9 0-1 .5-1.8 1-2.3.8-.6 1.8-.7 2.6-.7.7 0 1.9.1 3.2 1.1z'/%3E%3Cpath d='m98.5 20.5-4.8-8.5h3.3l3.1 5.7 2.8-5.7h3.2l-8 15.3h-3.2z'/%3E%3Cpath d='m47 13.7h7c0 .0634.01.1267.0206.1932.0227.1435.0477.3018-.0206.5068 0 4.5-3.4 8.1-8 8.1s-8-3.6-8-8.1c0-4.49995 3.6-8.09995 8-8.09995 2.6 0 5 1.2 6.5 3.3l-2.3 1.49995c-1-1.29995-2.6-2.09995-4.2-2.09995-2.9 0-4.9 2.49995-4.9 5.39995s2.1 5.3 5 5.3c2.6 0 4-1.3 4.6-3.2h-3.7z'/%3E%3C/g%3E%3Cpath d='m18 14h7c0 5.2-3.7 9.6-8.5 10.8l-13.19995-13.2c1.1-4.9 5.5-8.6 10.69995-8.6 3.7 0 6.9 1.8 8.9 4.5l-1.5 1.3c-1.7-2.3-4.4-3.8-7.4-3.8-3.9 0-7.29995 2.5-8.49995 6l11.49995 11.5c2.9-1 5.1-3.5 5.8-6.5h-4.8z' fill='%23fff'/%3E%3Cpath d='m6.2 21.7001c-2.1-2.1-3.2-4.8-3.2-7.6l10.8 10.8c-2.7 0-5.5-1.1-7.6-3.2z' fill='%23fff'/%3E%3Cpath d='m14 0c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm-7.8 21.8c-2.1-2.1-3.2-4.9-3.2-7.6l10.9 10.8c-2.8-.1-5.6-1.1-7.7-3.2zm10.2 2.9-13.1-13.1c1.1-4.9 5.5-8.6 10.7-8.6 3.7 0 6.9 1.8 8.9 4.5l-1.5 1.3c-1.7-2.3-4.4-3.8-7.4-3.8-3.9 0-7.2 2.5-8.5 6l11.5 11.5c2.9-1 5.1-3.5 5.8-6.5h-4.8v-2h7c0 5.2-3.7 9.6-8.6 10.7z' fill='%237026b9'/%3E%3C/g%3E%3C/svg%3E"
    />
  </header>
)

export default Header

```

# src/components/index.module.css

```css
.list {
  display: grid;
  margin: 0;
  /* https://css-tricks.com/responsive-layouts-fewer-media-queries/ */
  --w: 280px;
  --n: 2;
  gap: var(--size-gap);
  grid-template-columns: repeat(
    auto-fit,
    minmax(max(var(--w), 100%/ (var(--n) + 1) + 0.1%), 1fr)
  );
  margin-bottom: var(--size-gap);
  margin-top: var(--size-gap);
}

.listItem {
  margin: 0;
}

.listItem::marker {
  color: #e95800;
}

.listItem:nth-child(2)::marker {
  color: #159bf3;
}

.listItem:nth-child(3)::marker {
  color: #8eb814;
}

.listItem:nth-child(4)::marker {
  color: #663399;
}

.listItemLink {
  color: var(--color-primary);
  font-weight: bold;
}

.listItemDescription {
  color: var(--color-text);
  margin-bottom: 0;
  margin-top: var(--space-1);
}

.textCenter {
  text-align: center;
}

.intro {
  max-width: none;
  line-height: var(--line-height-loose);
}

```

# src/components/layout.css

```css
:root {
  --border-radius: 4px;
  --color-text: #333;
  --color-primary: #7026b9;
  --color-code-bg: #fff4db;
  --color-code: #8a6534;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  --font-mono: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  --font-lg: 18px;
  --font-md: 16px;
  --font-sm: 14px;
  --font-sx: 12px;
  --line-height-loose: 1.75;
  --line-height-normal: 1.5;
  --line-height-dense: 1.1;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 64px;
  --size-content: 54rem;
  --size-gutter: var(--space-5);
  --size-gap: var(--space-6);
}
html {
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  font: sans-serif;
  font-size: var(--font-md);
  line-height: var(--line-height-normal);
  overflow-y: scroll;
}
body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--color-text);
  font-family: sans-serif;
  font-family: var(--font-sans);
  font-weight: normal;
  margin: 0;
  word-wrap: break-word;
}
a {
  background-color: transparent;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 2px;
}
a:active,
a:hover {
  outline-width: 0;
  text-decoration: none;
}
abbr[title] {
  border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
  cursor: help;
  text-decoration: none;
}
b,
strong {
  font-weight: inherit;
  font-weight: bolder;
}
dfn {
  font-style: italic;
}
h1 {
  margin: 0;
  margin-bottom: 3rem;
  padding: 0;
  line-height: var(--line-height-dense);
  letter-spacing: -0.01em;
}
h1 > b {
  color: var(--color-primary);
}
img {
  border-style: none;
  max-width: 100%;
}
code,
kbd,
pre,
samp {
  font-family: var(--font-mono);
  font-size: 1em;
  line-height: inherit;
}
hr {
  box-sizing: content-box;
  overflow: visible;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding: 0;
  margin-bottom: calc(var(--space-4) - 1px);
  background: hsla(0, 0%, 0%, 0.2);
  border: none;
  height: 1px;
}
* {
  box-sizing: inherit;
}
*:before {
  box-sizing: inherit;
}
*:after {
  box-sizing: inherit;
}
hgroup,
img,
figure,
fieldset,
ul,
ol,
dl,
dd,
p {
  margin: 0;
  padding: 0;
  margin-bottom: var(--space-4);
}
ul,
ol {
  margin-left: var(--space-4);
  list-style-position: outside;
  list-style-image: none;
}
pre {
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: var(--space-4);
  font-size: 0.875rem;
  line-height: var(--line-height-normal);
  background: hsla(0, 0%, 0%, 0.04);
  border-radius: var(--border-radius);
  overflow: auto;
  word-wrap: normal;
  padding: var(--space-4);
}
b,
strong,
dt,
th {
  font-weight: bold;
}
li {
  margin-bottom: calc(var(--space-4) / 2);
}
ol li,
ul li {
  padding-left: 0;
}
li > ol,
li > ul {
  margin-bottom: calc(var(--space-4) / 2);
  margin-left: var(--space-4);
  margin-top: calc(var(--space-4) / 2);
}
blockquote *:last-child {
  margin-bottom: 0;
}
li *:last-child {
  margin-bottom: 0;
}
p *:last-child {
  margin-bottom: 0;
}
li > p {
  margin-bottom: calc(var(--space-4) / 2);
}
p {
  max-width: 680px;
}
code {
  font-size: 0.875rem;
}
kbd {
  font-size: 0.875rem;
}
samp {
  font-size: 0.875rem;
}
abbr {
  border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
  cursor: help;
}
acronym {
  border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
  cursor: help;
}
tt,
code {
  background-color: var(--color-code-bg);
  border-radius: var(--border-radius);
  color: var(--color-code);
  font-family: var(--font-mono);
  padding-bottom: 0.25em;
  padding-top: 0.25em;
  word-break: normal;
}
pre code {
  background: none;
}
code:before,
code:after,
tt:before,
tt:after {
  content: "\00a0";
  letter-spacing: -0.2em;
}
pre code:before,
pre code:after,
pre tt:before,
pre tt:after {
  content: none;
}

```

# src/components/layout.js

```js
// src/components/layout.js
import React from 'react'
import { Link } from 'gatsby'
import '../styles/global.css'
import Lightbox from './Lightbox'

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Isle of Skye on 2 Wheels</h1>
        <p>A photographic journey through Scotland's most breathtaking landscapes</p>
      </header>
      <main>{children}</main>
      <footer>
        <p>
          © 2025 The Bikepack Blog | Photos by Our Team |{' '}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>{' '}
          |{' '}
          <a href="#" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
        </p>
      </footer>
      <Lightbox />
    </div>
  )
}

export default Layout

```

# src/components/Lightbox.js

```js
// src/components/Lightbox.js
import React, { useEffect } from 'react'
import '../styles/global.css'

const Lightbox = () => {
  useEffect(() => {
    const lightbox = document.getElementById('lightbox')
    if (!lightbox) return

    const lightboxImg = lightbox.querySelector('img')
    const lightboxCaption = lightbox.querySelector('.lightbox-caption')
    const lightboxClose = lightbox.querySelector('.lightbox-close')
    const photoItems = document.querySelectorAll('.photo-card, .full')

    const openLightbox = (e) => {
      const item = e.currentTarget
      const fullSrc = item.dataset.full
      const alt = item.querySelector('img').alt
      const caption = item.dataset.caption || alt

      lightboxImg.src = fullSrc
      lightboxImg.alt = alt
      lightboxCaption.textContent = caption
      lightbox.classList.add('active')
      document.body.style.overflow = 'hidden'
    }

    const closeLightbox = () => {
      lightbox.classList.remove('active')
      document.body.style.overflow = ''
      setTimeout(() => {
        if (!lightbox.classList.contains('active')) {
          lightboxImg.src = ''
        }
      }, 300)
    }

    photoItems.forEach(item => {
      item.addEventListener('click', openLightbox)
    })

    lightboxClose.addEventListener('click', (e) => {
      e.stopPropagation()
      closeLightbox()
    })

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox()
      }
    })

    const escListener = (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox()
      }
    }
    document.addEventListener('keydown', escListener)

    // Cleanup on unmount
    return () => {
      photoItems.forEach(item => {
        item.removeEventListener('click', openLightbox)
      })
      lightboxClose.removeEventListener('click', closeLightbox)
      lightbox.removeEventListener('click', closeLightbox)
      document.removeEventListener('keydown', escListener)
    }
  }, [])

  return (
    <div className="lightbox" id="lightbox">
      <div className="lightbox-content">
        <button className="lightbox-close" aria-label="Close lightbox">×</button>
        <img src="" alt="Expanded image" />
        <p className="lightbox-caption"></p>
      </div>
    </div>
  )
}

export default Lightbox

```

# src/components/PhotoCard.js

```js
import React from 'react'
const PhotoCard = ({ fullSrc, caption, src, alt }) => {
  console.log('PhotoCard rendering with:', { fullSrc, caption, src, alt });
  return (
    <div className="photo-card" data-full={fullSrc} data-caption={caption}>
      <img src={src} alt={alt || caption} loading="lazy" />
    </div>
  )
}
export default PhotoCard
```

# src/components/PhotoGrid.js

```js
// src/components/PhotoGrid.js
import React from 'react'

export const PhotoGrid = ({ children }) => (
  <div className="grid">
    {children}
  </div>
)

export default PhotoGrid
```

# src/components/seo.js

```js
/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, title, children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Seo

```

# src/images/example.png

This is a binary file of the type: Image

# src/images/gatsby-icon.png

This is a binary file of the type: Image

# src/pages/404.js

```js
import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage

```

# src/pages/index.js

```js
import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const links = [
  {
    text: "Tutorial",
    url: "https://www.gatsbyjs.com/docs/tutorial",
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
  },
  {
    text: "Examples",
    url: "https://github.com/gatsbyjs/gatsby/tree/master/examples",
    description:
      "A collection of websites ranging from very basic to complex/complete that illustrate how to accomplish specific tasks within your Gatsby sites.",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    description:
      "Learn how to add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    description:
      "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
  },
]

const samplePageLinks = [
  {
    text: "Page 2",
    url: "page-2",
    badge: false,
    description:
      "A simple example of linking to another page within a Gatsby site",
  },
  { text: "TypeScript", url: "using-typescript" },
  { text: "Server Side Rendering", url: "using-ssr" },
  { text: "Deferred Static Generation", url: "using-dsg" },
]

const moreLinks = [
  { text: "Join us on Discord", url: "https://gatsby.dev/discord" },
  {
    text: "Documentation",
    url: "https://gatsbyjs.com/docs/",
  },
  {
    text: "Starters",
    url: "https://gatsbyjs.com/starters/",
  },
  {
    text: "Showcase",
    url: "https://gatsbyjs.com/showcase/",
  },
  {
    text: "Contributing",
    url: "https://www.gatsbyjs.com/contributing/",
  },
  { text: "Issues", url: "https://github.com/gatsbyjs/gatsby/issues" },
]

const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = () => (
  <Layout>
    <div className={styles.textCenter}>
      <StaticImage
        src="../images/example.png"
        loading="eager"
        width={64}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
        style={{ marginBottom: `var(--space-3)` }}
      />
      <h1>
        Welcome to <b>Gatsby!</b>
      </h1>
      <p className={styles.intro}>
        <b>Example pages:</b>{" "}
        {samplePageLinks.map((link, i) => (
          <React.Fragment key={link.url}>
            <Link to={link.url}>{link.text}</Link>
            {i !== samplePageLinks.length - 1 && <> · </>}
          </React.Fragment>
        ))}
        <br />
        Edit <code>src/pages/index.js</code> to update this page.
      </p>
    </div>
    <ul className={styles.list}>
      {links.map(link => (
        <li key={link.url} className={styles.listItem}>
          <a
            className={styles.listItemLink}
            href={`${link.url}${utmParameters}`}
          >
            {link.text} ↗
          </a>
          <p className={styles.listItemDescription}>{link.description}</p>
        </li>
      ))}
    </ul>
    {moreLinks.map((link, i) => (
      <React.Fragment key={link.url}>
        <a href={`${link.url}${utmParameters}`}>{link.text}</a>
        {i !== moreLinks.length - 1 && <> · </>}
      </React.Fragment>
    ))}
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

```

# src/pages/page-2.js

```js
import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const SecondPage = () => (
  <Layout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const Head = () => <Seo title="Page two" />

export default SecondPage

```

# src/pages/using-ssr.js

```js
import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const UsingSSR = ({ serverData }) => {
  return (
    <Layout>
      <h1>
        This page is <b>rendered server-side</b>
      </h1>
      <p>
        This page is rendered server side every time the page is requested.
        Reload it to see a(nother) random photo from{" "}
        <code>dog.ceo/api/breed/shiba/images/random</code>:
      </p>
      <img
        style={{ width: "320px", borderRadius: "var(--border-radius)" }}
        alt="A random dog"
        src={serverData.message}
      />
      <p>
        To learn more, head over to our{" "}
        <a href="https://www.gatsbyjs.com/docs/reference/rendering-options/server-side-rendering/">
          documentation about Server Side Rendering
        </a>
        .
      </p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export const Head = () => <Seo title="Using SSR" />

export default UsingSSR

export async function getServerData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breed/shiba/images/random`)
    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}

```

# src/pages/using-typescript.tsx

```tsx
// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, Link, graphql, HeadFC } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

type DataProps = {
  site: {
    buildTime: string
  }
}

const UsingTypescript: React.FC<PageProps<DataProps>> = ({
  data,
  location,
}) => (
  <Layout>
    <h1>
      Gatsby supports <b>TypeScript by default</b>
    </h1>
    <p>
      This means that you can create and write <code>.ts/.tsx</code> files for
      your pages, components, and <code>gatsby-*</code> configuration files (for
      example <code>gatsby-config.ts</code>).
    </p>
    <p>
      For type checking you'll want to install <code>typescript</code> via npm
      and run <code>tsc --init</code> to create a <code>tsconfig</code> file.
    </p>
    <p>
      You're currently on the page <code>{location.pathname}</code> which was
      built on {data.site.buildTime}.
    </p>
    <p>
      To learn more, head over to our{" "}
      <a href="https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/">
        documentation about TypeScript
      </a>
      .
    </p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const Head: HeadFC<DataProps> = () => <Seo title="Using TypeScript" />

export default UsingTypescript

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`

```

# src/styles/blog.css

```css
/* src/styles/blog.css */

.post-header h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  .post-meta {
    font-size: 1rem;
    color: var(--text-color);
  }
  
  .post-content p {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
  
  /* Include any additional styling from your HTML file as needed */
  
```

# src/styles/global.css

```css
:root {
    --primary-color: #2a6496;
    --secondary-color: #f8f9fa;
    --text-color: #333;
    --accent-color: #e63946;
    --transition: all 0.3s ease;
    --font-family: 'Cormorant Garamond', serif;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: var(--font-family);
    line-height: 1.6;
    color: var(--text-color);
    background-color: #fff;
    font-weight: 500;
  }
  
  header {
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url('https://picsum.photos/id/1018/1600/900') center/cover no-repeat;
    color: white;
    text-align: center;
    padding: min(15vh, 12rem) 1rem;
    position: relative;
  }
  
  header h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 0.5rem;
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  header p {
    font-size: clamp(1rem, 2vw, 1.4rem);
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
  
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  section {
    margin-bottom: 4rem;
  }
  
  h2 {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
  }
  
  h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: var(--accent-color);
    border-radius: 2px;
  }
  
  p {
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .photo-card {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: var(--transition);
    position: relative;
    aspect-ratio: 1;
    background-color: #eee;
  }
  
  .photo-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
  }
  
  .photo-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  .photo-card:hover img {
    transform: scale(1.05);
  }
  
  .full {
    margin: 2.5rem 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    aspect-ratio: 2 / 1;
    background-color: #eee;
  }
  
  .full img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
  }
  
  .full:hover img {
    transform: scale(1.02);
  }
  
  footer {
    text-align: center;
    padding: 3rem 1rem;
    background: var(--secondary-color);
    margin-top: 4rem;
    border-top: 1px solid #e1e4e8;
  }
  
  footer p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }
  
  footer a {
    color: var(--primary-color);
    text-decoration: none;
    transition: var(--transition);
  }
  
  footer a:hover {
    text-decoration: underline;
  }
  
  /* Lightbox Styles */
  .lightbox {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    padding: 2rem;
  }
  
  .lightbox.active {
    opacity: 1;
    pointer-events: auto;
  }
  
  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .lightbox img {
    max-width: 100%;
    max-height: 85vh;
    border-radius: 4px;
    box-shadow: none;
    object-fit: contain;
  }
  
  .lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: transparent;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
  }
  
  .lightbox-caption {
    color: white;
    margin-top: 1rem;
    font-size: 1rem;
    text-align: center;
    max-width: 80%;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 1rem;
    }
    
    .section {
      margin-bottom: 3rem;
    }
  }
  
  @media (max-width: 480px) {
    main {
      padding: 1.5rem 1rem;
    }
    
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
  }
  
```

# src/templates/blog-post.js

```js
// src/templates/blog-post.js
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import '../styles/blog.css'
import '../styles/global.css'

// This version works with gatsby-plugin-mdx v4+ which uses MDX v2
export default function BlogPost({ data, children }) {
  const post = data.mdx
  return (
    <Layout>
      <article>
        <header className="post-header">
          <h1>{post.frontmatter.title}</h1>
          <p className="post-meta">{post.frontmatter.date}</p>
        </header>
        <section className="post-content">
          {/* In newer versions of gatsby-plugin-mdx, the rendered content is passed as children */}
          {children}
        </section>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
```

# src/templates/using-dsg.js

```js
import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const UsingDSG = () => (
  <Layout>
    <h1>
      Hello from a <b>DSG Page</b>
    </h1>
    <p>This page is not created until requested by a user.</p>
    <p>
      To learn more, head over to our{" "}
      <a href="https://www.gatsbyjs.com/docs/reference/rendering-options/deferred-static-generation/">
        documentation about Deferred Static Generation
      </a>
      .
    </p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const Head = () => <Seo title="Using DSG" />

export default UsingDSG

```

