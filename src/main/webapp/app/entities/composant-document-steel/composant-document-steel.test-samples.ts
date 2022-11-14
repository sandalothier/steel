import { IComposantDocumentSteel, NewComposantDocumentSteel } from './composant-document-steel.model';

export const sampleWithRequiredData: IComposantDocumentSteel = {
  id: 60678,
  intComposant: 'next-generation',
};

export const sampleWithPartialData: IComposantDocumentSteel = {
  id: 19880,
  intComposant: 'Soap du',
  titreComposant: 'index efficient Industrial',
};

export const sampleWithFullData: IComposantDocumentSteel = {
  id: 65511,
  intComposant: 'Fish c',
  titreComposant: 'parallelism program Paris',
  contenu: 'budgetary démocratique Handcrafted',
};

export const sampleWithNewData: NewComposantDocumentSteel = {
  intComposant: 'deposit synthesizing a',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
