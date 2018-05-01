import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Depense } from './depense.model';
import { DepensePopupService } from './depense-popup.service';
import { DepenseService } from './depense.service';

@Component({
    selector: 'jhi-depense-dialog',
    templateUrl: './depense-dialog.component.html'
})
export class DepenseDialogComponent implements OnInit {

    depense: Depense;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private depenseService: DepenseService,
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
        if (this.depense.id !== undefined) {
            this.subscribeToSaveResponse(
                this.depenseService.update(this.depense));
        } else {
            this.subscribeToSaveResponse(
                this.depenseService.create(this.depense));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Depense>>) {
        result.subscribe((res: HttpResponse<Depense>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Depense) {
        this.eventManager.broadcast({ name: 'depenseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-depense-popup',
    template: ''
})
export class DepensePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private depensePopupService: DepensePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.depensePopupService
                    .open(DepenseDialogComponent as Component, params['id']);
            } else {
                this.depensePopupService
                    .open(DepenseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
