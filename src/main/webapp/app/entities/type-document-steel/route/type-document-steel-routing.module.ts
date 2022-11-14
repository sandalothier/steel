import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TypeDocumentSteelComponent } from '../list/type-document-steel.component';
import { TypeDocumentSteelDetailComponent } from '../detail/type-document-steel-detail.component';
import { TypeDocumentSteelUpdateComponent } from '../update/type-document-steel-update.component';
import { TypeDocumentSteelRoutingResolveService } from './type-document-steel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const typeDocumentRoute: Routes = [
  {
    path: '',
    component: TypeDocumentSteelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypeDocumentSteelDetailComponent,
    resolve: {
      typeDocument: TypeDocumentSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypeDocumentSteelUpdateComponent,
    resolve: {
      typeDocument: TypeDocumentSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypeDocumentSteelUpdateComponent,
    resolve: {
      typeDocument: TypeDocumentSteelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(typeDocumentRoute)],
  exports: [RouterModule],
})
export class TypeDocumentSteelRoutingModule {}
