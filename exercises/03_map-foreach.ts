import * as chai from 'chai';
import 'mocha';
import * as R from 'ramda';
import * as sinon from 'sinon';

import { data, dataLarge, Laureate } from './base';

const expect = chai.expect;

interface Person {
  readonly firstname: string,
  readonly lastname: string
}

type Year = number;

interface PersonWithPrizes extends Person {
  readonly prizeYears: Year[]
}

describe('R.map', () => {
  /**
   * Return a list of surnames in the given dataset.
   *
   * Use the dataset in variable 'data' (data/laureate_small.json)
   *
   * Laureate type is defined in file base.ts
   */
  it('returns a list of surnames', () => {
    const answer: (xs: Laureate[]) => string[] =
      (xs) => []; // your answer here

    expect(answer(data))
      .to.eql(['Röntgen', 'Lorentz', 'Zeeman', 'Becquerel', 'Curie, née Sklodowska']);
  });

  /**
   * Return a list of Persons in the given dataset.
   *
   * That is, transform all Laureates into Persons.
   *
   * Use the dataset in variable 'data' (data/laureate_small.json)
   */
  it('returns a list of persons', () => {
    const answer: (xs: Laureate[]) => Person[] =
      (xs) => []; // your answer here

    return expect(answer(data))
      .to.eql([
        { firstname: 'Wilhelm Conrad', lastname: 'Röntgen' },
        { firstname: 'Hendrik Antoon', lastname: 'Lorentz' },
        { firstname: 'Pieter', lastname: 'Zeeman' },
        { firstname: 'Antoine Henri', lastname: 'Becquerel' },
        { firstname: 'Marie', lastname: 'Curie, née Sklodowska' }
      ]);
  });

  /**
   * Return a list of PersonWithPrizes in the given dataset
   *
   * PersonWithPrize is a Person with added field prizeYears having
   * all years when the person has won a nobel prize
   *
   * Use the dataset in variable 'data' (data/laureate_small.json)
   */
  it('returns a list of persons with prize years', () => {
    const answer: (xs: Laureate[]) => PersonWithPrizes[] =
      (xs) => []; // your answer here

    return expect(answer(data))
      .to.eql([
        { firstname: 'Wilhelm Conrad', lastname: 'Röntgen', prizeYears: [1901] },
        { firstname: 'Hendrik Antoon', lastname: 'Lorentz', prizeYears: [1902] },
        { firstname: 'Pieter', lastname: 'Zeeman', prizeYears: [1902] },
        { firstname: 'Antoine Henri', lastname: 'Becquerel', prizeYears: [1903] },
        { firstname: 'Marie', lastname: 'Curie, née Sklodowska', prizeYears: [1903, 1911] }
      ]);
  });

  /**
   * Return an object with countries and the amount of laureates born in that country
   * Use country codes.
   *
   * e.g. if there are three nobel laureates from Russia and two from Norway,
   * the result should be { NO: 2, RU: 3 }
   *
   * Use the dataset in variable 'dataLarge' (data/laureate.json)
   *
   * Hint: the result probably doesn't come out of map directly, but it might be
   * useful still.
   */
  it('returns an object with countries and the amount of laureates from that country', () => {
    const answer: (xs: Laureate[]) => any =
      (xs) => ({ RU: 1 }); // your answer here

    return expect(answer(dataLarge))
      .to.eql({
        AR: 4, AT: 17, AU: 10, AZ: 1, BA: 2, BD: 1, BE: 9, BG: 1, BR: 1, BY: 4, CA: 18,
        CH: 16, CL: 2, CN: 12, CO: 2, CR: 1, CY: 1, CZ: 6, DE: 80, DK: 12, DZ: 2, EG: 6,
        ES: 7, FI: 5, FR: 54, GB: 98, GH: 1, GP: 1, GR: 1, GT: 2, HR: 1, HU: 9, ID: 1,
        IE: 5, IL: 6, IN: 8, IR: 2, IS: 1, IT: 19, JP: 24, KE: 1, KR: 2, LC: 2, LR: 2,
        LT: 3, LU: 2, LV: 1, MA: 1, MG: 1, MK: 1, MM: 1, MX: 3, NG: 1, NL: 18, NO: 12,
        NZ: 3, PE: 1, PK: 3, PL: 25, PT: 2, RO: 4, RU: 26, SE: 29, SI: 1, SK: 1, TL: 2,
        TR: 3, TT: 1, TW: 1, UA: 5, US: 257, VE: 1, VN: 1, YE: 1, ZA: 9, ZW: 1,
        undefined: 29
      });
  });
});

describe('R.forEach', () => {
  /**
   * Print a list of surnames to console
   *
   * Use the dataset in variable 'data' (data/laureate_small.json)
   */
  /* tslint:disable:no-console */
  it('prints a list of surnames', () => {
    const spy = sinon.spy(console, 'log');

    // your answer here

    /* tslint:disable:no-console no-unused-expression */
    expect(spy.calledWith('Röntgen')).to.be.true;
    expect(spy.calledWith('Lorentz')).to.be.true;
    expect(spy.calledWith('Zeeman')).to.be.true;
    expect(spy.calledWith('Becquerel')).to.be.true;
    expect(spy.calledWith('Curie, née Sklodowska')).to.be.true;
    /* tslint:enable:no-console no-unused-expression */
  });
});
