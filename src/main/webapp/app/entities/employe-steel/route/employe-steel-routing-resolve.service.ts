import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployeSteel } from '../employe-steel.model';
import { EmployeSteelService } from '../service/employe-steel.service';

@Injectable({ providedIn: 'root' })
export class EmployeSteelRoutingResolveService implements Resolve<IEmployeSteel | null> {
  constructor(protected service: EmployeSteelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeSteel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((employe: HttpResponse<IEmployeSteel>) => {
          if (employe.body) {
            return of(employe.body);
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
