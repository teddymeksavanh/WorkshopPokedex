var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    pokemonHandler = require('../controllers/pokemonController');

mongoose.connect('mongodb://localhost/pokedex');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
    console.log('There is a request');
    next();
});

router.route('/pokemons')
    .post(pokemonHandler.newPokemon)
    .get(pokemonHandler.listAllPokemons);

router.route('/pokemons/:id')
    .get(pokemonHandler.showPokemon)
    .put(pokemonHandler.updatePokemon)
    .delete(pokemonHandler.deletePokemon);

router.route('/pokemon/:number')
    .get(pokemonHandler.showPokemonByNumber);

module.exports = router;
