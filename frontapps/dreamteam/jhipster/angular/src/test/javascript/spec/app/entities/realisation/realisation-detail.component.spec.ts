/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BprTestModule } from '../../../test.module';
import { RealisationDetailComponent } from '../../../../../../main/webapp/app/entities/realisation/realisation-detail.component';
import { RealisationService } from '../../../../../../main/webapp/app/entities/realisation/realisation.service';
import { Realisation } from '../../../../../../main/webapp/app/entities/realisation/realisation.model';

describe('Component Tests', () => {

    describe('Realisation Management Detail Component', () => {
        let comp: RealisationDetailComponent;
        let fixture: ComponentFixture<RealisationDetailComponent>;
        let service: RealisationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BprTestModule],
                declarations: [RealisationDetailComponent],
                providers: [
                    RealisationService
                ]
            })
            .overrideTemplate(RealisationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RealisationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RealisationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Realisation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.realisation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
