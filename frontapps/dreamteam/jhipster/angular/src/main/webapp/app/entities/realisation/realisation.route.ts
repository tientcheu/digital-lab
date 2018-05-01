import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RealisationComponent } from './realisation.component';
import { RealisationDetailComponent } from './realisation-detail.component';
import { RealisationPopupComponent } from './realisation-dialog.component';
import { RealisationDeletePopupComponent } from './realisation-delete-dialog.component';

export const realisationRoute: Routes = [
    {
        path: 'realisation',
        component: RealisationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bprApp.realisation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'realisation/:id',
        component: RealisationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bprApp.realisation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const realisationPopupRoute: Routes = [
    {
        path: 'realisation-new',
        component: RealisationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bprApp.realisation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'realisation/:id/edit',
        component: RealisationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bprApp.realisation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'realisation/:id/delete',
        component: RealisationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bprApp.realisation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
