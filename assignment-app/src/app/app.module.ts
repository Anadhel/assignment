import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AssignmentTranslationsPipe } from './data/pipes/assignment-translations.pipe';
import { AssignmentMyPageComponent } from './assignment-mypage/assignment-mypage.component';


@NgModule({
  declarations: [
    AppComponent,
    AssignmentTranslationsPipe,
    AssignmentMyPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
