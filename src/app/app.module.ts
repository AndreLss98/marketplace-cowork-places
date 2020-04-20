import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './modulos/home/home/home.component';
import { NotfoundComponent } from './modulos/notfound/notfound/notfound.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './shared/modal/login/login.component';
import { InfoComponent } from './modulos/home/components/info/info.component';
import { HighlightComponent } from './modulos/home/components/highlight/highlight.component';
import { HighlightItemsComponent } from './shared/components/highlight-items/highlight-items.component';
import { FindComponent } from './modulos/home/components/find/find.component';
import { SearchComponent } from './modulos/search/search/search.component';
import { SearchboxComponent } from './modulos/search/components/searchbox/searchbox.component';
import { SignupComponent } from './shared/modal/signup/signup.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { ServiceWorkerModule } from '@angular/service-worker';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { environment } from '../environments/environment';
import { MaterialModule } from './materia.module';


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
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    SignupComponent,
    InfoComponent,
    HighlightComponent,
    HighlightItemsComponent,
    FindComponent,
    SearchComponent,
    SearchboxComponent,
  ],
  imports: [
    MaterialModule,
    FormsModule,
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    InfiniteScrollModule,
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
