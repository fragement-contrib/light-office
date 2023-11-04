import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  constructor(private router: Router) { }

  goto(pagename: string) {
    this.router.navigate(['/' + pagename])
  }

}
