import { ISuccursaleSteel, NewSuccursaleSteel } from './succursale-steel.model';

export const sampleWithRequiredData: ISuccursaleSteel = {
  id: 2440,
  intSuccursale: 'c',
};

export const sampleWithPartialData: ISuccursaleSteel = {
  id: 67924,
  intSuccursale: 'clear-thinking b',
};

export const sampleWithFullData: ISuccursaleSteel = {
  id: 44707,
  intSuccursale: 'parse b array',
};

export const sampleWithNewData: NewSuccursaleSteel = {
  intSuccursale: 'SAS magenta Bedfordshire',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
