import { ITypeDocumentSteel } from 'app/entities/type-document-steel/type-document-steel.model';

export interface IComposantDocumentSteel {
  id: number;
  intComposant?: string | null;
  titreComposant?: string | null;
  contenu?: string | null;
  intTypeDoc?: Pick<ITypeDocumentSteel, 'id'> | null;
}

export type NewComposantDocumentSteel = Omit<IComposantDocumentSteel, 'id'> & { id: null };
