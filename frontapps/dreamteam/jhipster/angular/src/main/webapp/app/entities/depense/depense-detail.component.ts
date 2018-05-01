import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Depense } from './depense.model';
import { DepenseService } from './depense.service';

@Component({
    selector: 'jhi-depense-detail',
    templateUrl: './depense-detail.component.html'
})
export class DepenseDetailComponent implements OnInit, OnDestroy {

    depense: Depense;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private depenseService: DepenseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDepenses();
    }

    load(id) {
        this.depenseService.find(id)
            .subscribe((depenseResponse: HttpResponse<Depense>) => {
                this.depense = depenseResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDepenses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'depenseListModification',
            (response) => this.load(this.depense.id)
        );
    }
}
