import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  allImages: any[] = [];
  pastedImages: any[] = [];
  isInitialized = false;

  constructor(private rest: RestService) { }

  setImages(images: any[]) {
    this.allImages = images;
    if (!this.isInitialized) {
      this.pastedImages.forEach(image => this.allImages.push(image));
      this.pastedImages.splice(0, this.pastedImages.length)
    }
    this.isInitialized = true;
  }

  removeImage(image: any) {
    const index = this.allImages.map(img => img.name).indexOf(image.name)
    if (index >= 0) {
      this.allImages.splice(index, 1);
    }
  }

  addImage(images: any[], image: any) {
    this.pastedImages = images;
    if (!this.isInitialized) {
      this.pastedImages.push(image);
    } else {
      this.allImages.push(image);
    }
  }

  getImages() {
    let images: any[];
    if (!this.isInitialized) {
      images = this.pastedImages;
    } else {
      images = this.allImages;
    }
    return images;
  }

  saveImages(recipeId: string) {
    const uploadImageData = new FormData();
    for (let image of this.getImages()) {
      uploadImageData.append('imageFile', image, image.name);
    }
    uploadImageData.append('recipeId', recipeId);

    return this.rest.post('api/images/upload', uploadImageData);
  }
}
