import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageDto } from 'src/app/api/api';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-recipe-image',
  templateUrl: './recipe-image.component.html',
  styleUrls: ['./recipe-image.component.scss']
})
export class RecipeImageComponent implements OnInit {

  images: any[] = [];

  @Input() originalImages: ImageDto[] = [];

  constructor(
    private imagesService: ImagesService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  onPaste(e: any) {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    let blob = null;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }
    if (blob) {
      blob.objectURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      this.imagesService.addImage(this.images, blob);
    }
  }

  onSelect(event) {
    this.imagesService.setImages(event.currentFiles)
  }
}
