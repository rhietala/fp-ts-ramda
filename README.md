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

Examples that JavaScript has first-class functions. First assigning a function to a
variable:

```typescript
const ascending = (a: number, b: number): number =>
  a - b;
const descending = (a: number, b: number): number =>
  b - a;
const reverse = (a: number, b: number): number =>
  1;
```

[Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort?v=example)
takes a function as argument. It will sort the array according to the given sorting
function (ie. passing function as an argument to another) .

```typescript
> [5, 6, 2, 3, 9].sort(ascending);
[ 2, 3, 5, 6, 9 ]
> [5, 6, 2, 3, 9].sort(descending);
[ 9, 6, 5, 3, 2 ]
> [5, 6, 2, 3, 9].sort(reverse);
[ 9, 3, 2, 6, 5 ]
```

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

JavaScript standard library doesn't emphasize immutability. On the contrary, for
example array methods, such as `sort` mutate their input in-place:

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

If we'd want sorted, reversed and the original array in different variables,
this is not the way to go.

Note that even when the variable is `const`, mutating array contents is ok:

> The const declaration creates a read-only reference to a value. It does not
> mean the value it holds is immutable, just that the variable identifier cannot
> be reassigned. For instance, in the case where the content is an object, this
> means the object's contents (e.g. its parameters) can be altered.
> [[MDN]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

[Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice?v=example)
can be used to copy an array, so adding that would work.
[Copying array by value in JavaScript](https://stackoverflow.com/questions/7486085/copying-array-by-value-in-javascript)


```typescript
> // Using ascending and reverse from previous examples
> const arr: number[] = [5, 6, 2, 3, 9];
> const sorted: number[] = arr.slice().sort(ascending);
> sorted
[ 2, 3, 5, 6, 9 ]
> const reversed: number[] = arr.slice().sort(reverse);
> reversed
[ 9, 3, 2, 6, 5 ]
> arr
[ 5, 6, 2, 3, 9 ]
> sorted
[ 2, 3, 5, 6, 9 ]
```

Ramda functions (such as [R.sort](http://ramdajs.com/docs/#sort)) always return
an altered copy of the input data and don't mutate the input:


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

Examples of a impure functions:

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

Running the tests
=================

You can solve the exercises and execute

    npm run test

to get results. It will stop on the first failing exercise. If you want to skip
some exercises, you can add `.skip` to the test's `it`-call, for example:

    it.skip('returns a list of surnames', () => {

will let you continue with the next exercise.

To run the exercises automatically whenever you save changes to a file, execute

    npm run test:watch


Types in TypeScript
===================

Type annotations and compile-time type checking
-----------------------------------------------




Basic types
-----------

* Boolean: `boolean`
* Number: `number`
* String: `string`
* Array: `[]` or `Array<type>` variable-length lists with elements of the same type
* Tuple: `[type, type]` fixed-length lists with predefined types for each element
* Enum: `enum type {a, b, c}` names for a set of numeric values
* Any: `any` value can be anything
* Void: `void` no type
* Null: `null` null value
* Undefined: `undefined` undefined value

[TypeScript handbook: Basic types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

Simple basic types:

```typescript
const valid: boolean = true;
const pi: number = 3.14159;
const hello: string = 'Hello world!';
const numbers: number[] = [5, 6, 2, 3, 9];
const personRow: [string, string, number] = ['John', 'Doe', 1901];
```

> Enum is a way of giving more friendly names to sets of numeric values:

```typescript
> enum Color { Red, Green, Blue }
> const red: Color = Color.Red;
> const green: Color = Color.Green;
> red
0
> green
1
```

Any will let you type something that requires typing quickly and should maybe be used
also on external inputs when you can't be sure that the input is what's specified.
This way you'll have to do checks for the input to get it into correct format.

```typescript
const double: (input: any) => number | undefined =
  (input) => {
    if (typeof input !== 'number') {
      return undefined;
    }

    return number * 2;
  }
```

Void means that there is no type. This usually occurs in functions that don't return a
value:

```typescript
const log: (input: string) => void =
  (input) => {
    console.log(input);
    // no return here
  }
```

Null and undefined are types for their respective JavaScript values `null` and `undefined`.

Interfaces
----------

> In object-oriented programming, a protocol or interface is a common means for unrelated
> objects to communicate with each other. These are definitions of methods and values which
> the objects agree upon in order to co-operate.
> [[Wikipedia]](https://en.wikipedia.org/wiki/Protocol_(object-oriented_programming))

As most simple, an interface is type definition for an object where defined keys
will have value of certain type:

```typescript
interface Person {
  readonly firstName: string;
  readonly middleName?: string;
  readonly lastName: string;
  readonly birthYear: number;
}

const john: Person = { firstName: 'John', middleName: 'Richard', lastName: 'Doe', birthYear: 1901 };
const jane: Person = { firstName: 'Jane', lastName: 'Doe', birthYear: 1901 };
```

`?` in the interface property name will make it optional. That way the definition of `jane`
doesn't have to include middleName:

```typescript
> john.middleName
'Richard'
> jane.middleName
undefined
```

`readonly` attribute will prevent mutating the object property, and because mutation is bad,
these should be used:

```typescript
> john.firstName = 'Jonathan';
⨯ Unable to compile TypeScript
[eval].ts (1,6): Cannot assign to 'firstName' because it is a constant or a read-only property. (2540)
```

`readonly` is not enough to prevent mutating arrays, but there is `ReadonlyArray`
type for that. However, as all libraries use normal array types, using `ReadonlyArray`s will
probably create more problems than solve.

For typing objects that are used as associative arrays / maps / dictionaries (where keys
are not known at compile-time), TypeScript has *indexable types*:

```typescript
interface PostalCodes {
  readonly [index: string]: number[];
}

const codes: PostalCodes = {
  'Tampere': [33100, 33200],
  'Ivalo': [99800, 99801]
};
```

[TypeScript handbook: Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

Optional and union types
------------------------


Generics and type casting
-------------------------

https://www.typescriptlang.org/docs/handbook/advanced-types.html

Note about typing functions with arrow notation
-----------------------------------------------

There are two ways to write types that both have reasonable benefits over the other.

Types on the "lambda function" (more about those later), after assignment:

```typescript
const sort = (arr: number[]): number[] =>
  R.sort(ascending, arr);
```

And on the variable, before assignment (note that here the parameters and return value
must be separated with `=>` and with `:` on previous notation!):

```typescript
const sort: (arr: number[]) => number[] =
  (arr) =>
    R.sort(ascending, arr);
```

First way would seem better as it doesn't require repeating the input parameters.
However, it only makes sense when you have a lambda function for the assignment.
This is not always the case, especially with Ramda, where all functions are curried
(more about that later) to return a function if called with missing parameters.
Then the latter typing scheme must be used, and in order to have the style coherent,
it's better to use that also with lambda functions.

So, because of currying, we can shorten the example to follow
[point-free style](https://en.wikipedia.org/wiki/Tacit_programming):

```typescript
const sort: (arr: number[]) => number[] =
  R.sort<number>(ascending);
```

Because `R.sort` returns a function here, TypeScript compiler doesn't understand that
its input and output are number, so we'll have to define the generic type explicitly.
This happens relatively often with Ramda functions, especially with function composition.

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
