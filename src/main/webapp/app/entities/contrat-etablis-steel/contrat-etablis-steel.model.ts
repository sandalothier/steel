import dayjs from 'dayjs/esm';
import { IEmployeSteel } from 'app/entities/employe-steel/employe-steel.model';
import { ITypeContratDeTravailSteel } from 'app/entities/type-contrat-de-travail-steel/type-contrat-de-travail-steel.model';

export interface IContratEtablisSteel {
  id: number;
  dateEtablissement?: dayjs.Dayjs | null;
  nomActeur?: Pick<IEmployeSteel, 'id'> | null;
  intTypeContrat?: Pick<ITypeContratDeTravailSteel, 'id'> | null;
}

export type NewContratEtablisSteel = Omit<IContratEtablisSteel, 'id'> & { id: null };
