import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Attachment } from './attachment.model';
import { AttachmentPopupService } from './attachment-popup.service';
import { AttachmentService } from './attachment.service';

@Component({
    selector: 'jhi-attachment-dialog',
    templateUrl: './attachment-dialog.component.html'
})
export class AttachmentDialogComponent implements OnInit {

    attachment: Attachment;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private attachmentService: AttachmentService,
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
        if (this.attachment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.attachmentService.update(this.attachment));
        } else {
            this.subscribeToSaveResponse(
                this.attachmentService.create(this.attachment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Attachment>>) {
        result.subscribe((res: HttpResponse<Attachment>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Attachment) {
        this.eventManager.broadcast({ name: 'attachmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-attachment-popup',
    template: ''
})
export class AttachmentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attachmentPopupService: AttachmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.attachmentPopupService
                    .open(AttachmentDialogComponent as Component, params['id']);
            } else {
                this.attachmentPopupService
                    .open(AttachmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
