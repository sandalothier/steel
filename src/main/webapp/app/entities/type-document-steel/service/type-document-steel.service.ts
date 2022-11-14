import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITypeDocumentSteel, NewTypeDocumentSteel } from '../type-document-steel.model';

export type PartialUpdateTypeDocumentSteel = Partial<ITypeDocumentSteel> & Pick<ITypeDocumentSteel, 'id'>;

export type EntityResponseType = HttpResponse<ITypeDocumentSteel>;
export type EntityArrayResponseType = HttpResponse<ITypeDocumentSteel[]>;

@Injectable({ providedIn: 'root' })
export class TypeDocumentSteelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/type-documents');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/type-documents');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(typeDocument: NewTypeDocumentSteel): Observable<EntityResponseType> {
    return this.http.post<ITypeDocumentSteel>(this.resourceUrl, typeDocument, { observe: 'response' });
  }

  update(typeDocument: ITypeDocumentSteel): Observable<EntityResponseType> {
    return this.http.put<ITypeDocumentSteel>(`${this.resourceUrl}/${this.getTypeDocumentSteelIdentifier(typeDocument)}`, typeDocument, {
      observe: 'response',
    });
  }

  partialUpdate(typeDocument: PartialUpdateTypeDocumentSteel): Observable<EntityResponseType> {
    return this.http.patch<ITypeDocumentSteel>(`${this.resourceUrl}/${this.getTypeDocumentSteelIdentifier(typeDocument)}`, typeDocument, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeDocumentSteel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeDocumentSteel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeDocumentSteel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getTypeDocumentSteelIdentifier(typeDocument: Pick<ITypeDocumentSteel, 'id'>): number {
    return typeDocument.id;
  }

  compareTypeDocumentSteel(o1: Pick<ITypeDocumentSteel, 'id'> | null, o2: Pick<ITypeDocumentSteel, 'id'> | null): boolean {
    return o1 && o2 ? this.getTypeDocumentSteelIdentifier(o1) === this.getTypeDocumentSteelIdentifier(o2) : o1 === o2;
  }

  addTypeDocumentSteelToCollectionIfMissing<Type extends Pick<ITypeDocumentSteel, 'id'>>(
    typeDocumentCollection: Type[],
    ...typeDocumentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const typeDocuments: Type[] = typeDocumentsToCheck.filter(isPresent);
    if (typeDocuments.length > 0) {
      const typeDocumentCollectionIdentifiers = typeDocumentCollection.map(
        typeDocumentItem => this.getTypeDocumentSteelIdentifier(typeDocumentItem)!
      );
      const typeDocumentsToAdd = typeDocuments.filter(typeDocumentItem => {
        const typeDocumentIdentifier = this.getTypeDocumentSteelIdentifier(typeDocumentItem);
        if (typeDocumentCollectionIdentifiers.includes(typeDocumentIdentifier)) {
          return false;
        }
        typeDocumentCollectionIdentifiers.push(typeDocumentIdentifier);
        return true;
      });
      return [...typeDocumentsToAdd, ...typeDocumentCollection];
    }
    return typeDocumentCollection;
  }
}
