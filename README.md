Functional programming with TypeScript and Ramda
================================================

Immutability
------------

Pure functions, side-effects
----------------------------

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


map & forEach
=============

http://randycoulman.com/blog/2016/05/24/thinking-in-ramda-getting-started/


filter & find
=============

logic: complement, both, allPass, either, anyPass
-------------------------------------------------

cond teoriassa hyvä mutta ei tyypitetty niin että sitä voisi käyttää vaikka mapin kanssa

reduce
======


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

curry, flip

function composition
====================

compose, pipe


pointfree style
===============

http://randycoulman.com/blog/2016/05/24/thinking-in-ramda-getting-started/
https://martinfowler.com/articles/collection-pipeline/
