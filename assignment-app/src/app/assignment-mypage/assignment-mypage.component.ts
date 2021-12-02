import { Component, OnInit } from '@angular/core';
import { AssignmentTranslationsService } from '../data/services/assignment-translations.service';

@Component({
  selector: 'as-my-page',
  templateUrl: './assignment-mypage.component.html',
  styleUrls: ['./assignment-mypage.component.scss']
})
export class AssignmentMyPageComponent implements OnInit{
  languageCode: string = 'en'
  languageChange: boolean = false;
  ready: boolean = false;

  constructor(private assignmentTranslationsService: AssignmentTranslationsService) {
    this.assignmentTranslationsService.dataReady$.subscribe(isReady => {
      this.ready = isReady;
    })
  }

  ngOnInit() {
    this.assignmentTranslationsService.changeLanguage(this.languageCode);
  }

  onLanguageChange() {
    this.languageChange? this.languageCode = 'pl': this.languageCode = 'en';
    this.assignmentTranslationsService.changeLanguage(this.languageCode);
  }
}
