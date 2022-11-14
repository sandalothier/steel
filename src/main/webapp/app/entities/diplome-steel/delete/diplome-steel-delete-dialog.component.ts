import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiplomeSteel } from '../diplome-steel.model';
import { DiplomeSteelService } from '../service/diplome-steel.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './diplome-steel-delete-dialog.component.html',
})
export class DiplomeSteelDeleteDialogComponent {
  diplome?: IDiplomeSteel;

  constructor(protected diplomeService: DiplomeSteelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diplomeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
