import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISuccursaleSteel, NewSuccursaleSteel } from '../succursale-steel.model';

export type PartialUpdateSuccursaleSteel = Partial<ISuccursaleSteel> & Pick<ISuccursaleSteel, 'id'>;

export type EntityResponseType = HttpResponse<ISuccursaleSteel>;
export type EntityArrayResponseType = HttpResponse<ISuccursaleSteel[]>;

@Injectable({ providedIn: 'root' })
export class SuccursaleSteelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/succursales');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/succursales');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(succursale: NewSuccursaleSteel): Observable<EntityResponseType> {
    return this.http.post<ISuccursaleSteel>(this.resourceUrl, succursale, { observe: 'response' });
  }

  update(succursale: ISuccursaleSteel): Observable<EntityResponseType> {
    return this.http.put<ISuccursaleSteel>(`${this.resourceUrl}/${this.getSuccursaleSteelIdentifier(succursale)}`, succursale, {
      observe: 'response',
    });
  }

  partialUpdate(succursale: PartialUpdateSuccursaleSteel): Observable<EntityResponseType> {
    return this.http.patch<ISuccursaleSteel>(`${this.resourceUrl}/${this.getSuccursaleSteelIdentifier(succursale)}`, succursale, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISuccursaleSteel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISuccursaleSteel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISuccursaleSteel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getSuccursaleSteelIdentifier(succursale: Pick<ISuccursaleSteel, 'id'>): number {
    return succursale.id;
  }

  compareSuccursaleSteel(o1: Pick<ISuccursaleSteel, 'id'> | null, o2: Pick<ISuccursaleSteel, 'id'> | null): boolean {
    return o1 && o2 ? this.getSuccursaleSteelIdentifier(o1) === this.getSuccursaleSteelIdentifier(o2) : o1 === o2;
  }

  addSuccursaleSteelToCollectionIfMissing<Type extends Pick<ISuccursaleSteel, 'id'>>(
    succursaleCollection: Type[],
    ...succursalesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const succursales: Type[] = succursalesToCheck.filter(isPresent);
    if (succursales.length > 0) {
      const succursaleCollectionIdentifiers = succursaleCollection.map(
        succursaleItem => this.getSuccursaleSteelIdentifier(succursaleItem)!
      );
      const succursalesToAdd = succursales.filter(succursaleItem => {
        const succursaleIdentifier = this.getSuccursaleSteelIdentifier(succursaleItem);
        if (succursaleCollectionIdentifiers.includes(succursaleIdentifier)) {
          return false;
        }
        succursaleCollectionIdentifiers.push(succursaleIdentifier);
        return true;
      });
      return [...succursalesToAdd, ...succursaleCollection];
    }
    return succursaleCollection;
  }
}
