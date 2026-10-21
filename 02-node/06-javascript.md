



# Closures
 
Functions using variables from outside their scope (with memory)
 
```js
function greeter() {
  const greeting = "Hello";
 
  function greet(name) {
    return greeting + ", " + name + "!";
  }
 
  return greet;
}
 
const sayHello = greeter();
console.log(sayHello("Ada")); // Hello, Ada!
```
 
## Each call gets its own version
 
```js
function makeGreeter(greeting) {
  return function (name) {
    return greeting + ", " + name + "!";
  };
}
 
const sayHi = makeGreeter("Hi");
const sayHowdy = makeGreeter("Howdy");
 
console.log(sayHi("Ada"));     // Hi, Ada!
console.log(sayHowdy("Ada"));  // Howdy, Ada!
console.log(sayHi("Grace"));   // Hi, Grace!
```
 
## Now in middleware
 
- `logging` runs once, with `next` as a parameter
- The inner function uses `next` (and remembers it)
```js
function logging(next) {
  return function (request) {
    console.log("Request:", request.method);
    const response = next(request);
    console.log("Response:", response.status);
    return response;
  };
}
 
const app = logging(router);
```


# Arrow Form

```js
function double(x) {
  return x * 2;
}

const double = x => x * 2;
```

## Function returning a function

```js
function makeAdder(amount) {
  return function (x) {
    return x + amount;
  };
}

const addFive = makeAdder(5);
console.log(addFive(3)); // 8
```

Curried form is a function that takes the arguments one at a time. Needs to be at least two chained.