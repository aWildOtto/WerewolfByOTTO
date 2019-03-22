# Werewolf
This is a simple werewolf web app for playing werewolf with friends. The app provides a platform to resolve the restrictions using game cards. This game can be played anywhere with anybody. It is multi-language supported (English and Chineses) which overcomes the language barriers.

Note this is NOT an online game. The app is expected the players to interact face to face.

## Goals
- To save money for buying a deck of werewolf cards.
- To make it easier for game moderators to track the status of each player and remaining skills for the special characters.
- To save the current game state, and continue to play next time.
- To make werewolf games more interactive.

## How it works
### Offline version
1. Start a game by configuring the roles to play in the game.
2. Pass the phone to other players to check their roles secretly.
3. The phone goes back to the game moderator and the app continues helping the moderator to facilitate the game.
### Online version
1. The game creator should type the name and press start to generates a game code and enter the game lobby.
2. Share with other players so they can join this game via the code.
3. Configure the game by setting the roles.
4. The game creator starts the game. 
5. All players check their roles secretly on their own phones (no need to pass one phone around).
#### ---------------TO BE IMPLEMENTED---------------------------
5. The game moderator can be randomly selected or always is the game creator.
6. The game moderator can see every player's role and the app can help facilitate the game. 
7. More roles with specific skills. 

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
