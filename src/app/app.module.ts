import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';


import {
  RecaptchaModule,
  RecaptchaSettings, 
  RECAPTCHA_SETTINGS,
  RECAPTCHA_LANGUAGE,
  RecaptchaFormsModule
} from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './shared/modal/login/login.component';
import { SignupComponent } from './shared/modal/signup/signup.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { QuestionComponent } from './shared/components/question/question.component';
import { FeedbackModalComponent } from './shared/modal/feedback-modal/feedback-modal.component';
import { RecuperarSenhaComponent } from './shared/modal/recuperar-senha/recuperar-senha.component';
import { FeedbackButtonComponent } from './shared/components/feedback-button/feedback-button.component';

import { environment } from '../environments/environment';

import { AuthInterceptorService } from './shared/service/authInterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    RecuperarSenhaComponent,
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
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SignupComponent, RecuperarSenhaComponent]
})
export class AppModule { }
