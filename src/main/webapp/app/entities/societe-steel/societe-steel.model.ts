export interface ISocieteSteel {
  id: number;
  intSociete?: string | null;
  sigle?: string | null;
  logo?: string | null;
  siege?: string | null;
}

export type NewSocieteSteel = Omit<ISocieteSteel, 'id'> & { id: null };
