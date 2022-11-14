import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAdresseSteel } from '../adresse-steel.model';
import { AdresseSteelService } from '../service/adresse-steel.service';

@Injectable({ providedIn: 'root' })
export class AdresseSteelRoutingResolveService implements Resolve<IAdresseSteel | null> {
  constructor(protected service: AdresseSteelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdresseSteel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((adresse: HttpResponse<IAdresseSteel>) => {
          if (adresse.body) {
            return of(adresse.body);
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
