import {
    getAllPokemon,
    getSinglePokemon,
} from '../controllers/pokemonController';

const express = require('express');
const router = express.Router();

// get all pokemon
router.route('/').get(getAllPokemon);

// get single pokemon
router.route('/pokemon/:id').get(getSinglePokemon);

export default router;
