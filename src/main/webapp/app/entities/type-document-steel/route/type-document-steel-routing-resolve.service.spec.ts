import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITypeDocumentSteel } from '../type-document-steel.model';
import { TypeDocumentSteelService } from '../service/type-document-steel.service';

import { TypeDocumentSteelRoutingResolveService } from './type-document-steel-routing-resolve.service';

describe('TypeDocumentSteel routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TypeDocumentSteelRoutingResolveService;
  let service: TypeDocumentSteelService;
  let resultTypeDocumentSteel: ITypeDocumentSteel | null | undefined;

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
    routingResolveService = TestBed.inject(TypeDocumentSteelRoutingResolveService);
    service = TestBed.inject(TypeDocumentSteelService);
    resultTypeDocumentSteel = undefined;
  });

  describe('resolve', () => {
    it('should return ITypeDocumentSteel returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTypeDocumentSteel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTypeDocumentSteel).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTypeDocumentSteel = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTypeDocumentSteel).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITypeDocumentSteel>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTypeDocumentSteel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTypeDocumentSteel).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
