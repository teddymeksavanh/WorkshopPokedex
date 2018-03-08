import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-modal';
import { LocalStorageModule } from 'angular-2-local-storage';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { UserFormComponent } from './components/user/user-form.component';
import { UserFormModalComponent } from './components/user/user-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';

// Services
import { ApiService } from './services/api.service';
import { HeadersService } from './services/headers.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { PokemonMongoService } from './services/pokemon-mongo.service';

// Pipes
import { CamelCasePipe } from './pipes/camel-case.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    CamelCasePipe,
    DashboardComponent,
    NavbarComponent,
    UserFormComponent,
    UserFormModalComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    UserFormComponent,
    UserFormModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    RouterModule.forRoot([
        {
            path: '',
            component: DashboardComponent
        }
    ])
  ],
  bootstrap: [AppComponent],
  providers: [
      PokemonMongoService,
      ApiService,
      HeadersService,
      UserService,
      AuthService
  ]
})
export class AppModule { }
