import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common'

import { AppRoutingModule } from './pages/app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
