import { Component } from '@angular/core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) { }

  isPhone: boolean = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)

  goto(pagename: string) {
    this.router.navigate(['/' + pagename])
  }

}
