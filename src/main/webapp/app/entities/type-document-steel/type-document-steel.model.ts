import { ISocieteSteel } from 'app/entities/societe-steel/societe-steel.model';

export interface ITypeDocumentSteel {
  id: number;
  intTypeDoc?: string | null;
  societe?: Pick<ISocieteSteel, 'id'> | null;
}

export type NewTypeDocumentSteel = Omit<ITypeDocumentSteel, 'id'> & { id: null };
