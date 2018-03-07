import { Component, OnInit } from '@angular/core';

// Models
import { Pokemon } from '../../models/pokemon';

// Services
import { PokemonService } from '../../services/pokemon.service';
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
        private pokemonService: PokemonService,
        private pokemonMongoService: PokemonMongoService
    ) { }

    ngOnInit() {
        this.getPokemons();
        this.getPokemonsMongo();
    }

    getPokemonsMongo = () => {
        this.pokemonMongoService
            .fetchAll()
            .map(re => {
                console.log('re', re);
            });
    }

	getPokemons(): void {
		this.pokemonService
			.getPokemons()
			.then(pokemons => {
                console.log('pokemons', pokemons);
                return this.pokemons = pokemons
            })
			.catch(error => this.error = error);
	}

	searchByType(value: string): void {
		let searchedPokemons = []
		this.pokemons.map((pokemon) => {
			pokemon.types.map(typesWrapper => {
				if( typesWrapper.type.name === value ) {
					if(searchedPokemons.indexOf(pokemon) === -1) {
						searchedPokemons.push(pokemon)
					}
				}
			})
		})
		this.searchedPokemons = searchedPokemons
	}

  searchByAbility(value: string): void {
    let searchedPokemons = []
      this.pokemons.map((pokemon) => {
        pokemon.abilities.map(abilitiesWrapper => {
          if( abilitiesWrapper.ability.name === value ) {
            if(searchedPokemons.indexOf(pokemon) === -1) {
              searchedPokemons.push(pokemon)
            }
          }
        })
      })
      this.searchedPokemons = searchedPokemons
  }

}
