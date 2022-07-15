---
title: Module scoped styling in Angular 13
description: Styling applications can get technical at times especially if it is large with many modules. Learn how to style based on the scope of Angular modules.
published: true
readTime: 3
seo:
  keywords:
    - style angular module
    - scss angular modules level
    - css module scope
category:
  - angular
  - tutorials
image:
  source: https://images.unsplash.com/photo-1584345513379-1d2d4529be26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1040&q=80
  alt: man looking through sniper scope
publishedDate: July 15, 2022
lastModifiedDate: July 15, 2022
---

Angular convention provides us with the concept of modules typically used for grouping features in our applications. I heavily rely on this and as such, get into the dilemma of styling those modules when I want each module to have global styles that only affect all components in that particular module.  
This article shows various ways of achieving module scoped styling in Angular.  
You can <a href='blog/module-scoped-styling-in-angular-13#demo-link'>jump to the stackblitz demo</a> to check it out.
## Application architecture
Firstly, let me describe the application architecture for these use cases.
We have an angular 13 application in a stackblitz which has the `app module` and 3 lazy-loaded modules with 2 components in each module.
The `styles.scss` global stylesheet has the style below which is applied across the entire application
```css
body {
  color:red
}
```
I will be using the colors of the paragraphs to show how you can leverage module scoped styling and what it entails.  
Currently, this is what the color of the paragraphs in all components look like
![module-one-first.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1651176501201/sikx3y_wY.png )
![module-one-second.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1651176589975/2lk46Nfet.png )
![module-two-first.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1651176600585/vT37LB-d1.png )
![module-two-second.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1651176649523/Mss7tv3rX.png )
![module-three-first.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1651176671634/iTMiVUvUu.png )
![module-three-second.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1651176679168/N2bDwm_FG.png )

## Solution 1: Using the `:host` selector in the stylesheet of the module component
With this method, the `:host` selector is used to style the host element(`app-module-one`) and then the children(components) of the parent host element inherit the css property. The `:host` selector can also be combined with other selectors if you want to style the descendants of the host element.  
We add this in `module-one.component.scss`

```css
:host {
  color: blue;
}
``` 
And now, every component in module one gets the styles
![module-one-first-after.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1651177059171/DTJPS98Jz.png )
![module-one-second-after.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1651177069883/Wyt350W-J.png )

You can add more properties relating to font, background color e.t.c... that you want applied to all components of the module. Ideally inheritable css properties.

## Solution 2: Creating a separate stylesheet for modules and importing it in components you need it in
It may be preferred to use an entirely separate stylesheet which is added in the `styleUrls` array of the components the styles should be applied to.  
We'll create a stylesheet called `module-two-styles.scss` in the `module-two` directory (so it's easy to find) and add the style below. 
```css
/* module-two-styles.scss */

p {
  color: green;
}
``` 
We're simply styling the `p` tag by giving the color property a value of `green`.  
Then import the `module-two-styles.scss` in the `first.component.ts`, `second.component.ts` and `module-two.component.ts` files in `module-two` folder.  
```js
/* module-two/first/first.component.ts */

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss','../module-two-style.scss']
})
``` 
<br />

```js
/* module-two/second/second.component.ts */

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss','../module-two-style.scss']
})
``` 
<br />

```js
/* module-two/module-two.component.ts */

@Component({
  selector: 'app-module-two',
  templateUrl: './module-two.component.html',
  styleUrls: ['./module-two.component.scss','module-two-style.scss']
})
``` 
<br />

Now this will only apply the style to the components you imported the stylesheet into. 
![module-two-first-after.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1651178105909/b6Il_YH6K.png )
![module-two-second-after.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1651178112205/zeloQU74G.png )

> Some reasons for doing this is sometimes, you may be working in a codebase that has the potential to be largely refactored while you're working on something or maybe you want to create some sort of easily manageable distinction between your styles and the ones that were already in the existing project and cannot afford to tamper with the global stylesheet as you consider the time constraints involved.  

### Tip for using `styleUrls`
*The position of the stylesheet paths in the `styleUrls` array matters. Stylesheets get overridden by other stylesheets that come after them in the array.*  

## Demo<a id='demo-link' style="position: relative;top: -110px;"></a>
Here is a stackblitz that contains a demo for the article. You can quickly explore and experiment more style properties.
<iframe src="https://stackblitz.com/edit/angular-ivy-987gd3?embed=1&file=src/app/app.component.html" style="width:100%" width="100%" height="500"></iframe>

Thank you for reading 

Feel free to leave suggestions or questions in the comment especially if you have challenges with styling your application a certain way. Also share the article if you gained something or feel it was helpful.
### Connect
If you would like to connect with me, I'm available on;
- Discord: `brunoelo#8120`
- Twitter: [BrunoElo](https://twitter.com/brunoelo)