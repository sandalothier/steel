import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISocieteSteel } from '../societe-steel.model';
import { SocieteSteelService } from '../service/societe-steel.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './societe-steel-delete-dialog.component.html',
})
export class SocieteSteelDeleteDialogComponent {
  societe?: ISocieteSteel;

  constructor(protected societeService: SocieteSteelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.societeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
