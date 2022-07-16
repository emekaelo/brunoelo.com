---
title: Building password validation with strength meter in React with hooks
description: Security is a priority when building apps and you want to let users know how strong their passwords are during sign up while giving good user experience.
published: true
readTime: 5
seo:
  keywords:
    - react password validation
    - pasword validation with regex
    - react hooks password
    - client login password validation
    - user sign in password strength
    - password strength meter
    - password bar
category:
  - react
  - tutorials
image:
  source: https://images.unsplash.com/photo-1515974256630-babc85765b1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80
  alt: mustard colored safe
publishedDate: July 16, 2022
lastModifiedDate: July 16, 2022
---

## Introduction
When building applications, you cannot avoid handling authentication and one of the ways to handle authentication is by receiving user data via a sign up or registration form and such forms contain passwords. You don't just want your users to use strong passwords that meet certain criteria but also visually inform them of how strong their passwords are during account creation.  
In as much as password validation is done on the backend, the frontend validation helps guide the user in sending what the backend expects which ensures that your users as well as your systems are more secure. This article will show how to implement password validation from scratch(no library) as well as show the strength of the current password as the user types.

## Demo
Here is a stackblitz demo of what we will be building.
<iframe src="https://stackblitz.com/edit/react-ts-oa8gu4?embed=1&file=App.js" style="width:100%; height:500px;"></iframe>

## Password validation criteria
For users to fulfill our "*mysterious*"🪄 validation criteria, their passwords must contain;
- One uppercase character
- One lowercase character
- One numeric character
- One special character
- Eight or more characters

Or else,
![You shall not pass](https://media.giphy.com/media/njYrp176NQsHS/giphy-downsized-large.gif)

We will be using these regex patterns in the code snippet below to handle the validation:
```js
  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
  const eightCharsOrMore= /.{8,}/g; // eight characters or more
``` 

## Handling component state
State handling is inevitable and gladly a lot more easier with React hooks. Let's outline the states to track.
```js
  const [meter, setMeter] = React.useState(false);
  const [password, setPassword] = React.useState('');
``` 
1. `meter`: This handles the visibility of the password strength meter.

2. `password`: This takes care of the actual password the user types into the password field.

`passwordTracker`: Just a local variable that stores all the characters that pass a validation criteria as well as each criteria that they pass. It does so by storing the return value of the `match()` method(which is an array of the passing character(s)) to the property in the `passwordTracker` object  that corresponds with the validation criteria.
```js
    const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  }
```

## Password input field and strength meter
This is a simple input field with functions to execute based on browser events. When a user focuses on the field, an anonymous function sets the `meter` state to `true` thereby displaying the password strength meter and validation criteria. The `onChange` event updates the state of the actual password as the user types.

```js
       <form>
        <input
          onFocus={() => setMeter(true)}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter password...pwetty please"
          value={password}
          name="password"
        />
        {meter && (
          <div>
            <div className="password-strength-meter"></div>
            <div>
              {passwordStrength < 5 && 'Must contain '}
              {!passwordTracker.uppercase && 'uppercase, '}
              {!passwordTracker.lowercase && 'lowercase, '}
              {!passwordTracker.specialChar && 'special character, '}
              {!passwordTracker.number && 'number, '}
              {!passwordTracker.eightCharsOrGreater &&
                'eight characters or more'}
            </div>
          </div>
        )}
      </form>
``` 
In the validation criteria section, the negated value of a property is used to determine whether a criteria should be rendered or not. For example, if a password passes the `atLeastOneUppercase` regex, the value of the `uppercase` property is updated to a truthy value so that when negated(`!`), becomes `false` and does not render the `'uppercase, '` part any more. When falsy(`null`) it negates the value and becomes truthy which renders the `'uppercase, '` part letting users know that they still have to fulfill that criterion.  
Lastly, we have the `passwordStrength` variable whose value is gotten from the number of *truthy* values in `passwordTracker` object.
```js
const passwordStrength = Object.values(passwordTracker).filter(value => value).length;
```
The idea is if 3 validation criteria are passed, the corresponding properties will have truthy values while the rest have falsy values (`null`). To know the number of criteria passed, we use the `Object.values()` method on the `passwordTracker` which returns an array of *values*. Then we filter for the truthy values and then obtain the length of the array with a `.length`.  
`passwordStrength` is mainly use to determine the color and width of the password strength meter and also show or hide the `'Must contain '` part based on if all criteria are passed or not.  
With CSS-in-JS, we are able to execute javaScript in our CSS styles using [short circuit evaluation](https://en.wikipedia.org/wiki/Short-circuit_evaluation) which assigns various colors to the `background-color` property. The width of the meter is given in percentage by multiplying the ratio of the number of passed criteria(which could be 1,2,3,4 or 5) to the total number of criteria(5) by 100
```css
.password-strength-meter::before {
            content: "";
            background-color: ${
              ['red', 'orange', '#03a2cc', '#03a2cc', '#0ce052']
              [passwordStrength - 1] || ''
            };
            height: 100%;
            width: ${(passwordStrength / 5) * 100}%;
            display: block;
            border-radius: 3px;
            transition: width 0.2s;
          }
``` 

## Conclusion
It is more aesthetically pleasing and a better user experience to pinpoint the requirements a user needs to fulfill in order to navigate your app smoothly.  
I really hope you've gained some insight on this article on how to implement password validation with password strength meter. I would love to know if there are any improvements that can be made on this implementation and also if you would prefer using a library over self implementation.  

Feel free to share other implementations you have come across, suggestions, comments or questions.
Thanks for reading and happy coding.
### Connect
If you would like to connect with me, I'm available on;
- Discord: `brunoelo#8120`
- Twitter: [BrunoElo](https://twitter.com/brunoelo)