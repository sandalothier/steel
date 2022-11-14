import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IAdresseSteel, NewAdresseSteel } from '../adresse-steel.model';

export type PartialUpdateAdresseSteel = Partial<IAdresseSteel> & Pick<IAdresseSteel, 'id'>;

export type EntityResponseType = HttpResponse<IAdresseSteel>;
export type EntityArrayResponseType = HttpResponse<IAdresseSteel[]>;

@Injectable({ providedIn: 'root' })
export class AdresseSteelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/adresses');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/adresses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(adresse: NewAdresseSteel): Observable<EntityResponseType> {
    return this.http.post<IAdresseSteel>(this.resourceUrl, adresse, { observe: 'response' });
  }

  update(adresse: IAdresseSteel): Observable<EntityResponseType> {
    return this.http.put<IAdresseSteel>(`${this.resourceUrl}/${this.getAdresseSteelIdentifier(adresse)}`, adresse, { observe: 'response' });
  }

  partialUpdate(adresse: PartialUpdateAdresseSteel): Observable<EntityResponseType> {
    return this.http.patch<IAdresseSteel>(`${this.resourceUrl}/${this.getAdresseSteelIdentifier(adresse)}`, adresse, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAdresseSteel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdresseSteel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdresseSteel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getAdresseSteelIdentifier(adresse: Pick<IAdresseSteel, 'id'>): number {
    return adresse.id;
  }

  compareAdresseSteel(o1: Pick<IAdresseSteel, 'id'> | null, o2: Pick<IAdresseSteel, 'id'> | null): boolean {
    return o1 && o2 ? this.getAdresseSteelIdentifier(o1) === this.getAdresseSteelIdentifier(o2) : o1 === o2;
  }

  addAdresseSteelToCollectionIfMissing<Type extends Pick<IAdresseSteel, 'id'>>(
    adresseCollection: Type[],
    ...adressesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const adresses: Type[] = adressesToCheck.filter(isPresent);
    if (adresses.length > 0) {
      const adresseCollectionIdentifiers = adresseCollection.map(adresseItem => this.getAdresseSteelIdentifier(adresseItem)!);
      const adressesToAdd = adresses.filter(adresseItem => {
        const adresseIdentifier = this.getAdresseSteelIdentifier(adresseItem);
        if (adresseCollectionIdentifiers.includes(adresseIdentifier)) {
          return false;
        }
        adresseCollectionIdentifiers.push(adresseIdentifier);
        return true;
      });
      return [...adressesToAdd, ...adresseCollection];
    }
    return adresseCollection;
  }
}
