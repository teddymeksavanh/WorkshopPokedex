import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-modal';
import { LocalStorageModule } from 'angular-2-local-storage';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';

// Services
import { ApiService } from './services/api.service';
import { PokemonService } from './services/pokemon.service';
import { PokemonMongoService } from './services/pokemon-mongo.service';

// Pipes
import { CamelCasePipe } from './pipes/camel-case.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    CamelCasePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    RouterModule.forRoot([
        {
            path: '',
            component: AppComponent
        }
    ])
  ],
  providers: [
      PokemonService,
      PokemonMongoService,
      ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
