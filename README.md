# Werewolf
This is a simple werewolf web app for playing werewolf offline with friends. 
Note this is NOT an online game. The app is designed with the expectation that Players play werewolf face to face.

## Goals
- To save us money for buying a deck of werewolf cards.
- To make game moderators' lives easier and more fun.
- To make werewolf games more intractive.

## How it works
### Offline version
1. Start a game by configuring the roles to play in the game.
2. Pass the phone to the players for them to check their roles secretly.
3. The phone goes back to the game moderator and the app continues helping the mod to facilitate the game
### Online version(envisioned)
1. Create a game by typing your name and press start. This generates a game code and brings the creator to a game lobby.
2. Share the game code to other players so they can join the game via the code.
3. configure the game by setting the roles to play
4. The game creator starts the game. All players check their roles secretly on their own phone(no need to pass one phone around).
5. The game moderator(random or always the game creator) can see everyone's role and the app can help facilitate the game.

## Technologies used
- Angular 6
- Angular material
- Pwa
- Firebase realtime database

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
