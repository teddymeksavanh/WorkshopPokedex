const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator');

const pokemonSchema = new Schema({
    //_id: Number,
    name: {
        type: String,
        required: 'Name is required'
    },
    types: {
       type: Array
    },
    level: {
        type: Number
    },
    img: {
        type: String
    },
    number: {
        type: String
    },
    weight: {
        type: String
    },
    height: {
        type: String
    },
    previous_evolution: {
        type: Array
    },
    next_evolution: {
        type: Array
    },
    attacks: {
        type: Array
    }
});

pokemonSchema.plugin(uniqueValidator, {message: "This pokemon already exist"});

module.exports = mongoose.model('pokemons', pokemonSchema);
