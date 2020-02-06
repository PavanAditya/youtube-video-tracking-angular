# YOUTUBE_VIDEO_TRACKING -- Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Installation

Run `npm i --save` for installing all the package files needed to run the project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Working

It uses the youtube js api to track the `onstatechange` `onError` `onReady` `onPlay` `onEnd` etc events of a youtube embed video.
It uses the document object of html(injected through constructor) and operates on the embedded video events.