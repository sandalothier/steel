import { ISocieteSteel, NewSocieteSteel } from './societe-steel.model';

export const sampleWithRequiredData: ISocieteSteel = {
  id: 54443,
  intSociete: 'driver protocol',
  logo: 'Account Gorgeous',
};

export const sampleWithPartialData: ISocieteSteel = {
  id: 30172,
  intSociete: 'success Som',
  logo: 'Gold Centralized Sud',
};

export const sampleWithFullData: ISocieteSteel = {
  id: 48767,
  intSociete: 'Analyste Bedfordshire',
  sigle: 'Île-de-France matrix SAS',
  logo: 'a transitional static',
  siege: 'methodologies',
};

export const sampleWithNewData: NewSocieteSteel = {
  intSociete: 'b',
  logo: 'needs-based',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
