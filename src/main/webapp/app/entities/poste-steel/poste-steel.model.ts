import { IEmployeSteel } from 'app/entities/employe-steel/employe-steel.model';

export interface IPosteSteel {
  id: number;
  intPoste?: string | null;
  nomActeur?: Pick<IEmployeSteel, 'id'> | null;
}

export type NewPosteSteel = Omit<IPosteSteel, 'id'> & { id: null };
