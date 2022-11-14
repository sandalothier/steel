import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SuccursaleSteelComponent } from './list/succursale-steel.component';
import { SuccursaleSteelDetailComponent } from './detail/succursale-steel-detail.component';
import { SuccursaleSteelUpdateComponent } from './update/succursale-steel-update.component';
import { SuccursaleSteelDeleteDialogComponent } from './delete/succursale-steel-delete-dialog.component';
import { SuccursaleSteelRoutingModule } from './route/succursale-steel-routing.module';

@NgModule({
  imports: [SharedModule, SuccursaleSteelRoutingModule],
  declarations: [
    SuccursaleSteelComponent,
    SuccursaleSteelDetailComponent,
    SuccursaleSteelUpdateComponent,
    SuccursaleSteelDeleteDialogComponent,
  ],
})
export class SuccursaleSteelModule {}
