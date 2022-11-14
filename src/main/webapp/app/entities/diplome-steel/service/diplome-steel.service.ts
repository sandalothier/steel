import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IDiplomeSteel, NewDiplomeSteel } from '../diplome-steel.model';

export type PartialUpdateDiplomeSteel = Partial<IDiplomeSteel> & Pick<IDiplomeSteel, 'id'>;

export type EntityResponseType = HttpResponse<IDiplomeSteel>;
export type EntityArrayResponseType = HttpResponse<IDiplomeSteel[]>;

@Injectable({ providedIn: 'root' })
export class DiplomeSteelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/diplomes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/diplomes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(diplome: NewDiplomeSteel): Observable<EntityResponseType> {
    return this.http.post<IDiplomeSteel>(this.resourceUrl, diplome, { observe: 'response' });
  }

  update(diplome: IDiplomeSteel): Observable<EntityResponseType> {
    return this.http.put<IDiplomeSteel>(`${this.resourceUrl}/${this.getDiplomeSteelIdentifier(diplome)}`, diplome, { observe: 'response' });
  }

  partialUpdate(diplome: PartialUpdateDiplomeSteel): Observable<EntityResponseType> {
    return this.http.patch<IDiplomeSteel>(`${this.resourceUrl}/${this.getDiplomeSteelIdentifier(diplome)}`, diplome, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiplomeSteel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiplomeSteel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiplomeSteel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getDiplomeSteelIdentifier(diplome: Pick<IDiplomeSteel, 'id'>): number {
    return diplome.id;
  }

  compareDiplomeSteel(o1: Pick<IDiplomeSteel, 'id'> | null, o2: Pick<IDiplomeSteel, 'id'> | null): boolean {
    return o1 && o2 ? this.getDiplomeSteelIdentifier(o1) === this.getDiplomeSteelIdentifier(o2) : o1 === o2;
  }

  addDiplomeSteelToCollectionIfMissing<Type extends Pick<IDiplomeSteel, 'id'>>(
    diplomeCollection: Type[],
    ...diplomesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const diplomes: Type[] = diplomesToCheck.filter(isPresent);
    if (diplomes.length > 0) {
      const diplomeCollectionIdentifiers = diplomeCollection.map(diplomeItem => this.getDiplomeSteelIdentifier(diplomeItem)!);
      const diplomesToAdd = diplomes.filter(diplomeItem => {
        const diplomeIdentifier = this.getDiplomeSteelIdentifier(diplomeItem);
        if (diplomeCollectionIdentifiers.includes(diplomeIdentifier)) {
          return false;
        }
        diplomeCollectionIdentifiers.push(diplomeIdentifier);
        return true;
      });
      return [...diplomesToAdd, ...diplomeCollection];
    }
    return diplomeCollection;
  }
}
