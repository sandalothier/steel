export interface ITypeContratDeTravailSteel {
  id: number;
  intTypeContrat?: string | null;
  description?: string | null;
  dureeMax?: number | null;
}

export type NewTypeContratDeTravailSteel = Omit<ITypeContratDeTravailSteel, 'id'> & { id: null };
