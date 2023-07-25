import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  constructor(private sanitizer: DomSanitizer) { }

  getImageUCB(imagePath: string): SafeUrl {
    if (imagePath === '0') {
      const defaultImagePath = 'assets/icons/ucb_logo.png';
      return this.sanitizer.bypassSecurityTrustUrl(defaultImagePath);
    }

    const normalizedImagePath = imagePath.replace(/\\/g, '/');
    const imageUrl = environment.apimg + `credentic/${normalizedImagePath}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  
  getImage(imagePath: string): SafeUrl {
    if (imagePath === '0') {
      const defaultImagePath = 'assets/icons/no_logo.png';
      return this.sanitizer.bypassSecurityTrustUrl(defaultImagePath);
    }

    const normalizedImagePath = imagePath.replace(/\\/g, '/');
    const imageUrl = environment.apimg + `credentic/${normalizedImagePath}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }


}
