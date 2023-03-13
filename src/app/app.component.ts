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
  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.capturedImage = reader.result != null ? reader.result.toString():"";
      this.display = "block";
    }
      
   
  }
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
  }


  private trigger: Subject<any> = new Subject();
  public camImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  capturedImage = '';
  display = "none";
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
    if (camImage!.imageAsDataUrl != null || camImage!.imageAsDataUrl != undefined)
      this.IsCapture = false;
    this.display = "block";
    // this.trigger.complete();
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
  onCloseHandled() {
    this.display = "none";
  }

//   handleUpload(event : any):any{
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       return  reader.result;
//     }
// }
}
