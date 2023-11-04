import { Component } from '@angular/core'
import * as pdfjsLib from "pdfjs-dist"

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/build/pdf.worker.min.js"

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class PdfToImgComponent {

  process: number = 0
  isWork: boolean = false

  doChange(event: Event) {
    let files = (event?.target as any).files
    this.isWork = true

    let _this = this

    let count = 0, hadCount = 0, hadFileCount = 0
    for (let index = 0; index < files.length; index++) {
      let file = files[index]

      let reader = new FileReader()

      reader.onload = function () {

        let loadingTask = pdfjsLib.getDocument({
          url: reader.result as string,

          // 解决部分文字未正确显示问题
          cMapPacked: true,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/cmaps/'

        })

        loadingTask.promise.then(function (pdf) {

          hadFileCount += 1
          count += pdf.numPages

          // 一页页的来
          for (let pagenum = 0; pagenum < pdf.numPages; pagenum++) {
            pdf.getPage(pagenum + 1).then(function (page) {

              let viewport = page.getViewport({ scale: 1 })

              let canvas = document.createElement("canvas")
              let context = canvas.getContext('2d')

              let CSS_UNITS = 3 * 96 / 72

              canvas.width = Math.floor(viewport.width * CSS_UNITS)
              canvas.height = Math.floor(viewport.height * CSS_UNITS)

              let pageRendering = page.render({
                canvasContext: context as CanvasRenderingContext2D,
                transform: [CSS_UNITS, 0, 0, CSS_UNITS, 0, 0],
                viewport
              })

              // 等render渲染完毕后，触发下载
              let completeCallback = pageRendering._internalRenderTask.callback
              pageRendering._internalRenderTask.callback = function (error: any) {
                completeCallback.call(this, error)

                let url = canvas.toDataURL("image/jpeg")

                let a = document.createElement("a")
                a.href = url
                a.download = file.name.replace('.pdf', '') + "_" + (pagenum + 1) + ".jpeg"

                a.click()
                hadCount += 1

                if (hadFileCount == files.length) {
                  let _process = +((hadCount / count * 100).toFixed(2))
                  _this.process = _process > 99.99 ? 99.99 : _process

                  if (hadCount == count) {
                    _this.process == 100
                    setTimeout(() => {
                      window.location.reload()
                    }, 1000)
                  }
                }
              }

            })
          }

        })

      }
      reader.readAsDataURL(file)

    }

  }

}
