import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import localePt from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
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

import { environment } from '../environments/environment';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './shared/modal/login/login.component';
import { SignupComponent } from './shared/modal/signup/signup.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { QuestionComponent } from './shared/components/question/question.component';
import { FeedbackModalComponent } from './shared/modal/feedback-modal/feedback-modal.component';
import { RecuperarSenhaComponent } from './shared/modal/recuperar-senha/recuperar-senha.component';
import { FeedbackButtonComponent } from './shared/components/feedback-button/feedback-button.component';

import { SidemenuComponent } from './shared/components/sidemenu/sidemenu.component';
import { UserMenuComponent } from './shared/components/sidemenu/components/user-menu/user-menu.component';
import { SearchboxComponent } from './shared/components/sidemenu/components/searchbox/searchbox.component';

import { AuthInterceptorService } from './shared/service/authInterceptor.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    SignupComponent,
    QuestionComponent,
    UserMenuComponent,
    SearchboxComponent,
    FeedbackModalComponent,
    RecuperarSenhaComponent,
    FeedbackButtonComponent,
    SidemenuComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    SharedModule,
    BrowserModule,
    RecaptchaModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    BrowserAnimationsModule,
    SidebarModule.forRoot(),
    MarkdownModule.forRoot({ loader: HttpClient }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LeXn64ZAAAAAO0pJSBggJaitNSWisc2N5fp8SD6' } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'pt-BR',
    },
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SignupComponent, RecuperarSenhaComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
