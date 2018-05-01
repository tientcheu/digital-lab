import { BaseEntity } from './../../shared';

export const enum BusinessDocumentStatut {
    'SUBMITTED',
    'APPROVED',
    'REJECTED',
    'CANCELED'
}

export class Depense implements BaseEntity {
    constructor(
        public id?: number,
        public creationDate?: any,
        public eventDate?: any,
        public description?: string,
        public statut?: BusinessDocumentStatut,
    ) {
    }
}
