import { IPosteSteel, NewPosteSteel } from './poste-steel.model';

export const sampleWithRequiredData: IPosteSteel = {
  id: 61403,
};

export const sampleWithPartialData: IPosteSteel = {
  id: 73918,
};

export const sampleWithFullData: IPosteSteel = {
  id: 92675,
  intPoste: 'la implement Champagne-Ar',
};

export const sampleWithNewData: NewPosteSteel = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
