import { Component, Input, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {

  @Input()
  image: any

  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
  }

  removeFile() {
    this.imagesService.removeImage(this.image)
  }

}