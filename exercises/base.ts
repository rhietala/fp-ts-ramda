import * as chai from 'chai';
import * as fs from 'fs';

export interface Affiliation {
  city: string,
  country: string,
  name: string
}

export interface Prize {
  affiliations: Affiliation[],
  category: string,
  motivation: string,
  share: string,
  year: string
}

export interface Laureate {
  born: string,
  bornCity: string,
  bornCountry: string,
  bornCountryCode: string,
  died: string,
  diedCity: string,
  diedCountry: string,
  diedCountryCode: string,
  firstname: string,
  gender: string,
  id: string,
  prizes: Prize[],
  surname: string
}

export const data: Laureate[] =
  JSON.parse(fs.readFileSync('./data/laureate_small.json', 'utf8')).laureates;

export const dataLarge: Laureate[] =
  JSON.parse(fs.readFileSync('./data/laureate.json', 'utf8')).laureates;
