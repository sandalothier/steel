import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITypeDocumentSteel } from '../type-document-steel.model';
import { TypeDocumentSteelService } from '../service/type-document-steel.service';

@Injectable({ providedIn: 'root' })
export class TypeDocumentSteelRoutingResolveService implements Resolve<ITypeDocumentSteel | null> {
  constructor(protected service: TypeDocumentSteelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeDocumentSteel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((typeDocument: HttpResponse<ITypeDocumentSteel>) => {
          if (typeDocument.body) {
            return of(typeDocument.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
