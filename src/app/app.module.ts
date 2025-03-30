import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AnimalsComponent } from './animals/animals.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './information/information.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminAnimalsComponent } from './admin.animals/admin.animals.component';
import { AdminUsersComponent } from './admin.users/admin.users.component';
import { AdminAppointmentsComponent } from './admin.appointments/admin.appointments.component';
import { AdminAdoptersComponent } from './admin.adopters/admin.adopters.component';
import { AdminAdoptionsComponent } from './admin.adoptions/admin.adoptions.component';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AuthComponent } from './auth/auth.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AnimalsComponent,
    RegistrationComponent,
    LoginComponent,
    FooterComponent,
    AdminComponent,
    HomeComponent,
    InformationComponent,
    ProfileComponent,
    AdminAnimalsComponent,
    AdminUsersComponent,
    AdminAppointmentsComponent,
    AdminAdoptersComponent,
    AdminAdoptionsComponent,
    SearchComponent,
    FavouritesComponent,
    AppointmentsComponent,
    AuthComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
