import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IContratEtablisSteel, NewContratEtablisSteel } from '../contrat-etablis-steel.model';

export type PartialUpdateContratEtablisSteel = Partial<IContratEtablisSteel> & Pick<IContratEtablisSteel, 'id'>;

type RestOf<T extends IContratEtablisSteel | NewContratEtablisSteel> = Omit<T, 'dateEtablissement'> & {
  dateEtablissement?: string | null;
};

export type RestContratEtablisSteel = RestOf<IContratEtablisSteel>;

export type NewRestContratEtablisSteel = RestOf<NewContratEtablisSteel>;

export type PartialUpdateRestContratEtablisSteel = RestOf<PartialUpdateContratEtablisSteel>;

export type EntityResponseType = HttpResponse<IContratEtablisSteel>;
export type EntityArrayResponseType = HttpResponse<IContratEtablisSteel[]>;

@Injectable({ providedIn: 'root' })
export class ContratEtablisSteelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/contrat-etablis');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/contrat-etablis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(contratEtablis: NewContratEtablisSteel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contratEtablis);
    return this.http
      .post<RestContratEtablisSteel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(contratEtablis: IContratEtablisSteel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contratEtablis);
    return this.http
      .put<RestContratEtablisSteel>(`${this.resourceUrl}/${this.getContratEtablisSteelIdentifier(contratEtablis)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(contratEtablis: PartialUpdateContratEtablisSteel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contratEtablis);
    return this.http
      .patch<RestContratEtablisSteel>(`${this.resourceUrl}/${this.getContratEtablisSteelIdentifier(contratEtablis)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestContratEtablisSteel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestContratEtablisSteel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestContratEtablisSteel[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getContratEtablisSteelIdentifier(contratEtablis: Pick<IContratEtablisSteel, 'id'>): number {
    return contratEtablis.id;
  }

  compareContratEtablisSteel(o1: Pick<IContratEtablisSteel, 'id'> | null, o2: Pick<IContratEtablisSteel, 'id'> | null): boolean {
    return o1 && o2 ? this.getContratEtablisSteelIdentifier(o1) === this.getContratEtablisSteelIdentifier(o2) : o1 === o2;
  }

  addContratEtablisSteelToCollectionIfMissing<Type extends Pick<IContratEtablisSteel, 'id'>>(
    contratEtablisCollection: Type[],
    ...contratEtablisToCheck: (Type | null | undefined)[]
  ): Type[] {
    const contratEtablis: Type[] = contratEtablisToCheck.filter(isPresent);
    if (contratEtablis.length > 0) {
      const contratEtablisCollectionIdentifiers = contratEtablisCollection.map(
        contratEtablisItem => this.getContratEtablisSteelIdentifier(contratEtablisItem)!
      );
      const contratEtablisToAdd = contratEtablis.filter(contratEtablisItem => {
        const contratEtablisIdentifier = this.getContratEtablisSteelIdentifier(contratEtablisItem);
        if (contratEtablisCollectionIdentifiers.includes(contratEtablisIdentifier)) {
          return false;
        }
        contratEtablisCollectionIdentifiers.push(contratEtablisIdentifier);
        return true;
      });
      return [...contratEtablisToAdd, ...contratEtablisCollection];
    }
    return contratEtablisCollection;
  }

  protected convertDateFromClient<T extends IContratEtablisSteel | NewContratEtablisSteel | PartialUpdateContratEtablisSteel>(
    contratEtablis: T
  ): RestOf<T> {
    return {
      ...contratEtablis,
      dateEtablissement: contratEtablis.dateEtablissement?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restContratEtablisSteel: RestContratEtablisSteel): IContratEtablisSteel {
    return {
      ...restContratEtablisSteel,
      dateEtablissement: restContratEtablisSteel.dateEtablissement ? dayjs(restContratEtablisSteel.dateEtablissement) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestContratEtablisSteel>): HttpResponse<IContratEtablisSteel> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestContratEtablisSteel[]>): HttpResponse<IContratEtablisSteel[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
