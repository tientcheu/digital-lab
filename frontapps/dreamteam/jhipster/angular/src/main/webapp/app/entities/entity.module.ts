import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BprTaskModule } from './task/task.module';
import { BprPersonModule } from './person/person.module';
import { BprRealisationModule } from './realisation/realisation.module';
import { BprDepenseModule } from './depense/depense.module';
import { BprAttachmentModule } from './attachment/attachment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BprTaskModule,
        BprPersonModule,
        BprRealisationModule,
        BprDepenseModule,
        BprAttachmentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BprEntityModule {}
