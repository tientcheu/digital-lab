import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactBlotterComponent} from "./blotter/contact-page.component";
import {ContactDetailsComponent} from "./details/contact-details.component";
import {ContactPageComponent} from "./contact-page.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContactBlotterComponent, ContactDetailsComponent, ContactPageComponent],
  exports : [ContactPageComponent]
})
export class ContactModule { }
