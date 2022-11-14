import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISocieteSteel, NewSocieteSteel } from '../societe-steel.model';

export type PartialUpdateSocieteSteel = Partial<ISocieteSteel> & Pick<ISocieteSteel, 'id'>;

export type EntityResponseType = HttpResponse<ISocieteSteel>;
export type EntityArrayResponseType = HttpResponse<ISocieteSteel[]>;

@Injectable({ providedIn: 'root' })
export class SocieteSteelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/societes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/societes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(societe: NewSocieteSteel): Observable<EntityResponseType> {
    return this.http.post<ISocieteSteel>(this.resourceUrl, societe, { observe: 'response' });
  }

  update(societe: ISocieteSteel): Observable<EntityResponseType> {
    return this.http.put<ISocieteSteel>(`${this.resourceUrl}/${this.getSocieteSteelIdentifier(societe)}`, societe, { observe: 'response' });
  }

  partialUpdate(societe: PartialUpdateSocieteSteel): Observable<EntityResponseType> {
    return this.http.patch<ISocieteSteel>(`${this.resourceUrl}/${this.getSocieteSteelIdentifier(societe)}`, societe, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISocieteSteel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISocieteSteel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISocieteSteel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getSocieteSteelIdentifier(societe: Pick<ISocieteSteel, 'id'>): number {
    return societe.id;
  }

  compareSocieteSteel(o1: Pick<ISocieteSteel, 'id'> | null, o2: Pick<ISocieteSteel, 'id'> | null): boolean {
    return o1 && o2 ? this.getSocieteSteelIdentifier(o1) === this.getSocieteSteelIdentifier(o2) : o1 === o2;
  }

  addSocieteSteelToCollectionIfMissing<Type extends Pick<ISocieteSteel, 'id'>>(
    societeCollection: Type[],
    ...societesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const societes: Type[] = societesToCheck.filter(isPresent);
    if (societes.length > 0) {
      const societeCollectionIdentifiers = societeCollection.map(societeItem => this.getSocieteSteelIdentifier(societeItem)!);
      const societesToAdd = societes.filter(societeItem => {
        const societeIdentifier = this.getSocieteSteelIdentifier(societeItem);
        if (societeCollectionIdentifiers.includes(societeIdentifier)) {
          return false;
        }
        societeCollectionIdentifiers.push(societeIdentifier);
        return true;
      });
      return [...societesToAdd, ...societeCollection];
    }
    return societeCollection;
  }
}
