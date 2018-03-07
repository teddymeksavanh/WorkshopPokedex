import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

// Models
import { Pokemon } from '../models/pokemon';

// Services
import { LocalStorageService } from 'angular-2-local-storage';
import { ApiService } from './api.service';

// 3rd tiers
import { Observable, Subscription } from 'rxjs/Rx';

@Injectable()
export class PokemonMongoService {

    constructor(
        private localStorageService: LocalStorageService,
        private apiService: ApiService
    ) { }

    fetchAll(): Observable<Pokemon[]> {
        return this.apiService.get('/pokemons');
    }

    fetchOne(id: number): Observable<Pokemon> {
        return this.apiService.get(`/pokemons/${id}`);
    }

    create(pokemon: Pokemon): Observable<Pokemon> {
        return this.apiService.post('/pokemons', pokemon);
    }

    update(pokemon: Pokemon): Observable<Pokemon> {
        return this.apiService.put(`/pokemons/${pokemon.id}`, pokemon);
    }

    delete(pokemon: Pokemon): any {
        return this.apiService.delete(`/pokemons/${pokemon.id}`);
    }
}
