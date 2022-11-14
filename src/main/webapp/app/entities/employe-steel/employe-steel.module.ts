import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EmployeSteelComponent } from './list/employe-steel.component';
import { EmployeSteelDetailComponent } from './detail/employe-steel-detail.component';
import { EmployeSteelUpdateComponent } from './update/employe-steel-update.component';
import { EmployeSteelDeleteDialogComponent } from './delete/employe-steel-delete-dialog.component';
import { EmployeSteelRoutingModule } from './route/employe-steel-routing.module';

@NgModule({
  imports: [SharedModule, EmployeSteelRoutingModule],
  declarations: [EmployeSteelComponent, EmployeSteelDetailComponent, EmployeSteelUpdateComponent, EmployeSteelDeleteDialogComponent],
})
export class EmployeSteelModule {}
