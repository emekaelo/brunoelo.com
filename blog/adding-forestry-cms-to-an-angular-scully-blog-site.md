---
title: Adding Forestry CMS to an Angular Scully blog site
description: Forestry CMS is one of the easiest content management systems to get started with. It has smooth integration with sites stored in a repository.
published: true
readTime: 3
seo:
  keywords:
    - angular project
    - scully
    - ssg
    - static site generation
    - blog tutorial
    - jamstack project
    - cms
    - forestry
    - forestryio
category:
   - angular
   - forestry
   - cms
   - tutorials
image:
  source: https://images.unsplash.com/photo-1454105511235-eda89ad84214?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80
  alt: misty forest
publishedDate: July 14, 2022
lastModifiedDate: July 14, 2022
---

## Introduction
This article aims to guide you through the configuration of Forestry CMS in your angular project that is built with Scully static site generator and deployed on Netlify.
We will be using the Angular scully blog project we built in <a href="https://www.brunoelo.com/blog/creating-an-angular-blog-with-scully-and-deploying-on-netlify" target="_blank">a previous article</a>. Kindly check it out if you haven't so you can be up to speed.

## Forestry CMS
Forestry CMS is a git based headless CMS that can be used to manage content on sites stored in a repository. It makes commits and pushes to your selected repository when you save content on the CMS as well as fetching latest commits to update content on the CMS. It allows you embrace the jamstack.

## Importing our site
Since we already have a site with its repository on github, let's head over to [Forestry](https://forestry.io) and import our site by signing up.
You will be taken to a page that shows a few questions. When asked **What kinds of sites do you plan to build with Forestry?**, choose **Other** then click complete registration.  
After that step, you will be taken to the page where you can add your site. Select `Add site` at the top right corner and choose `Other` option as your static site generator then click next.

![forestrycmsstep1.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651750726958/Kzl-VvGYh.jpg )
Select your git provider for where your site's repository is stored
![forestrycmsstep2.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651750747642/_pla7ap7k.jpg )
Complete github authentication so that forestry can access your repositories. Then select the repository and branch your site is deployed from.
![forestrycmsstep3.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651750765420/lwVVd9deF.jpg )
Once it's done, you'll be taken to the forestry CMS.
![forestrycmsstep4.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651750787962/zVMMMXxJJ.jpg )
## Adding blog section on our CMS
Next, we need to configure our side bar so that the CMS can read contents from our repository. Click the `Configure side bar` button and select `add section` for our blog. Choose the `Directory` section type.  
Fill the label and content directory fields accordingly and click done then save.
![forestrycmsstep5.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651751272990/Fg4VElVj7.jpg )

Once you save, the new section appears at the left side bar and fetches the available markdown files form your repository in the directory you specified. Click on the blog section to see your content and checkout your posts.
![forestrycmsstep6.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651751559378/Xqmtk6wvC.jpg )
Click on the `create new` button and select `Blog` from the dropdown to add a new post. You'll be prompted to create a *frontmatter* template if you do not have such so let's do that.
![forestrycmsstep7.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651752038619/rX9H26F9W.jpg )

## Creating a frontmatter template
Select the *Create a new template* option, name the template and choose any template style you like.
![forestrycmsstep8.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651752331784/cq7wafrir.jpg )
Once you click the `create template` button, you can begin adding fields for your frontmatter.  
### Adding a field
Click the `Add field` button and select from a variety of field types. You can even build on your other frontmatter templates.
I've added a text field type
![forestrycmsstep10.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651752840163/3v7iTgbdD.jpg )
After adding all the fields for your frontmatter template, you can save it.

## Generating a frontmatter template
If you do not want to create templates from the beginning, you can generate one from one of your posts so it can be reused.
Select the *Create based on existing template* option, name the template and choose a post with the frontmatter you would like to replicate. 
![forestrycmsstep11.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651753590224/ywGJJadE_.jpg )
Once you click the `create template` button, it shows all the automatically created fields form the frontmatter of the post you selected. It's pretty awesome plus you can also add more fields to that template.
![forestrycmsstep12.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651753769730/CQXrL0Yu2.jpg )
Now when we create a blog and select the frontmatter template, all of the fields get rendered in the editor section.

## Media configuration
We need to tell forestry CMS where we store our media files so it knows where to save new ones we add and where it should read media files from so we can see the correct media file when updating a post.
Select `media` from the left side bar and click `change upload folder`.
Edit the upload directory to `src/assets/images` and public path to `/assets/images` then save media settings.
Select `media` from the left side bar again and you'll be able to view your media files.

## Adding a blog post
Let's make a new blog post with the generated frontmatter template. Don't forget to toggle the published button for it to appear on your blog. When you save, Forestry CMS makes a commit to your repository and creates a blog post which is saved as new markdown file.
![forestrycmsstep13a.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1651755888970/3MTIL5s2G.jpg )
Here is the [link to the new blog post](https://angular-scully-site.netlify.app/blog/forestry-cms-post) that was created with forestry CMS.

## Conclusion
Forestry CMS is packed with various functionalities that makes it easier to manage content on your site. 
 
I hope you find this article helpful and feel free to share with others or reach out if you have any questions, suggestions or comments.
Thanks for reading.

### Connect
If you would like to connect with me, I'm available on;
- Discord: `brunoelo#8120`
- Twitter: [BrunoElo]('https://twitter.com/brunoelo')