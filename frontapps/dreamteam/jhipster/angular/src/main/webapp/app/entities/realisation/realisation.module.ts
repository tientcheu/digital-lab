import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BprSharedModule } from '../../shared';
import {
    RealisationService,
    RealisationPopupService,
    RealisationComponent,
    RealisationDetailComponent,
    RealisationDialogComponent,
    RealisationPopupComponent,
    RealisationDeletePopupComponent,
    RealisationDeleteDialogComponent,
    realisationRoute,
    realisationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...realisationRoute,
    ...realisationPopupRoute,
];

@NgModule({
    imports: [
        BprSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RealisationComponent,
        RealisationDetailComponent,
        RealisationDialogComponent,
        RealisationDeleteDialogComponent,
        RealisationPopupComponent,
        RealisationDeletePopupComponent,
    ],
    entryComponents: [
        RealisationComponent,
        RealisationDialogComponent,
        RealisationPopupComponent,
        RealisationDeleteDialogComponent,
        RealisationDeletePopupComponent,
    ],
    providers: [
        RealisationService,
        RealisationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BprRealisationModule {}
