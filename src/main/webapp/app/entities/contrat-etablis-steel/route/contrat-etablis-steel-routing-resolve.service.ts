import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IContratEtablisSteel } from '../contrat-etablis-steel.model';
import { ContratEtablisSteelService } from '../service/contrat-etablis-steel.service';

@Injectable({ providedIn: 'root' })
export class ContratEtablisSteelRoutingResolveService implements Resolve<IContratEtablisSteel | null> {
  constructor(protected service: ContratEtablisSteelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContratEtablisSteel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((contratEtablis: HttpResponse<IContratEtablisSteel>) => {
          if (contratEtablis.body) {
            return of(contratEtablis.body);
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
