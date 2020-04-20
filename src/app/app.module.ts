import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotfoundComponent } from './modulos/notfound/notfound/notfound.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './shared/modal/login/login.component';
import { SignupComponent } from './shared/modal/signup/signup.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("405368525839-n1ldr5kiij0r71kt2u6artnro1f64rrj.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("656772961561100")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    SignupComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
