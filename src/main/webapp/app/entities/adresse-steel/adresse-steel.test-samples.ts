import { IAdresseSteel, NewAdresseSteel } from './adresse-steel.model';

export const sampleWithRequiredData: IAdresseSteel = {
  id: 36217,
  cel: 'Indonési',
  tel: 'tan EXE',
  region: 'c',
};

export const sampleWithPartialData: IAdresseSteel = {
  id: 74175,
  cel: 'compress',
  tel: 'leverage',
  region: 'generate',
};

export const sampleWithFullData: IAdresseSteel = {
  id: 82044,
  cel: 'fuchsia ',
  tel: 'Industri',
  region: 'Universal XSS circuit',
};

export const sampleWithNewData: NewAdresseSteel = {
  cel: 'b Tunisi',
  tel: 'Bonapart',
  region: 'payment secured Faubourg',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
