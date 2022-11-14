import { ISocieteSteel } from 'app/entities/societe-steel/societe-steel.model';

export interface ISuccursaleSteel {
  id: number;
  intSuccursale?: string | null;
  societe?: Pick<ISocieteSteel, 'id'> | null;
}

export type NewSuccursaleSteel = Omit<ISuccursaleSteel, 'id'> & { id: null };
