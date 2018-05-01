import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Realisation } from './realisation.model';
import { RealisationPopupService } from './realisation-popup.service';
import { RealisationService } from './realisation.service';

@Component({
    selector: 'jhi-realisation-dialog',
    templateUrl: './realisation-dialog.component.html'
})
export class RealisationDialogComponent implements OnInit {

    realisation: Realisation;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private realisationService: RealisationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.realisation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.realisationService.update(this.realisation));
        } else {
            this.subscribeToSaveResponse(
                this.realisationService.create(this.realisation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Realisation>>) {
        result.subscribe((res: HttpResponse<Realisation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Realisation) {
        this.eventManager.broadcast({ name: 'realisationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-realisation-popup',
    template: ''
})
export class RealisationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private realisationPopupService: RealisationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.realisationPopupService
                    .open(RealisationDialogComponent as Component, params['id']);
            } else {
                this.realisationPopupService
                    .open(RealisationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
