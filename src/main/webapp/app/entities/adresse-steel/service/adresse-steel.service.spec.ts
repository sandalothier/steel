import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAdresseSteel } from '../adresse-steel.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../adresse-steel.test-samples';

import { AdresseSteelService } from './adresse-steel.service';

const requireRestSample: IAdresseSteel = {
  ...sampleWithRequiredData,
};

describe('AdresseSteel Service', () => {
  let service: AdresseSteelService;
  let httpMock: HttpTestingController;
  let expectedResult: IAdresseSteel | IAdresseSteel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AdresseSteelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a AdresseSteel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const adresse = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(adresse).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AdresseSteel', () => {
      const adresse = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(adresse).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AdresseSteel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AdresseSteel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AdresseSteel', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAdresseSteelToCollectionIfMissing', () => {
      it('should add a AdresseSteel to an empty array', () => {
        const adresse: IAdresseSteel = sampleWithRequiredData;
        expectedResult = service.addAdresseSteelToCollectionIfMissing([], adresse);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(adresse);
      });

      it('should not add a AdresseSteel to an array that contains it', () => {
        const adresse: IAdresseSteel = sampleWithRequiredData;
        const adresseCollection: IAdresseSteel[] = [
          {
            ...adresse,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAdresseSteelToCollectionIfMissing(adresseCollection, adresse);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AdresseSteel to an array that doesn't contain it", () => {
        const adresse: IAdresseSteel = sampleWithRequiredData;
        const adresseCollection: IAdresseSteel[] = [sampleWithPartialData];
        expectedResult = service.addAdresseSteelToCollectionIfMissing(adresseCollection, adresse);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(adresse);
      });

      it('should add only unique AdresseSteel to an array', () => {
        const adresseArray: IAdresseSteel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const adresseCollection: IAdresseSteel[] = [sampleWithRequiredData];
        expectedResult = service.addAdresseSteelToCollectionIfMissing(adresseCollection, ...adresseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const adresse: IAdresseSteel = sampleWithRequiredData;
        const adresse2: IAdresseSteel = sampleWithPartialData;
        expectedResult = service.addAdresseSteelToCollectionIfMissing([], adresse, adresse2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(adresse);
        expect(expectedResult).toContain(adresse2);
      });

      it('should accept null and undefined values', () => {
        const adresse: IAdresseSteel = sampleWithRequiredData;
        expectedResult = service.addAdresseSteelToCollectionIfMissing([], null, adresse, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(adresse);
      });

      it('should return initial array if no AdresseSteel is added', () => {
        const adresseCollection: IAdresseSteel[] = [sampleWithRequiredData];
        expectedResult = service.addAdresseSteelToCollectionIfMissing(adresseCollection, undefined, null);
        expect(expectedResult).toEqual(adresseCollection);
      });
    });

    describe('compareAdresseSteel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAdresseSteel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAdresseSteel(entity1, entity2);
        const compareResult2 = service.compareAdresseSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAdresseSteel(entity1, entity2);
        const compareResult2 = service.compareAdresseSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAdresseSteel(entity1, entity2);
        const compareResult2 = service.compareAdresseSteel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
