import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeSteel } from '../employe-steel.model';
import { EmployeSteelService } from '../service/employe-steel.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './employe-steel-delete-dialog.component.html',
})
export class EmployeSteelDeleteDialogComponent {
  employe?: IEmployeSteel;

  constructor(protected employeService: EmployeSteelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
