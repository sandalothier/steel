import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPosteSteel } from '../poste-steel.model';
import { PosteSteelService } from '../service/poste-steel.service';

@Injectable({ providedIn: 'root' })
export class PosteSteelRoutingResolveService implements Resolve<IPosteSteel | null> {
  constructor(protected service: PosteSteelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPosteSteel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((poste: HttpResponse<IPosteSteel>) => {
          if (poste.body) {
            return of(poste.body);
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
