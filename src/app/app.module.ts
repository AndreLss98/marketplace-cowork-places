import { FeedbackModalComponent } from './shared/modal/feedback-modal/feedback-modal.component';
import { FeedbackButtonComponent } from './shared/components/feedback-button/feedback-button.component';
import { AuthInterceptorService } from './shared/service/authInterceptor.service';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './shared/modal/login/login.component';
import { SignupComponent } from './shared/modal/signup/signup.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './shared/materia.module';
import { NgxImageCompressService } from 'ngx-image-compress';
import { RecaptchaModule, RecaptchaFormsModule, RecaptchaSettings, 
  RECAPTCHA_SETTINGS, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';

import { QuestionComponent } from './shared/components/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    FeedbackButtonComponent,
    FeedbackModalComponent,
    QuestionComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    MatDialogModule,
    AppRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    NgxImageCompressService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LeXn64ZAAAAAO0pJSBggJaitNSWisc2N5fp8SD6' } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SignupComponent]
})
export class AppModule { }
