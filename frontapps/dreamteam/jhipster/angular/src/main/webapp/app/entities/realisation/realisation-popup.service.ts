import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Realisation } from './realisation.model';
import { RealisationService } from './realisation.service';

@Injectable()
export class RealisationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private realisationService: RealisationService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.realisationService.find(id)
                    .subscribe((realisationResponse: HttpResponse<Realisation>) => {
                        const realisation: Realisation = realisationResponse.body;
                        realisation.creationDate = this.datePipe
                            .transform(realisation.creationDate, 'yyyy-MM-ddTHH:mm:ss');
                        realisation.actionDate = this.datePipe
                            .transform(realisation.actionDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.realisationModalRef(component, realisation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.realisationModalRef(component, new Realisation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    realisationModalRef(component: Component, realisation: Realisation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.realisation = realisation;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
