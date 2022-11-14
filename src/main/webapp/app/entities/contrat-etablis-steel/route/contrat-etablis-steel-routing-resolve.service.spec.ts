import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IContratEtablisSteel } from '../contrat-etablis-steel.model';
import { ContratEtablisSteelService } from '../service/contrat-etablis-steel.service';

import { ContratEtablisSteelRoutingResolveService } from './contrat-etablis-steel-routing-resolve.service';

describe('ContratEtablisSteel routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ContratEtablisSteelRoutingResolveService;
  let service: ContratEtablisSteelService;
  let resultContratEtablisSteel: IContratEtablisSteel | null | undefined;

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
    routingResolveService = TestBed.inject(ContratEtablisSteelRoutingResolveService);
    service = TestBed.inject(ContratEtablisSteelService);
    resultContratEtablisSteel = undefined;
  });

  describe('resolve', () => {
    it('should return IContratEtablisSteel returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultContratEtablisSteel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultContratEtablisSteel).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultContratEtablisSteel = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultContratEtablisSteel).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IContratEtablisSteel>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultContratEtablisSteel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultContratEtablisSteel).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
