import * as chai from 'chai';
import 'mocha';
import * as R from 'ramda';
import * as sinon from 'sinon';

import { Affiliation, data, dataLarge, Laureate, Prize } from './base';

const expect = chai.expect;

describe.only('lambda', () => {
  describe('equalToFive', () => {
    const equalToFive: (x: number) => boolean =
      (x) => false; // your answer here

    it('returns true for 5', () => expect(equalToFive(5)).to.be.true);
    it('returns false for 3', () => expect(equalToFive(3)).to.be.false);
  });

  describe('addThree', () => {
    const addThree: (x: number) => number =
      (x) => 0; // your answer here

    it('returns 8 for 5', () => expect(addThree(5)).to.eql(8));
    it('returns 0 for -3', () => expect(addThree(-3)).to.eql(0));
  });

  describe('adder', () => {
    const adder: (x: number) => (y: number) => number =
      (x) => (y) => 0; // your answer here

    it('returns a function which adds 2', () =>
       expect(adder(2)(3)).to.eql(5));
    it('returns a function which adds -5', () =>
       expect(adder(-5)(3)).to.eql(-2));
  });
});
