import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PosteSteelComponent } from './list/poste-steel.component';
import { PosteSteelDetailComponent } from './detail/poste-steel-detail.component';
import { PosteSteelUpdateComponent } from './update/poste-steel-update.component';
import { PosteSteelDeleteDialogComponent } from './delete/poste-steel-delete-dialog.component';
import { PosteSteelRoutingModule } from './route/poste-steel-routing.module';

@NgModule({
  imports: [SharedModule, PosteSteelRoutingModule],
  declarations: [PosteSteelComponent, PosteSteelDetailComponent, PosteSteelUpdateComponent, PosteSteelDeleteDialogComponent],
})
export class PosteSteelModule {}
