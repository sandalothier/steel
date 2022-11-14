import dayjs from 'dayjs/esm';

import { Sexe } from 'app/entities/enumerations/sexe.model';
import { SituationMatrimoniale } from 'app/entities/enumerations/situation-matrimoniale.model';

import { IEmployeSteel, NewEmployeSteel } from './employe-steel.model';

export const sampleWithRequiredData: IEmployeSteel = {
  id: 50596,
  sexe: Sexe['MASCULIN'],
  nomActeur: 'c Bedfordshire Outdo',
  prenomsActeur: 'Balboa b',
  lieuNaissance: 'Saint-Denis Auvergne',
};

export const sampleWithPartialData: IEmployeSteel = {
  id: 4755,
  sexe: Sexe['MASCULIN'],
  nomActeur: 'Executif',
  prenomsActeur: 'Pants',
  dateNaissance: dayjs('2022-11-13'),
  lieuNaissance: 'Chips Specialiste',
  situationMatrimoniale: SituationMatrimoniale['DIVORCE'],
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  paysOrigine: 'payment',
};

export const sampleWithFullData: IEmployeSteel = {
  id: 73149,
  sexe: Sexe['FEMININ'],
  nomActeur: 'Agent Granite maximi',
  prenomsActeur: 'Fresh vertical',
  dateNaissance: dayjs('2022-11-13'),
  lieuNaissance: 'azure Table',
  situationMatrimoniale: SituationMatrimoniale['CONCUBINAGE'],
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  paysOrigine: 'Frozen Fresh',
};

export const sampleWithNewData: NewEmployeSteel = {
  sexe: Sexe['FEMININ'],
  nomActeur: 'Plastic',
  prenomsActeur: 'Dong',
  lieuNaissance: '1080p',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
