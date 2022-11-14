import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SocieteSteelComponent } from './list/societe-steel.component';
import { SocieteSteelDetailComponent } from './detail/societe-steel-detail.component';
import { SocieteSteelUpdateComponent } from './update/societe-steel-update.component';
import { SocieteSteelDeleteDialogComponent } from './delete/societe-steel-delete-dialog.component';
import { SocieteSteelRoutingModule } from './route/societe-steel-routing.module';

@NgModule({
  imports: [SharedModule, SocieteSteelRoutingModule],
  declarations: [SocieteSteelComponent, SocieteSteelDetailComponent, SocieteSteelUpdateComponent, SocieteSteelDeleteDialogComponent],
})
export class SocieteSteelModule {}
