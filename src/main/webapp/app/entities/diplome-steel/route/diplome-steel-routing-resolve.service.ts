import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDiplomeSteel } from '../diplome-steel.model';
import { DiplomeSteelService } from '../service/diplome-steel.service';

@Injectable({ providedIn: 'root' })
export class DiplomeSteelRoutingResolveService implements Resolve<IDiplomeSteel | null> {
  constructor(protected service: DiplomeSteelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiplomeSteel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((diplome: HttpResponse<IDiplomeSteel>) => {
          if (diplome.body) {
            return of(diplome.body);
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
