import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITypeContratDeTravailSteel } from '../type-contrat-de-travail-steel.model';
import { TypeContratDeTravailSteelService } from '../service/type-contrat-de-travail-steel.service';

@Injectable({ providedIn: 'root' })
export class TypeContratDeTravailSteelRoutingResolveService implements Resolve<ITypeContratDeTravailSteel | null> {
  constructor(protected service: TypeContratDeTravailSteelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeContratDeTravailSteel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((typeContratDeTravail: HttpResponse<ITypeContratDeTravailSteel>) => {
          if (typeContratDeTravail.body) {
            return of(typeContratDeTravail.body);
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
