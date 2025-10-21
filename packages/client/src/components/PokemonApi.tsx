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
        return data;
    },
    async fetchPokemonPage(page: number) {
        const offset = (page - 1) * 24;
        const { data } = await axios.get(`/api/v1/team/${offset}`);
        return data;
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
