import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  template:`
    <div>
     <h1>app-contact-page</h1> 
      <app-contact-blotter></app-contact-blotter>
      <app-contact-details></app-contact-details>
    </div>
  `
})
  export class ContactPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
