import type { Request, Response } from 'express';
import axios from 'axios';

type APIResource = {
    name: string;
    url: string;
};

// note: this get all the pokemon because PokeAPI doesn't support filtering. Filtering done on
// client-side
export const getAllPokemon = async (req: Request, res: Response) => {
    // fetch data from pokemon api
    const URL = `https://pokeapi.co/api/v2/pokemon/?limit=100000`;
    const response = await axios.get(URL);
    const pokemonResource = response.data.results;

    return res.json(pokemonResource);
};

export const getSinglePokemon = async (req: Request, res: Response) => {
    const { id } = req.params;

    // fetch data from pokemon api
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await axios.get(URL);
    const pokemonResource = response.data;

    return res.json(pokemonResource);
};
