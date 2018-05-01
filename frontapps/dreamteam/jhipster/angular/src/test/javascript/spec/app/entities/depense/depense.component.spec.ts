/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BprTestModule } from '../../../test.module';
import { DepenseComponent } from '../../../../../../main/webapp/app/entities/depense/depense.component';
import { DepenseService } from '../../../../../../main/webapp/app/entities/depense/depense.service';
import { Depense } from '../../../../../../main/webapp/app/entities/depense/depense.model';

describe('Component Tests', () => {

    describe('Depense Management Component', () => {
        let comp: DepenseComponent;
        let fixture: ComponentFixture<DepenseComponent>;
        let service: DepenseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BprTestModule],
                declarations: [DepenseComponent],
                providers: [
                    DepenseService
                ]
            })
            .overrideTemplate(DepenseComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepenseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepenseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Depense(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.depenses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
