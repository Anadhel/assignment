import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignmentTranslationsService {

  dataReady$: Subject<boolean> = new Subject<boolean>();

  languageCode: string = 'en';
  private _currentTranslations: any;

  set currentTranslations(translations: any) {
    this._currentTranslations = translations;
  }

  get currentTranslations(): any {
    return this._currentTranslations;
  }

  constructor(private http: HttpClient) {
  }

  changeLanguage(languageCode: string) {
    this.languageCode = languageCode;
    this.getTranslations();
  }

  getTranslation(key: string, parameter?: any): string {
      const translationKeys = key.split('.');
      const parameterKey = parameter? Object.keys(parameter)[0] : null;
      let translation = this.findTranslationByKeys(translationKeys);
      if(parameterKey) {
        translation = translation.replaceAll(`{{${parameterKey}}}`, parameter[parameterKey]);
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
    let result: any = null;
    keys.forEach(key => {
      if(result === null) {
        result = this.currentTranslations[key];
      } else {
        result = result[key];
      }
    });
    return result;
  }

}
