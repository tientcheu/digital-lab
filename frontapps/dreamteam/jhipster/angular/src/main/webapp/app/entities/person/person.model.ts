import { BaseEntity } from './../../shared';

export class Person implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public title?: string,
        public email?: string,
        public phoneNumber?: string,
        public description?: string,
    ) {
    }
}
