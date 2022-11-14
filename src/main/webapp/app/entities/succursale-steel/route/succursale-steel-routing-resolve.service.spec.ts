import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ISuccursaleSteel } from '../succursale-steel.model';
import { SuccursaleSteelService } from '../service/succursale-steel.service';

import { SuccursaleSteelRoutingResolveService } from './succursale-steel-routing-resolve.service';

describe('SuccursaleSteel routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SuccursaleSteelRoutingResolveService;
  let service: SuccursaleSteelService;
  let resultSuccursaleSteel: ISuccursaleSteel | null | undefined;

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
    routingResolveService = TestBed.inject(SuccursaleSteelRoutingResolveService);
    service = TestBed.inject(SuccursaleSteelService);
    resultSuccursaleSteel = undefined;
  });

  describe('resolve', () => {
    it('should return ISuccursaleSteel returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSuccursaleSteel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSuccursaleSteel).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSuccursaleSteel = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSuccursaleSteel).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ISuccursaleSteel>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSuccursaleSteel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSuccursaleSteel).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
