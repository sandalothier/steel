import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IComposantDocumentSteel, NewComposantDocumentSteel } from '../composant-document-steel.model';

export type PartialUpdateComposantDocumentSteel = Partial<IComposantDocumentSteel> & Pick<IComposantDocumentSteel, 'id'>;

export type EntityResponseType = HttpResponse<IComposantDocumentSteel>;
export type EntityArrayResponseType = HttpResponse<IComposantDocumentSteel[]>;

@Injectable({ providedIn: 'root' })
export class ComposantDocumentSteelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/composant-documents');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/composant-documents');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(composantDocument: NewComposantDocumentSteel): Observable<EntityResponseType> {
    return this.http.post<IComposantDocumentSteel>(this.resourceUrl, composantDocument, { observe: 'response' });
  }

  update(composantDocument: IComposantDocumentSteel): Observable<EntityResponseType> {
    return this.http.put<IComposantDocumentSteel>(
      `${this.resourceUrl}/${this.getComposantDocumentSteelIdentifier(composantDocument)}`,
      composantDocument,
      { observe: 'response' }
    );
  }

  partialUpdate(composantDocument: PartialUpdateComposantDocumentSteel): Observable<EntityResponseType> {
    return this.http.patch<IComposantDocumentSteel>(
      `${this.resourceUrl}/${this.getComposantDocumentSteelIdentifier(composantDocument)}`,
      composantDocument,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IComposantDocumentSteel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComposantDocumentSteel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComposantDocumentSteel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getComposantDocumentSteelIdentifier(composantDocument: Pick<IComposantDocumentSteel, 'id'>): number {
    return composantDocument.id;
  }

  compareComposantDocumentSteel(o1: Pick<IComposantDocumentSteel, 'id'> | null, o2: Pick<IComposantDocumentSteel, 'id'> | null): boolean {
    return o1 && o2 ? this.getComposantDocumentSteelIdentifier(o1) === this.getComposantDocumentSteelIdentifier(o2) : o1 === o2;
  }

  addComposantDocumentSteelToCollectionIfMissing<Type extends Pick<IComposantDocumentSteel, 'id'>>(
    composantDocumentCollection: Type[],
    ...composantDocumentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const composantDocuments: Type[] = composantDocumentsToCheck.filter(isPresent);
    if (composantDocuments.length > 0) {
      const composantDocumentCollectionIdentifiers = composantDocumentCollection.map(
        composantDocumentItem => this.getComposantDocumentSteelIdentifier(composantDocumentItem)!
      );
      const composantDocumentsToAdd = composantDocuments.filter(composantDocumentItem => {
        const composantDocumentIdentifier = this.getComposantDocumentSteelIdentifier(composantDocumentItem);
        if (composantDocumentCollectionIdentifiers.includes(composantDocumentIdentifier)) {
          return false;
        }
        composantDocumentCollectionIdentifiers.push(composantDocumentIdentifier);
        return true;
      });
      return [...composantDocumentsToAdd, ...composantDocumentCollection];
    }
    return composantDocumentCollection;
  }
}
