import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISuccursaleSteel } from '../succursale-steel.model';
import { SuccursaleSteelService } from '../service/succursale-steel.service';

@Injectable({ providedIn: 'root' })
export class SuccursaleSteelRoutingResolveService implements Resolve<ISuccursaleSteel | null> {
  constructor(protected service: SuccursaleSteelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISuccursaleSteel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((succursale: HttpResponse<ISuccursaleSteel>) => {
          if (succursale.body) {
            return of(succursale.body);
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
