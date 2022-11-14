import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployeSteelComponent } from '../list/employe-steel.component';
import { EmployeSteelDetailComponent } from '../detail/employe-steel-detail.component';
import { EmployeSteelUpdateComponent } from '../update/employe-steel-update.component';
import { EmployeSteelRoutingResolveService } from './employe-steel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const employeRoute: Routes = [
  {
    path: '',
    component: EmployeSteelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployeSteelDetailComponent,
    resolve: {
      employe: EmployeSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeSteelUpdateComponent,
    resolve: {
      employe: EmployeSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployeSteelUpdateComponent,
    resolve: {
      employe: EmployeSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeRoute)],
  exports: [RouterModule],
})
export class EmployeSteelRoutingModule {}
