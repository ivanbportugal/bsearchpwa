# Bible Search, PWA

## Demo
https://bsearch.ivanportugal.com/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2. (with `--service-worker` option)

- Angular 5
- Angular Material

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

However, you should use the proxy config and point to the server to avoid CORS errors. you may have to change the `proxy.config.json` file to point to the live API.

```
ng serve --disable-host-check --proxy-config proxy.config.json
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

