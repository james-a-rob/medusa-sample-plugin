## Overview
An intetionally simple Medusa JS plugin. Useful for learning how Medusa plugins are built and as a starting point to create your own.

Plugin allows Youtube video to be displayed on product pages.

## Includes
  - Admin UI widget
  - New entity in DB
  - CRUD admin operations
  - Endpoint to make video available on a storefront
  - tests examples

## 
IMAGE/GIF
Go to youtube vide -> grab video id -> add to product via dashboard -> see video in storefront



## Usage

### Config to add to backend Medusa project using plugin
medusa-config.js

`` 
const plugins = [
  // ...
  {
    resolve: `medusa-sample-plugin`,
    options: {
      // other options
      enableUI: true,
    },
  },
]
``

### Example Showing video in a storefront
``
calling the store endpoint
fetch('store/video-embed/product-id')
``
product-page.ts
``
<iframe width="420" height="315"
src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>
``
