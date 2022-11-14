export interface IDiplomeSteel {
  id: number;
  codeDiplome?: string | null;
  intDiplome?: string | null;
}

export type NewDiplomeSteel = Omit<IDiplomeSteel, 'id'> & { id: null };
