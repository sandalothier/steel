import { IDiplomeSteel, NewDiplomeSteel } from './diplome-steel.model';

export const sampleWithRequiredData: IDiplomeSteel = {
  id: 78915,
  codeDiplome: 'Molière',
};

export const sampleWithPartialData: IDiplomeSteel = {
  id: 64736,
  codeDiplome: 'haptic',
};

export const sampleWithFullData: IDiplomeSteel = {
  id: 18666,
  codeDiplome: 'quantifying initiatives',
  intDiplome: 'Moldavie Account',
};

export const sampleWithNewData: NewDiplomeSteel = {
  codeDiplome: 'Soft Personal FTP',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
