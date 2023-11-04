import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { IndexComponent } from './index/index.component'
import { ImgToPdfComponent } from './imgToPdf/index.component'
import { PdfToImgComponent } from './pdfToImg/index.component'

// https://angular.cn/guide/router-reference#configuration
const routes: Routes = [
  { path: "index", component: IndexComponent },
  { path: "imgtopdf", component: ImgToPdfComponent },
  { path: "pdftoimg", component: PdfToImgComponent },
  { path: "", redirectTo: "index", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
