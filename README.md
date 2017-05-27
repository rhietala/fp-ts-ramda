Functional programming with TypeScript and Ramda
================================================

[![Sponsored by Leonidas](https://img.shields.io/badge/sponsored%20by-leonidas-389fc1.svg)](https://leonidasoy.fi/opensource)

First-class and higher-order functions
--------------------------------------

> [First-class functions] means the language supports passing functions as
> arguments to other functions, returning them as the values from other
> functions, and assigning them to variables or storing them in data structures.
> [[Wikipedia]](https://en.wikipedia.org/wiki/First-class_function)

> Higher-order functions are functions that can either take other functions as
> arguments or return them as results.
> [[Wikipedia]](https://en.wikipedia.org/wiki/Functional_programming#First-class_and_higher-order_functions)

Examples that TypeScipt (and JavaScript) has first-class functions (assigning a
function to variable and passing it them as an argument to another function):

```typescript
const ascending = (a: number, b: number): number =>
  a - b;
const descending = (a: number, b: number): number =>
  b - a;
const reverse = (a: number, b: number): number =>
  1;
```

```typescript
> [5, 6, 2, 3, 9].sort(ascending);
[ 2, 3, 5, 6, 9 ]
> [5, 6, 2, 3, 9].sort(descending);
[ 9, 6, 5, 3, 2 ]
> [5, 6, 2, 3, 9].sort(reverse);
[ 9, 3, 2, 6, 5 ]
```

[Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort?v=example)
The standard probably doesn't guarantee that the array is always traversed in the
same direction, so reversing might not work with that function on all inputs and
implementations.

Immutability
------------

> In object-oriented and functional programming, an immutable object (unchangeable
> object) is an object whose state cannot be modified after it is created. This
> is in contrast to a mutable object (changeable object), which can be modified
> after it is created.
>
> ...
>
> Immutable objects are also useful because they are inherently thread-safe.
> Other benefits are that they are simpler to understand and reason about and offer
> higher security than mutable objects.
>
> [[Wikipedia]](https://en.wikipedia.org/wiki/Immutable_object)

TypeScript (JavaScript) standard library doesn't emphasize immutability, but
rather for example array methods mutate their input in-place, such as sort:

```typescript
> // Using ascending and reverse from previous examples
>
> const arr: number[] = [5, 6, 2, 3, 9];
> const sorted: number[] = arr.sort(ascending);
> sorted
[ 2, 3, 5, 6, 9 ]
> const reversed: number[] = arr.sort(reverse);
> reversed
[ 9, 6, 5, 3, 2 ]
> arr
[ 9, 6, 5, 3, 2 ]
> sorted
[ 9, 6, 5, 3, 2 ]
```

Note that the `const` keyword doesn't restrict mutating the array contents.

Ramda functions always return an altered copy of the input data and don't
mutate the input:


```typescript
> // Using ascending and reverse from previous examples
>
> import * as R from 'ramda';
> const arr: number[] = [5, 6, 2, 3, 9];
> const sorted: number[] = R.sort(ascending, arr);
> sorted
[ 2, 3, 5, 6, 9 ]
> const reversed: number[] = R.sort(reverse, arr);
> reversed
[ 9, 3, 2, 6, 5 ]
> arr
[ 5, 6, 2, 3, 9 ]
> sorted
[ 2, 3, 5, 6, 9 ]
```

Pure functions, side-effects
----------------------------

> Pure functions (or expressions) have no side effects (memory or I/O). This means
> that pure functions have several useful properties, many of which can be used
> to optimize the code:
>
> * If a pure function is called with arguments that cause no side-effects, the
>   result is constant with respect to that argument list (sometimes called
>   referential transparency), i.e. if the pure function is again called with the
>   same arguments, the same result will be returned (this can enable caching
>   optimizations such as memoization).
> * If there is no data dependency between two pure expressions, then their order
>   can be reversed, or they can be performed in parallel and they cannot
>   interfere with one another (in other terms, the evaluation of any pure
>   expression is thread-safe).
> * ...
>
> [[Wikipedia]](https://en.wikipedia.org/wiki/Functional_programming#Pure_functions)

Examples of a impure functions (first good, second bad):

```typescript
const getTime = (): number =>
  (new Date()).getTime();

const sortAscendingImpure = (arr: number[]): number[] =>
  arr.sort(ascending);
```

And a pure ones:

```typescript
const timeToString = (t: number): string =>
  (new Date(t)).toJSON();

const sortAscendingPureJS = (arr: number[]): number[] =>
  arr.slice().sort(ascending);

const sortAscendingPureR = (arr: number[]): number[] =>
  R.sort(ascending, arr);
```

Executing the impure function will yield a different result with the same parameters
(`getTime()` returns the time of execution) or have side-effects
(`sortAscendingImpure()` will change its input array):

```typescript
> getTime()
1495883083794
> getTime()
1495883084546

> const arr = [5, 6, 2, 3, 9];
> const sorted = sortAscendingImpure(arr);
> sorted
[ 2, 3, 5, 6, 9 ]
> arr
[ 2, 3, 5, 6, 9 ]
```

Where as the pure function will return the same result with same parameters and
don't have side-effects (input array stays the same):

```typescript
> timeToString(1495883083794);
'2017-05-27T11:04:43.794Z'
> timeToString(1495883083794);
'2017-05-27T11:04:43.794Z'
> timeToString(1495883084546);
'2017-05-27T11:04:44.546Z'

> const arr = [5, 6, 2, 3, 9];
> const sorted1 = sortAscendingPureJS(arr);
> sorted1
[ 2, 3, 5, 6, 9 ]
> arr
[ 5, 6, 2, 3, 9 ]

> const sorted2 = sortAscendingPureR(arr);
> sorted2
[ 2, 3, 5, 6, 9 ]
> arr
[ 5, 6, 2, 3, 9 ]
```

The pure function can be replaced with a cached version without affecting its
execution:

```typescript
const timeToStringMemoized = (t: number): string =>
    (t === 1495883083794) ? '2017-05-27T11:04:43.794Z' :
    (t === 1495883084546) ? '2017-05-27T11:04:44.546Z' :
    '';
```

Luckily the user doesn't need values for any other inputs:

```typescript
> timeToStringMemoized(1495883083794);
'2017-05-27T11:04:43.794Z'
> timeToStringMemoized(1495883083794);
'2017-05-27T11:04:43.794Z'
> timeToStringMemoized(1495883084546);
'2017-05-27T11:04:44.546Z'
```

Reading input and writing output are impure by nature. Pure functions should be
written whenever possible.

[Copying array by value in JavaScript](https://stackoverflow.com/questions/7486085/copying-array-by-value-in-javascript)

Running the tests
-----------------

You can solve the exercises and execute

    npm run test

to get results. It will stop on the first failing exercise. If you want to skip
some exercises, you can add `.skip` to the test's `it`-call, for example:

    it.skip('returns a list of surnames', () => {

will let you continue with the next exercise.

To run the exercises automatically whenever you save changes to a file, execute

    npm run test:watch


types
=====

* basic types
* type aliases
* interfaces
* optional types
* union types

https://www.typescriptlang.org/docs/handbook/basic-types.html
https://www.typescriptlang.org/docs/handbook/advanced-types.html

lambda
======

- square
- lessThan

map & forEach
=============

- square
http://randycoulman.com/blog/2016/05/24/thinking-in-ramda-getting-started/


filter & find
=============

- lessThan
- find by object value

logic: complement, both, allPass, either, anyPass
-------------------------------------------------

cond teoriassa hyvä mutta ei tyypitetty niin että sitä voisi käyttää vaikka mapin kanssa

reduce
======

- min, max, median



immutability and objects
========================
* prop
* pick
* has
* path
* propOr / pathOr
* keys / values
* assoc / assocPath
* dissoc / dissocPath / omit
* evolve
* merge

immutability and arrays
=======================

partial application
===================

- lambda calculus
curry, flip

function composition
====================

compose, pipe


pointfree style
===============

http://randycoulman.com/blog/2016/05/24/thinking-in-ramda-getting-started/
https://martinfowler.com/articles/collection-pipeline/
