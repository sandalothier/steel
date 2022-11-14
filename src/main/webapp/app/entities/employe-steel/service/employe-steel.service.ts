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
import { IEmployeSteel, NewEmployeSteel } from '../employe-steel.model';

export type PartialUpdateEmployeSteel = Partial<IEmployeSteel> & Pick<IEmployeSteel, 'id'>;

type RestOf<T extends IEmployeSteel | NewEmployeSteel> = Omit<T, 'dateNaissance'> & {
  dateNaissance?: string | null;
};

export type RestEmployeSteel = RestOf<IEmployeSteel>;

export type NewRestEmployeSteel = RestOf<NewEmployeSteel>;

export type PartialUpdateRestEmployeSteel = RestOf<PartialUpdateEmployeSteel>;

export type EntityResponseType = HttpResponse<IEmployeSteel>;
export type EntityArrayResponseType = HttpResponse<IEmployeSteel[]>;

@Injectable({ providedIn: 'root' })
export class EmployeSteelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/employes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(employe: NewEmployeSteel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .post<RestEmployeSteel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(employe: IEmployeSteel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .put<RestEmployeSteel>(`${this.resourceUrl}/${this.getEmployeSteelIdentifier(employe)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(employe: PartialUpdateEmployeSteel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .patch<RestEmployeSteel>(`${this.resourceUrl}/${this.getEmployeSteelIdentifier(employe)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEmployeSteel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEmployeSteel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEmployeSteel[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getEmployeSteelIdentifier(employe: Pick<IEmployeSteel, 'id'>): number {
    return employe.id;
  }

  compareEmployeSteel(o1: Pick<IEmployeSteel, 'id'> | null, o2: Pick<IEmployeSteel, 'id'> | null): boolean {
    return o1 && o2 ? this.getEmployeSteelIdentifier(o1) === this.getEmployeSteelIdentifier(o2) : o1 === o2;
  }

  addEmployeSteelToCollectionIfMissing<Type extends Pick<IEmployeSteel, 'id'>>(
    employeCollection: Type[],
    ...employesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const employes: Type[] = employesToCheck.filter(isPresent);
    if (employes.length > 0) {
      const employeCollectionIdentifiers = employeCollection.map(employeItem => this.getEmployeSteelIdentifier(employeItem)!);
      const employesToAdd = employes.filter(employeItem => {
        const employeIdentifier = this.getEmployeSteelIdentifier(employeItem);
        if (employeCollectionIdentifiers.includes(employeIdentifier)) {
          return false;
        }
        employeCollectionIdentifiers.push(employeIdentifier);
        return true;
      });
      return [...employesToAdd, ...employeCollection];
    }
    return employeCollection;
  }

  protected convertDateFromClient<T extends IEmployeSteel | NewEmployeSteel | PartialUpdateEmployeSteel>(employe: T): RestOf<T> {
    return {
      ...employe,
      dateNaissance: employe.dateNaissance?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restEmployeSteel: RestEmployeSteel): IEmployeSteel {
    return {
      ...restEmployeSteel,
      dateNaissance: restEmployeSteel.dateNaissance ? dayjs(restEmployeSteel.dateNaissance) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEmployeSteel>): HttpResponse<IEmployeSteel> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEmployeSteel[]>): HttpResponse<IEmployeSteel[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
