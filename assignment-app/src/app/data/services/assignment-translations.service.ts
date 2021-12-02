import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignmentTranslationsService {

  dataReady$: Subject<boolean> = new Subject<boolean>();

  languageCode: string = 'en';
  private currentTranslations: any = {};

  constructor(private http: HttpClient) {
    this.changeLanguage(this.languageCode);
  }

  changeLanguage(languageCode: string) {
    this.languageCode = languageCode;
    this.getTranslations();
  }

  getTranslation(key: string, parameter?: {[key: string]: string}): string {
      const translationKeys = key.split('.');
      let translation = this.findTranslationByKeys(translationKeys);
      if(parameter) {
        translation = translation.replaceAll(/{{(\w+)}}/g, (fullMatch, keyMatch) => parameter[keyMatch]);
      }
      return translation;
  }

  getTranslations() {
    this.http.get(`assets/translations/translations.${this.languageCode}.json`).subscribe(data => {
      if(data) {
        this.dataReady$.next(true);
      }
      this.currentTranslations = data;
    });

  }

  findTranslationByKeys(keys: string[]): string {
    return keys.reduce((obj, key) => obj[key], this.currentTranslations);
  }

}
