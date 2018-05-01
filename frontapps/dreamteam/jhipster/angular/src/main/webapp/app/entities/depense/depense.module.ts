import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BprSharedModule } from '../../shared';
import {
    DepenseService,
    DepensePopupService,
    DepenseComponent,
    DepenseDetailComponent,
    DepenseDialogComponent,
    DepensePopupComponent,
    DepenseDeletePopupComponent,
    DepenseDeleteDialogComponent,
    depenseRoute,
    depensePopupRoute,
} from './';

const ENTITY_STATES = [
    ...depenseRoute,
    ...depensePopupRoute,
];

@NgModule({
    imports: [
        BprSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DepenseComponent,
        DepenseDetailComponent,
        DepenseDialogComponent,
        DepenseDeleteDialogComponent,
        DepensePopupComponent,
        DepenseDeletePopupComponent,
    ],
    entryComponents: [
        DepenseComponent,
        DepenseDialogComponent,
        DepensePopupComponent,
        DepenseDeleteDialogComponent,
        DepenseDeletePopupComponent,
    ],
    providers: [
        DepenseService,
        DepensePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BprDepenseModule {}
