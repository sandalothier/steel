import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IPosteSteel, NewPosteSteel } from '../poste-steel.model';

export type PartialUpdatePosteSteel = Partial<IPosteSteel> & Pick<IPosteSteel, 'id'>;

export type EntityResponseType = HttpResponse<IPosteSteel>;
export type EntityArrayResponseType = HttpResponse<IPosteSteel[]>;

@Injectable({ providedIn: 'root' })
export class PosteSteelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/postes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/postes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(poste: NewPosteSteel): Observable<EntityResponseType> {
    return this.http.post<IPosteSteel>(this.resourceUrl, poste, { observe: 'response' });
  }

  update(poste: IPosteSteel): Observable<EntityResponseType> {
    return this.http.put<IPosteSteel>(`${this.resourceUrl}/${this.getPosteSteelIdentifier(poste)}`, poste, { observe: 'response' });
  }

  partialUpdate(poste: PartialUpdatePosteSteel): Observable<EntityResponseType> {
    return this.http.patch<IPosteSteel>(`${this.resourceUrl}/${this.getPosteSteelIdentifier(poste)}`, poste, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPosteSteel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPosteSteel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPosteSteel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getPosteSteelIdentifier(poste: Pick<IPosteSteel, 'id'>): number {
    return poste.id;
  }

  comparePosteSteel(o1: Pick<IPosteSteel, 'id'> | null, o2: Pick<IPosteSteel, 'id'> | null): boolean {
    return o1 && o2 ? this.getPosteSteelIdentifier(o1) === this.getPosteSteelIdentifier(o2) : o1 === o2;
  }

  addPosteSteelToCollectionIfMissing<Type extends Pick<IPosteSteel, 'id'>>(
    posteCollection: Type[],
    ...postesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const postes: Type[] = postesToCheck.filter(isPresent);
    if (postes.length > 0) {
      const posteCollectionIdentifiers = posteCollection.map(posteItem => this.getPosteSteelIdentifier(posteItem)!);
      const postesToAdd = postes.filter(posteItem => {
        const posteIdentifier = this.getPosteSteelIdentifier(posteItem);
        if (posteCollectionIdentifiers.includes(posteIdentifier)) {
          return false;
        }
        posteCollectionIdentifiers.push(posteIdentifier);
        return true;
      });
      return [...postesToAdd, ...posteCollection];
    }
    return posteCollection;
  }
}
