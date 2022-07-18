---
title: JavaScript concepts to remember
description: Learn useful javascript fundamentals that apply regularly when we write code 
published: true
readTime: 2
seo:
  keywords:
    - javascript concepts
    - javascript interview questions
    - things to know in javascript
    - browser execute javascript
category:
  - javascript
image:
  source: https://images.unsplash.com/photo-1456394555490-ef1bf0aedc46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80
  alt: timelapse photography of steel wool fire dancing at night
publishedDate: July 18, 2022
lastModifiedDate: July 18, 2022
---

This article is just a piece of my notepad that outlines some JavaScript concepts I don't necessarily forget but still have to check on just to be sure 😅. One reason for this post is because I am more likely to reach out for my device (and check the internet) than a physical notepad or even a note app and another reason is the ease of sharing with you.

## JavaScript Concepts
### 1. Memory Heap
An unstructured region of memory where global variables and objects are stored.
### 2. Event loop
This pulls functions out of the event or callback queue and places it in the call stack when it becomes empty.
### 3. Call Stack
This represents the single thread provided for JavaScript code execution and keeps track of the operations to be executed. Whenever a function is finished, it is popped from the stack. The stack operates in a LIFO queue where the last function call in a function gets executed first.
### 4. Event queue
This holds mostly async functions processed by the web APIs so that when they are ready to run, the event loop can pull from it and add to the callstack.

### 5. Closures
This occurs when a function is being declared and returned in another function and this is done so that the inner function can have access to the scope of the outer function even after the outer function has been executed.
### 6. Hoisting
This is the process where the JavaScript interpreter moves declaration of functions, variables or classes to the top o their scope prior to code execution
### 7. Lexical Scope
This is the region in which a block of code has access to the variables defined in that scope.
### 8. Promise
A promise is an object representing the eventual completion or failure of an asynchronous operation. It is a special JavaScript object that initially has a **pending state** with an *undefined* value which when resolved, becomes a **fulfilled state** with a *value* as the result or becomes a **rejected state** with an *error* as the result.
The promise object has methods like `then`, `catch` and `finally`.
### 9. Async/Await
These keywords make handling asynchronous code more readable. The `async` keyword makes a function return a promise while the `await` keyword suspends further JavaScript code execution until the promise resolves.