import {
    getAllPokemon,
    getSinglePokemon,
    getPagePokemon,
} from '../controllers/pokemonController';

const express = require('express');
const router = express.Router();

// get all pokemon
router.route('/').get(getAllPokemon);
// get page of pokemon
router.route('/:offset').get(getPagePokemon);
// get single pokemon
router.route('/pokemon/:id').get(getSinglePokemon);

export default router;
