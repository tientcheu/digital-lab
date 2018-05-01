import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Depense } from './depense.model';
import { DepensePopupService } from './depense-popup.service';
import { DepenseService } from './depense.service';

@Component({
    selector: 'jhi-depense-delete-dialog',
    templateUrl: './depense-delete-dialog.component.html'
})
export class DepenseDeleteDialogComponent {

    depense: Depense;

    constructor(
        private depenseService: DepenseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.depenseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'depenseListModification',
                content: 'Deleted an depense'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-depense-delete-popup',
    template: ''
})
export class DepenseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private depensePopupService: DepensePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.depensePopupService
                .open(DepenseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
