import * as chai from 'chai';
import 'mocha';
import * as R from 'ramda';
import * as sinon from 'sinon';

import { Affiliation, data, dataLarge, Laureate, Prize } from './base';

const expect = chai.expect;

describe('logic functions', () => {
  /**
   * FizzBuzz
   *
   * Create three functions which take a number as input and return a boolean:
   * * fizz returns true if the number is divisible by three, otherwise false
   * * buzz returns true if the number is divisible by five, otherwise false
   * * fizzbuzz returns true if the number is divisible by three AND five
   *
   * Create also a function fizzbuzzer which returns a FizzBuzz (string or null):
   * * 'fizz' if the number is divisible by three
   * * 'buzz' if the number is divisible by five
   * * 'fizzbuzz' if the number is divisible by three AND five
   * * otherwise return null
   */
  describe('fizzbuzz', () => {
    type FizzBuzz = 'fizz' | 'buzz' | 'fizzbuzz' | null;

    const fizz: (x: number) => boolean =
      (x) => false; // your answer here
    const buzz: (x: number) => boolean =
      (x) => false; // your answer here
    const fizzbuzz: (x: number) => boolean =
      (x) => false; // your answer here
    const fizzbuzzer: (x: number) => FizzBuzz =
      (x) => null; // your answer here

    it('fizz returns true for 3', () => expect(fizz(3)).to.be.true);
    it('fizz returns false for 5', () => expect(fizz(5)).to.be.false);
    it('fizz returns true for 15', () => expect(fizz(15)).to.be.true);

    it('buzz returns false for 3', () => expect(buzz(3)).to.be.false);
    it('buzz returns true for 5', () => expect(buzz(5)).to.be.true);
    it('buzz returns true for 15', () => expect(buzz(15)).to.be.true);

    it('fizzbuzz returns false for 3', () => expect(fizzbuzz(3)).to.be.false);
    it('fizzbuzz returns false for 5', () => expect(fizzbuzz(5)).to.be.false);
    it('fizzbuzz returns true for 15', () => expect(fizzbuzz(15)).to.be.true);

    it('fizzbuzzer returns null for 1', () => expect(fizzbuzzer(1)).to.eql(null));
    it('fizzbuzzer returns \'fizz\' for 3', () => expect(fizzbuzzer(3)).to.eql('fizz'));
    it('fizzbuzzer returns \'buzz\' for 5', () => expect(fizzbuzzer(5)).to.eql('buzz'));
    it('fizzbuzzer returns \'fizzbuzz\' for 15', () => expect(fizzbuzzer(15)).to.eql('fizzbuzz'));

    /**
     * Return a list of FizzBuzz for the first 100 positive integers
     */
    it('returns a list of null, \'fizz\', \'buzz\' or \'fizzbuzz\' from 1 to 100', () => {
      const list = R.range(1, 100);
      const answer: (xs: number[]) => FizzBuzz[] =
        (xs) => []; // your answer here

      expect(answer(list)).to.eql([
        null, null, 'fizz', null, 'buzz', 'fizz', null, null, 'fizz', 'buzz', null,
        'fizz', null, null, 'fizzbuzz', null, null, 'fizz', null, 'buzz', 'fizz',
        null, null, 'fizz', 'buzz', null, 'fizz', null, null, 'fizzbuzz', null, null,
        'fizz', null, 'buzz', 'fizz', null, null, 'fizz', 'buzz', null, 'fizz', null,
        null, 'fizzbuzz', null, null, 'fizz', null, 'buzz', 'fizz', null, null, 'fizz',
        'buzz', null, 'fizz', null, null, 'fizzbuzz', null, null, 'fizz', null, 'buzz',
        'fizz', null, null, 'fizz', 'buzz', null, 'fizz', null, null, 'fizzbuzz', null,
        null, 'fizz', null, 'buzz', 'fizz', null, null, 'fizz', 'buzz', null, 'fizz',
        null, null, 'fizzbuzz', null, null, 'fizz', null, 'buzz', 'fizz', null, null, 'fizz'
      ]);
    });
  });
});

describe('R.filter', () => {
  /**
   * Return a list of surnames for all dutch laureates (whose bornCountryCode is NL)
   *
   * Use the dataset in variable 'data' (data/laureate_small.json)
   */
  it('returns a list of surnames for all dutch laureates', () => {
    const answer: (xs: Laureate[]) => string[] =
      (xs) => []; // your answer here

    expect(answer(data)).to.eql(['Lorentz', 'Zeeman']);
  });

  /**
   * Return a list of city values for the laureate birth cities (bornCity) if they
   * exist.
   *
   * e.g. if a data is [{ bornCity: 'Arnhem', ... }], return [2]
   *
   * Use the dataset in variable 'data' (data/laureate_small.json)
   */
  it('returns a list of city of birth values for those that have one', () => {
    const cityValues = {
      'Lennep (now Remscheid)': 1,
      'Arnhem': 2,
      'Zonnemaire': null,
      'Paris': 3,
      'Warsaw': 4
    };

    // you might need helper functions

    const answer: (xs: Laureate[]) => number[] =
      (xs) => []; // your answer here

    expect(answer(data)).to.eql([1, 2, 3, 4]);
  });
});

describe('R.find', () => {
  /**
   * Return the amount of prizes for Marie Curie, n\u00e9e Sklodowska
   *
   * Use the dataset in variable 'data' (data/laureate_small.json)
   */
  it('returns the amount of prizes for Marie Curie, n\u00e9e Sklodowska', () => {
    const answer: (xs: Laureate[]) => number =
      (xs) => -1; // your answer here

    expect(answer(data)).to.eql(2);
  });
});
