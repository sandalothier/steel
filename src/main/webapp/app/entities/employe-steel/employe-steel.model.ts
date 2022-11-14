import dayjs from 'dayjs/esm';
import { IDiplomeSteel } from 'app/entities/diplome-steel/diplome-steel.model';
import { IAdresseSteel } from 'app/entities/adresse-steel/adresse-steel.model';
import { ISocieteSteel } from 'app/entities/societe-steel/societe-steel.model';
import { Sexe } from 'app/entities/enumerations/sexe.model';
import { SituationMatrimoniale } from 'app/entities/enumerations/situation-matrimoniale.model';

export interface IEmployeSteel {
  id: number;
  sexe?: Sexe | null;
  nomActeur?: string | null;
  prenomsActeur?: string | null;
  dateNaissance?: dayjs.Dayjs | null;
  lieuNaissance?: string | null;
  situationMatrimoniale?: SituationMatrimoniale | null;
  photo?: string | null;
  photoContentType?: string | null;
  paysOrigine?: string | null;
  codeDiplome?: Pick<IDiplomeSteel, 'id'> | null;
  cel?: Pick<IAdresseSteel, 'id'> | null;
  societe?: Pick<ISocieteSteel, 'id'> | null;
}

export type NewEmployeSteel = Omit<IEmployeSteel, 'id'> & { id: null };
