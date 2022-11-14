import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPosteSteel } from '../poste-steel.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../poste-steel.test-samples';

import { PosteSteelService } from './poste-steel.service';

const requireRestSample: IPosteSteel = {
  ...sampleWithRequiredData,
};

describe('PosteSteel Service', () => {
  let service: PosteSteelService;
  let httpMock: HttpTestingController;
  let expectedResult: IPosteSteel | IPosteSteel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PosteSteelService);
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

    it('should create a PosteSteel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const poste = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(poste).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PosteSteel', () => {
      const poste = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(poste).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PosteSteel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PosteSteel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PosteSteel', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPosteSteelToCollectionIfMissing', () => {
      it('should add a PosteSteel to an empty array', () => {
        const poste: IPosteSteel = sampleWithRequiredData;
        expectedResult = service.addPosteSteelToCollectionIfMissing([], poste);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(poste);
      });

      it('should not add a PosteSteel to an array that contains it', () => {
        const poste: IPosteSteel = sampleWithRequiredData;
        const posteCollection: IPosteSteel[] = [
          {
            ...poste,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPosteSteelToCollectionIfMissing(posteCollection, poste);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PosteSteel to an array that doesn't contain it", () => {
        const poste: IPosteSteel = sampleWithRequiredData;
        const posteCollection: IPosteSteel[] = [sampleWithPartialData];
        expectedResult = service.addPosteSteelToCollectionIfMissing(posteCollection, poste);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(poste);
      });

      it('should add only unique PosteSteel to an array', () => {
        const posteArray: IPosteSteel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const posteCollection: IPosteSteel[] = [sampleWithRequiredData];
        expectedResult = service.addPosteSteelToCollectionIfMissing(posteCollection, ...posteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const poste: IPosteSteel = sampleWithRequiredData;
        const poste2: IPosteSteel = sampleWithPartialData;
        expectedResult = service.addPosteSteelToCollectionIfMissing([], poste, poste2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(poste);
        expect(expectedResult).toContain(poste2);
      });

      it('should accept null and undefined values', () => {
        const poste: IPosteSteel = sampleWithRequiredData;
        expectedResult = service.addPosteSteelToCollectionIfMissing([], null, poste, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(poste);
      });

      it('should return initial array if no PosteSteel is added', () => {
        const posteCollection: IPosteSteel[] = [sampleWithRequiredData];
        expectedResult = service.addPosteSteelToCollectionIfMissing(posteCollection, undefined, null);
        expect(expectedResult).toEqual(posteCollection);
      });
    });

    describe('comparePosteSteel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePosteSteel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePosteSteel(entity1, entity2);
        const compareResult2 = service.comparePosteSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePosteSteel(entity1, entity2);
        const compareResult2 = service.comparePosteSteel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePosteSteel(entity1, entity2);
        const compareResult2 = service.comparePosteSteel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
