import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISuccursaleSteel } from '../succursale-steel.model';
import { SuccursaleSteelService } from '../service/succursale-steel.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './succursale-steel-delete-dialog.component.html',
})
export class SuccursaleSteelDeleteDialogComponent {
  succursale?: ISuccursaleSteel;

  constructor(protected succursaleService: SuccursaleSteelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.succursaleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
