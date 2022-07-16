---
title: Adding Netlify CMS to an Angular Scully blog site
description: Netlify CMS provides an efficient way to manage content on a blog. It integrates well with contents written in markdown that is stored in repository.
published: true
readTime: 5
seo: 
    keywords:
        - angular project
        - scully
        - ssg
        - static site generation
        - blog tutorial
        - jamstack project
        - netlify deploy
        - cms
category:
    - angular
    - netlify
    - cms
    - tutorials
image:
    source: https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80
    alt: man using laptop
publishedDate: July 13, 2022
lastModifiedDate: July 13, 2022
---

## Introduction
This article aims to guide you through the configuration of netlify CMS in your angular project that is built with Scully static site generator and deployed on Netlify.
We will be using the Angular scully blog project we built in <a href='https://brunoelo.com/blog/creating-an-angular-blog-with-scully-and-deploying-on-netlify' target='_blank'>a previous article</a>. Kindly check it out if you haven't so you can be up to speed.
## Demo
Here is the final result of what we will be building
-  [CMS demo](https://angular-scully-site.netlify.app/admin) for [Angular-Scully blog](https://angular-scully-site.netlify.app)
- [Github repository](https://github.com/BrunoElo/angular-scully-blog)

### Netlify CMS
This is a git-based CMS that allows us manage the content of our applications that are stored in repositories on any of the version control platforms such as Github, Bitbucket or Gitlab. It supports a variety of file formats like markdown, JSON, YAML and TOML.  
Now that we have some background with the tools we are using, let's begin
![doctor strange ready](https://tenor.com/view/benedict-cumberbatch-dr-strange-doctor-dtrange-protect-power-gif-16748773.gif)

## Adding Netlify CMS to your Angular-Scully app
In the `src` folder in your app, create a folder named `admin` which will contain two files namely; `index.html` and `config.yml`.
```bash
src
 └ admin
     ├ index.html
     └ config.yml
``` 

The `src/admin/index.html` is the file which loads/fetches the admin panel that handles access to the netlify CMS app for your your site while the `src/admin/config.yml` handles Netlify CMS configuration.  
Add the code snippet below to the `src/admin/index.html`

```html
<!-- src/admin/index.html -->

<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

The code snippet above is just basic html page that loads the actual admin page from a CDN.

Here is a sample configuration for the `config.yml`. It is also important to go through the [configuration docs](https://www.netlifycms.org/docs/add-to-your-site/#configuration) for more insight on what these settings do. Add this snippet below or customise to fit your use case.

```yaml
# src/admin/config.yml

backend:
  name: git-gateway
  branch: main # Branch to update (optional; defaults to master)

media_folder: "src/assets/images" # Media files will be stored in the repo under assets/images
public_folder: "/assets/images" # The src attribute for uploaded media will begin with /assets/images

collections:
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "blog" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    #slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - {label: "Layout", name: "layout", widget: "hidden", default: "blog"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Description", name: "description", widget: "string"}
      #- {label: "Slug", name: "slug", widget: "string"}
      - {label: "Published", name: "published", widget: "boolean", default: true}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Post Image", name: "image", widget: "image"}
      - {label: "Rating (scale of 1-5)", name: "rating", widget: "number"}
      - {label: "Body", name: "body", widget: "markdown"}
``` 

Include the `src/admin` directory of the Netlify CMS in your `angular.json` file so that the files can be included in the build directories of your static site.

```json
"projects": {
    "angular-blog": {
      ...
      "architect": {
        "build": {
          ...
            "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/admin"
            ],
            ...
          },
          ...
      }
    }
  },
``` 

When you run the command `npm run build` you should see the `admin` directory in the `dist` folder:

```bash
dist
├ angular-blog
|    └ admin
|        ├ index.html
|        └ config.yml
└ static
     └ admin
          ├ index.html
          └ config.yml
``` 

## Netlify CMS authentication
### Authentication on Netlify web app (the backend)
#### Steps to enable Identity and Git Gateway
- Log into your netlify web app platform
- Once you get to your dashboard, click on **sites** tab
- Select the site you want to enable netlify identity for
- Click **site settings** tab
- Click on **Identity** on the left side tab
- Click the **Enable Identity** button
- Under **Registration Preferences**, click **Edit settings** and choose **Invite only** option. (For the sake of the demo, I have left mine as open)
- If you would like to enable third-party login, add a provider in the **External providers** section.
- Scroll down to **Git Gateway** in the **Services** section and click the **Enable Git Gateway** button.

### Authentication in your app (the frontend)
We need to add the Netlify Identity Widget which basically handles the interface needed to connect to the backend we configured in the previous step. To include the widget, add the `script` tag below in the `head` of your CMS index file at `src/admin/index.html` and also in the `head` of your main index file `src/index.html`.

```html
<!-- src/admin/index.html -->

<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
``` 
<br />

```html
<!-- src/index.html -->

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularBlog</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <app-root></app-root>
</body>
</html>

``` 
<br />

> When a user logs in with the Netlify Identity widget, an access token directs to the site homepage. In order to complete the login and get back to the CMS, redirect the user back to the `/admin/` path. To do this, add the following script before the closing body tag of your site's main index page:
>```js
><script>
>  if (window.netlifyIdentity) {
>    window.netlifyIdentity.on("init", user => {
>      if (!user) {
>        window.netlifyIdentity.on("login", () => {
>          document.location.href = "/admin/";
>        });
>      }
>    });
>  }
></script>
>``` 

Push your code to your github repo which will trigger a build process on netlify.
## Accessing the CMS in your browser
You can access your site's CMS at `yoursite.com/admin/`  
Checkout the [CMS demo](https://angular-scully-site.netlify.app/admin) for [Angular-Scully blog](https://angular-scully-site.netlify.app). Click login with Netlify Identity and choose Sign up so you can create an account to access the CMS.  
Please be good and have fun posting. Thank you for reading.

## Reference
- [Netlify documentation for adding Netlify CMS to your site](https://www.netlifycms.org/docs/add-to-your-site/)

### Connect
If you would like to connect with me, I'm available on;
- Discord: `brunoelo#8120`
- Twitter: [BrunoElo](https://twitter.com/brunoelo)