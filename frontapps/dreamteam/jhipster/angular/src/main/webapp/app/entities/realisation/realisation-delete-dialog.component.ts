import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Realisation } from './realisation.model';
import { RealisationPopupService } from './realisation-popup.service';
import { RealisationService } from './realisation.service';

@Component({
    selector: 'jhi-realisation-delete-dialog',
    templateUrl: './realisation-delete-dialog.component.html'
})
export class RealisationDeleteDialogComponent {

    realisation: Realisation;

    constructor(
        private realisationService: RealisationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.realisationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'realisationListModification',
                content: 'Deleted an realisation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-realisation-delete-popup',
    template: ''
})
export class RealisationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private realisationPopupService: RealisationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.realisationPopupService
                .open(RealisationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
