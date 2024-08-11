## Overview
An intetionally simple Medusa JS plugin. Useful for learning how Medusa plugins are built and as a starting point to create your own.

This plugin enables Youtube videos to be added to product pages via the admin dashboard.

## Includes
  - Admin UI widget [Link to code]
  - New entity in DB
  - Service to query DB
  - Admin endpoints
  - Store endpoint
  - Tests for backend and admin UI widget 
  - Working build and bundle config

## 
![gif](medusa-sample-plugin.gif)


## Usage
Plugin can be added to a Medusa backend in the usual way. Link to docs
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