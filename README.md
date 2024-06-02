<!-- <p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=dotlottie-solid&background=tiles&project=%20" alt="dotlottie-solid">
</p> -->

# dotlottie-solid

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

## Contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
* [APIs](#apis)
  * [DotLottieSolidProps](#dotlottiesolidprops)
* [Custom Playback Controls](#custom-playback-controls)
* [Listening to Events](#listening-to-events)
* [Development](#development)

## Introduction

An unofficial `Solid` library for rendering `lottie` and `dotLottie` animations in the browser.\
Use lotties in your solidjs apps, using [dotlottie-web](https://github.com/LottieFiles/dotlottie-web/blob/main/packages/web) under the hood.
Thank you @[LottieFiles](https://github.com/LottieFiles) for creating such amazing library ❤️

Now let's see how to use `dotLottie` in a solidjs app.

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

## APIs

### DotLottieSolidProps

The `DotLottieSolidProps` extends the `HTMLCanvasElement` Props and accepts all the props that the `HTMLCanvasElement` accepts. In addition to that, it also accepts the following props:

| Property name         | Type                      | Default              | Description                                                                                                                                                                                                                                           |
|-----------------------|---------------------------|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `autoplay`              | boolean                 | false                | Auto-starts the animation on load.                                                                                                                                                                                                                    |
| `loop`                  | boolean                 | false                | Determines if the animation should loop.                                                                                                                                                                                                              |
| `src`                   | string                  | undefined            | URL to the animation data ( .json  or  .lottie).                                                                                                                                                                                                      |
| `speed`                 | number                  | 1                    | Animation playback speed. 1 is regular speed.                                                                                                                                                                                                         |
| `data`                  | string \| ArrayBuffer   | undefined            | Animation data provided either as a Lottie JSON string or as an ArrayBuffer for .lottie animations.                                                                                                                                                   |
| `mode`                  | string                  | "forward"            | Animation play mode. Accepts "forward", "reverse", "bounce", "reverse-bounce".                                                                                                                                                                        |
| `backgroundColor`       | string                    | undefined            | Background color of the canvas. Accepts 6-digit or 8-digit hex color string (e.g., "#000000", "#000000FF"),                                                                                                                                           |
| `segment`               | [number, number]          | [0, totalFrames - 1] | Animation segment. Accepts an array of two numbers, where the first  number is the start frame and the second number is the end frame.                                                                                                                |
| `renderConfig`          | RenderConfig              | {}                   | Configuration for rendering the animation.                                                                                                                                                                                                            |
| `playOnHover`           | boolean                   | false                | Determines if the animation should play on mouse hover and pause on mouse out.                                                                                                                                                                        |
| `dotLottieRef`          | Setter<DotLottie \| null> | undefined            | Setter function that sets a reference to the  dotLottie web player instance.                                                                                                                                                                          |
| `useFrameInterpolation` | boolean                   | true                 | Determines if the animation should update on subframes. If set to false,  the original AE frame rate will be maintained. If set to true, it will  refresh at each requestAnimationFrame, including intermediate values.  The default setting is true. |
| `autoResizeCanvas`      | boolean                   | true                 | Determines if the canvas should resize automatically to its container                                                                                                                                                                                 |
| `marker`                | string                    | undefined            | The Lottie named marker to play.                                                                                                                                                                                                                      |

#### RenderConfig

The `renderConfig` object accepts the following properties:

| Property name      | Type   | Default                       | Description             |
|--------------------|--------|-------------------------------|-------------------------|
| `devicePixelRatio` | number | window\.devicePixelRatio \|\| 1 | The device pixel ratio. |

## Custom Playback Controls

`DotLottieSolid` component makes it easy to build custom playback controls for the animation. It exposes a `dotLottieRef` prop that can be used to set a reference to the [dotLottie](https://github.com/LottieFiles/dotlottie-web/blob/main/packages/web/README.md#apis) web player instance. This instance can be used to control the playback of the animation using the methods exposed by the [dotLottie](https://github.com/LottieFiles/dotlottie-web/blob/main/packages/web/README.md#methods) web player instance.

Here is an example:

```tsx
import Solid from 'solidjs';
import { DotLottieSolid } from 'dotlottie-solid';

const App = () => {
  const [dotLottie, setDotLottie] = Solid.createSignal(null);

  function play(){
    if(dotLottie()){
      dotLottie().play();
    }
  }

  function pause(){
    if(dotLottie()){
      dotLottie().pause();
    }
  }

  function stop(){
    if(dotLottie()){
      dotLottie().stop();
    }
  }

  function seek(){
    if(dotLottie()){
      dotLottie().setFrame(30);
    }
  }

  return (
    <DotLottieSolid
      src="path/to/animation.lottie"
      loop
      autoplay
      dotLottieRef={setDotLottie}
    />
    <div>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={stop}>Stop</button>
      <button onClick={seek}>Seek to frame no. 30</button>
    </div>
  );
};
```

You can find the list of methods that can be used to control the playback of the animation [here](https://github.com/LottieFiles/dotlottie-web/blob/main/packages/web/README.md#methods).

## Listening to Events

`DotLottieSolid` component can receive a `dotLottieRef` prop that can be used to set a reference to the [dotLottie](https://github.com/LottieFiles/dotlottie-web/blob/main/packages/web/README.md#apis) web player instance. This reference can be used to listen to player events emitted by the [dotLottie](https://github.com/LottieFiles/dotlottie-web/blob/main/packages/web/README.md#events) web instance.

Here is an example:

```tsx
import Solid from 'solidjs';
import { DotLottieSolid } from 'dotlottie-solid';

const App = () => {
  const [dotLottie, setDotLottie] = Solid.createSignal(null);

  Solid.createEffect(() => {
    function onPlay() {
      console.log('Animation start playing');
    }

    function onPause() {
      console.log('Animation paused');
    }

    function onComplete() {
      console.log('Animation completed');
    }

    function onFrameChange({ currentFrame }) {
      console.log('Current frame: ', currentFrame);
    }

    // Listen to events emitted by the DotLottie instance when it is available.
    if (dotLottie()) {
      dotLottie().addEventListener('play', onPlay);
      dotLottie().addEventListener('pause', onPause);
      dotLottie().addEventListener('complete', onComplete);
      dotLottie().addEventListener('frame', onFrameChange);
    }
  }, [dotLottie]);

  Solid.onCleanup(() => {
    // Remove event listeners when the component is unmounted.
    if (dotLottie()) {
      dotLottie().removeEventListener('play', onPlay);
      dotLottie().removeEventListener('pause', onPause);
      dotLottie().removeEventListener('complete', onComplete);
      dotLottie().removeEventListener('frame', onFrameChange);
    }
  });

  return (
    <DotLottieSolid
      src="path/to/animation.lottie"
      loop
      autoplay
      dotLottieRef={setDotLottie}
    />
  );
};
```

[dotLottie](https://github.com/LottieFiles/dotlottie-web/blob/main/packages/web/README.md#apis) instance exposes multiple events that can be listened to. You can find the list of events [here](https://github.com/LottieFiles/dotlottie-web/blob/main/packages/web/README.md#events).

## Development
```bash
# use pnpm package manager
pnpm install
pnpm dev
# build
pnpm build
```
