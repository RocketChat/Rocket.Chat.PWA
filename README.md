# Rocketchat Pwa

Rocketchat progressive web app built on Angular and apollo graphql stack using angular CLI.

* works with [Rocket.chat graphQL server](https://github.com/RocketChat/Rocket.Chat/pull/8158) 

* run client:
Requirements:
```bash
npm install -g yarn
yarn install
```

* mock server requires mongo for the accounts 
* mock users to login with: 
  * username: eitan pass: eitan
  * username: tomer pass: tomer
* run client & mock server:
```bash
yarn start
```
* build production ready PWA with service worker support:
```bash
yarn build 
```
* additional scripts in `package.json`
