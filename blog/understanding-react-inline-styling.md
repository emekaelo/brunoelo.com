---
title: Understanding React Inline Styling
description: Applying inline styles to your react apps is one of the various ways of styling an application. Know when to use this approach and when it might not be advisable.
published: true
readTime: 5
seo:
  keywords:
    - react
    - react inline styles
    - css styles
    - styling in react
    - styling react apps
    - scalability of inline styles
    - styling react commponents
category:
  - react
image:
  source: https://images.unsplash.com/photo-1670057037226-b3d65909424f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80
  alt: react code snippet
publishedDate: Jan 10, 2023
lastModifiedDate: Jan 10, 2023
---

# Understanding React Inline Styling
When building React applications, there may be a need to make it aesthetically pleasing and easy to use by beautifying the user interface or improving the user experience. This is known as styling React applications which can be an enjoyable part of building software. There are various ways to style React applications which includes;

- Inline style
- External stylesheet
- CSS in JS
- CSS Modules
- Styled Components

This article explains how to apply Inline styles to React applications which will improve the overall user experience of your application so let’s get started.
![Ready](https://media.giphy.com/media/2y98KScHKeaQM/giphy.gif)

## What is inline styling in React?

To easily grab the concept of inline styling in react, let us take a look at what inline styling itself means. Inline styling is a way of adding CSS properties to HTML elements by specifying it in the opening tag of that element using the `style` attribute. With this understanding, we can easily relate inline styling in React to be a styling method where we add the CSS properties to the opening tag of [JSX elements](https://reactjs.org/docs/introducing-jsx.html) using the `style` attribute.

## How do you use inline style in React?

Inline styling in React elements involves using the style attribute on the opening tag of the element. This style attribute accepts a JavaScript object with properties that represent CSS properties as well as the corresponding acceptable values that the CSS properties allow.
>Talk is cheap. Show me the code - Linus Tovald

```js
const Button = () => {
  return(
      <button style={{backgroundColor: 'yellow'}}>Click me</button>
  )
}
```
  

Curly braces are used in JSX to enclose JavaScript expressions. In the snippet above, the object `{backgroundColor: 'yellow'}` is passed to the `style` attribute and since it’s a JavaScript expression, it is wrapped with `{}` which gives it the double curly braces (`{{}}`) look. More CSS properties can be added to the object and separated with a `,`  
  

### Camel cased property names

CSS properties that are compound names (with two or more words) like `background-color` or `animation-play-state` are written in camel case convention as `backgroundColor` and `animationPlayState` respectively.

  
## When to use inline styles in React?

If you are wondering when to use inline styles in react well, wonder no more as this article takes you through scenarios where React inline styles are applied.
 ![Figuring out](https://media.giphy.com/media/5Yuns41MqUi4qPt4gF/giphy-downsized.gif)

### Styling react components

Inline styles have been proven as a useful way to react components while keeping all style information directly in the component rather than an external stylesheet.

```js
const Button = () => {
	const btnStyle = {
	    backgroundColor: 'yellow',
	  };

  return <button style={btnStyle}>Click me</button>;
};
```
This way, I have all my styles and JSX in one file so it is quite easier to focus on this file when making modifications to the component.

### Customization and reusability

React applications can be viewed as a larger component made up of smaller components of which some are similar. This promotes the concept of reusable components or reusable styles from a style perspective. Take for instance two buttons with similar base styles and a slight variation.

```js
const Buttons = () => {
  const btnStyle = {
    backgroundColor: 'yellow',
  };
  const newBtnStyle = {...btnStyle, border:'none'}

  return (
    <div>
      <button style={btnStyle}>Click me</button>
      <button style={newBtnStyle}>Click me</button>
    </div>
  );
};
```
The buttons in the snippet above are based off of the same base style `btnStyle`. The second button reuses the `btnStyle` and builds on it to create a style variation where the button has no border.

  
### Flexibility and Dynamicity

Due to React being a popular library for making dynamic single page applications, we can leverage this dynamicity and apply it to our styles to produce *reactive* styles.

```js
const SpecialButton = () => {
  const [changeBg, setChangeBg] = React.useState(true)
  const btnStyle = {
    backgroundColor: changeBg ? '#7c3aed' : 'yellow',
    color: changeBg ? '#ffffff' : 'black',
    fontWeight: 700,
    border: 'none',
    padding: '.8rem 1.5rem',
    borderRadius: '.5rem',
    boxShadow: `${changeBg ? '4px 4px' : '2px 2px'} 0 #000`,
    cursor: 'pointer'
  };

  return (
    <div>
      <button style={btnStyle} onMouseEnter={() => {setChangeBg(prevState => !prevState)}} onMouseLeave={() => {setChangeBg(prevState => !prevState)}}>Click me</button>
    </div>
  );
};
```

The code uses the `useState` React hook to handle the dynamic changes of the button properties. Other properties of the button change based on the value of `changeBg`

## See it in action
<iframe src="https://stackblitz.com/edit/react-ts-vxdttm?embed=1&file=App.tsx" style="width:100%; height:500px;"></iframe>

  
## Scalability of inline styles in React

When it comes to scalability, best practices should be considered as well as the use case in your application. For a use case where the react component or element to be styled needs heavy customization, then inline styling might not be the best approach as you might find yourself trying to individually manage a lot of moving parts which could make your component look bloated. However, if the component has minor customizations which will not hamper readability, then inline styles can be utilized.

  
## Pros and Cons of React inline styling?

### Pros

- Quick and easy to style elements…initially
- Allows for dynamic styling based on state change.
- Can be used to override styles due to having the highest style precedence.
- Removes the need for an external file for styles.

### Cons

- External style files have lower priority than inline styles. This means that you could unintentionally overwrite styles.
- Responsiveness cannot be implemented as it doesn’t support media queries.
- Due to the recalculation of the style object with each rerender, it can adversely impact performance.
- There is no support for pseudo classes like `:hover`, `:focus` , `:nth-of-type` e.t.c.
- Can be difficult to maintain due to not being readable as inline styles become more complex.
- Not reusable and therefore introduces repetition as each style declaration is written for individual elements.

## Best way to style React apps

Decisions like this will be greatly influenced by the scope of the component you are trying to design. If it’s going to be a simple component, inline styling can be adopted for tht use case else If the component has high complexities then it’s best to go for other approaches other than the inline styling.

## Conclusion

In this article, you have learnt how to use inline styling and also seen scenarios where inline styling can be utilized. We have also highlighted the pros and cons of using the inline style approach and thins to consider when making that decision.

Inline styling has its strengths and weaknesses just like every other programming design paradigms and the corresponding trade-offs they offer. Project planning and scoping of components can help you decide when to use it and when not to. Also remember that regardless of the approach you start with, you can always refactor when you realize a more suitable approach.

![That's all](https://media.giphy.com/media/vqc5QFwjjcxMoRGD1N/giphy.gif)

Thank you for reading 

Feel free to leave suggestions or questions in the comment and kindly share the article if you gained something or feel it was helpful.

## Recommended resource

<iframe width="560" height="315" src="https://www.youtube.com/embed/RlYzuMumkYY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/4f8XUfk6GHI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


### Connect
If you would like to connect with me, I'm available on;
- Discord: `brunoelo#8120`
- Twitter: [BrunoElo](https://twitter.com/brunoelo)
