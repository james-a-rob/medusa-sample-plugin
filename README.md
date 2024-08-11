## Overview
An intetionally simple Medusa JS plugin. Useful for learning how Medusa plugins are built and as a starting point to create your own.

This plugin enables Youtube videos to be added to product pages via the admin dashboard.

## Includes
  - [Admin UI widget](src/admin/widgets/product-video.tsx)
  - [New entity in DB](src/models/product-video.ts)
  - [Service to query DB](src/services/product-video.ts)
  - [Admin endpoints](src/api/admin/product-video/[productId]/route.ts)
  - [Store endpoint](src/api/store/product-video/[productId]/route.ts)
  - [Tests for backend](src/services/__tests__/video.spec.ts) 
  - [Test for admin UI widget](src/admin/__tests__/widgets/product-video.spec.tsx) 
  - [Working build and bundle config](package.json)

## 
<img src="medusa-sample-plugin.gif " width="100%" >


## Usage
Plugin can be added to a Medusa backend in [the usual way](https://docs.medusajs.com/development/plugins/create#plugin-options).
medusa-config.js

```
const plugins = [
  // ...
  {
    resolve: `medusa-sample-plugin`,
    options: {
      enableUI: true,
    },
  },
]
```