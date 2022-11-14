import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SuccursaleSteelComponent } from '../list/succursale-steel.component';
import { SuccursaleSteelDetailComponent } from '../detail/succursale-steel-detail.component';
import { SuccursaleSteelUpdateComponent } from '../update/succursale-steel-update.component';
import { SuccursaleSteelRoutingResolveService } from './succursale-steel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const succursaleRoute: Routes = [
  {
    path: '',
    component: SuccursaleSteelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SuccursaleSteelDetailComponent,
    resolve: {
      succursale: SuccursaleSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SuccursaleSteelUpdateComponent,
    resolve: {
      succursale: SuccursaleSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SuccursaleSteelUpdateComponent,
    resolve: {
      succursale: SuccursaleSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(succursaleRoute)],
  exports: [RouterModule],
})
export class SuccursaleSteelRoutingModule {}
