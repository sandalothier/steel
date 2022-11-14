import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITypeContratDeTravailSteel, NewTypeContratDeTravailSteel } from '../type-contrat-de-travail-steel.model';

export type PartialUpdateTypeContratDeTravailSteel = Partial<ITypeContratDeTravailSteel> & Pick<ITypeContratDeTravailSteel, 'id'>;

export type EntityResponseType = HttpResponse<ITypeContratDeTravailSteel>;
export type EntityArrayResponseType = HttpResponse<ITypeContratDeTravailSteel[]>;

@Injectable({ providedIn: 'root' })
export class TypeContratDeTravailSteelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/type-contrat-de-travails');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/type-contrat-de-travails');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(typeContratDeTravail: NewTypeContratDeTravailSteel): Observable<EntityResponseType> {
    return this.http.post<ITypeContratDeTravailSteel>(this.resourceUrl, typeContratDeTravail, { observe: 'response' });
  }

  update(typeContratDeTravail: ITypeContratDeTravailSteel): Observable<EntityResponseType> {
    return this.http.put<ITypeContratDeTravailSteel>(
      `${this.resourceUrl}/${this.getTypeContratDeTravailSteelIdentifier(typeContratDeTravail)}`,
      typeContratDeTravail,
      { observe: 'response' }
    );
  }

  partialUpdate(typeContratDeTravail: PartialUpdateTypeContratDeTravailSteel): Observable<EntityResponseType> {
    return this.http.patch<ITypeContratDeTravailSteel>(
      `${this.resourceUrl}/${this.getTypeContratDeTravailSteelIdentifier(typeContratDeTravail)}`,
      typeContratDeTravail,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeContratDeTravailSteel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeContratDeTravailSteel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeContratDeTravailSteel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getTypeContratDeTravailSteelIdentifier(typeContratDeTravail: Pick<ITypeContratDeTravailSteel, 'id'>): number {
    return typeContratDeTravail.id;
  }

  compareTypeContratDeTravailSteel(
    o1: Pick<ITypeContratDeTravailSteel, 'id'> | null,
    o2: Pick<ITypeContratDeTravailSteel, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getTypeContratDeTravailSteelIdentifier(o1) === this.getTypeContratDeTravailSteelIdentifier(o2) : o1 === o2;
  }

  addTypeContratDeTravailSteelToCollectionIfMissing<Type extends Pick<ITypeContratDeTravailSteel, 'id'>>(
    typeContratDeTravailCollection: Type[],
    ...typeContratDeTravailsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const typeContratDeTravails: Type[] = typeContratDeTravailsToCheck.filter(isPresent);
    if (typeContratDeTravails.length > 0) {
      const typeContratDeTravailCollectionIdentifiers = typeContratDeTravailCollection.map(
        typeContratDeTravailItem => this.getTypeContratDeTravailSteelIdentifier(typeContratDeTravailItem)!
      );
      const typeContratDeTravailsToAdd = typeContratDeTravails.filter(typeContratDeTravailItem => {
        const typeContratDeTravailIdentifier = this.getTypeContratDeTravailSteelIdentifier(typeContratDeTravailItem);
        if (typeContratDeTravailCollectionIdentifiers.includes(typeContratDeTravailIdentifier)) {
          return false;
        }
        typeContratDeTravailCollectionIdentifiers.push(typeContratDeTravailIdentifier);
        return true;
      });
      return [...typeContratDeTravailsToAdd, ...typeContratDeTravailCollection];
    }
    return typeContratDeTravailCollection;
  }
}
