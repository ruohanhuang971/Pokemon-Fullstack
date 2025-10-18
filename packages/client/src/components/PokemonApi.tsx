import axios from 'axios';

export type PokemonBasicInfo = {
    id: string;
    name: string;
    sprites: {
        front_default: string | null;
    };
};

export type GetPokemonPage = {
    pokemon: PokemonBasicInfo;
};

// export type PokemonFullInfo = {};

export const PokemonApi = {
    async fetchAllPokemon() {
        const { data } = await axios.get(`/api/v1/team`);
        return data.slice(0, 20);
    },
    async fetchSinglePokemon(id: string) {
        const { data } = await axios.get(`/api/v1/team/pokemon/${id}`);
        return data;
    },
    async fetchURL(url: string) {
        const { data } = await axios.get(url);
        return data;
    },
};
