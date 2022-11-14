import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPosteSteel } from '../poste-steel.model';
import { PosteSteelService } from '../service/poste-steel.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './poste-steel-delete-dialog.component.html',
})
export class PosteSteelDeleteDialogComponent {
  poste?: IPosteSteel;

  constructor(protected posteService: PosteSteelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.posteService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
