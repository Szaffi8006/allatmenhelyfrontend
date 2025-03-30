import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminAdoptersComponent } from './admin.adopters/admin.adopters.component';
import { AdminAdoptionsComponent } from './admin.adoptions/admin.adoptions.component';
import { AdminAnimalsComponent } from './admin.animals/admin.animals.component';
import { AdminAppointmentsComponent } from './admin.appointments/admin.appointments.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUsersComponent } from './admin.users/admin.users.component';
import { AnimalsComponent } from './animals/animals.component';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth.guard.service';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" }, 
  { path: "auth", component: AuthComponent },        
  { path: "login", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },

  { 
    path: "animals", 
    component: AnimalsComponent,
    children: [
      { path: "", redirectTo: "list", pathMatch: "full" },
      { path: "animals", component: AnimalsComponent },
      { path: "search", component: SearchComponent }
    ]
  },

  { 
    path: "information",
    children: [
      { path: "contact", component: FavouritesComponent },
      { path: "howitworks", component: AppointmentsComponent }
    ]
  },

  { 
    path: "profile",
    canActivate: [AuthGuardService],  
    children: [
      { path: "favorites", component: FavouritesComponent },
      { path: "reservations", component: AppointmentsComponent }
    ]
  },

  { 
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "animals", component: AdminAnimalsComponent },
      { path: "users", component: AdminUsersComponent },
      { path: "adopters", component: AdminAdoptersComponent },
      { path: "adoptions", component: AdminAdoptionsComponent },
      { path: "appointments", component: AdminAppointmentsComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
