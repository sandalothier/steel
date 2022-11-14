import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IComposantDocumentSteel } from '../composant-document-steel.model';
import { ComposantDocumentSteelService } from '../service/composant-document-steel.service';

@Injectable({ providedIn: 'root' })
export class ComposantDocumentSteelRoutingResolveService implements Resolve<IComposantDocumentSteel | null> {
  constructor(protected service: ComposantDocumentSteelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IComposantDocumentSteel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((composantDocument: HttpResponse<IComposantDocumentSteel>) => {
          if (composantDocument.body) {
            return of(composantDocument.body);
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
