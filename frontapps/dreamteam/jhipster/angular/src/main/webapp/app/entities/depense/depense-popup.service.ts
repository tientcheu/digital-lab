import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Depense } from './depense.model';
import { DepenseService } from './depense.service';

@Injectable()
export class DepensePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private depenseService: DepenseService

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
                this.depenseService.find(id)
                    .subscribe((depenseResponse: HttpResponse<Depense>) => {
                        const depense: Depense = depenseResponse.body;
                        depense.creationDate = this.datePipe
                            .transform(depense.creationDate, 'yyyy-MM-ddTHH:mm:ss');
                        depense.eventDate = this.datePipe
                            .transform(depense.eventDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.depenseModalRef(component, depense);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.depenseModalRef(component, new Depense());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    depenseModalRef(component: Component, depense: Depense): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.depense = depense;
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
