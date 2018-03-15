# Sykkelstativer

## Forutsetning
1. [Node.js v8.10.0](https://nodejs.org/en/download/) Utviklingsplatform for javascript applikasjoner
2. [Yarn v1.5.1](https://yarnpkg.com/lang/en/docs/install/) Packet Manager
3. API nøkkelen legges inn på apikey.js som en variabel med navn apikey som eksporteres ut
```
const apikey = '1234567890abcdefgh';
```

## Teknologistack
* Yarn som packet manager
* Babel som oversetter fra ES6
* Webpack som bundler
* Webpack-dev-server
* MaterialUI for design

Det er mulig at applikasjonen fungerer med npm også, men ikke testet.

## Kjør:
1. Git clone repoet eller last ned og pakk ut.
2. ```yarn install``` for å laste ned alle pakkene
3. ```yarn dev``` for å start webpack dev server. Den kjøres på http://localhost:8080/

![Screenshot](https://github.com/unwill/bikes/blob/master/docs/sykkelstativer.png)


