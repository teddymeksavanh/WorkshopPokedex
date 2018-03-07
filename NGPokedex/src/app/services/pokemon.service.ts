import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import { Pokemon } from '../models/pokemon';

@Injectable()
export class PokemonService {
  private pokemonLimit = 9;
  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=' + this.pokemonLimit;

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService
  ) { }

  getPokemons(): Promise<Array<Pokemon>> {

    return new Promise((resolve, reject) => {

      //Check if pokemons data already exist in localStorage
      if(this.localStorageService.isSupported && this.localStorageService.get('pokemons')) {
        resolve(this.localStorageService.get('pokemons'))
      } else {
        //Get data from pokéApi
        this.http
          .get(this.pokeApiUrl)
          .toPromise()
          .then((pokemonsResponse) => {
            const pokemons = Object.assign([], pokemonsResponse.json().results)
            const pokemonPromises = pokemons.map( pokeObj =>
              this.getPokemon(pokeObj.url)
            )

            Promise.all(pokemonPromises)
              .then((values) => {
                  this.localStorageService.set('pokemons', values)
                  resolve(values)
              })
              .catch(reject)

        })
        .catch(this.handleError);
      }
    })
  }

  getPokemon(pokemonUrl: string): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
      this.http
        .get(pokemonUrl)
        .toPromise()
        .then((response) => {
          resolve(response.json())
        })
        .catch(reject);
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
