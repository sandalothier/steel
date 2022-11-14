import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISocieteSteel } from '../societe-steel.model';
import { SocieteSteelService } from '../service/societe-steel.service';

@Injectable({ providedIn: 'root' })
export class SocieteSteelRoutingResolveService implements Resolve<ISocieteSteel | null> {
  constructor(protected service: SocieteSteelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISocieteSteel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((societe: HttpResponse<ISocieteSteel>) => {
          if (societe.body) {
            return of(societe.body);
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
