/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BprTestModule } from '../../../test.module';
import { DepenseDetailComponent } from '../../../../../../main/webapp/app/entities/depense/depense-detail.component';
import { DepenseService } from '../../../../../../main/webapp/app/entities/depense/depense.service';
import { Depense } from '../../../../../../main/webapp/app/entities/depense/depense.model';

describe('Component Tests', () => {

    describe('Depense Management Detail Component', () => {
        let comp: DepenseDetailComponent;
        let fixture: ComponentFixture<DepenseDetailComponent>;
        let service: DepenseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BprTestModule],
                declarations: [DepenseDetailComponent],
                providers: [
                    DepenseService
                ]
            })
            .overrideTemplate(DepenseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepenseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepenseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Depense(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.depense).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
