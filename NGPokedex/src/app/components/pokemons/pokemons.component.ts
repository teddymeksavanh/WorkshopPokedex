import { Component, OnInit } from '@angular/core';

// Models
import { Pokemon } from '../../models/pokemon';

// Services
import { PokemonMongoService } from '../../services/pokemon-mongo.service';

// 3rd tiers
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'my-pokemons',
    templateUrl: './pokemons.component.html',
    styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
	pokemons: Pokemon[];
	searchedPokemons: Pokemon[] = [];
	error: any;

    public pokemonsMongo: Observable<Pokemon[]>;

    constructor(
        private pokemonMongoService: PokemonMongoService
    ) { }

    ngOnInit() {
        this.pokemonsMongo = this.getPokemonsMongo();
    }

    getPokemonsMongo = () => this.pokemonMongoService.fetchAll();
}
