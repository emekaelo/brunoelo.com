---
title: How to create an Angular library or package and publish on npm
description: Libraries and packages help to abstract reusable code and improve efficiency during development. Learn how to create libraries for the Angular ecosystem.
published: true
readTime: 7
seo:
  keywords:
    - angular libraries
    - angular library tutorial
    - building angular package
    - how to create an angular package
    - create npm package using angular
    - publish angular 14 library to npm
category:
  - angular
  - tutorials
image:
  source: https://images.unsplash.com/photo-1449247666642-264389f5f5b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80
  alt: person holding package on table
publishedDate: July 19, 2022
lastModifiedDate: July 19, 2022
---

## What are libraries?
Libraries which are also known as packages are reusable codes that speed up development processes or add functionalities to our applications. They save time, energy and resources for developers.

When building an Angular application, you may find yourself rewriting functionalities you implemented across your app or projects. That can seem counter productive and a solution to that is to refactor that functionality or feature into a library which would make it more reusable, maintainable and accessible. This article shows how to create libraries or packages for the angular ecosystem. Let's begin!

![Start](https://c.tenor.com/hHtKxHoD0JcAAAAC/madara-madara-uchiha.gif)

## Requirements
- Angular framework (version 14)
- Node version ^14.15.5 || ^16.10.0

You can also check this [angular and node version compatibility table](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3) if you want to use a different angular version.
Thanks to [Lars Gyrup Brink Nielsen](https://twitter.com/LayZeeDK). Just keep in mind that libraries built with higher versions of angular are not compatible with applications built with angular versions lower than that of the library.

## Setting up the library
We will be using the Angular CLI to set up a workspace where we will build the library and an angular application where we can check out the functionalities we built for the library. Let's name the workspace `library-app` and create it with the following command:
```bash
ng new library-app
```
When it's done, you can serve your application to see it running.  
Enter the root directory of your new workspace and generate the library with the following command:
```bash
cd library-app
ng generate library ngx-stuff
```
Here, the name of our library is `ngx-stuff`. This is going to be a library that just does stuff 🤯.

![unimpressed](https://c.tenor.com/R86NN7Zz6ZIAAAAC/nice-clap.gif)
> The `ngx` prefix is a convention to denote that the library can be used with Angular.

After the command, a `projects/ngx-stuff` folder with the structure below is created in the root directory.
```bash
projects
└── ngx-stuff
    ├── src
    │   ├── lib
    │   │   ├── ngx-stuff.component.spec.ts
    │   │   ├── ngx-stuff.component.ts
    │   │   ├── ngx-stuff.module.ts
    │   │   ├── ngx-stuff.service.spec.ts
    │   │   └── ngx-stuff.service.ts
    │   ├── public-api.ts
    │   └── test.ts
    ├── .browserslistrc
    ├── tsconfig.json
    ├── karma.conf.js
    ├── ng-package.json
    ├── package.json
    ├── README.md
    ├── tsconfig.lib.json
    ├── tsconfig.lib.prod.json
    └── tsconfig.spec.json
```
The `lib` folder contains the files where the library features are built.  
The `public-api.ts` exposes the functions and utilities to be imported by other applications.  
The `package.json` records important metadata about the library and is required before publishing to NPM. It also defines functional attributes of the library that npm uses to install dependencies and identify the entry point to our package.

An `ng-packagr` library is installed in the workspace and can be seen in the `package.json` of our application.  
The build output path for the library is added to the `tsconfig.json`.  
The `angular.json` file is modified by adding configuration for the generated library which basically maps the file paths in the library folder to properties in the json file.
```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "library-app": {
      "projectType": "application",
      ...
    },
    "ngx-stuff": {
      "projectType": "library",
      "root": "projects/ngx-stuff",
      "sourceRoot": "projects/ngx-stuff/src",
      "prefix": "lib",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:ng-packagr",
          "options": {
            "project": "projects/ngx-stuff/ng-package.json"
          },
          "configurations": {
            "production": {
              "tsConfig": "projects/ngx-stuff/tsconfig.lib.prod.json"
            },
            "development": {
              "tsConfig": "projects/ngx-stuff/tsconfig.lib.json"
            }
          },
          "defaultConfiguration": "production"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "projects/ngx-stuff/src/test.ts",
            "tsConfig": "projects/ngx-stuff/tsconfig.spec.json",
            "karmaConfig": "projects/ngx-stuff/karma.conf.js"
          }
        }
      }
    }
  }
}

```
> Notice the different `projectType` for the `ngx-stuff` library and the `library-app` application

## Building features in the library
The type of functionality we want to build into a library is determined by the kind of library it is. There are component or ui libraries as well as utility libraries. Your library can also be both if you want.
### Utility feature
To build utility functions for our library, we create reusable functions in the `ngx-stuff.service.ts` file.
Let's create two functions called `doStuff` that returns the string `stuff library` and ` doStuffWithInput` that returns the string we pass to the function as an argument.
```ts
// ngx-stuff.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgxStuffService {
  constructor() {}

  doStuff(): string {
    return 'stuff library';
  }

  doStuffWithInput(input: string): string {
    return input;
  }
}
```
Now, we can instantly use these functions from the library in our application by injecting the library service as a dependency using the Angular 14 `inject()` method
```ts
// app.component.ts

import { Component, OnInit } from '@angular/core';
import { NgxStuffService } from 'projects/ngx-stuff/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'library-app';
  stuff = inject(NgxStuffService);

  ngOnInit() {
    console.log(this.stuff.doStuff());
    console.log(this.stuff.doStuffWithInput('stuff library with input'));
  }
}

```
When we run our application, we can see the values we logged out in the browser console.
![ngxstufflibraryoutput.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1657537749576/t407r2JbA.jpg)

### Component feature
To add a component feature to the library, we build the user-interface in the `ngx-stuff.component.ts
` file. We will create a reusable button that can be customized.
```ts
// ngx-stuff.component.ts

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-stuff',
  template: `
    <button class="custom" [ngClass]="customClass" [ngStyle]="customStyle">
      {{ name }}
    </button>
  `,
  styles: ['button {color: blue;} .custom{background-color: yellow}'],
})
export class NgxStuffComponent implements OnInit {
  @Input() name = 'button stuff';
  @Input() customClass: string = '';
  @Input() customStyle = {};

  constructor() {}

  ngOnInit(): void {}
}
```
The field properties in the component class are bound to the attributes in the button. These properties have the `Input()` decorator which allows the library to receive values from parent components(components where the library is imported).

To use the `ngClass` and `ngStyle` attributes, the `commonModule` package needs to be imported in the library's module.
```ts
// ngx-stuff.module.ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxStuffComponent } from './ngx-stuff.component';

@NgModule({
  declarations: [NgxStuffComponent],
  imports: [CommonModule],
  exports: [NgxStuffComponent],
})
export class NgxStuffModule {}
```

For this library component to be used in our application, we need to import the library's module in the application's NgModule.
```ts
// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStuffModule } from 'projects/ngx-stuff/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxStuffModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```
Then we use it in our template with the `ngx-stuff` selector 
```html
<!-- app.component.html -->

<ngx-stuff></ngx-stuff>
<ngx-stuff name="new button"></ngx-stuff>
<ngx-stuff name="custom class" customClass="custom-class"></ngx-stuff>
<ngx-stuff customClass="new-class more-class"></ngx-stuff>
<ngx-stuff name="custom style" [customStyle]="{backgroundColor:'white'}"></ngx-stuff>
```
The `style.css` file contains styles for the custom button
```css
/** style.css **/
.custom-class {
    border: 0;
}

.more-class {
    border: 3px solid palevioletred;
}
```
Results
![librarybuttons.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1657560334635/h1piOoB1i.jpg)

## Building the library
Notice that the import path for the library looks a bit different, that's because we are importing the library locally relative to where we want to use it in our application. However, in our `tsconfig.json`, the path has already been configured for the build path to map to a shorter string which is easier to understand.
```json
// tsconfig.json

{
  "compilerOptions": {
    ...
    "paths": {
      "ngx-stuff": [
        "dist/ngx-stuff"
      ]
    },
    ...
  },
  ...
}
```
So we'll build our library with the following command;
```bash
ng build ngx-stuff
```
Then we change the import path in our application to `ngx-stuff`
```ts
// app.component.ts

import { NgxStuffService } from 'ngx-stuff';
...
```
```ts
// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStuffModule } from 'ngx-stuff';
...
```
So now, when we make any change to the library, we need to build it first before checking it out.

## Publishing to NPM
To publish a library or package to npm, a user account on npm platform is needed. You can [sign up here](https://www.npmjs.com/signup) if you do not have an account.

Now we need to log in to our npm account via the terminal on vscode using the following command;
```bash
npm adduser
```
Answer the prompts for your username, password and email. You will also get another prompt to fill a one time password sent to your email. Once it's done, the terminal will show `Logged in as <username> on https://registry.npmjs.org/.`
You can also use the `npm whoami` command which will return your username in the terminal to verify you are logged in.

Build the library using the `ng build` command then
navigate to the build output folder using the command below 
```bash
cd dist/ngx-stuff
```
Run the command below to publish the package to npm
```bash
npm publish
```
Yay! 🥳 you just published your library.

![Enjoy](https://c.tenor.com/gfcR46X_rm8AAAAC/madara-uchiha-ninja.gif)

The published library built in this article can be found [here](https://www.npmjs.com/package/ngx-stuff).  
You can checkout [the repository for the entire project](https://github.com/BrunoElo/library-app).

## Conclusion
Libraries are essential to the software development process and I hope this article has helped you understand how to build libraries or packages in Angular. Let me know if you have any comments or suggestions in the comment section and lastly, feel free to share the article so that others can learn. Happy publishing!

### Connect
If you would like to connect with me, I'm available on;
- Discord: `brunoelo#8120`
- Twitter: [BrunoElo]('https://twitter.com/brunoelo')
