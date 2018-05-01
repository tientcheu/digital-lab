import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Realisation } from './realisation.model';
import { RealisationService } from './realisation.service';

@Component({
    selector: 'jhi-realisation-detail',
    templateUrl: './realisation-detail.component.html'
})
export class RealisationDetailComponent implements OnInit, OnDestroy {

    realisation: Realisation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private realisationService: RealisationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRealisations();
    }

    load(id) {
        this.realisationService.find(id)
            .subscribe((realisationResponse: HttpResponse<Realisation>) => {
                this.realisation = realisationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRealisations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'realisationListModification',
            (response) => this.load(this.realisation.id)
        );
    }
}
