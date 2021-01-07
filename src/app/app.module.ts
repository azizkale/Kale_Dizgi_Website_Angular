import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminconsoleComponent } from './adminconsole/adminconsole.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DizgimizanpajComponent } from './dizgimizanpaj/dizgimizanpaj.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MotherPageComponent } from './mother-page/mother-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from './slider/slider.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    AppComponent,
    AdminconsoleComponent,
    ContactComponent,
    DizgimizanpajComponent,
    FooterComponent,
    LoginComponent,
    MotherPageComponent,
    NavbarComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    AccordionModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
