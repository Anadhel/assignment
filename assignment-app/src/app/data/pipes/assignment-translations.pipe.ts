import { Pipe, PipeTransform } from '@angular/core';
import { AssignmentTranslationsService } from '../services/assignment-translations.service';


@Pipe({ name: 'assignmentTranslate', pure: false })
export class AssignmentTranslationsPipe implements PipeTransform {

  constructor(private assignmentTranslationsService: AssignmentTranslationsService) {}

  transform(value: string, parameter?: any) {
    return this.assignmentTranslationsService.getTranslation(value.toString(), parameter);
  }
}
