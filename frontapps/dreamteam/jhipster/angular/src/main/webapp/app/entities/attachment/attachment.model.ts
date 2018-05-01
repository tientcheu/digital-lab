import { BaseEntity } from './../../shared';

export const enum AttachmentType {
    'FILE',
    'MAIL',
    'IMAGE',
    'AUDIO',
    'VIDEO',
    'PDF',
    'EXCELL',
    'WORLD',
    'LINK'
}

export class Attachment implements BaseEntity {
    constructor(
        public id?: number,
        public creationDate?: any,
        public description?: string,
        public attachmentType?: AttachmentType,
    ) {
    }
}
