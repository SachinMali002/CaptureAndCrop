import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  IsCapture = true;
  BtnCapture = "Capture";
  // onFileChange(event: any): void {
  //   this.imgChangeEvt = event;
  // }
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
  }


  private trigger: Subject<any> = new Subject();
  public camImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  capturedImage = '';
  ngOnInit() {
    console.log("cropImgPreview" + this.cropImgPreview);
  }
  public captureImage(): void {
    this.trigger.next(void 0);
  }
  public captureImg(camImage: WebcamImage): void {
    // this.webcamImage = webcamImage;
    this.capturedImage = camImage!.imageAsDataUrl;
    this.imgChangeEvt = this.capturedImage;
    console.log("IsCapture : " + this.IsCapture);
    if (camImage!.imageAsDataUrl != null || camImage!.imageAsDataUrl != undefined)
      this.IsCapture = false;
    console.log("IsCapture after : " + this.IsCapture);
    // this.trigger.complete();
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
}
