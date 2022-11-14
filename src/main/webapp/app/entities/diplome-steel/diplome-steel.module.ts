import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DiplomeSteelComponent } from './list/diplome-steel.component';
import { DiplomeSteelDetailComponent } from './detail/diplome-steel-detail.component';
import { DiplomeSteelUpdateComponent } from './update/diplome-steel-update.component';
import { DiplomeSteelDeleteDialogComponent } from './delete/diplome-steel-delete-dialog.component';
import { DiplomeSteelRoutingModule } from './route/diplome-steel-routing.module';

@NgModule({
  imports: [SharedModule, DiplomeSteelRoutingModule],
  declarations: [DiplomeSteelComponent, DiplomeSteelDetailComponent, DiplomeSteelUpdateComponent, DiplomeSteelDeleteDialogComponent],
})
export class DiplomeSteelModule {}
