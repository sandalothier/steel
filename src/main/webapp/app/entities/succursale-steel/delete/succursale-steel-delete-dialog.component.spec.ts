jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SuccursaleSteelService } from '../service/succursale-steel.service';

import { SuccursaleSteelDeleteDialogComponent } from './succursale-steel-delete-dialog.component';

describe('SuccursaleSteel Management Delete Component', () => {
  let comp: SuccursaleSteelDeleteDialogComponent;
  let fixture: ComponentFixture<SuccursaleSteelDeleteDialogComponent>;
  let service: SuccursaleSteelService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SuccursaleSteelDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(SuccursaleSteelDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SuccursaleSteelDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SuccursaleSteelService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
