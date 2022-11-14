export interface IAdresseSteel {
  id: number;
  cel?: string | null;
  tel?: string | null;
  region?: string | null;
}

export type NewAdresseSteel = Omit<IAdresseSteel, 'id'> & { id: null };
