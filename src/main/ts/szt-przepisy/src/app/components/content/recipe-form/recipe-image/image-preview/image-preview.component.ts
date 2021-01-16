import { Component, Input, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { SingleRecipeService } from 'src/app/services/single-recipe.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {

  @Input() image: any

  @Input() isOriginal = false;

  constructor(private imagesService: ImagesService, private singleRecipeService: SingleRecipeService) { }

  ngOnInit(): void {
  }

  removeFile() {
    if (!this.isOriginal) {
      this.imagesService.removeImage(this.image)
    } else {
      this.singleRecipeService.deleteRecipeImage(this.image);
    }
  }
}