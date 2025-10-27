import { useQueries, useQuery } from '@tanstack/react-query';
import { PokemonApi } from '../../components/PokemonApi';
import axios from 'axios';
import type { UniqueIdentifier } from '@dnd-kit/core';

interface PokemonAnalysisProp {
    names: UniqueIdentifier[];
}

const PokemonAnalysis = ({ names }: PokemonAnalysisProp) => {
    // fetching single pokemon here
    // const { data, isLoading, error } = useQuery({
    //     queryKey: [pokemonName],
    //     queryFn: () => PokemonApi.fetchSinglePokemon(pokemonName),
    // });
    const queries = useQueries({
        queries: names.map((n) => ({
            queryKey: [n],
            queryFn: () =>
                axios
                    .get(`https://pokeapi.co/api/v2/pokemon/${n}`)
                    .then((res) => res.data),
        })),
    });

    console.log(queries);

    return <div>PokemonAnalysis</div>;
};

export default PokemonAnalysis;
