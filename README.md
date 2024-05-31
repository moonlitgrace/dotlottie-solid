<!-- <p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=dotlottie-solid&background=tiles&project=%20" alt="dotlottie-solid">
</p> -->

# dotlottie-solid

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

An unofficial Solid library for rendering lottie and dotLottie animations in the browser. 

## Installation

```bash
npm install dotlottie-solid
```

## Usage

```tsx
import type { Component } from 'solid-js';
import { DotLottieSolid } from 'dotlottie-solid';

const App: Component = () => {
  return (
    <DotLottieSolid
      src="path/to/animation.lottie"
      loop
      autoplay
    />
  );
};
```
