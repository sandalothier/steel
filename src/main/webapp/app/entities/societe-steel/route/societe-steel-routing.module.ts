import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SocieteSteelComponent } from '../list/societe-steel.component';
import { SocieteSteelDetailComponent } from '../detail/societe-steel-detail.component';
import { SocieteSteelUpdateComponent } from '../update/societe-steel-update.component';
import { SocieteSteelRoutingResolveService } from './societe-steel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const societeRoute: Routes = [
  {
    path: '',
    component: SocieteSteelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SocieteSteelDetailComponent,
    resolve: {
      societe: SocieteSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SocieteSteelUpdateComponent,
    resolve: {
      societe: SocieteSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SocieteSteelUpdateComponent,
    resolve: {
      societe: SocieteSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(societeRoute)],
  exports: [RouterModule],
})
export class SocieteSteelRoutingModule {}
