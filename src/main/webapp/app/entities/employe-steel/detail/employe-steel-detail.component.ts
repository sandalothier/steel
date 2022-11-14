import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeSteel } from '../employe-steel.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-employe-steel-detail',
  templateUrl: './employe-steel-detail.component.html',
})
export class EmployeSteelDetailComponent implements OnInit {
  employe: IEmployeSteel | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employe }) => {
      this.employe = employe;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
