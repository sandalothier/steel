import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITypeContratDeTravailSteel } from '../type-contrat-de-travail-steel.model';
import { TypeContratDeTravailSteelService } from '../service/type-contrat-de-travail-steel.service';

import { TypeContratDeTravailSteelRoutingResolveService } from './type-contrat-de-travail-steel-routing-resolve.service';

describe('TypeContratDeTravailSteel routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TypeContratDeTravailSteelRoutingResolveService;
  let service: TypeContratDeTravailSteelService;
  let resultTypeContratDeTravailSteel: ITypeContratDeTravailSteel | null | undefined;

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
    routingResolveService = TestBed.inject(TypeContratDeTravailSteelRoutingResolveService);
    service = TestBed.inject(TypeContratDeTravailSteelService);
    resultTypeContratDeTravailSteel = undefined;
  });

  describe('resolve', () => {
    it('should return ITypeContratDeTravailSteel returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTypeContratDeTravailSteel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTypeContratDeTravailSteel).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTypeContratDeTravailSteel = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTypeContratDeTravailSteel).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITypeContratDeTravailSteel>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTypeContratDeTravailSteel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTypeContratDeTravailSteel).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
