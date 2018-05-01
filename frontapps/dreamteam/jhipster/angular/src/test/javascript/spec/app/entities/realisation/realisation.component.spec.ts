/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BprTestModule } from '../../../test.module';
import { RealisationComponent } from '../../../../../../main/webapp/app/entities/realisation/realisation.component';
import { RealisationService } from '../../../../../../main/webapp/app/entities/realisation/realisation.service';
import { Realisation } from '../../../../../../main/webapp/app/entities/realisation/realisation.model';

describe('Component Tests', () => {

    describe('Realisation Management Component', () => {
        let comp: RealisationComponent;
        let fixture: ComponentFixture<RealisationComponent>;
        let service: RealisationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BprTestModule],
                declarations: [RealisationComponent],
                providers: [
                    RealisationService
                ]
            })
            .overrideTemplate(RealisationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RealisationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RealisationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Realisation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.realisations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
