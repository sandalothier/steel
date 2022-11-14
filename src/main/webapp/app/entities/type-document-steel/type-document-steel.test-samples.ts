import { ITypeDocumentSteel, NewTypeDocumentSteel } from './type-document-steel.model';

export const sampleWithRequiredData: ITypeDocumentSteel = {
  id: 72385,
};

export const sampleWithPartialData: ITypeDocumentSteel = {
  id: 45746,
  intTypeDoc: 'Ergonomic Keyboard',
};

export const sampleWithFullData: ITypeDocumentSteel = {
  id: 42210,
  intTypeDoc: 'bleeding-edge architectures Account',
};

export const sampleWithNewData: NewTypeDocumentSteel = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
