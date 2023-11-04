import { Component } from '@angular/core'

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ImgToPdfComponent {

  doChange(event: Event) {
    let files = (event?.target as any).files

    let promises = []

    let template = ""
    for (let index = 0; index < files.length; index++) {
      let file = files[index]

      promises.push(new Promise(function (resolve) {

        let reader = new FileReader()

        reader.onload = function () {

          template += '<div style="display: flex;justify-content: center;align-items: center;height: 100vh;width: 100vw;"><img src="' + reader.result + '" style="max-width: 100vw;max-height: 100vh;"></img></div>'
          resolve("")
        }
        reader.readAsDataURL(file)
      }))
    }

    Promise.all(promises).then(function () {
      document.getElementsByTagName('title')[0].innerText = "图片转PDF"
      document.getElementsByTagName('body')[0].innerHTML = template
      setTimeout(function () {
        window.print()
        window.location.reload()
      }, 500)
    })

  }

}
