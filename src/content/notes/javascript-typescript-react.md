---
title: "JavaScript, TypeScript & React"
description: "A condensed set of web-development concepts I have worked through and want to keep practicing."
topic: "Web Development"
order: 11
featured: false
draft: false
---

A condensed set of web-development concepts I have worked through and want to keep practicing.

## JavaScript foundations

### Arrays and objects

Arrays hold ordered collections. Objects hold named properties.

```js
const skills = ["Python", "Linux", "Git"];
const user = { name: "Mika", learning: true };
```

### Functions

Functions package reusable behavior.

```js
function greet(name) {
  return `Hello ${name}`;
}
```

### Destructuring

Destructuring extracts values from objects/arrays.

```js
const { name, learning } = user;
```

### Modules

Modules let code expose and import specific functionality instead of putting everything in one file.

## Asynchronous JavaScript

Promises represent work that will complete later.

`async` / `await` makes promise-based code easier to read.

```js
async function loadData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

The important lesson is that network operations can fail and loading/error states are part of the UI design.

## TypeScript

TypeScript adds static type information to JavaScript.

Topics I have studied:

- interfaces and type aliases
- unions
- narrowing
- generics
- validating data at boundaries

Types help communicate intent, but external data still needs runtime validation.

## React

Core concepts:

- components
- props
- state
- rendering lists
- keys
- forms
- controlled inputs
- loading/error states
- accessibility

### Props vs state

Props are values passed into a component.

State is data the component owns and can change over time.

## Accessibility

Accessibility should be part of component design, not an afterthought.

Useful habits:

- semantic HTML
- labels for form controls
- keyboard support
- readable focus states
- meaningful button text

## Main lesson

Modern front-end work is not only visual design. It combines state, asynchronous data, types, errors, accessibility, and predictable component boundaries.
