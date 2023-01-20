<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

# Paso N°1 - INSTALAR DEPENDENCIAS 
```bash
$ npm i
```

# Comandos basicos

#### levantar el servidor de desarrollo

```bash
$ npm run start:dev
```
#### Generar migracion para la base de datos

```bash
$ npm run migrations:create <path>/tablename
```
#### Ejecutar migraciones

```bash
$ npm run migrations:up
```
#### Mostrar migraciones pendientes
```bash
$ npm run migrations:show
```


# Estructura de carpetas 

### Vista general de la estructura de carpetas

```
|-- docker
    |-- dev
    |-- prod
    |-- qa
|-- src
    |-- components
    |-- configs
    |-- helpers
    |-- middlewares
    |-- migrations
    |-- shared
``` 

# docker
Esta carpeta tendra los archivos de configuracion de docker, para generar diferentes tipos de ambiente en docker por ejemplo dev, prod, qa etc.

```
|-- docker
    |-- dev
        |-- docker-compose.yml
        |-- Dockerfile
    |-- prod
        |-- docker-compose.yml
        |-- Dockerfile
    |-- qa
        |-- docker-compose.yml
        |-- Dockerfile
```

# src 
Esta carpeta tendra la estructura de carpetas de nuestra aplicacion, dentro de esta carpeta se encontraran las carpetas de configuracion, helpers, middlewares, migrations, shared y components.

```
|-- src
    |-- components
    |-- configs
    |-- helpers
    |-- middlewares
    |-- migrations
    |-- shared
```

# Components 
Esta carpeta tendra los modulos de nuestra aplicacion, cada modulo tendra su propia carpeta con su respectivo nombre, dentro de esta carpeta se encontraran los archivos de configuracion de dicho modulo, dentro la misma crearemos una subcarpeta que tendra por nombre el tipo del archivo que estemos creando, los unicos archivos que dejaremos fuera de carpetas serian routes, controller, service.

```
|-- components
    |-- users
        |-- entities
            |-- user.entity.ts
        |-- repositories
            |-- user.repository.ts
        |-- Exceptions
            |-- user.exception.ts
        |-- Interfaces
            |-- user.interface.ts
        |-- user.controller.ts
        |-- user.routes.ts
        |-- user.service.ts
```
# configs 
Esta carpeta tendra los archivos de configuracion de nuestra aplicacion, como por ejemplo el archivo de configuracion de la base de datos, envs etc.

```
|-- configs
    |-- database.config.ts
    |-- envs.config.ts
```


# Helpers 
Esta carpte tendra los archivos/modulos de ayuda para nuestra aplicacion, como por ejemplo modulos que podriamos reutilizar en otros modulos.

```
|-- helpers
    |-- email
        |-- email.service.ts
```

# middlewares 
Esta carpeta tendra los archivos middlewares de nuestra aplicacion, como por ejemplo el middleware de autenticacion, en caso de ser necesario crear una subcarpeta con el nombre del middleare y dentro poner los archivos que pertenecen al mismo.

```
|-- middlewares
    |-- auth
        |-- auth.middleware.ts
```

# migrations
Esta carpeta tendra los archivos de migraciones de nuestra base de datos, es necesario crear una subcarpeta con el nombre del modulo al que pertenece la migracion y dentro de la carpeta generar el archivo de migracion

```
|-- migrations
    |-- users
        |-- 1621231231231-create_table_user.ts
        |-- 1625342231231-alter_table_user_add_profile_column.ts
```

# shared
Esta carpeta tendra archivos que podremos reutilizar para complementar alguna parte de nuestro codigo, por ejemplo, interfaces, enums, exceptions generales, etc.

```
|-- shared
    |-- enums
        |-- general.enum.ts
    |-- exceptions
        |-- general.exception.ts
    |-- interfaces
        |-- general.interface.ts

```