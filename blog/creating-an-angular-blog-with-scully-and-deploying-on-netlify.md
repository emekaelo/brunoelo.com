---
title: Creating an Angular blog with Scully and deploying on Netlify
description: Learn how to make your personal site from scratch using Angular and Scully. Top it up with an easy deployment via netlify.
published: true
readTime: 11
seo: 
    keywords:
        - angular project
        - scully
        - ssg
        - static site generation
        - blog tutorial
        - jamstack project
        - netlify deploy
category:
    - scully
    - tutorials
    - angular
image:
    source: /assets/images/typewriter.jpg
    alt: black and white typewriter on white table
publishedDate: May 3, 2022
lastModifiedDate: May 3, 2022
---

We'll be building a blog site with the Angular framework, Scully for static site generation(SSG) and then deploying the project on Netlify so that it can be accessible to the public.

## What this article covers
- Using Angular to build the blog architecture
- Installing Scully library to handle static site Generation
- Netlify deployment
- [Demo of this project](https://angular-scully-site.netlify.app/)
- [Repository for the demo](https://github.com/BrunoElo/angular-scully-blog)

## Setup requirements
We'll be using the following tools for this project
- Angular v13
- Tailwind
- Scully
- Node v14.15 (or higher)

[Angular](https://angular.io/) is an application design framework and development platform for creating efficient and sophisticated single-page apps. It's an opensource frontend framework built by Google.

[Scully](https://scully.io/docs/learn/overview/) is a library used for generating static sites built with Angular and ushers you into the jamstack. SSGs generate static pages when you build your project so that what you publish/deploy is the already built pages which can be indexed by google(for some of that SEO good good) and served quickly to clients. Without scully, our angular project will go through client side rendering where each page of the application that is visited is rendered by the browser at runtime.

[Tailwind](https://tailwindcss.com/) is a CSS utility library that is used to speed up the styling of applications by offering flexibility and conciseness.

Now that we have some background on the project, we can start building

![Hajime](https://tenor.com/view/denki-raiton-tsubaki-boruto-naruto-gif-23947946.gif)
## Generating the Angular project
Use the command below to generate a new angular project. You can name your project what you like. I have chosen `angular-blog`
```bash
ng new angular-blog
```
You'll see the following questions. We want routing and SCSS stylesheet format.
```bash
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS 
```
After the project has been generated, serve the application using the ng serve command
```bash
ng serve
```
You'll be greeted with the standard angular welcome template.
![Angular welcome page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/099yjy37pvsfw5hkzbc3.png)
Navigate to `app.component.html` and delete the entire content (we don't want that welcome page showing up) and then place `<router-outlet></router-outlet>` tags since this is where all our modules and components will be displayed based on the route configuration in `app.routing-module.ts`  
## Installing Scully
Run the command below to install scully and automatically make all the necessary configurations to the project
```bash
ng add @scullyio/init
```
During the installation, you'll get the question below. As at the time of this writing, `pupeteer` is the most stable renderer so we'll choose that.
```bash
? Which route renderer would you like to use?
  Scully platform server
> Puppeteer
  Playwright (beta)
```
Here is what the terminal looks like after the installation process
![scully installation terminal](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pi7xkctvf1nwvcwdpv8s.png)
The `init` schematic of the scully installation made a couple of changes which include;
- installing the pupeteer plugin
- updating the `app.module.ts` by importing the `ScullyLibModule`
- updating the package.json file with scully commands for building and serving the generated pages
```json
    "scully": "npx scully --",
    "scully:serve": "npx scully serve --"
```
- created a `scully.angular-blog.config.ts` file which is the scully configuration file.  
  
## Adding blog support to our project
Scully has a schematic for creating the blog section for our project
```bash
ng generate @scullyio/init:blog
```
This adds a lazy-loaded blog module's routes to the Angular application(`app.routing-module.ts`) and creates a `./blog` folder for the blog's markdown files(where our blog posts will live).
Below is the current route configuration in `app.routing-module.ts` updated by scully.
```js
const routes: Routes = [{
  path: 'blog',
  loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
}];
```
It also updates the `scully.angular-blog.config.ts` with the blog routes to prerender.
### A few other configurations to do
Now we have a module for our blog feature. The next things we need to do are;
- create a component for the list of blog posts using the command below
```bash
ng generate component blog/blog-list
```
- create a component that will show the actual blog post content using the command below
```bash
ng generate component blog/blog-post
```
Fix up our route configuration in `blog.routing.module.ts` as below
```js
const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {path: ':slug', component: BlogPostComponent},
      {path: '', component: BlogListComponent}
      ]
  }
];
```

Lastly, we add the `<router-outlet></router-outlet>` in the `blog.component.html` to handle routing in the module.This page will display the blog list and blog posts based on the route configuration in `blog-routing.module.ts`  
## Configuring the route entry point for scully
After sorting out the module for our blog feature, we need to create an entry point for scully (typically the home page of our app). It is suitable to leverage the Angular lazy-loaded module feature for our app home page because this part of our app is separate from the blog part. 
Create a `home module` with the following command:
```bash
ng generate module home --route=home --module=app-routing
```
This updates the route configuration in `app-routing.module.ts` with the path for the `home module`. Set its path to an empty string.  
```js
const routes: Routes = [
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  { path: '**', redirectTo: 'blog', pathMatch: 'full' },
];
```
You can always add a redirect below the route configuration for the blog module if you don't want the home page to be accessed yet.
```js
{path:'',redirectTo:'blog',pathMatch:'full'},
```
## Building the Angular-Scully app 
After all those configurations, we need to build our project with Angular, build with Scully then serve the built project on the Scully server but first, let's restart the Angular server.  
Build the project by running
```bash
ng build
```
Then we build with scully using
```bash
npx scully
```
We can also modify the `build` command in our `package.json` so that it will run the two previous commands.
```bash
"build": ng build && npm run scully -- --scanRoutes
```
Now we can use `npm run build` to achieve the same thing.
After those two commands, a `dist` folder is created in the root directory of our project. This folder contains the two built versions of our site, The folder named `angular-blog` is the one built by Angular while the one named `static` contains the static pages generated by scully.
Now, we can start the scully server using the command:
```bash
npx scully serve
```
After the server starts successfully, navigate to [http://localhost:4200/blog](http://localhost:4200/blog) to see the angular app running, then in a separate tab, open this link [http://localhost:1668/blog](http://localhost:1668/blog) to see the static site. You browser should show a white page with the text `blog-list works!`.  
To check our actual blog post (created by the `init:blog` schematic) go to the markdown file in the `blog` folder and copy the value of the `slugs` property in the frontmatter.
```md
---
title: 2022-04-29-blog
description: 'blog description'
published: false
slugs:
    - ___UNPUBLISHED___l2kp8pyl_z4RfUZ7hSOMdOfldi8yqeZcOKuebIId2
---
```
That is the current path(generated by scully) to the blog post when `published: false`. It's a private route to your blog post when it's still in draft version so you can share with anyone to get an article review before publishing. When you are ready to publish the post, you can set `published: true` and remove the `slugs` property which will allow scully use the file name(without the extension) as its path when it generates the static pages.  

Go to address bar of the tab serving the static site and paste the slug after [http://localhost:1668/blog/](http://localhost:1668/blog/) then press enter. You should see the content of the blog post.
![static site blog post](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rf3wfuygpj88j1am5q7j.png)
Now, we have confirmed that our blog feature is fully functional so next up is to add more blog posts.
## Creating blog posts
We can create a blog post with the command below. The `name` option takes the name of your post.
```bash
ng generate @scullyio/init:post --name="Post 1"
```
This creates a markdown file in the `blog` folder.
When we open the newly created markdown file, we see this
```md
---
title: Post 1
description: blog description
published: false
---

# Post 1

```
As you now know, the content between the three dashes is the frontmatter and below the frontmatter is the blog content.  
The frontmatter is where we can add information about the post such as metadata, SEO e.t.c.
Let's update this markdown file to look like this
```md
---
title: Post 1
description: blog description
published: true
image: /assets/images/enigma.jpg
seo: {
metaDescription: First post for my angular scully blog,
metaTitle: First post
},
---

# Post 1

```
I have added an image in the corresponding directory which I'll render in post.
When we're satisfied with our markdown file, we can build with the `npx scully` command.
### The right build command
> `ng build` is only needed when you modified something in your angular app. The scully config file, plugins, and eventual markdown files are not part of your Angular app. Although this may seem evident, if this is your first time using Scully it is easy to rebuild Angular even if it is not needed. When writing Scully plugins OR modifying your blog's markdown files, you DO NOT need to ng build the app each time you re-run Scully. Again, ng build Angular only if the Angular app changes 

## Showing all blog posts
Let's head over to `blog-list.component.ts` to work out the logic that handles data for the component.
In this component, we will inject the `ScullyRoutesService` as a dependency which will give us access to the blog posts routes.
```js
import { Component, OnInit } from '@angular/core';
import {ScullyRoute, ScullyRoutesService} from "@scullyio/ng-lib";
import {Observable} from "rxjs";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  links$: Observable<ScullyRoute[]> = this.scully.available$;

  constructor(private scully: ScullyRoutesService) { }

  ngOnInit(): void {
    this.getPublishedPosts();
  }

  getPublishedPosts() {
    this.links$ = this.links$.pipe(tap(val) => console.log(val))
  }
}
```
What we want to render are the published posts, that's why we get the published routes from the `available$` property on the `ScullyRoutesService`.  
In the `blog-list.component.html` we can build the template that shows all blog posts. We'll work with the code below for now.
```html
<div>
  <ul>
    <li *ngFor="let post of links$ | async">
    <a [href]="post.route">{{post.title}}</a>
    </li>
  </ul>
</div>
```
After you save, you should see an array of two routes in the console. We can't see any blog posts route yet because we haven't built with scully after changing the `published` property to `true`.  
Let's ensure that the `published` property in our markdown files are set to `true` then build with scully to update our published routes.
Now when we reload, we should see an array of 4 routes in the console. However, since we only want blog posts routes, we'll need to transform our data with some rxjs.
Let's update the `getPublishedPosts` function
```js
getPublishedPosts() {
    this.links$ = this.links$.pipe(map((links) => links.filter((link) =>
      link.route.startsWith('/blog/'))),tap((val) => console.log(val)));
  }
```
To ensure the scully version of our site is updated, let's run the command:

```bash
npm run build
```
Now we should have our page like this.
![blog posts](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0dwoi9jkr9o4kbo7212o.png)
You can click on the links to see that they show the corresponding posts.
## Accessing the data in the blog post page
We can get the route data of a particular page we navigate to with the help of the `ScullyRoutesService` by subscribing to the observable returned by the `getCurrent()` method.
Add the code below to the `blog-post.component.ts`
```js
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScullyRoute, ScullyRoutesService} from "@scullyio/ng-lib";
import {Subject, takeUntil} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {
  currentRoute: ScullyRoute = {} as ScullyRoute;
  onDestroy$ = new Subject<void>();

  constructor(private scully: ScullyRoutesService) {
  }

  ngOnInit(): void {
    this.getCurrentPost()
  }

  getCurrentPost() {
    this.scully.getCurrent()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((routeData: ScullyRoute) => {
        this.currentRoute = routeData;
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
```
Details of our current route is assigned to `this.currentRoute` property and this allows us use the route data for that particular post the way we want.

## Styling our blog
Firstly, we need to create another component which will be our reusable component for the blog cards. Use the command:
```bash
ng generate component blog/blog-list/blog-card
``` 
Open the `blog-card.component.html` and place the code below inside it
```html
<li *ngFor="let post of links$ | async">
    <a [href]="post.route">{{post.title}}</a>
</li>
```
Then we make use of this component in our `blog-list.component.html` via the `app-blog-card` selector in this way

```html
<div>
  <ul>
    <app-blog-card [post]="post" *ngFor="let post of links$ | async"></app-blog-card>
  </ul>
</div>
```
We are also passing each route object in the array as `post` through the `app-blog-card` component therefore, we will need to receive this data from the parent component(`blog list`) in our child component (`blog card`) using the `Input()` decorator.
Let's do that by putting the code below in the `blog-card.component.ts`
```js
import {Component, Input, OnInit} from '@angular/core';
import {ScullyRoute} from "@scullyio/ng-lib";

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
  @Input() post: Partial<ScullyRoute> = {};

  constructor() { }

  ngOnInit(): void {
  }
}
```
### Finally, some styling
You can use any styling format you want. I'll be using tailwind.
Let's use the straightforward [tailwind documentation](https://tailwindcss.com/docs/guides/angular) to configure it in our project.
After the configuration is done, we'll need to restart the angular server.
Update the `blog-card.component.html` with the new template below
```html
<li class="h-full">
  <a [href]="post.route" class="h-full w-full lg:max-w-full lg:flex hover:bg-gray-100">
    <div
      class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      [style.background-image]="'url(' + (post['image'] || 'https://images.unsplash.com/photo-1496494118863-9cf5d1e70cd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80') + ')'"
      title="Mountain">
    </div>
    <div
      class="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400  rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div class="mb-8">
        <div class="text-gray-900 font-bold text-xl mb-2">{{post.title}}</div>
        <p class="text-gray-700 text-base">{{post['seo']?.metaDescription || post['description']}}</p>
      </div>
    </div>
  </a>
</li>
```
Also update the `blog-list.component.html`
```html
<div>
  <ul class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5">
    <app-blog-card [post]="post" *ngFor="let post of links$ | async"></app-blog-card>
  </ul>
</div>
```
The code below adds a header to our site. Add it in `app.component.html`
```html
<nav class="flex flex-wrap items-center justify-between bg-gray-800 p-6 w-full">
  <div>
    <a class="text-white no-underline hover:text-white hover:no-underline" routerLink="/">
      <span class="text-2xl">Angular scully blog</span>
    </a>
  </div>
  <ul class="list-reset flex justify-end flex-1 items-center">
    <li class="mr-3">
      <a class="inline-block text-white no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
         routerLinkActive="" routerLink="/blog">blog</a>
    </li>
  </ul>
</nav>
<router-outlet></router-outlet>
```
Now we have a nice user interface that shows all blog post
![blog list ui](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yy6x0oplntelflicrwez.png)
Let's add the code below for the blog post user interface(`blog-post.component.html`)
```html
<main class="mx-auto max-w-screen-sm max-w-screen-lg">
   <img [src]="currentRoute['image'] || 'https://cdn.mos.cms.futurecdn.net/4uiRZ5nNAgpHSifSjaKwcC-970-80.jpg.webp'"
      alt="nft"/>
   <h3>ScullyIo content</h3>
   <hr>
   <!-- This is where Scully will inject the static HTML -->
   <scully-content></scully-content>
   <hr>
   <h4>End of content</h4>
</main>
```
![blog post ui](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s44w8lma0mmbj0ha76im.png)
Finally, use the `npm run build` command to build the project and checkout the scully static version in your browser.
## Pushing to Github
Create a repository on [Github](github.com) and then copy the remote url (`https://github.com/<github-username>/<repository-name>.git`) so that we can add it for our project using the command below:
```bash
git remote add origin https://github.com/<github-username>/<repository-name>.git
```
Rename the branch to `main` with the command below:
```bash
git branch -M main
```
Push to github with the command below:
```bash
git push origin main
```
Here's a link to the [repository for this article demo](https://github.com/BrunoElo/angular-scully-blog).

## Deploying to Netlify
After pushing our Angular Scully blog to github, we are ready to deploy on Netlify. If you do not have an account yet, you can [signup here](https://app.netlify.com/signup) or go ahead and log in to your account if you have one.  
Choose import from git
![import from git](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mi2uk2v6ay84fkotmtiq.png) 
Select Github
![create site on netlify](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vttrs4mfnsvk5cwbrwli.png)
Connect the repository you want to deploy. You may need to configure netlify for your github account if it has not been setup. This is needed for netlify to have access to the repository
![connect repo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6162j679b1im5b05rn1a.png)
Provide the path to the folder where the scully generated static pages are as well as the build command  
![deploy site](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fopcljobmo13vwgtaie3.png)
Click the `Deploy site` button and watch as netlify builds your project.
Congratulations on making it to the end and have fun personalising your site as you like.
<img src="https://tenor.com/view/naruto-kakashi-dance-dancing-happy-gif-4899160.gif" style="width:35%;">
Here's a link to the [deployed site](https://angular-scully-site.netlify.app/)
## Conclusion
I do hope this article has been helpful in guiding you through creating your blog site with Angular and scully from scratch.
You can leave questions or suggestions in the comments or reach out to me on twitter [@BrunoElo](https://twitter.com/BrunoElo) if you like. Thanks for reading!
