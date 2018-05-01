import { BaseEntity } from './../../shared';

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public startDate?: any,
        public endDate?: any,
        public assignee?: string,
    ) {
    }
}
