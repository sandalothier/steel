import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IComposantDocumentSteel } from '../composant-document-steel.model';
import { ComposantDocumentSteelService } from '../service/composant-document-steel.service';

import { ComposantDocumentSteelRoutingResolveService } from './composant-document-steel-routing-resolve.service';

describe('ComposantDocumentSteel routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ComposantDocumentSteelRoutingResolveService;
  let service: ComposantDocumentSteelService;
  let resultComposantDocumentSteel: IComposantDocumentSteel | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(ComposantDocumentSteelRoutingResolveService);
    service = TestBed.inject(ComposantDocumentSteelService);
    resultComposantDocumentSteel = undefined;
  });

  describe('resolve', () => {
    it('should return IComposantDocumentSteel returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultComposantDocumentSteel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultComposantDocumentSteel).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultComposantDocumentSteel = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultComposantDocumentSteel).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IComposantDocumentSteel>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultComposantDocumentSteel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultComposantDocumentSteel).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
