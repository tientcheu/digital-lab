import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DepenseComponent } from './depense.component';
import { DepenseDetailComponent } from './depense-detail.component';
import { DepensePopupComponent } from './depense-dialog.component';
import { DepenseDeletePopupComponent } from './depense-delete-dialog.component';

export const depenseRoute: Routes = [
    {
        path: 'depense',
        component: DepenseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bprApp.depense.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'depense/:id',
        component: DepenseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bprApp.depense.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const depensePopupRoute: Routes = [
    {
        path: 'depense-new',
        component: DepensePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bprApp.depense.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'depense/:id/edit',
        component: DepensePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bprApp.depense.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'depense/:id/delete',
        component: DepenseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bprApp.depense.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
