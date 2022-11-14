import { ITypeContratDeTravailSteel, NewTypeContratDeTravailSteel } from './type-contrat-de-travail-steel.model';

export const sampleWithRequiredData: ITypeContratDeTravailSteel = {
  id: 24177,
  description: 'hack yellow',
  dureeMax: 45982,
};

export const sampleWithPartialData: ITypeContratDeTravailSteel = {
  id: 54538,
  description: 'Organized Pizza',
  dureeMax: 27198,
};

export const sampleWithFullData: ITypeContratDeTravailSteel = {
  id: 10863,
  intTypeContrat: 'matrix evolve',
  description: 'Practical installation invoice',
  dureeMax: 48818,
};

export const sampleWithNewData: NewTypeContratDeTravailSteel = {
  description: 'synthesizing Lempira Tuna',
  dureeMax: 64721,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
