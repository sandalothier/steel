import dayjs from 'dayjs/esm';

import { IContratEtablisSteel, NewContratEtablisSteel } from './contrat-etablis-steel.model';

export const sampleWithRequiredData: IContratEtablisSteel = {
  id: 12009,
};

export const sampleWithPartialData: IContratEtablisSteel = {
  id: 9379,
};

export const sampleWithFullData: IContratEtablisSteel = {
  id: 21918,
  dateEtablissement: dayjs('2022-11-13'),
};

export const sampleWithNewData: NewContratEtablisSteel = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
