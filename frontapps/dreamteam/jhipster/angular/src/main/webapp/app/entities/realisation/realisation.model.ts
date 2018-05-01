import { BaseEntity } from './../../shared';

export const enum ActionType {
    'MANAGEMENT',
    'CONTROL',
    'MARKETING',
    'SALES',
    'TECHNICAL',
    'LOGISTIQUE'
}

export class Realisation implements BaseEntity {
    constructor(
        public id?: number,
        public creationDate?: any,
        public actionDate?: any,
        public actionType?: ActionType,
        public description?: string,
    ) {
    }
}
